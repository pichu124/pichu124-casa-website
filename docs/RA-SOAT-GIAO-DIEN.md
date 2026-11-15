# Rà soát giao diện: bố cục mobile, UX điều hướng, khả năng truy cập

Lập ngày 15/11/2026 trên bản build cục bộ (`npm run build` + `astro preview`). Công cụ:
- Playwright với Chromium: đo tràn ngang, kích thước vùng bấm, thứ tự tiêu đề, thứ tự Tab, chụp màn hình.
- axe-core 4.10.2: bộ quy tắc WCAG 2.0/2.1/2.2 mức A, AA và best-practice.

Chưa thử trên điện thoại thật hay trình đọc màn hình thật (xem mục 4).

## 1. Bố cục mobile-first

**Đầu vào:** Astro, CSS thuần, không JS phía trình duyệt. Việc quan trọng nhất của phụ huynh: tìm cơ sở, xem chương trình theo tuổi, gọi điện, gửi đăng ký tham quan.

### Lỗi tìm thấy và đã sửa

| # | Lỗi (quan sát được) | Ở đâu | Đã sửa |
|---|---|---|---|
| R1 | **Bấm "Menu" trên điện thoại không hiện gì.** `backdrop-filter` ở đầu trang biến đầu trang thành khối chứa của bảng menu (`position: fixed`), nên bảng menu cao âm | Mọi trang, < 1024 px | Bỏ `backdrop-filter`, đầu trang nền đặc. Đã kiểm lại: bảng menu cao 632 px ở 320 và 375 px |
| R2 | Đầu trang tràn ngang 37 px ở 320 px (tên trường + EN + nút gọi + Menu không vừa) | Mọi trang, 320 px | Dưới 384 px ẩn nút gọi trên đầu trang (thanh đáy luôn có "Gọi ngay"); dưới 336 px cho tên trường xuống dòng. Không còn cuộn ngang ở 320–1440 px |
| R3 | Nhãn menu và nút "Đăng ký tham quan" xuống hai dòng ở 1024–1440 px | Đầu trang máy tính | `white-space: nowrap`. Số hotline dạng chữ chỉ hiện từ 1280 px, màn hẹp hơn dùng nút biểu tượng có nhãn. Đầu trang cao đúng 68 px ở mọi độ rộng đã đo |
| R4 | Dòng phụ "Hệ thống mầm non tại Hà Nội" làm tên trường xuống 3 dòng ở 375 px | Đầu trang điện thoại | Dòng phụ chỉ hiện từ 480 px; tên trường giữ một dòng |
| R5 | Hình minh hoạ đầu trang chiếm gần một màn hình trên điện thoại, đẩy "Chọn cơ sở gần bạn" xuống | Trang chủ, < 640 px | Ẩn hình trang trí dưới 640 px. Hình không mang nội dung nên không mất thông tin |
| R6 | Liên kết chân trang và đường dẫn vị trí cao 22–23 px (dưới 24 px của WCAG 2.5.8) | Mọi trang | Chân trang cao tối thiểu 36 px, đường dẫn vị trí 32 px; ô đồng ý 24 px |
| R7 | Khoảng trống lớn giữa đầu trang và phần "Chọn cơ sở gần bạn" trên máy tính | Trang chủ | Giảm khoảng đệm dưới đầu trang |

### Quy tắc bố cục đang dùng

| Thành phần | Quy tắc |
|---|---|
| Khung | Rộng tối đa 72rem; lề hai bên co giãn 16 → 32 px (`clamp`) |
| Lưới thẻ | `repeat(auto-fit, minmax(min(100%, 15.5rem), 1fr))`: tự xuống cột khi hẹp, không gắn cỡ thiết bị |
| Chữ | Tiêu đề co giãn theo màn hình (`clamp`); thân bài 17 px, không dưới 16 px |
| Bảng | Luôn trong khung cuộn ngang riêng (có nhãn, dùng được bằng bàn phím); trang không bao giờ cuộn ngang |
| Form | Một cột; tháng và năm sinh đứng cạnh nhau; ô nhập cao 48 px; nút gửi rộng hết khung |
| Điều hướng | < 1024 px: menu `<details>` toàn màn hình + thanh đáy "Gọi ngay / Đăng ký tham quan". ≥ 1024 px: menu ngang 4 mục, menu con mở khi rê chuột hoặc khi Tab tới |

### Ma trận kiểm thử theo độ rộng

| Độ rộng | Thiết bị đại diện | Tràn ngang | Đầu trang | Ghi chú |
|---|---|---|---|---|
| 320 px | iPhone SE đời đầu, Android nhỏ | Không | 68 px, tên trường 2 dòng | Đã đo 18 trang |
| 360 px | Android phổ biến | Không | 68 px | |
| 375 px | iPhone 12 mini / SE | Không | 68 px | Có ảnh chụp |
| 414 px | iPhone Plus | Không | 68 px | |
| 640 px | Điện thoại ngang | Không | 68 px, hiện nút đăng ký | |
| 768 px | iPad dọc | Không | 68 px | |
| 1024 px | iPad ngang, laptop nhỏ | Không | 68 px, menu ngang | Có ảnh chụp |
| 1280 px | Laptop | Không | 68 px, hiện số hotline | |
| 1440 px | Màn hình rộng | Không | 68 px | Có ảnh chụp |

### Cần thử trên thiết bị thật

- Safari iOS: vùng an toàn của thanh đáy (`env(safe-area-inset-bottom)`), thanh địa chỉ co giãn khi cuộn, bàn phím số khi nhập điện thoại.
- Chrome Android cũ (Android 8–9): `:has()` dùng cho viền tiêu điểm của thẻ liên kết. Nếu không hỗ trợ, thẻ vẫn bấm được, chỉ mất viền quanh cả thẻ.
- Cỡ chữ hệ thống phóng to (200%): đầu trang và thanh đáy.
- Zalo/Facebook in-app browser: liên kết `tel:` và mở Google Maps.

## 2. UX điều hướng

**Đầu vào:** phụ huynh lần đầu vào site. Việc chính: tìm cơ sở gần nhà, hiểu con học gì, đăng ký tham quan hoặc gọi. Phải giữ: menu 4 mục và nút đăng ký (QUYET-DINH Q14), hotline luôn có trên điện thoại, nội dung đầy đủ trên điện thoại.

### Đường đi từ lúc vào tới khi xong việc

```
Google / Facebook / Zalo
   │
   ├─▶ Trang chủ ─▶ "Chọn cơ sở gần bạn" ─▶ Trang cơ sở ─▶ Form (đã chọn sẵn cơ sở) ─▶ Cảm ơn
   │            └─▶ "Con bạn bao nhiêu tuổi?" ─▶ Nhà trẻ / Mẫu giáo ─▶ Khối hành động ─▶ Tuyển sinh#form
   ├─▶ Trang cơ sở (từ Google Maps) ─▶ Form tại chỗ
   ├─▶ Bài viết (từ tìm kiếm) ─▶ Mẫu giáo hoặc Ciputra ─▶ Form
   └─▶ Bất kỳ trang nào ─▶ Thanh đáy "Gọi ngay" / "Đăng ký tham quan"
```

### Bảng vấn đề trước / sau

| # | Vấn đề | Người dùng gặp gì | Đã làm | Giữ nguyên |
|---|---|---|---|---|
| U1 | Menu điện thoại không mở (R1) | Phụ huynh trên điện thoại không đi được tới trang nào ngoài trang đang xem: **đường cụt** | Sửa lỗi; menu hiện hết trang con ngay, không phải bấm thêm tầng | Nhãn "Menu"/"Đóng" có chữ, không chỉ biểu tượng |
| U2 | Tab trên máy tính bỏ qua menu con | Người dùng bàn phím không tới được trang cơ sở hay chương trình con từ menu | Menu con hiện ngay khi Tab tới nhãn cha | Bấm nhãn cha vẫn vào trang cha thật |
| U3 | Đầu trang và thanh đáy cùng có nút "Đăng ký tham quan" trên điện thoại | Có thể thấy lặp | Dưới 640 px, nút trên đầu trang ẩn; chỉ thanh đáy có. Từ 640 px có nút trên đầu trang | Một nút chính trong mỗi vùng nhìn |
| U4 | Trang cơ sở Ciputra chưa mở, phụ huynh cần trường ngay có thể bỏ đi | Ngõ cụt cho người cần chỗ học sớm | Câu "Cần trường ngay cho năm học này? Kim Mã, Chùa Láng, Mỹ Đình đang tuyển sinh" ngay cạnh form | Form Ciputra vẫn là "Đăng ký nhận thông tin sớm" |
| U5 | Gửi form trong bản xem trước sẽ báo lỗi 404, vì dịch vụ form chưa có | Phản hồi sai khi người duyệt thử bấm gửi | Dòng đánh dấu `[CẦN: dịch vụ nhận form…]` ngay trên nút gửi | Sẽ gỡ khi Giai đoạn 4 xong (`FORM_DA_HOAT_DONG = true`) |
| U6 | Học phí: phụ huynh tìm mà không thấy | Dễ nghĩ trường giấu | Mục "Biểu phí" ở Tuyển sinh, câu hỏi thường gặp, liên kết thẳng tới form "để nhận biểu phí" | Không đưa con số |
| U7 | Trang lỗi (404) | Người vào từ đường dẫn cũ bị lạc | 404 hai thứ tiếng, giải thích "đường dẫn đã thay đổi khi trường làm website mới", 4 lối về trang chính; 226 URL cũ đã có chuyển hướng 301 | |

Không thêm ô tìm kiếm hay bộ lọc: site có khoảng 15 trang mỗi thứ tiếng, menu đủ để tìm.

### Trạng thái tương tác cần có

| Thành phần | Mặc định | Rê chuột | Tiêu điểm bàn phím | Đang mở / chọn | Lỗi |
|---|---|---|---|---|---|
| Nút chính | Nền đất nung, chữ trắng | Nền đậm hơn | Viền 3 px xanh, cách 3 px | — | — |
| Menu ngang | Chữ đậm | Nền xanh nhạt | Viền 3 px; menu con mở | Gạch dưới 3 px (`aria-current`) | — |
| Menu điện thoại | "☰ Menu" | — | Viền 3 px | "✕ Đóng", bảng toàn màn hình | — |
| Câu hỏi thường gặp | "+" | — | Viền 3 px | "−", câu trả lời hiện | — |
| Ô nhập | Viền xám đậm | — | Viền 3 px xanh | — | Viền đỏ sau khi đã nhập sai (`:user-invalid`). Thông báo lỗi tiếng Việt từ máy chủ: Giai đoạn 4 |
| Form gửi xong | — | — | — | Trang Cảm ơn | Gửi hỏng: thông báo kèm hotline (Giai đoạn 4) |

Lời nút và thông báo: xem `docs/NOI-DUNG-TRANG.md`, mục 5.

### Kịch bản thử nhanh với phụ huynh (3 việc, 15 phút)

Người thử: 3–5 phụ huynh có con 1–5 tuổi, dùng điện thoại của chính họ. Không gợi ý, chỉ ghi lại họ bấm gì và nói gì.

1. **Tìm cơ sở:** "Nhà anh/chị ở gần Kim Mã. Hãy tìm xem trường có cơ sở nào gần nhà và mở chỉ đường tới đó."
   - Đạt khi: tới trang Kim Mã và bấm "Mở trên Google Maps" trong vòng 1 phút.
2. **Hiểu chương trình:** "Con anh/chị 2 tuổi rưỡi. Hãy tìm xem con sẽ học gì, và năm sau lên 3 tuổi thì học gì."
   - Đạt khi: tới trang Nhà trẻ rồi sang Mẫu giáo, nói lại được ít nhất một ý của mỗi trang.
3. **Đăng ký và hỏi phí:** "Anh/chị muốn biết học phí và hẹn ngày đến xem trường. Hãy làm việc đó."
   - Đạt khi: tìm thấy "liên hệ để nhận biểu phí" và điền xong form (hoặc bấm gọi).
   - Ghi lại nếu họ dừng vì không thấy con số.

Sau mỗi việc hỏi: "Có chỗ nào anh/chị thấy khó hiểu hay phải đoán không?"

## 3. Khả năng truy cập

**Đầu vào:** mục tiêu WCAG 2.2 mức AA. Thành phần: đầu trang, menu (ngang và điện thoại), thanh đáy, thẻ liên kết, bảng, câu hỏi thường gặp, form, chân trang.

**Kết quả tự động:** sau khi sửa, axe-core không báo vi phạm nào trên 20 trang (cả tiếng Việt và tiếng Anh) ở 375 và 1280 px. Đây là kết quả của công cụ, **không phải chứng nhận đạt WCAG**.

### Lỗi đã xác nhận và đã sửa

| # | Vị trí | Ai bị ảnh hưởng | Quan sát | Cách sửa | Thử lại bằng tay |
|---|---|---|---|---|---|
| A1 | Menu điện thoại (`DauWeb.astro`, CSS `.dau-web`) | Mọi người dùng điện thoại, gồm người dùng trình đọc màn hình | Bảng menu không hiện khi mở | Bỏ `backdrop-filter` | Mở menu bằng chạm và bằng VoiceOver/TalkBack; tới được mọi trang |
| A2 | Menu con trên máy tính | Người dùng bàn phím | Tab nhảy qua menu con do `visibility` có chuyển tiếp | Đổi `visibility` ngay, chỉ chuyển tiếp độ mờ | Tab từ đầu trang: Chương trình → Nhà trẻ → Mẫu giáo → Các cơ sở → Kim Mã… (đã kiểm bằng Playwright) |
| A3 | Bảng (`BangLop`, Mẫu giáo, Ciputra, Chương trình) | Người dùng trình đọc màn hình | axe `landmark-unique`: vùng bảng và phần chứa trùng tên; phần so sánh hai hệ tự làm nhãn cho chính nó | Vùng bảng có tên riêng "Bảng: …"; phần so sánh trỏ đúng tiêu đề | Duyệt theo vùng (landmark) bằng NVDA/VoiceOver: mỗi vùng một tên khác nhau |
| A4 | Vùng bấm nhỏ (chân trang, đường dẫn vị trí, ô đồng ý) | Người run tay, người lớn tuổi, màn hình nhỏ | 22–23 px | Tối thiểu 32–36 px; ô đồng ý 24 px và cả nhãn bấm được | Bấm từng liên kết chân trang bằng ngón tay trên điện thoại thật |
| A5 | Chuyển động | Người nhạy cảm với chuyển động | Có chuyển tiếp nhỏ và cuộn mượt | Tắt khi bật "giảm chuyển động" | Bật Reduce Motion trên iOS/macOS, kiểm tra menu và cuộn tới form |

### Đã có sẵn trong mã (kiểm bằng đọc mã và Playwright)

- `lang="vi"` / `lang="en"` trên từng trang. Chữ tiếng Anh trong trang tiếng Việt có `lang="en"` (tên sáu lĩnh vực, nguồn).
- Liên kết "Bỏ qua menu, tới nội dung chính" là điểm Tab đầu tiên. Đã kiểm: Tab tiếp theo vào đúng nội dung chính.
- Mốc trang: `header`, `nav` (menu chính, vị trí trang, liên hệ nhanh), `main`, `footer`.
- Mỗi trang đúng một `<h1>`. Không có trang nào nhảy cấp tiêu đề (đã đo 18 trang).
- Form:
  - nhãn hiện rõ, gắn đúng ô (`for`/`id`);
  - nhóm tháng/năm sinh trong `fieldset`/`legend`;
  - gợi ý số điện thoại gắn qua `aria-describedby`;
  - `autocomplete` cho tên và điện thoại;
  - ô bẫy chống spam ẩn khỏi trình đọc màn hình và khỏi phím Tab.
- Biểu tượng luôn `aria-hidden`; nút chỉ có biểu tượng (gọi) có `aria-label`.
- Bảng có `caption` hoặc nhãn vùng, `th scope`; khung cuộn bảng nhận tiêu điểm để cuộn bằng phím.
- Tương phản: mọi cặp màu chữ/nền đạt AA (bảng trong `docs/HE-THONG-THIET-KE.md`).
- Viền tiêu điểm 3 px hiện ở mọi điểm Tab đã đi qua.

### Còn phải thử bằng tay (công cụ không thay được)

| Việc | Cách thử |
|---|---|
| Trình đọc màn hình đọc tiếng Việt đúng | VoiceOver (iOS, giọng tiếng Việt) và TalkBack: đọc trang chủ, mở menu, điền form |
| Form gửi lỗi và thông báo lỗi | Chỉ thử được khi có dịch vụ form (Giai đoạn 4): thông báo lỗi phải được đọc lên, tiêu điểm chuyển tới lỗi đầu tiên |
| Phóng to 200% và 400% | Trình duyệt máy tính: không mất nội dung, không cuộn hai chiều (trừ bảng) |
| Chế độ tương phản cao của Windows | Viền nút, ô nhập, viền tiêu điểm còn thấy |
| Câu hỏi thường gặp (`details` chứa `h3`) | NVDA + Firefox và VoiceOver + Safari: đọc được "đã thu gọn / đã mở rộng" và tên câu hỏi |
| Thẻ liên kết cả thẻ bấm được | Trình đọc màn hình chỉ đọc tên liên kết, không đọc lặp |
| Thanh đáy che nội dung | Cuối trang, nút trong chân trang không bị thanh đáy che (đã chừa khoảng đệm) |
