#!/usr/bin/env bash
# Cập nhật bản thử trên VPS: lấy mã mới, chạy npm run check (build + kiểm tra),
# chép bản build vào releases/<ngày-giờ>, rồi trỏ liên kết "current" sang bản mới.
# Chạy bằng user casa-website:
#   sudo -H -u casa-website /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
# Xem trước bản có cơ sở Ciputra (chỉ trên bản thử):
#   sudo -H -u casa-website env CASA_CIPUTRA=1 /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
# Không xoá bản cũ nào; quay lui xem docs/TRIEN-KHAI.md, mục "Quay lui".
set -euo pipefail

NHANH="${NHANH:-claude/hopeful-hopper-ahu1by}"
MA_NGUON="${MA_NGUON:-/opt/casa-website/src}"
GOC_WEB="${GOC_WEB:-/var/www/casa-website}"
BAN="$(date +%Y%m%d-%H%M%S)"

echo "▶ Lấy mã nhánh ${NHANH}"
cd "$MA_NGUON"
git fetch --prune origin
git checkout -q "$NHANH"
git reset -q --hard "origin/${NHANH}"
echo "  commit: $(git log -1 --format='%h %s')"

echo "▶ Cài thư viện"
npm ci --no-audit --no-fund

if [ "${CASA_CIPUTRA:-}" = "1" ]; then
  echo "▶ Chế độ XEM TRƯỚC CÓ CIPUTRA (CASA_CIPUTRA=1): chỉ dùng cho bản thử, không dùng cho tên miền chính"
else
  echo "▶ Chế độ theo công tắc trong src/data/co-so.ts (mặc định: 3 cơ sở, chưa có Ciputra)"
fi

echo "▶ Build và kiểm tra (npm run check)"
if ! npm run check; then
  echo "✘ Kiểm tra không đạt: KHÔNG phát hành. Bản đang chạy giữ nguyên."
  exit 1
fi

echo "▶ Phát hành ${BAN}"
mkdir -p "${GOC_WEB}/releases/${BAN}"
cp -a dist/. "${GOC_WEB}/releases/${BAN}/"
echo "$(git log -1 --format='%H')" > "${GOC_WEB}/releases/${BAN}/.commit"
ln -sfn "releases/${BAN}" "${GOC_WEB}/current.moi"
mv -T "${GOC_WEB}/current.moi" "${GOC_WEB}/current"

echo "✔ Đã phát hành: ${GOC_WEB}/current → releases/${BAN}"
echo "  Các bản có trên máy:"
ls -1 "${GOC_WEB}/releases" | tail -n 5

# Dịch vụ form chạy từ bản chép riêng (/opt/casa-website-form, chỉ root sửa được).
# Mã mới chỉ có hiệu lực sau khi chạy kịch bản cài bằng sudo.
if [ ! -d /opt/casa-website-form ]; then
  echo "ℹ Dịch vụ form chưa cài. Xem docs/TRIEN-KHAI.md, mục \"Dịch vụ nhận form\"."
elif ! diff -rq "$MA_NGUON/form/src" /opt/casa-website-form/src >/dev/null 2>&1 \
  || ! diff -rq "$MA_NGUON/form/scripts" /opt/casa-website-form/scripts >/dev/null 2>&1; then
  echo "⚠ Mã dịch vụ form đã thay đổi. Chạy thêm (bằng user có sudo):"
  echo "    sudo bash $MA_NGUON/deploy/cai-dich-vu-form.sh"
fi
