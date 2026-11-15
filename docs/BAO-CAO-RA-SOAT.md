# Báo cáo rà soát tổng thể và kế hoạch cải tiến (cuối Giai đoạn 2)

Lập ngày 15/11/2026, bản build tại nhánh `claude/hopeful-hopper-ahu1by`.

**Đầu vào**

| Mục | Nội dung |
|---|---|
| Đối tượng rà soát | Repo `pichu124-casa-website` và bản build cục bộ |
| Người dùng | Phụ huynh có con 15 tháng–6 tuổi ở Hà Nội |
| Mục tiêu | Phụ huynh đăng ký tham quan hoặc gọi hotline |
| Vấn đề đã biết | Thiếu nhiều thông tin đã chốt (phiếu bổ sung thông tin); màu và logo tạm; chưa có ảnh; dịch vụ form chưa có |
| Bằng chứng | Mã nguồn; `npm run check`; Playwright ở 9 độ rộng; axe-core; Lighthouse 4 trang × 2 thiết bị |
| Phạm vi thay đổi | Sửa trong repo; không đăng, không triển khai |

Tài liệu chi tiết cho từng phần:

| Phần | Tài liệu |
|---|---|
| Kế hoạch, kiến trúc thông tin | `docs/KE-HOACH-WEBSITE.md`, `docs/KIEN-TRUC-THONG-TIN.md` |
| Nội dung | `docs/NOI-DUNG-TRANG.md` |
| Thiết kế | `docs/HE-THONG-THIET-KE.md` |
| Mobile, UX, truy cập | `docs/RA-SOAT-GIAO-DIEN.md` |
| SEO | `docs/SEO-TREN-TRANG.md` |
| Hiệu năng | `docs/HIEU-NANG.md` |
| Chuyển đổi | `docs/CRO.md` |

## 1. Tóm tắt

- **Khung kỹ thuật đã sẵn sàng để điền nội dung:**
  - Site tĩnh hai thứ tiếng, 15 trang mỗi thứ tiếng (34 tệp gồm sitemap, robots, 404).
  - `npm run check` đạt cả 8 mục; đã thử cố ý tạo lỗi và bộ kiểm tra bắt đúng 23/23.
  - axe-core không báo vi phạm trên 20 trang. Lighthouse 100 điểm hiệu năng trên điện thoại và máy tính ở 4 trang đo (phòng thí nghiệm, máy chủ cục bộ).
  - 226 URL cũ có đích 301; `deploy/redirects.conf` sinh tự động.
- **Chặn việc đăng là nội dung, không phải mã:**
  - Còn 288 chỗ `[CẦN]` trên 34 trang. Nhiều chỗ lặp lại từ chân trang và bảng lớp/hệ, gốc thật chỉ khoảng 15 thông tin.
  - Chính sách dữ liệu thiếu bên kiểm soát và thời gian lưu.
  - Chưa có dịch vụ nhận form.
- **Rủi ro lớn nhất về nội dung:** chương trình (Cambridge Early Years, hai hệ, nhà trẻ trộn tuổi) là mô hình của Ciputra. Trang chủ và trang Chương trình đang giới thiệu nó như chương trình của Casa. Trước khi đăng, nhà trường phải xác nhận ba cơ sở cũ có học như vậy không (phiếu câu 9–11). Nếu không, phải viết lại các trang đó.
- **Lỗi nghiêm trọng đã phát hiện và sửa trong lần rà này:**
  - Menu điện thoại không mở được.
  - Đầu trang tràn ngang ở 320 px.
  - Phím Tab bỏ qua menu con.
  - Vùng bấm nhỏ.
  - Mốc trùng tên cho trình đọc màn hình.
  - Tiêu đề trang lặp tên trường.

## 2. Danh sách việc theo mức ưu tiên

Mức: **Nghiêm trọng** = chặn việc đăng hoặc sai luật; **Cao** = ảnh hưởng lớn tới niềm tin hoặc chuyển đổi; **Trung bình**; **Thấp**.

| # | Mức | Việc | Ảnh hưởng tới người dùng | Công sức | Phụ thuộc | Ai làm |
|---|---|---|---|---|---|---|
| B1 | Nghiêm trọng | Xác nhận chương trình, hệ học, nhà trẻ ở Kim Mã, Chùa Láng, Mỹ Đình; giờ học, bữa ăn áp dụng cơ sở nào | Tránh quảng cáo sai sự thật cho ba cơ sở cũ | Nhỏ (trả lời phiếu) rồi trung bình (sửa nội dung) | Phiếu câu 9–11 | Nhà trường → Claude |
| B2 | Nghiêm trọng | Hoàn thiện Chính sách bảo vệ dữ liệu: bên kiểm soát, người được xem, thời gian lưu, đầu mối yêu cầu; rà soát pháp lý | Bắt buộc trước khi mở form (Nghị định 13/2023, Luật 91/2025) | Trung bình | Phiếu câu 17–20; người có chuyên môn pháp lý | Chủ trường, Claude |
| B3 | Nghiêm trọng | Dịch vụ nhận form (Node, systemd, SMTP Google Workspace, ghi tệp, chống spam, lỗi tiếng Việt) | Không có thì không ai đăng ký được | Trung bình | Giai đoạn 4; hộp thư gửi (phiếu câu 21) | Claude; chủ trường đặt mật khẩu ứng dụng trên máy chủ |
| B4 | Nghiêm trọng | Xoá hết `[CẦN]`: địa chỉ Chùa Láng, tên cơ sở, pháp nhân chân trang, quy trình nhập học, thời gian gọi lại, nội dung Về Casa | Trang có chỗ trống trông như chưa xong | Nhỏ đến trung bình mỗi mục | Phiếu; bản xuất WordPress | Nhà trường → Claude |
| B5 | Cao | Ảnh thật cơ sở vật chất, giáo viên (đúng quy tắc ảnh trẻ), qua thành phần ảnh của Astro | Niềm tin: hiện site chưa có ảnh nào | Trung bình | Phiếu câu 21 | Nhà trường → Claude |
| B6 | Cao | Logo gốc và màu nhận diện thay cho màu tạm; kiểm lại tương phản | Nhận diện thương hiệu | Nhỏ | Phiếu câu 1–2; chốt tên "Casa dei Bambini" hay "Casa Preschool" | Nhà trường → Claude |
| B7 | Cao | Cam kết thời gian gọi lại (form, trang Cảm ơn) | Giảm ngần ngại khi gửi (giả thuyết C2) | Nhỏ | Phiếu câu 14; tuyển sinh giữ được cam kết | Nhà trường → Claude |
| B8 | Cao | Chủ trường xác nhận nội dung soạn sẵn đã dùng: trang Ciputra, FAQ, Bài 1 | Không đăng nội dung chưa xác nhận | Nhỏ | — | Chủ trường |
| B9 | Trung bình | Câu hỏi "Trường ở tầng cao thì đón trả và an toàn ra sao?" cho Ciputra | Câu phụ huynh sẽ hỏi nhiều nhất (theo Docs) | Nhỏ | Phương án vận hành đã chốt | Chủ trường → Claude |
| B10 | Trung bình | Người bản ngữ đọc lại bản tiếng Anh | Chất lượng với gia đình nước ngoài | Nhỏ | — | Người phụ trách dự án |
| B11 | Trung bình | `og:image`, `logo` trong schema; schema cho Chùa Láng, Ciputra khi có địa chỉ | Hiển thị khi chia sẻ và trên Google | Nhỏ | B5, B6, B4 | Claude |
| B12 | Trung bình | Ô ẩn `trang_nguon` trong form để biết trang nào mang lại đăng ký (không cookie) | Đo chuyển đổi | Nhỏ | B3 | Claude |
| B13 | Trung bình | Thử trên thiết bị thật và trình đọc màn hình (danh sách trong `docs/RA-SOAT-GIAO-DIEN.md`) | Phát hiện lỗi công cụ không thấy | Trung bình | Bản thử Giai đoạn 5 | Người phụ trách dự án + Claude |
| B14 | Trung bình | Quyết định tên H1 trang Ciputra: hiện là "Casa dei Bambini Ciputra"; bản Docs viết "Trường Mầm non Casa dei Bambini Ciputra" | Chữ "Trường" khi chưa có quyết định thành lập trường | Nhỏ | Tình trạng pháp lý | Chủ trường |
| B15 | Thấp | Bỏ độ đậm phông 600, chỉnh số đo phông dự phòng | Bớt khoảng 34 KiB, CLS về 0 (giả thuyết) | Nhỏ | Đo trước/sau | Claude |
| B16 | Thấp | Thử ô tháng/năm sinh dạng một ô | Form nhanh hơn trên điện thoại (giả thuyết) | Nhỏ | Thử với phụ huynh | Claude |

## 3. Việc nhanh

Mỗi việc dưới một giờ khi đã có thông tin:
- B7: cam kết thời gian gọi lại.
- B11: `og:image`, logo trong schema.
- B12: ô trang nguồn.
- Thay màu tạm bằng màu nhận diện (B6): chỉ đổi token ở `:root`.
- Đổi `FORM_DA_HOAT_DONG = true` khi dịch vụ form chạy (gỡ dòng cảnh báo trong form).

## 4. Thay đổi lớn hơn

- **B1:** nếu ba cơ sở cũ không học chương trình Cambridge Early Years hay không có hai hệ, phải viết lại trang chủ, Chương trình, Mẫu giáo, Nhà trẻ theo từng cơ sở. Cấu trúc trang không đổi; bảng lớp/hệ đã lấy dữ liệu từ một tệp duy nhất (`src/data/co-so.ts`).
- **B3:** dịch vụ form và cấu hình nginx (Giai đoạn 4–5).
- **B5:** quy trình ảnh (chọn, làm mờ nếu cần, tối ưu, kiểm quy tắc).

Không cần làm lại toàn bộ site: các thành phần đang chạy đúng (menu, form, bảng, câu hỏi, bộ kiểm tra) được giữ nguyên.

## 5. Tiêu chí nghiệm thu và kế hoạch kiểm thử

**Trước khi đăng bản thử (Giai đoạn 5):**

| Tiêu chí | Cách kiểm |
|---|---|
| `npm run check:truoc-khi-dang` đạt (0 chỗ `[CẦN]`) | Chạy lệnh |
| axe-core 0 vi phạm trên mọi trang | Kịch bản Playwright + axe (như lần rà này) |
| Không cuộn ngang ở 320–1440 px; đầu trang một dòng | Kịch bản Playwright 9 độ rộng |
| Lighthouse điện thoại ≥ 90, LCP < 2,5 s ở trang chủ, một trang cơ sở, Tuyển sinh, Bài 1 | Lighthouse, kể cả khi đã có ảnh thật |
| Form: gửi được; email tới tuyensinh@cdb.edu.vn; ghi dòng dữ liệu; ô bẫy và giới hạn theo IP chặn spam; lỗi bằng tiếng Việt; gửi hỏng hiện hotline | Thử tay đủ các trường hợp |
| Chủ trường xác nhận nội dung từng trang đúng sự thật | Danh sách trang có chữ ký xác nhận |

**Trên bản thử (Giai đoạn 5):**
- Thử trên iPhone (Safari) và Android (Chrome) thật.
- VoiceOver và TalkBack đọc trang chủ, mở menu, điền form.
- Lighthouse qua mạng thật.
- Kiểm `X-Robots-Tag: noindex` và mật khẩu xem.

**Ngày chuyển tên miền (Giai đoạn 6):**
- Kịch bản kiểm tra mọi URL trong `docs/URL-CU.csv` trả 301 đúng đích.
- Gửi sitemap trên Search Console.
- Theo dõi 4 tuần.

## 6. Chưa đánh giá được

| Nội dung | Vì sao | Khi nào đánh giá |
|---|---|---|
| Hành vi người dùng thật, tỉ lệ chuyển đổi | Chưa lên mạng; không có số liệu site cũ | Sau Giai đoạn 6 (Search Console, sổ đăng ký) |
| Tốc độ trên VPS và mạng di động thật | Mới đo trên máy chủ cục bộ | Giai đoạn 5 |
| Nội dung site cũ để viết lại (Về Casa, đội ngũ) | Chưa có bản xuất WordPress; máy chủ đám mây không vào được site cũ | Khi có tệp xuất |
| Trình đọc màn hình, thiết bị thật | Công cụ tự động không thay được | Giai đoạn 5 |
| Cấu hình nginx, HTTPS, tường lửa trên VPS | Chưa có thông tin máy (phiên khác đang dựng) | Trước Giai đoạn 5 |
