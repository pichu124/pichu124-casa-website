# Tình trạng dự án và kế hoạch

Cập nhật 15/11/2026. Tài liệu ngắn nhất để nắm dự án đang ở đâu. Chi tiết nằm ở các tài liệu được dẫn trong từng mục.

## Đang ở đâu

| Giai đoạn | Tình trạng | Ghi chú |
|---|---|---|
| 1. Kiểm kê site cũ | **Xong** | 226 URL cũ có đích mới (`docs/URL-CU.csv`) |
| 2. Cấu trúc, công nghệ, thiết kế | **Xong** (màu tạm) | Astro, 15 trang × 2 thứ tiếng, `npm run check` 8 mục, rà mobile/UX/truy cập/SEO/hiệu năng (`docs/BAO-CAO-RA-SOAT.md`) |
| 3. Dựng nội dung | **Chờ trường** | 288 chỗ `[CẦN]` trên site, gốc thật khoảng 15 thông tin trong phiếu |
| 4. Form đăng ký tham quan | **Chưa làm, làm được ngay** | Chỉ cần địa chỉ hộp thư gửi (phiếu câu 21); mật khẩu ứng dụng do người quản trị tự đặt trên máy |
| 5. Bản thử trên VPS | **Đang chạy** | `https://casa-website-thu.duckdns.org`, có mật khẩu, `noindex`. Chưa có form. Cập nhật bằng `deploy/cap-nhat-ban-thu.sh`; đổi mật khẩu bằng `deploy/doi-mat-khau.sh` (`docs/TRIEN-KHAI.md`) |
| 6. Chuyển tên miền chính | **Chưa làm** | Cần quyền DNS của `casadeibambini.edu.vn` và nội dung đã được chủ trường xác nhận |

## Cần trường phản hồi

Hỏi chi tiết trong `docs/PHIEU-BO-SUNG-THONG-TIN.docx` (bản cập nhật 15/11/2026, 28 câu). Xếp theo việc bị chặn:

| Ưu tiên | Thông tin | Câu trong phiếu | Chặn việc gì |
|---|---|---|---|
| 1 | Cơ sở cũ nào có hệ quốc tế, song ngữ, nhà trẻ, lớp tiền tiểu học; nhà trẻ ở cơ sở cũ học theo mô hình nào; giờ học, bữa ăn, hè có đúng cho cả bốn cơ sở không | 10, 11, 12 | Trang chủ, Chương trình, Nhà trẻ, Mẫu giáo, trang cơ sở. **Rủi ro nội dung lớn nhất:** hiện đang giới thiệu mô hình Ciputra như của cả hệ thống |
| 2 | Tên đơn vị ở chân trang; ai được xem dữ liệu form; lưu bao lâu; đầu mối nhận yêu cầu về dữ liệu | 17–20 | Chân trang mọi trang; Chính sách bảo vệ dữ liệu (bắt buộc trước khi mở form) |
| 3 | Logo gốc, màu nhận diện; tên hiển thị "Casa dei Bambini" hay "Casa Preschool" | 1, 2, 3 | Giao diện chính thức |
| 4 | Tên gọi thống nhất cho từng cơ sở; "Cầu Giấy" là cơ sở nào; địa chỉ Chùa Láng; xác nhận địa chỉ Kim Mã, Mỹ Đình | 4–7 | Trang cơ sở, chân trang, schema, chuyển hướng URL cũ |
| 5 | Hộp thư Google Workspace dùng để gửi email báo đăng ký | 21 | Giai đoạn 4 (form) |
| 6 | Các bước sau khi đăng ký; trường gọi lại trong bao lâu | 13, 14 | Trang Tuyển sinh, trang Cảm ơn |
| 7 | Ảnh cơ sở vật chất, giáo viên (đúng quy tắc ảnh trẻ) | 23 | Trang chủ, trang cơ sở; điểm yếu lớn nhất về niềm tin |
| 8 | Bản xuất WordPress | 22 | Trang Về Casa (thông điệp, giá trị cốt lõi, đội ngũ) |
| 9 | Ciputra: số nhà, tên tòa; cách gọi (có chữ "Trường" không); phương án đón trả, an toàn ở tầng cao | 8, 9, 15 | Trang Ciputra, schema Ciputra |
| 10 | Đội ngũ được phép đăng gì; Zalo; liên hệ đúng chưa; số đăng ký hiện nay; tần suất đăng bài | 16, 24–27 | Về Casa, Liên hệ, đo lường |
| 11 | Quyền quản lý DNS của `casadeibambini.edu.vn` | 28 | Chỉ Giai đoạn 6 |

**Chủ trường xác nhận (không nằm trong phiếu):**
- Nội dung soạn sẵn trên Docs (trang Ciputra, FAQ, Bài 1) đúng sự thật: gom vào lượt xác nhận nội dung ở Giai đoạn 3.
- Toàn văn Chính sách bảo vệ dữ liệu: cần người có chuyên môn pháp lý rà soát.

## Kế hoạch tiếp theo

1. **Ngay bây giờ (không cần chờ trường):**
   - Người phụ trách dự án gửi link bản thử cho những người cần góp ý, kèm mật khẩu gửi riêng.
   - Gửi phiếu bổ sung thông tin và bản tóm tắt kế hoạch (Word) cho trường.
2. **Giai đoạn 4, có thể bắt đầu khi người phụ trách dự án đồng ý:**
   - Dịch vụ nhận form: Node, `127.0.0.1:3100`, user riêng, systemd, gửi email, ghi tệp `/var/lib/casa-website/`, chống spam, lỗi tiếng Việt.
   - Chỉ cần thêm địa chỉ hộp thư gửi (phiếu câu 21).
3. **Khi có phiếu trả lời:**
   - Cập nhật `docs/NGUON-SU-THAT.md` và dữ liệu cơ sở.
   - Viết lại các trang chương trình nếu cơ sở cũ khác Ciputra.
   - Điền chân trang, chính sách, tuyển sinh; thay màu và logo; thêm ảnh.
   - Chạy `npm run check:truoc-khi-dang` tới khi 0 chỗ `[CẦN]`.
4. **Chủ trường xác nhận nội dung từng trang** trên bản thử.
5. **Giai đoạn 6, chuyển tên miền chính:**
   - Search Console, hạ TTL.
   - Thêm khối Caddy cho `casadeibambini.edu.vn` có `import deploy/redirects.caddy`.
   - Đổi bản ghi A, kiểm tra 226 URL cũ, theo dõi 4 tuần.
