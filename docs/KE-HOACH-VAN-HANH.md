# Kế hoạch đưa website vào vận hành (hai bước)

Lập 23/11/2026, theo yêu cầu của người phụ trách dự án (QUYET-DINH Q30).

- **Bước 1, ưu tiên:** website với **3 cơ sở đang tuyển sinh** (Kim Mã, Chùa Láng, Mỹ Đình) chạy chính thức trên VPS mới ở tên miền casadeibambini.edu.vn, kèm SEO tự động.
- **Bước 2, làm song song:** thêm cơ sở **Ciputra** và SEO cho Ciputra. Phần này chỉ chạy chính thức khi người phụ trách dự án báo.

Cách tách hai bước:

- Mọi nội dung Ciputra nằm sau công tắc `CIPUTRA_CONG_KHAI` trong `src/data/co-so.ts` (đang `false`).
- Khi tắt, `npm run check` (mục 11) báo đỏ nếu bất kỳ trang nào còn chữ "Ciputra", "Phú Thượng" hay "quý 4/2027".
- Bật Ciputra là đổi một dòng, có commit ghi ngày.

Ký hiệu người làm: **C** = Claude · **QT** = người quản trị VPS · **PT** = người phụ trách dự án · **CT** = chủ trường · **NT** = nhà trường.

---

## Bước 1: website 3 cơ sở

### 1A. Hoàn thiện website

| # | Việc | Ai | Tình trạng | Chặn ngày chuyển? |
|---|---|---|---|---|
| A1 | Công tắc Ciputra; bản 3 cơ sở không còn dấu vết Ciputra; `npm run check` canh tự động | C | **Xong 23/11** | — |
| A2 | Cập nhật bản thử sang bản 3 cơ sở; cài lại dịch vụ form (bản sửa kiểm tra số điện thoại 21/11) | QT | Chờ | Có |
| A3 | Bộ chuyển tên miền:<br>• khối Caddy cho `casadeibambini.edu.vn` và `www` (gắn bảng 301, bỏ mật khẩu và `noindex`, nối form `/api/`);<br>• kịch bản kiểm tra 226 URL cũ trả 301 đúng đích, chạy được trước ngày chuyển bằng cách trỏ thẳng vào IP VPS;<br>• kịch bản quay lui | C | Chưa làm | Có |
| A4 | Đo lại tốc độ (Lighthouse trên điện thoại) sau khi thêm ảnh và video; sửa nếu dưới 90 điểm | C | Chưa làm | Không (nên xong trước) |
| A5 | Chính sách bảo vệ dữ liệu: còn 3 chỗ `[CẦN]` (rà pháp lý toàn văn; duyệt thời hạn lưu 12 tháng; ngày hiệu lực). Form thu dữ liệu nên **không chạy chính thức khi chính sách chưa xong** | CT | Chờ (đã hoãn 19/11) | **Có** |
| A6 | Chủ trường xác nhận nội dung bản 3 cơ sở đúng sự thật (xem trên bản thử) | CT | Chờ | **Có** |
| A7 | Nhánh chính: gộp nhánh làm việc vào `main`; bản chính thức chỉ lấy mã từ `main` | PT xác nhận, C làm | Chưa làm | Có |

### 1B. Chuẩn bị chuyển tên miền

| # | Việc | Ai | Tình trạng | Ghi chú |
|---|---|---|---|---|
| B1 | Cài Search Console, xác minh tên miền bằng bản ghi TXT | PT | Chờ | Làm **ít nhất 1–2 tuần trước** ngày chuyển để có số liệu của site cũ mà so. Hướng dẫn: https://claude.ai/artifact/AK4KJ2JLwxMBXpDAAhHnh2 |
| B2 | Sao lưu đầy đủ WordPress và hosting cũ (nhờ Tadu nếu không vào được cPanel); giữ gói hosting thêm 1–2 tháng | PT | Chờ | Đường lui |
| B3 | Đổi mật khẩu xem bản thử, xoá mật khẩu khỏi bảng tính trên Drive | PT | Chờ | An toàn |
| B4 | Chọn ngày chuyển (tránh ngày đông phụ huynh hỏi, nên là thứ Ba hoặc thứ Tư buổi sáng) | CT | Chờ | TTL đã là 300 giây, không cần hạ thêm |

### 1C. Ngày chuyển (khoảng 1 giờ)

1. **QT** chạy kịch bản kiểm tra (A3) trỏ thẳng vào IP VPS. Mọi URL cũ phải đạt.
2. **QT** thêm khối Caddy của tên miền chính rồi nạp lại Caddy. App casa-mamnon không bị đụng tới.
3. **PT** (hoặc CT) vào ZoneDNS và chỉ đổi bản ghi `@` loại A từ `125.212.243.110` sang `103.195.238.114`.
   - `www` là CNAME nên tự theo.
   - MX và `mail` không đổi, nên email không ảnh hưởng.
4. Sau 5–10 phút, **QT** chạy lại kịch bản kiểm tra trên tên miền thật và gửi thử một đăng ký tham quan.
5. **PT** gửi `sitemap.xml` trên Search Console.
6. **Nếu hỏng:** đổi bản ghi A về `125.212.243.110`. Site cũ chạy lại sau khoảng 5 phút.

### 1D. Bốn tuần sau ngày chuyển

- **Hằng tuần:** xem Search Console (lỗi 404, số trang được lập chỉ mục). URL cũ nào lỗi thì C thêm vào bảng 301.
- **Hết 1–2 tháng ổn định:** huỷ gói hosting WordPress.

### 1E. SEO tự động cho 3 cơ sở

Nguyên tắc giữ đúng tài liệu SEO của Project Casa: agent soạn, agent khác kiểm, người duyệt, máy đăng (`docs/SEO-KE-HOACH.md`).

| # | Việc | Ai | Tình trạng |
|---|---|---|---|
| S1 | Chuyển bài viết sang dạng Markdown, mỗi bài một tệp. Có ô `ciputra: true` để bài về Ciputra tự ẩn khi công tắc tắt. Để agent soạn bài mà không phải sửa mã | C | Chưa làm. Nên làm ngay sau A3 |
| S2 | Lịch bài cho 3 cơ sở (bảng dưới) | C soạn, CT duyệt | Lịch đề xuất |
| S3 | Ba tác vụ tự chạy theo lịch. Mỗi tác vụ bật riêng, cần PT đồng ý (xem dưới) | C tạo khi PT đồng ý | Chờ |
| S4 | Hồ sơ Google Maps của 3 cơ sở:<br>• kiểm tra ai giữ quyền, gom về một tài khoản của trường;<br>• tên, địa chỉ, số điện thoại giống hệt website;<br>• ô website trỏ về đúng trang cơ sở (ví dụ `…/co-so/kim-ma/`) | NT | Chờ |
| S5 | Xin review từ phụ huynh hiện tại (mã QR ở cổng, tin nhắn Zalo nhóm lớp). Không tặng quà đổi review, không viết review hộ | NT | Chờ |

**Lịch bài cho 3 cơ sở** (mỗi tuần một bài, bắt đầu sau ngày chuyển tên miền). Lấy từ lịch của Project Casa, bỏ các bài chỉ nói về Ciputra:

| Thứ tự | Bài | Dẫn về |
|---|---|---|
| 1 | (Đã có) Cambridge Early Years là gì? Chờ quyết định về chữ Cambridge (V1) | `/chuong-trinh/mau-giao/` |
| 2 | 8 điều nên hỏi khi đi tham quan trường mầm non | `/tuyen-sinh/` |
| 3 | Bé 15 tháng đi nhà trẻ: dấu hiệu sẵn sàng và cách chuẩn bị | `/chuong-trinh/nha-tre/` |
| 4 | Song ngữ hay quốc tế: chọn hệ nào cho con? (Kim Mã có hệ song ngữ; Chùa Láng, Mỹ Đình có hệ quốc tế) | `/chuong-trinh/` |
| 5 | Chuẩn bị cho con vào lớp 1: lớp tiền tiểu học nên học gì | `/chuong-trinh/mau-giao/#tien-tieu-hoc` |
| 6 | Một ngày của bé ở trường mầm non: giờ giấc, 4 bữa ăn, giấc ngủ trưa | trang 3 cơ sở |
| 7 | Cho bé làm quen tiếng Anh từ mầm non | `/chuong-trinh/` |
| 8 | Nên chọn trường mầm non trước bao lâu? Mốc cho năm học 2027–2028 | `/tuyen-sinh/` |

**Ba tác vụ tự chạy:**

1. **Soạn bài, sáng thứ Ba.**
   - Một phiên mới soạn bài theo lịch trên một nhánh riêng, chạy `npm run check`.
   - Một agent kiểm duyệt riêng soát sự thật và cách gọi tên rồi ghi Đạt hoặc Trả về.
   - Kết quả báo về để PT duyệt. Không gì tự đăng trong 3 tháng đầu.
2. **Kiểm tra kỹ thuật, ngày 1 hằng tháng.**
   - Soát liên kết hỏng, schema, tốc độ, nút đăng ký; xác nhận app vẫn chặn lập chỉ mục. Chỉ đọc, không sửa.
   - Cần cho phép tên miền `casadeibambini.edu.vn` trong cài đặt mạng của môi trường. C sẽ đề nghị khi bật.
3. **Báo cáo, thứ Hai.**
   - Đọc số liệu Search Console mà PT bấm "Xuất → Google Sheets" mỗi tuần (khoảng 1 phút); hiện chưa có kết nối thẳng tới Search Console.
   - Kèm số đăng ký tham quan do QT đếm bằng lệnh ở `docs/SEO-KE-HOACH.md`, mục 5.
   - Viết báo cáo một trang theo mẫu ở mục đó.

**Cách đăng bài lên site:**

- PT gộp nhánh bài vào `main`. Việc gộp chính là bước duyệt.
- QT chạy một lệnh cập nhật.
- Muốn bỏ hẳn bước QT (máy tự lấy `main` mỗi đêm) thì cần CT đồng ý vì đó là triển khai lên máy chủ. Nên để sau 3 tháng.

---

## Bước 2: Ciputra (làm song song, chạy khi PT báo)

| # | Việc | Ai | Tình trạng |
|---|---|---|---|
| C1 | Giữ nội dung Ciputra trong repo luôn đúng Casa facts. Mỗi lần sửa chạy cả `npm run check` và `npm run check:ciputra` | C | Đang áp dụng |
| C2 | Xem trước bản có Ciputra trên bản thử: `CASA_CIPUTRA=1` (thay tạm bản thử 3 cơ sở). Nếu cần xem song song hai bản, thêm một tên miền phụ thứ hai | QT | Khi CT cần duyệt |
| C3 | Ảnh phối cảnh hoặc mặt tiền; số nhà; tên tòa và tên trên biển hiệu; tên hiển thị (ví dụ "Casa Preschool Ciputra") | NT | Chờ |
| C4 | Cách gọi tên Cambridge (sau khi hỏi văn phòng Cambridge Việt Nam); câu về nhận bé từ 12 tháng; học phí hay giữ "liên hệ để nhận biểu phí"; thời điểm công bố đội ngũ chuyển sang; quyết định thành lập | CT | Chờ |
| C5 | Gói SEO Ciputra soạn sẵn, nằm ẩn sau công tắc:<br>• các bài "8 điều nên hỏi khi tham quan quanh Ciputra", "Lớp trộn tuổi là gì", "Một ngày ở trường bán trú Ciputra", "Cập nhật cơ sở Ciputra", "Hỏi đáp tuyển sinh Ciputra";<br>• schema `Preschool` khi có địa chỉ đầy đủ;<br>• nội dung hồ sơ Google Maps | C | Sau S1 |
| C6 | Hồ sơ Google Maps mới cho Ciputra, xác minh khi đã có biển hiệu, cùng tài khoản với 3 hồ sơ cũ | NT | Khi có biển hiệu |

**Ngày PT báo bật Ciputra:**

1. C đổi `CIPUTRA_CONG_KHAI` thành `true`, chạy kiểm tra, gửi PT gộp vào `main`.
2. QT chạy lệnh cập nhật.
3. PT gửi lại sitemap trên Search Console.
4. Tác vụ soạn bài thêm các bài Ciputra vào lịch.

---

## Thứ tự làm đề xuất

1. **Tuần này:**
   - C làm A3 (bộ chuyển tên miền) và S1 (bài viết dạng Markdown);
   - QT làm A2;
   - PT làm B1 (Search Console) và B3.
2. **Khi bản thử 3 cơ sở đã cập nhật:** CT xem và xác nhận nội dung (A6), chốt chính sách dữ liệu (A5).
3. **Song song:** C đo tốc độ (A4); NT làm hồ sơ Google Maps (S4, S5).
4. **Khi A5, A6, B1 xong:** CT chọn ngày chuyển (B4), làm theo 1C.
5. **Tuần đầu sau chuyển:** bật lần lượt ba tác vụ tự chạy (S3).
6. **Bước 2:** chạy nền suốt quá trình; bật khi PT báo.

Đường găng của Bước 1 là **A5 (chính sách dữ liệu) và A6 (xác nhận nội dung)**. Phần việc của C có thể xong trong vài ngày.
