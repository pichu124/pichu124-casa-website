# Rà soát chuyển đổi và danh sách thử nghiệm

Lập ngày 15/11/2026.

**Đầu vào**

| Mục | Nội dung |
|---|---|
| Trang | Toàn site, trọng tâm: trang chủ, trang cơ sở, Tuyển sinh |
| Người xem | Phụ huynh có con 15 tháng–6 tuổi ở Hà Nội, phần lớn dùng điện thoại |
| Chuyển đổi mong muốn | Gửi form đăng ký tham quan; hành động phụ: gọi hotline |
| Bằng chứng có sẵn | **Không có:** site chưa lên mạng, site cũ không có số liệu được chia sẻ, không dùng công cụ theo dõi (QUYET-DINH Q5). Mọi nhận định dưới đây là **giả thuyết**, trừ chỗ ghi rõ là quan sát |
| Ràng buộc | Chỉ nói sự thật đã chốt; không công bố học phí; không tạo khan hiếm giả, không chọn sẵn ô đồng ý, không lời chứng thực bịa |

## 1. Nhận định theo từng yếu tố

| Yếu tố | Hiện trạng (quan sát) | Nhận định |
|---|---|---|
| Tuyên bố giá trị | Tiêu đề lớn nói rõ: ai (bé 15 tháng–6 tuổi), ở đâu (bốn cơ sở Hà Nội) | Rõ nhưng chung. Hướng B (chương trình) và C (lịch gia đình) cụ thể hơn, chờ xác nhận phạm vi cơ sở (`docs/NOI-DUNG-TRANG.md`) |
| Thứ bậc thị giác | Một nút chính màu đất nung mỗi vùng nhìn; tiêu đề không có nền | Tốt |
| Độ nổi của nút hành động | Đầu trang, thanh đáy điện thoại, khối cuối mỗi trang, form ngay trên trang cơ sở | Tốt; không nên thêm nữa |
| Ma sát của form | 4 thông tin + ô đồng ý; nhãn rõ; chọn sẵn cơ sở trên trang cơ sở; không hỏi email, tên bé | Ít ma sát. Ô tháng/năm sinh là 2 ô chọn: có thể chậm trên điện thoại (giả thuyết) |
| Thông tin tạo tin cậy | Chỉ có "hơn 10 năm" và địa chỉ. **Chưa có ảnh thật nào**, chưa có thông tin đội ngũ, an toàn | **Điểm yếu lớn nhất** (quan sát). Phụ huynh mầm non cần thấy nơi con sẽ ở |
| Rõ ràng về học phí | "Liên hệ để nhận biểu phí" ở 3 chỗ; không có con số | Đúng quy định nhưng là băn khoăn lớn (giả thuyết). Không thể thử nghiệm công bố giá: quyết định của chủ trường |
| Sau khi gửi | Trang Cảm ơn chưa nói trường gọi lại trong bao lâu (`[CẦN]`) | Thiếu cam kết thời gian là lý do phổ biến khiến người ta ngần ngại gửi (giả thuyết) |
| Điện thoại | Thanh đáy "Gọi ngay / Đăng ký tham quan" luôn hiện; không cuộn ngang; vùng bấm đủ lớn | Tốt (đã đo, `docs/RA-SOAT-GIAO-DIEN.md`) |
| Xử lý băn khoăn | FAQ chung, FAQ Ciputra, "Cần trường ngay?" ở trang Ciputra | Còn thiếu câu "an toàn ở tầng cao" của Ciputra (chưa có câu trả lời đã chốt) |

## 2. Danh sách việc, xếp theo tác động × độ chắc chắn

**Về lưu lượng:** một trường mầm non bốn cơ sở có thể chỉ nhận vài chục đăng ký mỗi tháng. Ước lượng thô, không phải số đo: phát hiện được mức tăng 20% với độ tin cậy thông thường cần hàng trăm chuyển đổi mỗi phương án. Với lưu lượng này, **A/B test sẽ không cho kết luận chắc chắn**.

Vì vậy cột "Cách kiểm" ưu tiên:
- nghiên cứu định tính (5 phụ huynh, kịch bản trong `docs/RA-SOAT-GIAO-DIEN.md`);
- so sánh trước/sau trong thời gian dài, kèm ghi chú bối cảnh như mùa tuyển sinh hay Tết.

| # | Giả thuyết | Thay đổi đề xuất | Chỉ số chính | Chỉ số bảo vệ | Tác động / chắc chắn | Cách kiểm | QA tối thiểu |
|---|---|---|---|---|---|---|---|
| C1 | Có ảnh thật cơ sở vật chất và giáo viên thì phụ huynh tin hơn và gửi đăng ký nhiều hơn | Thay chỗ giữ ảnh bằng ảnh thật (không thấy mặt bé, hoặc đã có đồng ý) ở trang chủ và trang cơ sở | Số đăng ký / tháng | LCP điện thoại ≤ 2,5 s; không ảnh nào thấy rõ mặt bé khi chưa có đồng ý | Cao / Cao | Không cần thử nghiệm: làm ngay khi có ảnh, rồi so sánh trước/sau | Kiểm từng ảnh với quy tắc ảnh trẻ; đo lại Lighthouse |
| C2 | Nói rõ thời gian gọi lại ("trong ngày làm việc") làm tăng số người gửi | Thêm câu cam kết dưới nút gửi và trên trang Cảm ơn | Số đăng ký / tháng | Tỉ lệ trường thực sự gọi lại đúng hạn (phải đạt 100%) | Cao / Trung bình | Trước/sau. **Chỉ làm khi bộ phận tuyển sinh giữ được cam kết** | Kiểm câu chữ khớp phiếu câu 14 |
| C3 | Ghi nguồn trang của mỗi đăng ký giúp biết trang nào đưa phụ huynh tới | Thêm ô ẩn `trang_nguon` (đường dẫn trang chứa form) vào form; không cookie, không theo dõi | (Đo lường, không phải chuyển đổi) | Chính sách dữ liệu nêu rõ trường này | Trung bình / Cao | Làm trong Giai đoạn 4 | Gửi thử từ 3 trang, kiểm dòng dữ liệu |
| C4 | Phụ huynh Việt quen nhắn Zalo hơn gọi điện | Nếu trường có Zalo OA: thêm "Nhắn Zalo" làm hành động phụ trên thanh đáy, thay "Gọi ngay" hoặc thêm bên cạnh | Tổng liên hệ (form + cuộc gọi + tin nhắn Zalo) / tháng | Số cuộc gọi không giảm mạnh; thời gian trả lời Zalo | Trung bình / Trung bình | Hỏi 5 phụ huynh thích kênh nào; nếu làm thì so sánh trước/sau | Chờ phiếu câu 25 |
| C5 | Tiêu đề hướng B hoặc C thuyết phục hơn hướng A | Đổi đầu trang chủ sang hướng B hoặc C khi đã xác nhận phạm vi cơ sở | Tỉ lệ bấm nút đăng ký từ trang chủ (cần C3 để đo) | Thời gian ở trang; không phát sinh câu hỏi sai về Cambridge | Trung bình / Thấp | Định tính: cho 5 phụ huynh xem hai phiên bản, hỏi "trường này dạy gì, có hợp con không" | Chạy bộ canh sự thật |
| C6 | Một ô "tháng/năm sinh" dạng chọn tháng nhanh hơn hai ô | Thử `input type="month"` trên điện thoại (cần kiểm hỗ trợ trình duyệt) | Tỉ lệ hoàn thành form (cần ghi số lần mở form, hiện chưa có) | Lỗi nhập trên Safari iOS | Thấp / Thấp | Thử với 5 phụ huynh; chỉ đổi nếu quan sát thấy vướng | Thử trên iOS và Android thật |
| C7 | Phụ huynh muốn biết khoảng học phí trước khi gọi | Không có thay đổi trên site: đây là quyết định của chủ trường | — | — | Cao / Trung bình | Nhờ bộ phận tuyển sinh ghi lại trong 1 tháng: bao nhiêu cuộc gọi đầu tiên hỏi học phí | — |

**Không làm** vì trái nguyên tắc:
- đồng hồ đếm ngược;
- "chỉ còn X chỗ" (sĩ số không được công bố);
- lời chứng thực tự viết;
- chọn sẵn ô đồng ý;
- giấu phí ngoại khoá. Site đã ghi "thu phí riêng".

## 3. Đo chuyển đổi mà không theo dõi người xem

- **Số đăng ký:** tệp dữ liệu form trên máy chủ (`/var/lib/casa-website/`), đếm theo tháng và theo cơ sở. Theo trang nguồn nếu làm C3.
- **Cuộc gọi:** bộ phận tuyển sinh hỏi "anh/chị biết trường qua đâu" và ghi vào sổ.
- **Tìm kiếm:** Google Search Console cho số lần hiển thị và lượt bấm theo trang (Giai đoạn 6).
- **Định tính:** 5 phụ huynh mỗi đợt, 3 việc (`docs/RA-SOAT-GIAO-DIEN.md`, mục 2).
