#!/usr/bin/env bash
# Bật (hoặc gỡ) khối Caddy của tên miền chính casadeibambini.edu.vn (Giai đoạn 6).
# Chỉ chạy khi chủ trường đã đồng ý ngày chuyển. Cách chạy (bằng user có sudo):
#   Bật:  sudo bash /opt/casa-website/src/deploy/bat-ten-mien-chinh.sh
#   Gỡ:   sudo bash /opt/casa-website/src/deploy/bat-ten-mien-chinh.sh --tat
#
# Thứ tự ngày chuyển (docs/TRIEN-KHAI.md, mục "Giai đoạn 6"):
#   1. Đổi bản ghi A "@" sang IP VPS trên ZoneDNS.
#   2. Chờ DNS trỏ đúng, rồi chạy kịch bản này. Kịch bản từ chối chạy nếu DNS chưa trỏ về VPS,
#      vì Caddy sẽ xin chứng chỉ HTTPS thất bại nhiều lần và có thể bị tạm khoá.
# Chỉ thêm hoặc gỡ tệp /etc/caddy/sites/casa-website-chinh.caddy. Không đụng khối của app
# casa-mamnon hay khối bản thử. Cấu hình mới sai thì tự khôi phục.
set -euo pipefail

TEN_MIEN="casadeibambini.edu.vn"
IP_VPS="${IP_VPS:-103.195.238.114}"
MA_NGUON="/opt/casa-website/src"
MAU="${MA_NGUON}/deploy/casa-website-chinh.caddy"
REDIR_MAU="${MA_NGUON}/deploy/redirects.caddy"
REDIR="/etc/caddy/casa-website/redirects.caddy"
TEP="/etc/caddy/sites/casa-website-chinh.caddy"
CADDYFILE="/etc/caddy/Caddyfile"
GOC_WEB="/var/www/casa-website"

[ "$(id -u)" -eq 0 ] || { echo "✘ Cần chạy bằng sudo: sudo bash $0 $*"; exit 1; }

hop_le() { caddy validate --config "$CADDYFILE" --adapter caddyfile >/dev/null 2>&1; }

# ------------------------------------------------------------------ Gỡ
if [ "${1:-}" = "--tat" ]; then
  [ -f "$TEP" ] || { echo "ℹ Tên miền chính chưa bật trên máy này. Không có gì để gỡ."; exit 0; }
  mv "$TEP" "${TEP%.caddy}.da-tat"
  if ! hop_le; then
    mv "${TEP%.caddy}.da-tat" "$TEP"
    echo "✘ Gỡ xong thì cấu hình không hợp lệ, đã để nguyên như cũ. Xem lỗi:"
    echo "    sudo caddy validate --config $CADDYFILE --adapter caddyfile"
    exit 1
  fi
  systemctl reload caddy
  echo "✔ Đã gỡ khối tên miền chính (lưu lại ở ${TEP%.caddy}.da-tat)."
  echo "  Nếu đang quay lui: đổi bản ghi A \"@\" trên ZoneDNS về IP hosting cũ 125.212.243.110."
  exit 0
fi

# ------------------------------------------------------------------ Bật
[ -f "$MAU" ] && [ -f "$REDIR_MAU" ] || { echo "✘ Thiếu tệp mẫu trong ${MA_NGUON}/deploy. Chạy lệnh cập nhật website trước."; exit 1; }
[ -L "${GOC_WEB}/current" ] && [ -f "${GOC_WEB}/current/index.html" ] || { echo "✘ Chưa có bản phát hành ở ${GOC_WEB}/current. Chạy lệnh cập nhật website trước."; exit 1; }
if [ -e "${GOC_WEB}/current/co-so/ciputra" ]; then
  echo "⚠ Bản đang phát hành (current) có trang Ciputra."
  echo "  Chỉ tiếp tục nếu người phụ trách dự án đã báo bật Ciputra. Gõ CO để tiếp tục, phím khác để dừng:"
  read -r tra_loi
  [ "$tra_loi" = "CO" ] || { echo "Đã dừng. Chưa đổi gì."; exit 1; }
fi

# DNS phải trỏ về VPS (cả tên miền gốc lẫn www)
for ten in "$TEN_MIEN" "www.$TEN_MIEN"; do
  ip="$(getent ahostsv4 "$ten" | awk 'NR==1{print $1}')"
  if [ "$ip" != "$IP_VPS" ]; then
    echo "✘ $ten đang trỏ về ${ip:-(không có)}, chưa phải IP VPS $IP_VPS."
    echo "  Đổi bản ghi A \"@\" trên ZoneDNS, chờ 5–10 phút rồi chạy lại. Chưa đổi gì."
    exit 1
  fi
done
echo "✔ DNS: $TEN_MIEN và www đều trỏ về $IP_VPS"

install -d -m 755 "$(dirname "$REDIR")"
install -m 644 "$REDIR_MAU" "$REDIR"
CO_TEP_CU=0
if [ -f "$TEP" ]; then cp -a "$TEP" "${TEP}.bak"; CO_TEP_CU=1; fi
install -m 644 "$MAU" "$TEP"

if ! hop_le; then
  if [ "$CO_TEP_CU" = 1 ]; then cp -a "${TEP}.bak" "$TEP"; else rm -f "$TEP"; fi
  echo "✘ Cấu hình tên miền chính không hợp lệ, đã khôi phục như cũ. Website cũ vẫn chạy bình thường."
  echo "  Xem lỗi: sudo caddy validate --config $CADDYFILE --adapter caddyfile"
  exit 1
fi
systemctl reload caddy
echo "✔ Đã bật tên miền chính. Caddy đang xin chứng chỉ HTTPS (thường dưới 1 phút)."

# Chờ HTTPS sẵn sàng (tối đa khoảng 2 phút)
for i in $(seq 1 24); do
  if curl -fsS -o /dev/null --max-time 5 "https://${TEN_MIEN}/"; then
    echo "✔ https://${TEN_MIEN}/ đã mở được."
    echo ""
    echo "Bước tiếp theo: kiểm tra toàn bộ URL cũ:"
    echo "    node ${MA_NGUON}/scripts/kiem-tra-chuyen-huong.mjs https://${TEN_MIEN} --chinh"
    exit 0
  fi
  sleep 5
done
echo "⚠ Sau 2 phút https://${TEN_MIEN}/ vẫn chưa mở được. Xem nhật ký:"
echo "    sudo journalctl -u caddy --since '5 min ago' | tail -50"
echo "  Muốn quay lui: sudo bash $0 --tat  rồi đổi bản ghi A về 125.212.243.110."
exit 1
