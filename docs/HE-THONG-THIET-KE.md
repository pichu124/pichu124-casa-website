# Hệ thống thiết kế

Lập ngày 15/11/2026, cập nhật 18/11/2026 theo bộ nhận diện của trường (phiếu câu 1–3). Mã nguồn: `src/styles/global.css` (token ở `:root`, thành phần bên dưới). Trang áp dụng mẫu: trang chủ (`src/components/trang/TrangChu.astro`).

**Đầu vào**

| Mục | Nội dung |
|---|---|
| Trang áp dụng | Mọi trang trong `docs/KIEN-TRUC-THONG-TIN.md` |
| Thuộc tính thương hiệu | Ấm áp, đáng tin, rõ ràng, chăm chút; hợp phụ huynh có con nhỏ, không trẻ con hoá |
| Màu hiện có | Theo bộ nhận diện (phiếu câu 2): navy `#23265A`, đỏ san hô `#E54041`, xanh pastel `#8EB7E1`, xám đậm `#51535A`, trắng |
| Chữ | Barlow 400/600/700 (thay cho DIN của bộ nhận diện, xem QUYET-DINH Q17): đủ dấu tiếng Việt, lưu trên máy chủ của trường, không gọi Google Fonts. Anja Eliane chỉ có trong logo (SVG), không dùng cho chữ trên trang |
| Ràng buộc | Không tạo hay sửa logo; site tĩnh, không JS phía trình duyệt; đạt tương phản WCAG AA; nhanh trên điện thoại |

**Về logo:** dùng tệp gốc của trường (PDF "Các dạng logo"), chuyển sang SVG ở `public/thuong-hieu/` (bản màu cho đầu trang, bản trắng cho chân trang, logomark làm favicon). Không chỉnh màu hay tỉ lệ. Tên hiển thị "Casa Preschool" (phiếu câu 3); logo ghi "Casa dei Bambini – Montessori Preschool", chờ chủ trường xác nhận (QUYET-DINH Q18).

## 1. Token màu (ngữ nghĩa)

Giá trị gốc nằm ở nhóm `--brand-*`; các token ngữ nghĩa trỏ về nhóm này. Tên token giữ nguyên từ bản màu tạm.

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--brand-navy`, `--brand-do`, `--brand-pastel`, `--brand-xam` | `#23265a`, `#e54041`, `#8eb7e1`, `#51535a` | Màu gốc của bộ nhận diện |
| `--mau-nen`, `--mau-be-mat` | `#ffffff` | Nền trang, thẻ, form, bảng |
| `--mau-be-mat-phu` | `#eef4fb` | Nền phần xen kẽ (xanh pastel rất nhạt) |
| `--mau-vien` | `#d6deea` | Viền thẻ, đường kẻ |
| `--mau-vien-o-nhap` | `#6f7480` | Viền ô nhập (≥ 3:1 với nền trắng) |
| `--mau-chu` | `#2b2d3a` | Chữ thân |
| `--mau-chu-phu` | xám đậm | Chữ phụ, gợi ý |
| `--mau-chinh` / `-dam` / `-nhat` | navy / `#171a42` / `#e3ecf8` | Tiêu đề, liên kết, nút phụ, nút menu |
| `--mau-hanh-dong` / `-dam` / `-nhat` | đỏ san hô / `#c6302f` / `#fde8e8` | **Chỉ** nút hành động chính và huy hiệu "Sắp khai trương" |
| `--mau-vang`, `--mau-xanh-la` | xanh pastel | Trang trí; không dùng cho chữ |
| `--mau-loi`, `--mau-thanh-cong` | `#b3261e`, `#2e6b3f` | Lỗi form, xác nhận |
| `--mau-can-nen`, `--mau-can-vien` | `#fff4cc`, `#a8841a` | Đánh dấu `[CẦN: …]` trong bản xem trước |
| `--mau-toi-nen`, `--mau-toi-chu`, `--mau-toi-chu-phu` | navy, `#ffffff`, `#d9ddea` | Chân trang (bề mặt tối) |
| `--mau-tieu-diem`, `--mau-tieu-diem-tren-toi` | navy, xanh pastel | Viền tiêu điểm bàn phím trên nền sáng / tối |

**Tương phản** (công thức WCAG 2.x, tính lại 18/11/2026):

| Cặp màu | Tỉ lệ | Mức |
|---|---|---|
| Chữ thân / trắng; / nền phụ | 13.64; 12.32 | AAA |
| Tiêu đề, liên kết (navy) / trắng; / nền phụ | 14.03; 12.68 | AAA |
| Chữ phụ (xám) / trắng; / nền phụ | 7.68; 6.94 | AAA; AA |
| Chữ trắng / nút hành động (đỏ san hô) | 4.08 | **Chỉ đạt AA cho chữ lớn**: nút chính bắt buộc chữ ≥ 19px, đậm 700 |
| Chữ trắng / nút hành động khi rê chuột | 5.43 | AA |
| Chữ huy hiệu "Sắp khai trương" / nền huy hiệu | 4.63 | AA |
| Viền ô nhập / trắng | 4.68 | Đạt 3:1 cho thành phần giao diện |
| Chữ / chân trang; chữ phụ / chân trang | 14.03; 10.35 | AAA |
| Viền tiêu điểm pastel / chân trang | 6.69 | Đạt |
| Chữ lỗi / trắng | 6.54 | AA |

**Sáng và tối:** site dùng giao diện sáng (`color-scheme: light`), vì phụ huynh xem ban ngày và bộ nhận diện dùng nền trắng. Bề mặt tối duy nhất là chân trang: dùng nhóm token `--mau-toi-*` và viền tiêu điểm xanh pastel. Chưa làm chế độ tối toàn site. Nếu làm sau, chỉ cần định nghĩa lại nhóm token trong `@media (prefers-color-scheme: dark)`.

## 2. Chữ

| Token | Cỡ | Dùng cho |
|---|---|---|
| `--co-h1` | 30 → 48 px (co giãn theo màn hình) | Một tiêu đề lớn mỗi trang |
| `--co-h2` | 24 → 34 px | Tiêu đề phần |
| `--co-h3` | 20 px, đậm 600 | Tiêu đề thẻ, câu hỏi |
| `--co-lon` | 19 px | Câu dẫn dưới tiêu đề, nút lớn |
| `--co-than` | 17 px, dòng cao 1.65 | Thân bài (không nhỏ hơn 16 px) |
| `--co-nho` | 14 px | Chú thích, nhãn phần, đường dẫn vị trí |

- Độ đậm: 400 cho thân bài, 600 cho nhãn và nút, 700 cho tiêu đề.
- Dòng chữ dài tối đa `--rong-chu` = 42rem (khoảng 70 ký tự).

## 3. Khoảng cách, khung, bo góc, viền

- **Khoảng cách:** `--k-1` … `--k-9` = 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Giữa hai phần: `--k-phan` (48 → 88 px).
- **Khung:** rộng tối đa 72rem (1152 px); lề hai bên `--le` = 16 → 32 px.
- **Lưới:** `.luoi` tự xếp cột theo chỗ trống (mỗi cột tối thiểu 248 px), không gắn với kích thước thiết bị cụ thể; `.luoi--2` tối thiểu 320 px.
- **Bo góc:** 8 px cho ô nhập; 14 px cho thẻ, bảng, form; tròn hẳn cho nút và huy hiệu.
- **Viền:** 1 px `--mau-vien`. Ô nhập 1.5 px `--mau-vien-o-nhap`. Thẻ được nhấn mạnh có viền trên 5 px màu chính.
- **Bóng:** hai mức, `--bong-the` (thường) và `--bong-the-noi` (khi rê chuột).

## 4. Thành phần và quy tắc dùng

| Thành phần | Lớp CSS | Quy tắc |
|---|---|---|
| Nút chính | `.nut.nut--chinh` | Màu hành động. Chỉ cho "Đăng ký tham quan", "Gửi đăng ký", "Đăng ký nhận thông tin sớm". Tối đa **một** nút chính trong mỗi vùng nhìn |
| Nút phụ | `.nut.nut--phu` | Viền xanh, nền trong. Cho "Gọi …", "Xem cơ sở", hành động thứ hai |
| Cỡ nút | `.nut--lon`, `.nut--rong` | Nút lớn ở đầu trang và khối hành động; nút rộng hết khung trên thanh đáy và trong form |
| Thẻ | `.the` | Nền trắng, viền, bóng nhẹ. Một thẻ, một ý |
| Thẻ liên kết | `.the.the--lien-ket` + `a.the__lien-ket` | Cả thẻ bấm được nhờ phần mở rộng của liên kết; chữ liên kết mô tả đích ("Cơ sở Kim Mã"). Không đặt nút khác bên trong |
| Huy hiệu | `.huy-hieu`, `.huy-hieu--sap` | Trạng thái ngắn ("Đang tuyển sinh", "Sắp khai trương"). Không dùng để trang trí |
| Ô số liệu | `.o-so-lieu` | 3–4 sự thật ngắn có số (giờ học, bữa ăn) |
| Bảng | `.bang-cuon > table` | Luôn bọc khung cuộn ngang, có `caption` hoặc tiêu đề ngay trên, dùng `th scope` |
| Câu hỏi thường gặp | `.hoi-dap details` | Mỗi câu là một `<details>`; câu hỏi trong `<h3>` để trình đọc màn hình duyệt được |
| Khối hành động | `.khoi-cta` | Cuối mỗi trang nội dung: tiêu đề, một câu, nút chính và nút gọi |
| Form | `.form` | Nhãn luôn hiện phía trên ô (không dùng chữ mờ trong ô thay nhãn); gợi ý dưới ô; dấu * đỏ cho ô bắt buộc kèm chữ giải thích |
| Đường dẫn vị trí | `.duong-dan` | Ở mọi trang tầng 2 |
| Chỗ thiếu thông tin | `.can`, `.anh-cho` | Chỉ trong bản xem trước. Bộ kiểm tra trước khi đăng sẽ báo đỏ |

**Phân biệt tiêu đề và nút:** tiêu đề là chữ đậm màu chữ chính, không có nền. Nút luôn có nền hoặc viền, bo tròn hẳn, chữ 600. Liên kết trong bài luôn có gạch chân.

**Trạng thái tương tác:**

| Trạng thái | Cách hiển thị |
|---|---|
| Rê chuột | Nút: nền đậm hơn. Thẻ liên kết: viền màu chính và bóng sâu hơn. Liên kết: gạch chân dày hơn |
| Tiêu điểm bàn phím | Viền 3 px màu tiêu điểm, cách 3 px; trên chân trang dùng vàng. Thẻ liên kết hiện viền quanh cả thẻ |
| Đang mở | Menu điện thoại đổi nhãn "Menu" thành "Đóng"; câu hỏi đổi "+" thành "−" |
| Trang hiện tại | `aria-current="page"` và gạch dưới 3 px trong menu |
| Ô nhập sai | Viền đỏ chỉ sau khi người dùng đã nhập (`:user-invalid`), không đỏ sẵn khi mới mở trang |
| Giảm chuyển động | Tắt cuộn mượt khi người dùng bật "giảm chuyển động" |

## 5. Bố cục mẫu: trang chủ

1. Đầu trang web dính trên cùng: chữ tên trường, menu 4 mục, số hotline, đổi ngôn ngữ, nút chính.
2. **Đầu trang (hero):**
   - Bên trái: nhãn phần, tiêu đề lớn, câu dẫn, nút chính "Đăng ký tham quan" và nút phụ "Gọi".
   - Bên phải: hình minh hoạ khối hình học bằng SVG (không phải ảnh thật, không có trẻ).
   - Trên điện thoại hình xuống dưới chữ.
3. **Chọn cơ sở gần bạn:** 4 thẻ liên kết; Ciputra có huy hiệu "Sắp khai trương".
4. **Con bạn bao nhiêu tuổi?:** 2 thẻ có viền trên màu chính.
5. **Hai hệ học:** 2 thẻ, liên kết sang bảng so sánh (nền phần xen kẽ).
6. **Một ngày ở Casa:** ô số liệu.
7. **Về Casa:** một đoạn và liên kết.
8. **Khối hành động** và chân trang tối.

## 6. Tài sản thật (cập nhật 18/11/2026)

- **Logo:** đã thay bằng tệp gốc (SVG) trong `src/components/DauWeb.astro` và `ChanWeb.astro`; dữ liệu ở `src/data/thuong-hieu.ts`.
- **Màu nhận diện:** đã đổi ở `:root`. Đỏ san hô không đạt 4.5:1 với chữ trắng nên giữ nguyên màu và dùng chữ lớn, đậm cho nút chính; không tự làm sẫm màu thương hiệu.
- **Ảnh:** dùng `<Picture>` của Astro (AVIF/WebP, kích thước cố định, nhiều độ rộng). Ảnh gốc ở `src/assets/anh/` (thu về cạnh dài 1800px, bỏ EXIF), danh sách và chữ thay thế ở `src/data/anh.ts` (QUYET-DINH Q25). Bộ ảnh dùng `BoAnh.astro`; video dùng `KhungVideo.astro`, tệp ở `public/video/` (QUYET-DINH Q26). Chỉ ảnh đầu trang chủ tải ngay (`fetchpriority="high"`).
- **Favicon:** logomark (`public/favicon.svg`).

## 7. Danh sách triển khai

- [x] Token màu, chữ, khoảng cách, bo góc trong `:root`
- [x] Tương phản các cặp màu đạt AA
- [x] Nút, thẻ, huy hiệu, bảng, form, câu hỏi thường gặp, khối hành động, đường dẫn vị trí, đầu trang web, menu điện thoại, thanh đáy, chân trang
- [x] Áp dụng cho trang chủ và mọi trang khác
- [ ] Thay màu tạm bằng màu nhận diện (chờ phiếu câu 2)
- [ ] Thay chữ tên trường bằng logo gốc (chờ phiếu câu 1)
- [ ] Ảnh thật đã được đồng ý (chờ phiếu câu 23)
