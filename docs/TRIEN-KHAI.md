# Triển khai bản thử lên VPS (Giai đoạn 5)

Lập ngày 15/11/2026, theo tình trạng máy `casamamon` do người phụ trách dự án kiểm tra cùng ngày:
- Ubuntu 24.04.5, Node.js v22.23.5.
- **Caddy 2.11.9** giữ cổng 80/443. Caddyfile chỉ có một khối cho app (`casa-school.duckdns.org`), không có `import`.
- App casa-mamnon chạy ở `127.0.0.1:3000` (dịch vụ `casa-mamnon.service`).
- Không có nginx, không có certbot. Tường lửa ufw mở cổng 22, 80, 443.

**Trạng thái:** bản thử đã chạy từ 15/11/2026 tại `https://casa-website-thu.duckdns.org` (bản `releases/20261115-171851`). Đã kiểm: không mật khẩu → 401; có mật khẩu → 200 kèm `x-robots-tag: noindex, nofollow`; app `casa-school.duckdns.org` vẫn trả 200.

**Vì vậy dùng Caddy, không cài nginx** (QUYET-DINH Q16). Cài nginx sẽ tranh cổng 80/443 với Caddy và làm app ngừng chạy.

## Trước khi chạy bất kỳ lệnh nào

- [x] **Chủ trường đã đồng ý** đưa bản thử lên VPS (người phụ trách dự án xác nhận ngày 15/11/2026; `CLAUDE.md`: triển khai phải được chủ trường xác nhận).
- [x] **Tên miền bản thử:** `casa-website-thu.duckdns.org` (DuckDNS, người phụ trách dự án chọn ngày 15/11/2026).
- [x] **Tạo tên này trên DuckDNS:** đăng nhập duckdns.org (cùng tài khoản đang dùng cho app), thêm tên miền phụ `casa-website-thu`, điền IP của VPS vào ô *current ip* rồi bấm *update ip*.
- [x] **Tên miền đã trỏ đúng** (15/11/2026: `103.195.238.114`, cùng IP với app). Từ máy bất kỳ chạy `nslookup casa-website-thu.duckdns.org`; kết quả phải ra IP của VPS (giống IP của `casa-school.duckdns.org`). Nếu chưa, Caddy không cấp được HTTPS.
- [ ] Người chạy lệnh đăng nhập bằng user **casa** (có `sudo`).

Chạy lần lượt từng khối. Khối nào báo lỗi thì dừng lại, gửi nguyên thông báo lỗi cho người phụ trách dự án. **Không gửi mật khẩu vào chat.**

## Bước 1. Tạo user và thư mục riêng cho website

Website có user riêng `casa-website`, tách hẳn khỏi user và thư mục của app.

```bash
sudo adduser --system --group --home /opt/casa-website --shell /usr/sbin/nologin casa-website
```

```bash
sudo mkdir -p /var/www/casa-website/releases && sudo chown -R casa-website:casa-website /var/www/casa-website && sudo chmod 755 /var/www/casa-website
```

Kiểm tra user mới có dùng được Node.js không. Kết quả phải ra `v22...`:

```bash
sudo -H -u casa-website node -v
```

Nếu báo "command not found" thì Node.js đang được cài riêng cho user casa. Khi đó dừng lại, báo người phụ trách dự án.

## Bước 2. Cho VPS lấy mã nguồn từ GitHub (khoá chỉ đọc)

Repo là repo riêng tư. VPS dùng một **khoá triển khai chỉ đọc**, chỉ mở được đúng repo này.

```bash
sudo -H -u casa-website mkdir -p /opt/casa-website/.ssh && sudo -H -u casa-website ssh-keygen -t ed25519 -N "" -C "casa-website@casamamon" -f /opt/casa-website/.ssh/id_ed25519
```

```bash
sudo cat /opt/casa-website/.ssh/id_ed25519.pub
```

Chép dòng vừa in ra (bắt đầu bằng `ssh-ed25519`). Đây là khoá **công khai**, chép được. Sau đó:
1. Mở GitHub, vào repo `pichu124/pichu124-casa-website` → **Settings** → **Deploy keys** → **Add deploy key**.
2. Title: `casamamon (bản thử)`. Dán khoá vào ô Key.
3. **Không** tích "Allow write access". Bấm **Add key**.

Lấy mã về:

```bash
sudo -H -u casa-website bash -c 'ssh-keyscan github.com >> /opt/casa-website/.ssh/known_hosts && git clone --branch claude/hopeful-hopper-ahu1by git@github.com:pichu124/pichu124-casa-website.git /opt/casa-website/src'
```

## Bước 3. Build và phát hành lần đầu

Lệnh dưới lấy mã mới, chạy `npm run check` (build + kiểm tra), chép bản build vào `releases/<ngày-giờ>` rồi trỏ `current` sang bản đó. Kiểm tra không đạt thì không phát hành.

```bash
sudo -H -u casa-website /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
```

Lần đầu mất vài phút vì phải cài thư viện. Kết thúc đúng sẽ thấy dòng `✔ Đã phát hành`.

## Bước 4. Đặt mật khẩu xem bản thử

```bash
caddy hash-password
```

Máy hỏi mật khẩu hai lần (gõ không hiện chữ). Kết quả là một chuỗi bắt đầu bằng `$2a$`. Đó là **mã băm**, không phải mật khẩu, dùng ở bước 5. Mật khẩu gốc thì gửi cho người duyệt qua Zalo hoặc điện thoại, không ghi vào repo hay chat với Claude.

Tên đăng nhập khi xem là `xem`.

## Bước 5. Thêm website vào Caddy (không đụng khối của app)

Sao lưu Caddyfile hiện tại:

```bash
sudo cp -a /etc/caddy/Caddyfile /etc/caddy/Caddyfile.truoc-casa-website
```

Chép tệp cấu hình của site vào thư mục riêng:

```bash
sudo mkdir -p /etc/caddy/sites && sudo cp /opt/casa-website/src/deploy/casa-website.caddy /etc/caddy/sites/casa-website.caddy
```

Mở tệp để thay **một chỗ**: `MA_BAM_MAT_KHAU` thành chuỗi `$2a$...` ở bước 4 (tên miền đã điền sẵn):

```bash
sudo nano /etc/caddy/sites/casa-website.caddy
```

Lưu bằng Ctrl+O, Enter; thoát bằng Ctrl+X.

Thêm **một dòng** vào cuối Caddyfile để Caddy đọc thêm thư mục `sites`. Khối của app giữ nguyên:

```bash
echo 'import /etc/caddy/sites/*.caddy' | sudo tee -a /etc/caddy/Caddyfile
```

**Kiểm tra cấu hình trước khi nạp.** Phải thấy `Valid configuration`; nếu báo lỗi thì dừng, không nạp lại:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
```

Nạp lại Caddy. Lệnh này không làm gián đoạn app; cấu hình sai thì Caddy từ chối và giữ cấu hình cũ:

```bash
sudo systemctl reload caddy
```

## Bước 6. Kiểm tra

Không có mật khẩu thì phải bị chặn (mã `401`):

```bash
curl -sI https://casa-website-thu.duckdns.org/ | head -1
```

Có mật khẩu thì vào được (mã `200`) và có dòng `x-robots-tag: noindex, nofollow`. Lệnh sẽ hỏi mật khẩu:

```bash
curl -sI -u xem https://casa-website-thu.duckdns.org/ | grep -iE '^HTTP|x-robots-tag'
```

**App vẫn chạy bình thường** (mã `200`, `301` hoặc `302`):

```bash
curl -sI https://casa-school.duckdns.org/ | head -1
```

Mở `https://casa-website-thu.duckdns.org/` trên điện thoại, đăng nhập `xem` và mật khẩu, thử vài trang và trang tiếng Anh.

## Cập nhật khi có bản mới

Mỗi khi Claude đẩy thay đổi lên nhánh, người quản trị chạy lại đúng một lệnh:

```bash
sudo -H -u casa-website /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
```

Không cần nạp lại Caddy khi chỉ cập nhật nội dung.

## Quay lui

Xem các bản đang có (mới nhất ở cuối):

```bash
ls -1 /var/www/casa-website/releases/
```

Trỏ `current` về bản trước, thay `<NGÀY-GIỜ>` bằng tên bản muốn dùng:

```bash
sudo -H -u casa-website ln -sfn releases/<NGÀY-GIỜ> /var/www/casa-website/current
```

Nếu cấu hình Caddy gây lỗi: chép lại bản sao lưu, kiểm tra, nạp lại:

```bash
sudo cp -a /etc/caddy/Caddyfile.truoc-casa-website /etc/caddy/Caddyfile && sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile && sudo systemctl reload caddy
```

## Ghi chú

- Bản thử chưa có dịch vụ nhận form (Giai đoạn 4): form hiện dòng đánh dấu `[CẦN]` và gửi sẽ báo lỗi. Khi Giai đoạn 4 xong, bỏ dấu `#` trước dòng `reverse_proxy /api/* 127.0.0.1:3100` trong tệp Caddy của site.
- Các bản cũ trong `releases/` không tự xoá. Muốn dọn thì hỏi người phụ trách dự án trước (`CLAUDE.md`: xoá trên máy chủ phải được xác nhận).
- Chuyển hướng URL cũ (`deploy/redirects.caddy`) chỉ dùng ở Giai đoạn 6, trong khối của tên miền chính, không dùng cho bản thử.
