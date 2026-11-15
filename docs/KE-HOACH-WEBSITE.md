# Kế hoạch website (brief)

Lập ngày 15/11/2026, dựa trên `CLAUDE.md`, `docs/NGUON-SU-THAT.md`, `docs/KIEM-KE-SITE-CU.md` và `docs/URL-CU.csv`. Đây là kế hoạch, chưa dựng trang nào. Mọi chỗ ghi `[CẦN: …]` là thông tin chưa có, không được tự điền.

**Đầu vào của brief**

| Mục | Nội dung |
|---|---|
| Dự án | Website mới của hệ thống mầm non Casa dei Bambini (Hà Nội), thay site WordPress, giữ tên miền `casadeibambini.edu.vn` |
| Người xem | Phụ huynh có con từ 15 tháng đến 6 tuổi (có thể từ 12 tháng) đang tìm trường gần nhà hoặc nơi làm việc, ở quanh bốn cơ sở |
| Mục tiêu chính | Phụ huynh đăng ký tham quan một cơ sở |
| Điều trường mang lại | Chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi; nhà trẻ 15–36 tháng; hai hệ song ngữ và quốc tế; bốn cơ sở, trong đó Ciputra dự kiến khai trương quý 4/2027 |
| Tài sản đã có | Bản chép Casa facts; nội dung soạn sẵn trên Docs (trang Ciputra, FAQ, schema, Bài 1); trang cũ dùng làm tư liệu; bảng 226 URL cũ; thông tin liên hệ; tên miền; VPS |
| Trang bắt buộc | Trang chủ, Chương trình, Các cơ sở, Tuyển sinh và đăng ký tham quan, Tin tức, Về Casa, Liên hệ, Chính sách bảo vệ dữ liệu cá nhân |
| Ràng buộc | Quy tắc cứng trong `CLAUDE.md`: site tĩnh, hai thứ tiếng, tên gọi, ảnh trẻ, không công bố học phí, tách khỏi app casa-mamnon |

---

## 1. Mục tiêu website

Website giúp phụ huynh ở Hà Nội có con từ 15 tháng đến 6 tuổi trả lời nhanh ba câu hỏi: có cơ sở Casa nào gần mình không, con mình ở tuổi này sẽ học gì, và một ngày ở trường diễn ra thế nào. Trả lời xong thì phụ huynh đăng ký tham quan ngay trên điện thoại, chỉ mất chưa tới một phút. Site phục vụ ngang nhau ba cơ sở đang tuyển sinh (Kim Mã, Chùa Láng, Mỹ Đình) và cơ sở Ciputra (dự kiến khai trương quý 4/2027). Site giới thiệu đúng chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi và hai hệ song ngữ, quốc tế, không thổi phồng. Site chuyển toàn bộ lượng tìm kiếm của site cũ sang trang mới, không để mất đường dẫn. Site phải nhanh trên điện thoại và có đủ tiếng Việt và tiếng Anh.

## 2. Nhu cầu và băn khoăn của phụ huynh

### Ai đọc site

| Nhóm | Vai trò | Ghi chú |
|---|---|---|
| A. Phụ huynh Việt ở gần Kim Mã, Chùa Láng, Mỹ Đình | **Chính**, tuyển sinh ngay | |
| B. Phụ huynh ở khu Ciputra và lân cận | Quan tâm cơ sở mới, đăng ký trước | Cơ sở chưa mở, chỉ được viết "dự kiến" |
| C. Gia đình đọc tiếng Anh | Dùng bản `/en/` | Giả định, `[CẦN: chủ trường xác nhận nhóm này quan trọng tới đâu]` |
| D. Phụ huynh đang có con học ở trường | Tìm số điện thoại, địa chỉ | Có dẫn sang app liên lạc không: `[CẦN]` |
| E. Người xin việc | Nếu giữ trang Tuyển dụng | `[CẦN]` |

### Việc họ cần làm và câu trả lời của site

| Phụ huynh cần | Câu hỏi trong đầu | Site trả lời bằng (chỉ thông tin đã chốt) |
|---|---|---|
| Tìm trường gần nhà | Cơ sở ở đâu, có dễ đưa đón không? | Trang từng cơ sở có địa chỉ, nút "Mở trên Google Maps", số hotline |
| Biết con có vừa tuổi không | Con 14 tháng có được nhận không? | Nhận trẻ từ 15 tháng đến 6 tuổi; có thể từ 12 tháng, trường trao đổi với từng gia đình |
| Hiểu con sẽ học gì | Cambridge Early Years là gì? Tiếng Anh nhiều không? | Trang chương trình 3–6 tuổi, Bài 1, phần so sánh hai hệ |
| Chọn hệ | Song ngữ khác quốc tế ở đâu? | Hệ quốc tế: mỗi lớp 3–6 tuổi có giáo viên chủ nhiệm, trợ giảng và giáo viên nước ngoài. Hệ song ngữ: giáo viên chủ nhiệm, 2 trợ giảng, giáo viên nước ngoài dạy theo tiết |
| Ghép vào lịch đi làm | Mấy giờ đón? Hè có học không? | 7h30–17h30, thứ Hai–thứ Sáu; trông muộn đến 18h30; hè vẫn học, nghỉ 1 tuần |
| Yên tâm chuyện ăn | Con ăn gì, ai nấu? | 4 bữa mỗi ngày, bếp trường tự nấu |
| Ước lượng chi phí | Học phí bao nhiêu? | Không công bố. Viết "liên hệ để nhận biểu phí" và dẫn tới form, hotline |
| Bước tiếp theo | Đăng ký rồi thì sao? | Mô tả các bước sau khi gửi form, `[CẦN: trường gọi lại trong bao lâu, buổi tham quan gồm gì]` |

### Băn khoăn thường gặp và cách xử lý

| Băn khoăn | Cách xử lý trên site | Không được làm |
|---|---|---|
| "Không thấy học phí, chắc đắt hoặc giấu" | Ghi rõ "liên hệ để nhận biểu phí", nút gọi ngay, nói trường gửi biểu phí sau khi trao đổi | Không đưa con số, khoảng giá hay `priceRange` |
| "Có phải trường Cambridge thật không?" | Dùng đúng câu "chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi"; Bài 1 giải thích khung chương trình | Không viết "trường Cambridge", không dùng logo Cambridge |
| "Có thật mỗi lớp có giáo viên nước ngoài?" | Bảng so sánh hai hệ, ghi rõ giáo viên ở từng hệ | Không viết "trường mầm non quốc tế" làm tên hay tiêu đề |
| "Con còn nhỏ quá" | Trang nhà trẻ 15–36 tháng; nói rõ trường trao đổi với từng gia đình | Không hứa kết quả, không dùng ảnh rõ mặt bé |
| "Ciputra chưa mở, đăng ký có ích gì?" | Ghi "dự kiến khai trương quý 4/2027"; form có chọn Ciputra để trường liên hệ khi có lịch | Không viết "đã được cấp phép", không ghi tháng cụ thể |
| "Trường có an toàn không?" (camera, đón trả, y tế) | `[CẦN: chủ trường cung cấp thông tin đã chốt]` | Không tự viết |
| "Giáo viên có bằng cấp gì?" | `[CẦN]` | Không bịa bằng cấp |

### Hành động chuyển đổi duy nhất

**Đăng ký tham quan** bằng form có 4 trường và 1 ô đồng ý (Giai đoạn 4).

- **Hành động phụ:** gọi hotline 0989 059 838. Trên điện thoại, nút gọi luôn hiện cạnh nút đăng ký.
- **Phụ huynh cần biết trước khi đăng ký:** cơ sở nào gần; con có vừa tuổi không; chương trình tóm tắt cho tuổi của con; giờ học và đón muộn; học phí được trao đổi thế nào; sau khi gửi thì chuyện gì xảy ra; dữ liệu của họ được dùng vào việc gì.

## 3. Yêu cầu từng trang

Không trang nào cần JS phía trình duyệt. Form gửi bằng HTML thường. Câu hỏi thường gặp dùng thẻ `<details>`. Thanh "Gọi / Đăng ký tham quan" dính đáy màn hình điện thoại làm bằng CSS.

| # | Trang (VI · EN) | Mục đích | Nội dung đầu vào | CTA chính | Tương tác cần có |
|---|---|---|---|---|---|
| 1 | Trang chủ `/` · `/en/` | Cho thấy đây là một hệ thống bốn cơ sở; dẫn phụ huynh tới cơ sở và chương trình hợp tuổi con | Câu định vị đã duyệt `[CẦN]`; 4 thẻ cơ sở; 2 thẻ chương trình theo tuổi; tóm tắt hai hệ; giờ học, 4 bữa; schema `Organization` | Đăng ký tham quan | Chọn cơ sở, chọn tuổi (đều là liên kết); nút gọi; đổi ngôn ngữ |
| 2 | Chương trình `/chuong-trinh/` · `/en/programmes/` | Giải thích tổng quan và giúp chọn hệ | Hai hệ (bảng so sánh); "Một ngày ở Casa" (giờ học, đón muộn, hè, 4 bữa, ngoại khoá theo đăng ký, thu phí riêng); tư liệu trang cũ | Đăng ký tham quan | Bảng so sánh đọc được trên điện thoại |
| 3 | Cambridge Early Years 3–6 tuổi `/chuong-trinh/cambridge-early-years/` · `/en/programmes/cambridge-early-years/` | Giải thích chương trình 3–6 tuổi và lớp tiền tiểu học | Bài 1 (Docs); trang cũ tiền tiểu học, 3–5 tuổi (viết lại thành 3–6) | Đăng ký tham quan | Liên kết tới Bài 1 |
| 4 | Nhà trẻ 15–36 tháng `/chuong-trinh/nha-tre/` · `/en/programmes/nursery/` | Trấn an phụ huynh có con nhỏ | Mô hình trộn tuổi theo tinh thần Montessori, làm quen tiếng Anh (Ciputra); mô hình ở cơ sở cũ `[CẦN]`; độ tuổi nhận | Đăng ký tham quan | Ghi rõ cơ sở nào áp dụng mô hình nào |
| 5 | Các cơ sở `/co-so/` · `/en/campuses/` | Giúp chọn cơ sở | 4 thẻ: tên thống nhất `[CẦN]`, địa chỉ, trạng thái (Ciputra "sắp khai trương") | Xem cơ sở | Liên kết bản đồ từng cơ sở |
| 6 | Trang cơ sở ×4 `/co-so/<ten>/` · `/en/campuses/<name>/` | Trang quyết định: phụ huynh thấy nơi con học | Địa chỉ; chương trình và hệ có ở cơ sở `[CẦN]`; ảnh cơ sở vật chất `[CẦN]`; Ciputra lấy từ Docs; schema `Preschool` + `ChildCare` | Đăng ký tham quan **cơ sở này** | Form điền sẵn cơ sở (làm lúc build, không cần JS); nút gọi; bản đồ |
| 7 | Tuyển sinh `/tuyen-sinh/` · `/en/admissions/` | Giải đáp và nhận đăng ký | Quy trình nhập học `[CẦN]`; FAQ (Docs); "liên hệ để nhận biểu phí"; form | Gửi đăng ký | Form 4 trường + ô đồng ý (liên kết tới chính sách); báo lỗi tiếng Việt cạnh từng ô |
| 8 | Cảm ơn / lỗi `/tuyen-sinh/cam-on/` · `/en/admissions/thank-you/` | Xác nhận và nói bước tiếp theo | Thời gian trường gọi lại `[CẦN]`; khi lỗi: hotline | Gọi hotline | Không có |
| 9 | Tin tức `/tin-tuc/` + bài · `/en/news/` | Giữ lượt tìm kiếm, trả lời câu hỏi sâu | Bài 1; 3 bài cũ chủ trường chọn viết lại | Đăng ký tham quan (cuối bài) | Phân trang khi có nhiều bài |
| 10 | Về Casa `/ve-casa/` · `/en/about/` | Tạo niềm tin vào một hệ thống hơn 10 năm | Thông điệp, giá trị cốt lõi, đội ngũ (viết lại từ trang cũ), hành trình 10 năm; không nêu số liệu chưa chốt | Xem các cơ sở | Không có |
| 11 | Liên hệ `/lien-he/` · `/en/contact/` | Liên hệ trực tiếp | Hotline, email, Facebook (chép đúng); 4 địa chỉ; Zalo `[CẦN]` | Gọi hotline | `tel:`, `mailto:`, bản đồ |
| 12 | Chính sách bảo vệ dữ liệu `/chinh-sach-bao-ve-du-lieu/` · `/en/privacy-policy/` | Đáp ứng Nghị định 13/2023 và Luật 91/2025 | Bên kiểm soát dữ liệu `[CẦN: pháp nhân]`; mục đích; thời gian lưu `[CẦN]`; người nhận; quyền của phụ huynh; cách yêu cầu xoá | Không có | Không có |
| 13 | 404 (hai thứ tiếng) | Không để người xem lạc | Liên kết tới các trang chính | Về trang chủ | Không có |
| ? | Tuyển dụng (chưa chốt) | Tuyển giáo viên | `[CẦN: có giữ không]` | Gửi hồ sơ qua email `[CẦN]` | Không có |

**Phần chung mọi trang:**
- Đầu trang: logo, menu, nút đăng ký, nút đổi ngôn ngữ.
- Chân trang: pháp nhân `[CẦN]`, hotline, email, Facebook, 4 cơ sở, liên kết chính sách.
- `hreflang` hai chiều; một `<h1>`; `title` và `meta description` riêng cho từng trang.

## 4. Danh sách nội dung và tài sản

| Hạng mục | Tình trạng | Nguồn hoặc người cung cấp |
|---|---|---|
| Thông tin cốt lõi (tuổi, chương trình, hai hệ, giờ học, bữa ăn) | Có | `docs/NGUON-SU-THAT.md` |
| Hotline, email, Facebook | Có | `CLAUDE.md` |
| Địa chỉ Kim Mã, Mỹ Đình | Có | `docs/NGUON-SU-THAT.md` |
| Địa chỉ Chùa Láng | **Thiếu**, có 2 bản lệch | Chủ trường |
| Ciputra: số nhà, tên tòa | **Thiếu** (chỉ có khu đô thị và tầng) | Chủ trường, khi có |
| Tên thống nhất 4 cơ sở; "Cầu Giấy" là cơ sở nào | **Thiếu** | Chủ trường |
| Chương trình và hệ ở từng cơ sở cũ | **Thiếu** | Chủ trường xác nhận |
| Trang Ciputra, FAQ, schema; Bài 1 | Có bản soạn, **chưa rõ đã duyệt đăng chưa** | Docs |
| Nội dung trang cũ để viết lại | Có đường dẫn, **chưa có nội dung** | Bản xuất WordPress |
| Câu định vị và tiêu đề trang chủ | **Thiếu** | Đề xuất rồi chủ trường duyệt |
| Quy trình nhập học, thời gian phản hồi | **Thiếu** | Chủ trường |
| An toàn, y tế, đón trả | **Thiếu** | Chủ trường (chỉ đăng nếu đã chốt) |
| Logo gốc (SVG/AI), mã màu, phông | **Thiếu** | Chủ trường |
| Ảnh cơ sở vật chất, giáo viên, ảnh trẻ không rõ mặt | **Thiếu** | Chủ trường; ảnh có trẻ phải có đồng ý bằng văn bản |
| Pháp nhân ở chân trang và chính sách dữ liệu | **Thiếu** | Chủ trường |
| Thời gian lưu dữ liệu form, ai được xem | **Thiếu** | Chủ trường |
| Bảng chuyển hướng URL cũ | Có (226 URL) | `docs/URL-CU.csv` |
| Tài khoản Google Workspace gửi mail form | **Thiếu** (mật khẩu ứng dụng do chủ trường tự đặt trên máy chủ) | Chủ trường |
| Quyền quản lý DNS; thông tin VPS | **Thiếu** | Chủ trường, phiên dựng máy |

## 5. Tiêu chí thành công

**Trước khi lên mạng**
- `npm run check` xanh hoàn toàn: build không cảnh báo; không liên kết hỏng; bộ canh sự thật không báo đỏ; mỗi trang một `<h1>`, `title` và `description` riêng; `hreflang` khớp cặp; ảnh có `alt`; JSON-LD hợp lệ; mọi URL cũ có đích tồn tại.
- Không còn `[CẦN: …]` nào trên các trang được đăng.
- Lighthouse trên điện thoại từ 90 điểm; ảnh đầu trang (LCP) dưới 2,5 giây.
- Form gửi được cả khi tắt JS; lỗi hiện bằng tiếng Việt; gửi hỏng thì hiện hotline; email về tuyensinh@cdb.edu.vn và có dòng ghi trong `/var/lib/casa-website/`.
- Chủ trường duyệt từng trang trước khi đăng.

**Sau khi chuyển tên miền (4 tuần đầu)**
- Mọi URL trong `docs/URL-CU.csv` trả 301 đúng đích (kiểm bằng kịch bản ngày chuyển).
- Lỗi 404 trên Search Console giảm dần về 0 với các URL cũ đã biết.
- Số trang mới được Google lập chỉ mục tăng, không giảm so với tuần đầu.

**Kinh doanh**
- Đếm số đăng ký tham quan mỗi tháng, theo từng cơ sở, từ tệp dữ liệu form.
- Chưa có số liệu nền của site cũ, nên chưa đặt chỉ tiêu. `[CẦN: chủ trường cho biết số đăng ký hoặc cuộc gọi hiện nay, nếu có]`.

## 6. Câu hỏi chặn việc triển khai

| # | Câu hỏi | Chặn việc gì |
|---|---|---|
| 1 | Logo gốc và mã màu nhận diện | Bản thiết kế (Giai đoạn 2) |
| 2 | Tên thống nhất cho 4 cơ sở; "Cầu Giấy" trên site cũ là cơ sở nào; địa chỉ đúng của Chùa Láng | Trang cơ sở, chân trang, schema, bảng chuyển hướng |
| 3 | Cơ sở cũ nào có hệ quốc tế, hệ song ngữ, nhà trẻ; nhà trẻ ở cơ sở cũ học theo mô hình nào | Trang chương trình và trang cơ sở |
| 4 | Pháp nhân ghi ở chân trang, đồng thời là bên kiểm soát dữ liệu trong chính sách | Chân trang mọi trang; trang chính sách (bắt buộc trước khi mở form) |
| 5 | Ai đọc dữ liệu form, lưu bao lâu, trường gọi lại trong bao lâu | Chính sách dữ liệu, trang cảm ơn, Giai đoạn 4 |
| 6 | Form có cho chọn Ciputra ngay bây giờ không | Form, trang Ciputra |
| 7 | Nội dung soạn sẵn trên Docs (Ciputra, FAQ, Bài 1) đã duyệt đăng chưa | Giai đoạn 3 |
| 8 | Bản xuất WordPress (Công cụ → Xuất → Tất cả nội dung) | Viết lại trang Về Casa, Chương trình |
| 9 | Có dùng Zalo không; có cần đo lượt truy cập không (nếu có thì phải xin đồng ý theo Nghị định 13) | Liên hệ, thanh nút trên điện thoại, chính sách |
| 10 | Có giữ trang Tuyển dụng, Nội quy, trang giới thiệu app liên lạc không | Cây trang, bảng chuyển hướng |
| 11 | Chấp nhận việc không có trang quản trị (bài mới phải sửa trong repo) không | Cách làm Tin tức |
