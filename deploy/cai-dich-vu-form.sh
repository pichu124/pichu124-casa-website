#!/usr/bin/env bash
# Cài hoặc cập nhật dịch vụ nhận form đăng ký tham quan (Giai đoạn 4).
# Chạy bằng tài khoản có quyền sudo (không chạy bằng user casa-website):
#   sudo bash /opt/casa-website/src/deploy/cai-dich-vu-form.sh
# An toàn khi chạy lại nhiều lần. Không đụng tới app casa-mamnon hay dữ liệu của app.
set -euo pipefail

NGUON=/opt/casa-website/src
DICH=/opt/casa-website-form
CAU_HINH=/etc/casa-website/form.env

if [ "$(id -u)" -ne 0 ]; then echo "✘ Cần chạy bằng sudo: sudo bash $0"; exit 1; fi
[ -f "$NGUON/form/src/server.mjs" ] || { echo "✘ Không thấy mã dịch vụ form ở $NGUON/form. Chạy lệnh cập nhật bản thử trước."; exit 1; }

NODE="$(command -v node || true)"
[ -n "$NODE" ] || { echo "✘ Không tìm thấy Node.js trong PATH của root. Báo người phụ trách dự án."; exit 1; }
PHIEN_BAN="$("$NODE" -p 'process.versions.node.split(".")[0]')"
[ "$PHIEN_BAN" -ge 20 ] || { echo "✘ Cần Node.js 20 trở lên, máy đang có $("$NODE" -v)."; exit 1; }
echo "▶ Node.js: $NODE ($("$NODE" -v))"

echo "▶ User riêng cho dịch vụ: casa-form"
if ! id casa-form >/dev/null 2>&1; then
  adduser --system --group --no-create-home --home /nonexistent --shell /usr/sbin/nologin casa-form
fi

echo "▶ Tệp cấu hình: $CAU_HINH"
install -d -m 750 -o root -g casa-form /etc/casa-website
if [ ! -f "$CAU_HINH" ]; then
  install -m 640 -o root -g casa-form "$NGUON/deploy/form.env.mau" "$CAU_HINH"
  echo "  Đã tạo tệp cấu hình mới từ mẫu."
fi
chown root:casa-form "$CAU_HINH"; chmod 640 "$CAU_HINH"

echo "▶ Chép mã dịch vụ vào $DICH (chỉ root sửa được)"
rm -rf "$DICH.moi"
install -d -m 755 "$DICH.moi"
cp -r "$NGUON/form/src" "$NGUON/form/scripts" "$NGUON/form/package.json" "$DICH.moi/"
chown -R root:root "$DICH.moi"; chmod -R u=rwX,go=rX "$DICH.moi"
rm -rf "$DICH.cu"; if [ -d "$DICH" ]; then mv "$DICH" "$DICH.cu"; fi
mv "$DICH.moi" "$DICH"

echo "▶ Cài dịch vụ systemd"
for tep in casa-website-form.service casa-website-form-don.service casa-website-form-don.timer; do
  sed "s#/usr/bin/node#$NODE#g" "$NGUON/deploy/$tep" > "/etc/systemd/system/$tep"
done
systemctl daemon-reload
systemctl enable --quiet casa-website-form.service casa-website-form-don.timer
systemctl start casa-website-form-don.timer

if grep -q 'DIEN_MAT_KHAU_UNG_DUNG' "$CAU_HINH"; then
  echo
  echo "⚠ Chưa điền mật khẩu ứng dụng Google. Dịch vụ CHƯA chạy."
  echo "  1. Mở tệp:   sudo nano $CAU_HINH"
  echo "  2. Thay DIEN_MAT_KHAU_UNG_DUNG bằng mật khẩu ứng dụng 16 ký tự (viết liền), lưu lại."
  echo "  3. Chạy lại: sudo bash $0"
  exit 0
fi

echo "▶ Khởi động lại dịch vụ"
systemctl restart casa-website-form.service
for _ in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS http://127.0.0.1:3100/api/suc-khoe >/dev/null 2>&1; then
    echo "✔ Dịch vụ form đang chạy ở 127.0.0.1:3100."
    echo "  Xem nhật ký: sudo journalctl -u casa-website-form -n 30 --no-pager"
    exit 0
  fi
  sleep 1
done
echo "✘ Dịch vụ chưa trả lời. Xem lỗi bằng: sudo journalctl -u casa-website-form -n 30 --no-pager"
exit 1
