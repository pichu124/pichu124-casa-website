# Hệ thống thiết kế

Lập ngày 15/11/2026. Mã nguồn: `src/styles/global.css` (token ở `:root`, thành phần bên dưới). Trang áp dụng mẫu: trang chủ (`src/components/trang/TrangChu.astro`).

**Đầu vào**

| Mục | Nội dung |
|---|---|
| Trang áp dụng | Mọi trang trong `docs/KIEN-TRUC-THONG-TIN.md` |
| Thuộc tính thương hiệu | Ấm áp, đáng tin, rõ ràng, chăm chút; hợp phụ huynh có con nhỏ, không trẻ con hoá |
| Màu hiện có | **Chưa nhận được** (phiếu câu 1–2). Bảng màu dưới đây là **màu tạm** |
| Chữ | Be Vietnam Pro: phông thiết kế cho tiếng Việt, đủ dấu, đọc tốt ở cỡ nhỏ; lưu trên máy chủ của trường, không gọi Google Fonts |
| Ràng buộc | Không tạo hay sửa logo; site tĩnh, không JS phía trình duyệt; đạt tương phản WCAG AA; nhanh trên điện thoại |

**Về logo:** chưa có tệp logo nên đầu trang dùng **chữ tên trường** ("Casa dei Bambini", font hệ thống) làm chỗ giữ tạm. Đây không phải logo và không vẽ lại logo. Khi có tệp gốc, thay đúng tệp, không chỉnh màu hay tỉ lệ. Bộ nhận diện ghi "Casa Preschool", nên cần hỏi trường dùng tên nào (`docs/NGUON-SU-THAT.md`).

## 1. Token màu (ngữ nghĩa)

Màu tạm, chọn từ hai ý: xanh mòng két đậm cho sự tin cậy, đất nung cho hành động. Khi có màu nhận diện, chỉ đổi giá trị ở `:root`, giữ nguyên tên token.

| Token | Giá trị tạm | Dùng cho |
|---|---|---|
| `--mau-nen` | `#fbf8f3` | Nền trang (kem) |
| `--mau-be-mat` | `#ffffff` | Thẻ, form, bảng |
| `--mau-be-mat-phu` | `#f3eee6` | Nền phần xen kẽ |
| `--mau-vien` | `#ddd5c8` | Viền thẻ, đường kẻ |
| `--mau-vien-o-nhap` | `#6f7b82` | Viền ô nhập (≥ 3:1 với nền trắng) |
| `--mau-chu` | `#1d2b33` | Chữ chính, tiêu đề |
| `--mau-chu-phu` | `#4b5a63` | Chữ phụ, gợi ý |
| `--mau-chinh` / `-dam` / `-nhat` | `#1e5a6b` / `#164756` / `#e2eef0` | Liên kết, nhãn phần, nút phụ, nền khối hành động |
| `--mau-hanh-dong` / `-dam` / `-nhat` | `#b5442a` / `#943520` / `#fbe9e2` | **Chỉ** nút hành động chính và huy hiệu "Sắp khai trương" |
| `--mau-vang`, `--mau-xanh-la` | `#f2c14e`, `#8fb996` | Trang trí trong hình minh hoạ; không dùng cho chữ |
| `--mau-loi`, `--mau-thanh-cong` | `#b3261e`, `#2e6b3f` | Lỗi form, xác nhận |
| `--mau-can-nen`, `--mau-can-vien` | `#fff4cc`, `#a8841a` | Đánh dấu `[CẦN: …]` trong bản xem trước |
| `--mau-toi-nen`, `--mau-toi-chu`, `--mau-toi-chu-phu` | `#163f4b`, `#f4efe8`, `#c9d6da` | Chân trang (bề mặt tối) |
| `--mau-tieu-diem`, `--mau-tieu-diem-tren-toi` | `#1e5a6b`, `#ffd166` | Viền tiêu điểm bàn phím trên nền sáng / tối |

**Tương phản** (đã tính theo công thức WCAG 2.x):

| Cặp màu | Tỉ lệ | Mức |
|---|---|---|
| Chữ chính / nền | 13.71 | AAA |
| Chữ phụ / nền; chữ phụ / nền phụ | 6.74; 6.18 | AA |
| Liên kết / nền; liên kết / trắng | 7.26; 7.69 | AAA |
| Chữ trắng / nút hành động; khi rê chuột | 5.49; 7.53 | AA; AAA |
| Chữ trắng / nút menu (xanh chính) | 7.69 | AAA |
| Viền ô nhập / trắng | 4.35 | Đạt yêu cầu 3:1 cho thành phần giao diện |
| Chữ / nền chân trang; chữ phụ / nền chân trang | 9.94; 7.64 | AAA |
| Viền tiêu điểm vàng / nền chân trang | 7.89 | Đạt |
| Chữ lỗi / trắng | 6.54 | AA |

**Sáng và tối:** site dùng giao diện sáng (`color-scheme: light`), vì phụ huynh xem ban ngày và màu nhận diện chưa có. Bề mặt tối duy nhất là chân trang: dùng nhóm token `--mau-toi-*` và viền tiêu điểm vàng. Chưa làm chế độ tối toàn site. Nếu làm sau, chỉ cần định nghĩa lại nhóm token trong `@media (prefers-color-scheme: dark)`.

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

## 6. Cần đổi ở nơi khác khi có tài sản thật

- **Logo:** thay chữ tên trường trong `src/components/DauWeb.astro` bằng tệp logo gốc (SVG). Giữ nguyên chữ thay thế "Casa dei Bambini".
- **Màu nhận diện:** đổi giá trị token ở `:root`. Sau đó chạy lại bảng tương phản trên; nếu màu hành động mới không đạt 4.5:1 với chữ trắng, dùng sắc đậm hơn của chính màu đó.
- **Ảnh:** thay `.anh-cho` bằng ảnh thật qua thành phần ảnh của Astro (tự xuất AVIF/WebP, có kích thước cố định). Chỉ ảnh đầu trang được tải ngay.
- **Favicon:** đang là chữ "C" trên nền màu chính (`public/favicon.svg`), sẽ thay bằng biểu tượng cắt từ logo.

## 7. Danh sách triển khai

- [x] Token màu, chữ, khoảng cách, bo góc trong `:root`
- [x] Tương phản các cặp màu đạt AA
- [x] Nút, thẻ, huy hiệu, bảng, form, câu hỏi thường gặp, khối hành động, đường dẫn vị trí, đầu trang web, menu điện thoại, thanh đáy, chân trang
- [x] Áp dụng cho trang chủ và mọi trang khác
- [ ] Thay màu tạm bằng màu nhận diện (chờ phiếu câu 2)
- [ ] Thay chữ tên trường bằng logo gốc (chờ phiếu câu 1)
- [ ] Ảnh thật đã được đồng ý (chờ phiếu câu 23)
