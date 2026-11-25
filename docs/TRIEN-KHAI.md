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
sudo -H -u casa-website bash -c 'ssh-keyscan github.com >> /opt/casa-website/.ssh/known_hosts && git clone --branch main git@github.com:pichu124/pichu124-casa-website.git /opt/casa-website/src'
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

Chép bảng chuyển hướng URL cũ vào thư mục riêng (khối của site nạp tệp này; **không** đặt trong `/etc/caddy/sites/`, vì Caddyfile nạp mọi tệp `.caddy` ở đó như một site):

```bash
sudo install -D -m 644 /opt/casa-website/src/deploy/redirects.caddy /etc/caddy/casa-website/redirects.caddy
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

Không cần nạp lại Caddy khi chỉ cập nhật nội dung. Lệnh này cập nhật cả bản thử (`xem-truoc`) lẫn tên miền chính (`current`).

**Từ 25/11/2026 site lấy mã từ nhánh `main`** (A7). Máy chủ đang giữ bản kịch bản cũ, mặc định lấy nhánh làm việc, nên **lần cập nhật đầu tiên sau ngày này** chạy kèm `NHANH=main`:

```bash
sudo -H -u casa-website env NHANH=main /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
```

Từ lần sau chạy lệnh thường như trên. Claude chỉ gộp vào `main` khi người phụ trách dự án xác nhận; thay đổi chưa gộp chỉ nằm ở nhánh làm việc và không lên site.

Khi tệp mẫu Caddy hoặc bảng chuyển hướng (`deploy/redirects.caddy`) thay đổi, chạy thêm:

```bash
sudo bash /opt/casa-website/src/deploy/cap-nhat-caddy.sh
```

**Xem trước bản có cơ sở Ciputra** (chỉ trên bản thử; tên miền chính không đổi):

```bash
sudo -H -u casa-website env CASA_CIPUTRA=1 /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
```

Xem xong, chạy lại lệnh cập nhật thường (không có `CASA_CIPUTRA=1`) để bản thử về bản 3 cơ sở.

## Đổi mật khẩu xem

Chỉ cần gõ mật khẩu mới hai lần; kịch bản tự tạo mã băm, thay vào tệp cấu hình, kiểm tra và nạp lại Caddy. Cấu hình lỗi thì tự khôi phục, mật khẩu cũ vẫn dùng được.

```bash
sudo bash /opt/casa-website/src/deploy/doi-mat-khau.sh
```

Mật khẩu tối thiểu 8 ký tự. Gửi mật khẩu mới cho người duyệt qua Zalo hoặc điện thoại.

## Quay lui

Xem các bản đang có (mới nhất ở cuối):

```bash
ls -1 /var/www/casa-website/releases/
```

Trỏ về bản trước, thay `<NGÀY-GIỜ>` bằng tên bản muốn dùng. `current` là tên miền chính, `xem-truoc` là bản thử:

```bash
sudo -H -u casa-website ln -sfn releases/<NGÀY-GIỜ> /var/www/casa-website/current
```

```bash
sudo -H -u casa-website ln -sfn releases/<NGÀY-GIỜ> /var/www/casa-website/xem-truoc
```

Nếu cấu hình Caddy gây lỗi: chép lại bản sao lưu, kiểm tra, nạp lại:

```bash
sudo cp -a /etc/caddy/Caddyfile.truoc-casa-website /etc/caddy/Caddyfile && sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile && sudo systemctl reload caddy
```

## Dịch vụ nhận form đăng ký tham quan (Giai đoạn 4)

**Trạng thái:** đã cài trên VPS và gửi thử thành công ngày 20/11/2026 (Node v22.23.5 ở `/usr/bin/node`; Caddy đã bật `reverse_proxy /api/*`).

Form trên site gửi tới `/api/dang-ky`. Caddy chuyển yêu cầu đó tới một dịch vụ Node nhỏ chỉ nghe ở `127.0.0.1:3100`. Dịch vụ kiểm tra dữ liệu, gửi email về `tuyensinh@cdb.edu.vn` qua máy chủ gửi thư của Google, ghi thêm một dòng vào `/var/lib/casa-website/dang-ky.jsonl`, rồi đưa phụ huynh sang trang Cảm ơn.

| Thành phần | Ở đâu trên VPS | Ai sửa được |
|---|---|---|
| Mã dịch vụ | `/opt/casa-website-form` (chép từ `form/` trong repo) | Chỉ root |
| Cấu hình, mật khẩu ứng dụng | `/etc/casa-website/form.env` | Chỉ root; user `casa-form` chỉ đọc |
| Dữ liệu đăng ký | `/var/lib/casa-website/dang-ky.jsonl` | Chỉ user `casa-form` |
| Dịch vụ chạy nền | `casa-website-form.service` (user `casa-form`) | systemd |
| Xoá đăng ký quá 12 tháng | `casa-website-form-don.timer`, 2h30 sáng mỗi ngày | systemd |

Dịch vụ không dùng thư viện ngoài, không đọc hay ghi gì của app casa-mamnon.

### Bước F1. Lấy mã mới về VPS

```bash
sudo -H -u casa-website /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
```

### Bước F2. Tạo mật khẩu ứng dụng Google (chủ tài khoản tuyensinh@cdb.edu.vn tự làm)

Mật khẩu ứng dụng là một mật khẩu riêng 16 ký tự, chỉ dùng cho website gửi thư; không phải mật khẩu đăng nhập Gmail. Không gửi mật khẩu này qua chat hay email.

1. Đăng nhập Google bằng `tuyensinh@cdb.edu.vn`.
2. Bật **Xác minh 2 bước** nếu chưa bật: [myaccount.google.com/security](https://myaccount.google.com/security).
3. Mở [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), đặt tên `Website Casa`, bấm **Tạo**. Google hiện 16 ký tự.
4. Nếu trang báo không dùng được mật khẩu ứng dụng: người quản trị Google Workspace của trường cần cho phép xác minh 2 bước (Bảng quản trị → Bảo mật → Xác thực → Xác minh 2 bước).

### Bước F3. Cài dịch vụ

```bash
sudo bash /opt/casa-website/src/deploy/cai-dich-vu-form.sh
```

Lần đầu, kịch bản tạo user `casa-form`, tạo tệp cấu hình từ mẫu rồi dừng lại, báo chưa có mật khẩu ứng dụng. Mở tệp cấu hình:

```bash
sudo nano /etc/casa-website/form.env
```

Thay `DIEN_MAT_KHAU_UNG_DUNG` bằng 16 ký tự vừa tạo (viết liền, không dấu cách). Lưu bằng Ctrl+O, Enter, thoát bằng Ctrl+X. Rồi chạy lại kịch bản cài:

```bash
sudo bash /opt/casa-website/src/deploy/cai-dich-vu-form.sh
```

Kết quả đúng: dòng `✔ Dịch vụ form đang chạy ở 127.0.0.1:3100.`

### Bước F4. Cho Caddy chuyển form tới dịch vụ

Kịch bản dưới áp dụng tệp mẫu `deploy/casa-website.caddy` mới (thêm `reverse_proxy /api/*` và trang báo lỗi khi dịch vụ dừng), giữ nguyên tên miền và mật khẩu xem đang dùng. Cấu hình sai thì tự khôi phục bản cũ.

```bash
sudo bash /opt/casa-website/src/deploy/cap-nhat-caddy.sh
```

### Bước F5. Gửi thử

Gửi thử thẳng tới dịch vụ trên VPS. Kết quả đúng: `303 /tuyen-sinh/cam-on/`, và vài giây sau hộp thư `tuyensinh@cdb.edu.vn` nhận được thư "[Website] Đăng ký tham quan: Thử nghiệm website – Kim Mã".

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" --data-urlencode "ten_phu_huynh=Thử nghiệm website" -d "ngon_ngu=vi&so_dien_thoai=0900000000&thang_sinh=5&nam_sinh=2023&co_so=kim-ma&dong_y=co" http://127.0.0.1:3100/api/dang-ky
```

Sau đó mở bản thử trên điện thoại, điền form ở trang Tuyển sinh, kiểm tra trang Cảm ơn hiện ra và thư về đúng hộp thư.

### Xem đăng ký và nhật ký

Danh sách đăng ký đã lưu (mỗi dòng một đăng ký):

```bash
sudo cat /var/lib/casa-website/dang-ky.jsonl
```

Nhật ký dịch vụ (không ghi tên hay số điện thoại phụ huynh):

```bash
sudo journalctl -u casa-website-form -n 30 --no-pager
```

### Khi có lỗi

| Dấu hiệu | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Nhật ký có `từ chối ở bước mật khẩu: 535` | Mật khẩu ứng dụng sai, hoặc chưa bật xác minh 2 bước | Tạo mật khẩu ứng dụng mới (Bước F2), sửa `form.env`, chạy lại kịch bản cài |
| Phụ huynh thấy trang "Hệ thống đang gặp sự cố" kèm hotline | Gửi email lỗi. Đăng ký vẫn được lưu, đánh dấu `"email":"loi"` | Xem nhật ký; gọi lại phụ huynh theo dòng đó trong tệp dữ liệu |
| Phụ huynh thấy chữ "Hệ thống nhận đăng ký đang tạm dừng…" | Dịch vụ không chạy | `sudo systemctl status casa-website-form`, rồi chạy lại kịch bản cài |
| Lệnh cập nhật bản thử báo "Mã dịch vụ form đã thay đổi" | Có bản dịch vụ mới | Chạy lại `sudo bash /opt/casa-website/src/deploy/cai-dich-vu-form.sh` |

Tạm dừng nhận form (site vẫn chạy, form sẽ báo gọi hotline):

```bash
sudo systemctl stop casa-website-form
```

### Trước khi mở form cho phụ huynh thật

Bản thử có mật khẩu nên chỉ người được mời mới gửi được. Trước ngày chuyển tên miền chính, Chính sách bảo vệ dữ liệu phải được duyệt (thời hạn lưu 12 tháng, rà soát pháp lý), và `npm run check:truoc-khi-dang` phải không còn chỗ `[CẦN]`.

## Bản ghi DNS của casadeibambini.edu.vn (kiểm tra 19/11/2026)

DNS quản lý tại ZoneDNS.vn (người phụ trách dự án có tài khoản). Tám bản ghi đang có:

| Host | Loại | Giá trị | TTL | Dùng cho | Ngày chuyển tên miền |
|---|---|---|---|---|---|
| `@` | A | `125.212.243.110` | 300 | Site WordPress cũ | **Đổi** sang `103.195.238.114` (chủ trường làm) |
| `www` | CNAME | `casadeibambini.edu.vn.` | 300 | `www` đi theo tên miền gốc | Giữ nguyên (tự đi theo bản ghi `@`) |
| `mail` | CNAME | `ghs.googlehosted.com.` | 3600 | Đường dẫn vào Gmail của Google Workspace | Giữ nguyên |
| `@` | MX ×5 | `ASPMX.L.GOOGLE.COM.` và 4 máy dự phòng `ALT1–4` | 3600 | Nhận email `@casadeibambini.edu.vn` qua Google | **Không động vào** |

- TTL của bản ghi `@` đã là 300 giây, nên bước "hạ TTL trước 24 giờ" của Giai đoạn 6 không cần làm.
- Chưa có bản ghi TXT nào: chưa có mã xác minh Search Console, chưa có SPF/DKIM/DMARC cho email của tên miền này.
- Tên miền phụ cho bản thử: thêm bản ghi `A` host `moi` → `103.195.238.114`, rồi thêm `moi.casadeibambini.edu.vn` vào dòng đầu khối trong `/etc/caddy/sites/casa-website.caddy`.

## Ghi chú

- Bản thử chưa có dịch vụ nhận form (Giai đoạn 4): form hiện dòng đánh dấu `[CẦN]` và gửi sẽ báo lỗi. Khi Giai đoạn 4 xong, bỏ dấu `#` trước dòng `reverse_proxy /api/* 127.0.0.1:3100` trong tệp Caddy của site.
- Các bản cũ trong `releases/` không tự xoá. Muốn dọn thì hỏi người phụ trách dự án trước (`CLAUDE.md`: xoá trên máy chủ phải được xác nhận).
- Bảng chuyển hướng URL cũ (`deploy/redirects.caddy`) nằm ở `/etc/caddy/casa-website/redirects.caddy`, được cả khối bản thử và khối tên miền chính nạp. Bật trên bản thử để kiểm đủ URL cũ trước ngày chuyển (từ 23/11/2026).
- Bản thử đọc `/var/www/casa-website/xem-truoc`, tên miền chính đọc `/var/www/casa-website/current` (từ 23/11/2026, QUYET-DINH Q31).

## Giai đoạn 6: chuyển tên miền chính

Chỉ làm khi chủ trường đã duyệt Chính sách dữ liệu, xác nhận nội dung và chọn ngày (kế hoạch: `docs/KE-HOACH-VAN-HANH.md`). Cả buổi khoảng 1 giờ.

### Trước ngày chuyển (làm sớm, bao nhiêu lần cũng được)

1. Cập nhật website và cấu hình Caddy (lần đầu sau 23/11/2026 là bắt buộc, để bản thử nạp bảng chuyển hướng):

```bash
sudo -H -u casa-website /opt/casa-website/src/deploy/cap-nhat-ban-thu.sh
```

```bash
sudo bash /opt/casa-website/src/deploy/cap-nhat-caddy.sh
```

2. Kiểm tra toàn bộ URL cũ trên bản thử. Kịch bản chạy bằng user `casa-website` (chỉ user này đọc được `/opt/casa-website`). Mật khẩu xem gõ vào không hiện ra, không được lưu và không ghi vào nhật ký của sudo:

```bash
read -rsp "Mật khẩu xem bản thử: " CASA_MK; echo; export CASA_MK
```

```bash
sudo --preserve-env=CASA_MK -H -u casa-website node /opt/casa-website/src/scripts/kiem-tra-chuyen-huong.mjs https://casa-website-thu.duckdns.org; unset CASA_MK
```

Phải thấy `✔ Đạt: 451 đường dẫn đúng…`. Có dòng `✘` thì gửi cả kết quả cho Claude, chưa chuyển.

### Ngày chuyển

1. **Đổi DNS** (người có tài khoản ZoneDNS): bản ghi `@` loại A, từ `125.212.243.110` thành `103.195.238.114`. Không sửa bản ghi nào khác; MX giữ nguyên nên email không ảnh hưởng.
2. **Chờ 5–10 phút**, rồi bật khối Caddy của tên miền chính. Kịch bản tự kiểm tra DNS đã trỏ về VPS chưa (chưa thì từ chối, chưa đổi gì), kiểm tra cấu hình, nạp lại Caddy và chờ HTTPS:

```bash
sudo bash /opt/casa-website/src/deploy/bat-ten-mien-chinh.sh
```

3. **Kiểm tra toàn bộ URL cũ trên tên miền thật** (không cần mật khẩu). Ngoài bảng chuyển hướng, kịch bản còn kiểm `www` → tên miền gốc, `http` → `https`, không còn `noindex`, `robots.txt` không chặn:

```bash
sudo -H -u casa-website node /opt/casa-website/src/scripts/kiem-tra-chuyen-huong.mjs https://casadeibambini.edu.vn --chinh
```

4. Mở `https://casadeibambini.edu.vn` trên điện thoại, gửi thử một đăng ký tham quan; mở app `app.casadeibambini.edu.vn` xem vẫn chạy bình thường.
5. Người phụ trách dự án gửi `https://casadeibambini.edu.vn/sitemap.xml` trên Search Console.

Từ khi DNS đổi tới khi bước 2 xong (vài phút), một số người mở site có thể gặp lỗi HTTPS. Caddy chỉ xin được chứng chỉ khi DNS đã trỏ về VPS, nên không làm bước 2 trước bước 1.

### Quay lui

Gỡ khối tên miền chính (bản thử và app không bị ảnh hưởng):

```bash
sudo bash /opt/casa-website/src/deploy/bat-ten-mien-chinh.sh --tat
```

Rồi đổi bản ghi A `@` về `125.212.243.110`. Site WordPress cũ chạy lại sau khoảng 5 phút (TTL 300 giây).

