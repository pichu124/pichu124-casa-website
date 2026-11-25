#!/usr/bin/env bash
# Cập nhật website trên VPS: lấy mã mới, chạy npm run check (build + kiểm tra),
# chép bản build vào releases/<ngày-giờ>, rồi trỏ liên kết sang bản mới:
#   - "current"   : tên miền chính đọc thư mục này (sau Giai đoạn 6)
#   - "xem-truoc" : bản thử đọc thư mục này
# Mặc định trỏ cả hai. Bản xem trước có Ciputra (CASA_CIPUTRA=1) CHỈ trỏ "xem-truoc",
# để tên miền chính không bao giờ hiện Ciputra trước ngày người phụ trách dự án báo.
# Chạy bằng user casa-website:
#   sudo -H -u casa-website /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
# Xem trước bản có cơ sở Ciputra (chỉ trên bản thử):
#   sudo -H -u casa-website env CASA_CIPUTRA=1 /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
# Không xoá bản cũ nào; quay lui xem docs/TRIEN-KHAI.md, mục "Quay lui".
set -euo pipefail

# Bản chính thức chỉ lấy mã từ main (A7, 25/11/2026).
NHANH="${NHANH:-main}"
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
tro() { ln -sfn "releases/${BAN}" "${GOC_WEB}/$1.moi"; mv -T "${GOC_WEB}/$1.moi" "${GOC_WEB}/$1"; }
tro xem-truoc
if [ "${CASA_CIPUTRA:-}" = "1" ]; then
  echo "✔ Bản xem trước có Ciputra: ${GOC_WEB}/xem-truoc → releases/${BAN}"
  echo "  Tên miền chính (current) giữ nguyên: $(readlink "${GOC_WEB}/current" 2>/dev/null || echo 'chưa có')"
  echo "  Xem xong, chạy lại lệnh này không có CASA_CIPUTRA=1 để bản thử về bản 3 cơ sở."
else
  tro current
  echo "✔ Đã phát hành: current và xem-truoc → releases/${BAN}"
fi
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
