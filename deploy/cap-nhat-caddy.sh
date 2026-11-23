#!/usr/bin/env bash
# Áp dụng tệp mẫu deploy/casa-website.caddy lên /etc/caddy/sites/casa-website.caddy,
# GIỮ NGUYÊN dòng tên miền và các dòng mật khẩu (mã băm) đang dùng trên máy.
# Cách chạy (bằng user có sudo):
#   sudo bash /opt/casa-website/src/deploy/cap-nhat-caddy.sh
# Cấu hình mới sai thì tự khôi phục bản cũ; khối của app casa-mamnon không bị đụng tới.
# Kịch bản cũng chép bảng chuyển hướng URL cũ vào /etc/caddy/casa-website/redirects.caddy
# (thư mục riêng, KHÔNG đặt trong /etc/caddy/sites/ vì Caddyfile nạp mọi tệp ở đó như một site).
set -euo pipefail

MAU="/opt/casa-website/src/deploy/casa-website.caddy"
TEP="/etc/caddy/sites/casa-website.caddy"
CADDYFILE="/etc/caddy/Caddyfile"
REDIR_MAU="/opt/casa-website/src/deploy/redirects.caddy"
REDIR="/etc/caddy/casa-website/redirects.caddy"
GOC_WEB="/var/www/casa-website"

[ "$(id -u)" -eq 0 ] || { echo "✘ Cần chạy bằng sudo: sudo bash $0"; exit 1; }
[ -f "$TEP" ] || { echo "✘ Không thấy $TEP. Làm Bước 5 trong docs/TRIEN-KHAI.md trước."; exit 1; }
[ -f "$MAU" ] || { echo "✘ Không thấy tệp mẫu $MAU. Chạy lệnh cập nhật bản thử trước."; exit 1; }
[ -f "$REDIR_MAU" ] || { echo "✘ Không thấy $REDIR_MAU. Chạy lệnh cập nhật bản thử trước."; exit 1; }

# Bản thử đọc thư mục "xem-truoc" (từ 23/11/2026). Máy cài trước ngày đó chưa có: tạo, trỏ cùng bản với "current".
if [ ! -e "${GOC_WEB}/xem-truoc" ]; then
  [ -L "${GOC_WEB}/current" ] || { echo "✘ Không thấy ${GOC_WEB}/current. Chạy lệnh cập nhật bản thử trước."; exit 1; }
  ln -sfn "$(readlink "${GOC_WEB}/current")" "${GOC_WEB}/xem-truoc"
  chown -h casa-website:casa-website "${GOC_WEB}/xem-truoc"
  echo "ℹ Đã tạo ${GOC_WEB}/xem-truoc (cùng bản với current)."
fi

# Bảng chuyển hướng: chép vào chỗ riêng; giữ bản cũ để khôi phục nếu cấu hình mới sai
install -d -m 755 "$(dirname "$REDIR")"
CO_REDIR_CU=0
if [ -f "$REDIR" ]; then cp -a "$REDIR" "${REDIR}.bak"; CO_REDIR_CU=1; fi
install -m 644 "$REDIR_MAU" "$REDIR"

# Dòng tên miền đang dùng: dòng đầu tiên không thụt lề, không phải chú thích, kết thúc bằng "{"
DIA_CHI="$(grep -m1 -E '^[^[:space:]#].*\{[[:space:]]*$' "$TEP" || true)"
DIA_CHI_MAU="$(grep -m1 -E '^[^[:space:]#].*\{[[:space:]]*$' "$MAU" || true)"
# Các dòng mật khẩu: "<tên> <mã băm bcrypt>"
MAT_KHAU="$(grep -E '^[[:space:]]+[A-Za-z0-9._-]+[[:space:]]+\$2[aby]\$' "$TEP" || true)"
[ -n "$DIA_CHI" ] && [ -n "$DIA_CHI_MAU" ] || { echo "✘ Không đọc được dòng tên miền. Chưa đổi gì."; exit 1; }
[ -n "$MAT_KHAU" ] || { echo "✘ Không thấy dòng mật khẩu nào trong $TEP. Chưa đổi gì."; exit 1; }

TAM="$(mktemp)"; trap 'rm -f "$TAM"' EXIT
DIA_CHI="$DIA_CHI" DIA_CHI_MAU="$DIA_CHI_MAU" MAT_KHAU="$MAT_KHAU" awk '
  $0 == ENVIRON["DIA_CHI_MAU"] && !da_thay_dia_chi { print ENVIRON["DIA_CHI"]; da_thay_dia_chi = 1; next }
  $1 !~ /^#/ && $2 == "MA_BAM_MAT_KHAU" { print ENVIRON["MAT_KHAU"]; da_thay_mk++; next }
  { print }
  END { if (!da_thay_dia_chi || da_thay_mk != 1) exit 3 }
' "$MAU" > "$TAM" || { echo "✘ Tệp mẫu không đúng dạng. Chưa đổi gì."; exit 1; }

if cmp -s "$TAM" "$TEP" && [ "$CO_REDIR_CU" = 1 ] && cmp -s "$REDIR" "${REDIR}.bak"; then
  echo "✔ Cấu hình Caddy đã là bản mới nhất, không cần đổi."; exit 0
fi

cp -a "$TEP" "${TEP}.bak"
cat "$TAM" > "$TEP"
if ! caddy validate --config "$CADDYFILE" --adapter caddyfile >/dev/null 2>&1; then
  cat "${TEP}.bak" > "$TEP"
  if [ "$CO_REDIR_CU" = 1 ]; then cp -a "${REDIR}.bak" "$REDIR"; fi
  echo "✘ Cấu hình mới không hợp lệ, đã khôi phục bản cũ. Website vẫn chạy như trước."
  echo "  Xem lỗi: sudo caddy validate --config $CADDYFILE --adapter caddyfile"
  exit 1
fi
systemctl reload caddy
echo "✔ Đã áp dụng cấu hình Caddy mới (giữ tên miền: ${DIA_CHI%\{*}và mật khẩu cũ)."
echo "  Bản trước khi đổi: ${TEP}.bak"
