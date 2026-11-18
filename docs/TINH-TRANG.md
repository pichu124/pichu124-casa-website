# Tình trạng dự án và kế hoạch

Cập nhật 18/11/2026 (sau khi nhận phiếu đã điền, logo và ảnh trong thư mục Drive của trường). Tài liệu ngắn nhất để nắm dự án đang ở đâu. Chi tiết nằm ở các tài liệu được dẫn trong từng mục.

## Đang ở đâu

| Giai đoạn | Tình trạng | Ghi chú |
|---|---|---|
| 1. Kiểm kê site cũ | **Xong** | 226 URL cũ có đích mới (`docs/URL-CU.csv`) |
| 2. Cấu trúc, công nghệ, thiết kế | **Xong** (logo, màu, phông thật từ 18/11) | Astro, 15 trang × 2 thứ tiếng, `npm run check` 8 mục, rà mobile/UX/truy cập/SEO/hiệu năng (`docs/BAO-CAO-RA-SOAT.md`) |
| 3. Dựng nội dung | **Đang làm** | Đã áp dụng phiếu: địa chỉ, lớp và hệ từng cơ sở, giờ học, tuyển sinh 5 bước, an toàn, đội ngũ, Zalo, chính sách dữ liệu. Còn 64 chỗ `[CẦN]` trên 34 trang |
| 4. Form đăng ký tham quan | **Chưa làm, đủ thông tin để làm** | Hộp thư gửi: tuyensinh@cdb.edu.vn (phiếu câu 21); mật khẩu ứng dụng do người quản trị tự đặt trên máy |
| 5. Bản thử trên VPS | **Đang chạy** | `https://casa-website-thu.duckdns.org`, có mật khẩu, `noindex`. Chưa có form. Cập nhật bằng `deploy/cap-nhat-ban-thu.sh`; đổi mật khẩu bằng `deploy/doi-mat-khau.sh` (`docs/TRIEN-KHAI.md`) |
| 6. Chuyển tên miền chính | **Chưa làm** | Cần quyền DNS của `casadeibambini.edu.vn` và nội dung đã được chủ trường xác nhận |

## Cần trường phản hồi

Phiếu đã điền ngày 18/11/2026. Còn lại, xếp theo việc bị chặn:

| Ưu tiên | Thông tin | Câu trong phiếu | Chặn việc gì |
|---|---|---|---|
| 1 | Tên đơn vị (pháp nhân) ghi ở chân trang và trong Chính sách bảo vệ dữ liệu | 17 (trống) | Chân trang mọi trang; Chính sách dữ liệu (bắt buộc trước khi mở form) |
| 2 | Ban lãnh đạo và pháp lý duyệt thời hạn lưu dữ liệu 12 tháng (phiếu ghi "đề xuất") | 19 | Chính sách dữ liệu |
| 3 | Đồng ý bằng văn bản của phụ huynh cho 8 ảnh bìa (đều thấy rõ mặt bé); ảnh cơ sở vật chất, giáo viên theo từng cơ sở | 23 (trống) | Ảnh đầy đủ ở trang chủ, ảnh trang cơ sở. Hiện chỉ đăng 2 phần cắt không thấy mặt bé |
| 4 | Xác nhận tên hiển thị "Casa Preschool" đi cùng logo "Casa dei Bambini – Montessori Preschool"; chữ "Montessori Preschool" trên logo có hợp quy tắc định vị không | 3 | Giao diện chính thức (QUYET-DINH Q18) |
| 5 | Chương trình 3–6 tuổi ở ba cơ sở cũ có theo khung Cambridge Early Years không (hiện suy ra từ câu 16) | 10, 16 | Trang chủ, Mẫu giáo, trang cơ sở |
| 6 | Bản xuất WordPress; thông điệp và tên 7 giá trị cốt lõi | 22 (trống) | Trang Về Casa |
| 7 | Mô hình bếp từng cơ sở (có công bố "bếp trường tự nấu" không) | 12 | Một ngày ở Casa, FAQ |
| 8 | Ciputra: số nhà, tên tòa | 8 (chưa chốt) | Trang Ciputra, schema Ciputra |
| 9 | Số đăng ký mỗi tháng; tần suất đăng bài | 26, 27 (trống) | Đo lường, kế hoạch bài viết |
| 10 | Quyền quản lý DNS của `casadeibambini.edu.vn` | 28 (trống) | Chỉ Giai đoạn 6 |

Nội dung Marketing đề xuất trong bảng tính "CONTENT WEBSITE MỚI" (Learner profile, kết quả phát triển, Growing Up in Love, CASA LOVE…) đang ghi "chờ duyệt": chưa đưa lên site.

**Chủ trường xác nhận (không nằm trong phiếu):**
- Nội dung soạn sẵn trên Docs (trang Ciputra, FAQ, Bài 1) đúng sự thật: gom vào lượt xác nhận nội dung ở Giai đoạn 3.
- Toàn văn Chính sách bảo vệ dữ liệu: cần người có chuyên môn pháp lý rà soát.

## Kế hoạch tiếp theo

1. **Ngay bây giờ (không cần chờ trường):**
   - Người phụ trách dự án gửi link bản thử cho những người cần góp ý, kèm mật khẩu gửi riêng.
   - Cập nhật bản thử trên VPS bằng `deploy/cap-nhat-ban-thu.sh`.
2. **Giai đoạn 4, có thể bắt đầu khi người phụ trách dự án đồng ý:**
   - Dịch vụ nhận form: Node, `127.0.0.1:3100`, user riêng, systemd, gửi email, ghi tệp `/var/lib/casa-website/`, chống spam, lỗi tiếng Việt.
   - Đã có hộp thư gửi (phiếu câu 21).
3. **Khi trường trả lời các mục còn lại ở trên:**
   - Điền pháp nhân, thời hạn lưu dữ liệu; thay ảnh đầy đủ khi có đồng ý; thêm ảnh từng cơ sở.
   - Chạy `npm run check:truoc-khi-dang` tới khi 0 chỗ `[CẦN]`.
4. **Chủ trường xác nhận nội dung từng trang** trên bản thử.
5. **Giai đoạn 6, chuyển tên miền chính:**
   - Search Console, hạ TTL.
   - Thêm khối Caddy cho `casadeibambini.edu.vn` có `import deploy/redirects.caddy`.
   - Đổi bản ghi A, kiểm tra 226 URL cũ, theo dõi 4 tuần.
