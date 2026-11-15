#!/usr/bin/env bash
# Đổi mật khẩu xem bản thử. Chỉ cần gõ mật khẩu mới hai lần; kịch bản tự tạo mã băm,
# thay vào /etc/caddy/sites/casa-website.caddy, kiểm tra cấu hình rồi nạp lại Caddy.
# Cách chạy (bằng user casa):
#   sudo bash /opt/casa-website/src/deploy/doi-mat-khau.sh          # đổi mật khẩu của tên đăng nhập "xem"
#   sudo bash /opt/casa-website/src/deploy/doi-mat-khau.sh tenkhac  # đổi cho một tên đăng nhập khác đã có
# Cấu hình sai thì tự khôi phục bản cũ; app casa-mamnon không bị ảnh hưởng.
set -euo pipefail

TEP="/etc/caddy/sites/casa-website.caddy"
CADDYFILE="/etc/caddy/Caddyfile"
TEN="${1:-xem}"

[ "$(id -u)" -eq 0 ] || { echo "✘ Cần chạy bằng sudo: sudo bash $0"; exit 1; }
[ -f "$TEP" ] || { echo "✘ Không thấy $TEP"; exit 1; }

read -rsp "Mật khẩu mới cho tên đăng nhập \"$TEN\": " MK1; echo
read -rsp "Gõ lại mật khẩu mới: " MK2; echo
[ "$MK1" = "$MK2" ] || { echo "✘ Hai lần gõ không giống nhau. Chưa đổi gì."; exit 1; }
[ "${#MK1}" -ge 8 ] || { echo "✘ Mật khẩu cần ít nhất 8 ký tự. Chưa đổi gì."; exit 1; }

BAM="$(printf '%s\n' "$MK1" | caddy hash-password)"
unset MK1 MK2
case "$BAM" in \$2[aby]\$*) ;; *) echo "✘ Không tạo được mã băm. Chưa đổi gì."; exit 1 ;; esac

TAM="$(mktemp)"
trap 'rm -f "$TAM"' EXIT
cp -a "$TEP" "${TEP}.bak"

# Thay đúng dòng "<tên> <mã băm cũ>" trong khối basic_auth, giữ nguyên thụt đầu dòng
if ! TEN="$TEN" BAM="$BAM" awk '
  $1 == ENVIRON["TEN"] && $2 ~ /^(\$2[aby]\$|MA_BAM_MAT_KHAU)/ {
    match($0, /^[ \t]*/); print substr($0, 1, RLENGTH) ENVIRON["TEN"] " " ENVIRON["BAM"]; n++; next
  }
  { print }
  END { if (n != 1) exit 3 }
' "${TEP}.bak" > "$TAM"; then
  echo "✘ Không tìm thấy đúng một dòng mật khẩu cho \"$TEN\" trong $TEP. Chưa đổi gì."
  exit 1
fi
cat "$TAM" > "$TEP"

if ! caddy validate --config "$CADDYFILE" --adapter caddyfile >/dev/null 2>&1; then
  cat "${TEP}.bak" > "$TEP"
  echo "✘ Cấu hình mới không hợp lệ, đã khôi phục bản cũ. Mật khẩu cũ vẫn dùng được."
  exit 1
fi

systemctl reload caddy
echo "✔ Đã đổi mật khẩu cho \"$TEN\". Từ giờ đăng nhập bằng mật khẩu mới."
echo "  (Bản cấu hình trước khi đổi: ${TEP}.bak)"
