# SEO trên trang và cấu trúc nội dung

Lập ngày 15/11/2026 trên bản build hiện tại. Người phụ trách dự án chưa gửi kèm nội dung prompt SEO, nên phần này rà theo các tiêu chí SEO trên trang thông dụng: ý định tìm kiếm, tiêu đề, mô tả, tiêu đề H1–H3, liên kết nội bộ, dữ liệu có cấu trúc, phần kỹ thuật.

**Nguyên tắc:**
- Không thêm trang chỉ để nhắm từ khoá (`docs/KIEN-TRUC-THONG-TIN.md`, mục 3).
- Không nhồi từ khoá.
- Từ khoá không được vượt quy tắc tên gọi. Ví dụ "mầm non Cambridge" có người tìm, nhưng site chỉ viết "theo khung Cambridge Early Years".

## 1. Bản đồ ý định tìm kiếm

| Trang | Cụm tìm kiếm chính (ý định) | `<title>` | `<h1>` | Góc riêng |
|---|---|---|---|---|
| `/` | mầm non Casa dei Bambini; mầm non Hà Nội nhận bé 15 tháng (tìm trường) | Mầm non Casa dei Bambini Hà Nội: nhận bé 15 tháng–6 tuổi | Mầm non Casa dei Bambini cho bé từ 15 tháng đến 6 tuổi | Toàn cảnh hệ thống |
| `/chuong-trinh/` | mầm non song ngữ hay quốc tế (so sánh) | Chương trình học theo tuổi và hai hệ học | Chương trình học tại Casa dei Bambini | Bảng so sánh hai hệ |
| `/chuong-trinh/nha-tre/` | nhà trẻ cho bé 15 tháng; lớp trộn tuổi (tìm hiểu) | Nhà trẻ cho bé 15–36 tháng | Nhà trẻ cho bé từ 15 tháng đến 3 tuổi | Độ tuổi nhận, mô hình nhà trẻ |
| `/chuong-trinh/mau-giao/` | mẫu giáo 3–6 tuổi; lớp tiền tiểu học (tìm hiểu, chọn trường) | Mẫu giáo 3–6 tuổi theo khung Cambridge Early Years | Chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi | Ba lớp ở Casa, lớp tiền tiểu học |
| `/co-so/` | Casa dei Bambini cơ sở nào, địa chỉ | Các cơ sở: Kim Mã, Chùa Láng, Mỹ Đình, Ciputra | Các cơ sở Casa dei Bambini | Bảng bốn cơ sở |
| `/co-so/kim-ma/` | mầm non Kim Mã; mầm non Ba Đình (tìm theo nơi) | Mầm non Kim Mã – Casa dei Bambini (23 ngõ 294 Kim Mã) | Casa dei Bambini cơ sở Kim Mã | Địa chỉ, bản đồ, form chọn sẵn |
| `/co-so/chua-lang/` | mầm non Chùa Láng; mầm non Đống Đa | Mầm non Chùa Láng – Casa dei Bambini | Casa dei Bambini cơ sở Chùa Láng | Như trên (chờ địa chỉ) |
| `/co-so/my-dinh/` | mầm non Mỹ Đình; mầm non Phạm Hùng | Mầm non Mỹ Đình – Casa dei Bambini (Tầng 3 tòa FLC, 36 Phạm Hùng) | Casa dei Bambini cơ sở Mỹ Đình | Như trên |
| `/co-so/ciputra/` | mầm non Ciputra; nhà trẻ Phú Thượng | Casa dei Bambini Ciputra: mầm non theo khung Cambridge Early Years | Casa dei Bambini Ciputra | Cơ sở mới, FAQ riêng, đăng ký sớm |
| `/tuyen-sinh/` | tuyển sinh mầm non; học phí (đăng ký) | Tuyển sinh và đăng ký tham quan | Tuyển sinh và đăng ký tham quan | Quy trình, FAQ chung, form |
| `/ve-casa/` | Casa dei Bambini là trường gì (tin cậy) | Về Casa dei Bambini: hệ thống mầm non hơn 10 năm | Về Casa dei Bambini | Hệ thống, thông điệp |
| `/tin-tuc/cambridge-early-years-la-gi/` | cambridge early years là gì (tìm hiểu) | Cambridge Early Years là gì? Chương trình cho trẻ 3–6 tuổi | Cambridge Early Years là gì? Giải thích cho phụ huynh có con 3–6 tuổi | Giải thích bản thân khung chương trình |
| `/lien-he/` | số điện thoại Casa dei Bambini | Liên hệ: hotline, email, Facebook | Liên hệ Casa dei Bambini | Mọi kênh liên hệ |

Bản tiếng Anh có bản đồ tương ứng (ví dụ "Kim Mã preschool", "what is Cambridge Early Years").

**Bài SEO theo địa bàn của site cũ** ("trường mầm non Mỹ Đình", "…Ba Đình", "…Đống Đa") không viết lại. Chúng được chuyển 301 về trang cơ sở tương ứng, vì trang cơ sở đã đáp ứng đúng ý định đó (`docs/URL-CU.csv`).

## 2. Kiểm tra từng yếu tố

| Yếu tố | Trạng thái | Cách kiểm |
|---|---|---|
| Mỗi trang một `<h1>`, không nhảy cấp tiêu đề | Đạt | `npm run check` mục 4; Playwright đo 18 trang |
| `<title>` và mô tả riêng, không trùng | Đạt | `npm run check` mục 4 |
| Mô tả ≤ 160 ký tự | Đạt (dài nhất 157) | `npm run check` mục 4 |
| Tiêu đề: thông tin chính ở đầu, tên trường ở cuối | Đạt. Một số tiêu đề trên 60 ký tự (dài nhất 72); nếu Google cắt thì chỉ mất phần tên trường hoặc địa chỉ ở cuối | Bảng trên |
| Canonical tự trỏ về chính trang | Đạt | `npm run check` mục 4 |
| `hreflang` vi / en / x-default khớp hai chiều | Đạt | `npm run check` mục 4 |
| `sitemap.xml` có cặp hreflang, không có trang noindex | Đạt (30 trang) | `npm run check` mục 8 |
| `robots.txt` trỏ tới sitemap | Đạt | `dist/robots.txt` |
| Trang Cảm ơn, 404: `noindex` | Đạt | `npm run check` mục 4 |
| Liên kết nội bộ mô tả đích, không có trang mồ côi | Đạt | `npm run check` mục 7; `docs/KIEN-TRUC-THONG-TIN.md` mục 6 |
| Dữ liệu có cấu trúc | `Organization` (trang chủ); `Preschool` + `ChildCare` (Kim Mã, Mỹ Đình); `BreadcrumbList`; `FAQPage` (Tuyển sinh, Ciputra); `Article` (Bài 1). Không có `priceRange` | `npm run check` mục 5 |
| 301 cho 226 URL cũ | Đạt; `deploy/redirects.conf` sinh từ CSV | `npm run check` mục 6 |
| Lighthouse SEO | 100 trên 4 trang đo | `docs/HIEU-NANG.md` |
| Tốc độ (yếu tố xếp hạng phụ) | LCP điện thoại 1,2–1,5 s (phòng thí nghiệm) | `docs/HIEU-NANG.md` |

## 3. Đã sửa trong lần rà này

| Vấn đề | Sửa |
|---|---|
| Tiêu đề trang Về Casa (Việt, Anh) lặp tên trường hai lần, dài 67–78 ký tự | Bỏ phần tên trường lặp ở cuối |
| Tiêu đề trang cơ sở ("Cơ sở Kim Mã: …") không chứa cụm phụ huynh hay tìm | Đổi thành "Mầm non Kim Mã – Casa dei Bambini (địa chỉ)" |

## 4. Còn thiếu, cần làm sau

| Việc | Cần gì | Giai đoạn |
|---|---|---|
| `og:image` (ảnh xem trước khi chia sẻ Zalo/Facebook) | Logo hoặc ảnh cơ sở đã được đồng ý | Khi có tài sản (phiếu câu 1, 23) |
| `logo` trong schema `Organization` | Tệp logo gốc | Như trên |
| Schema `Preschool` cho Chùa Láng, Ciputra | Địa chỉ đầy đủ | Phiếu câu 6, 8 |
| `datePublished`, `image` cho schema `Article` | Ngày đăng thật, ảnh đại diện không thấy mặt bé | Khi đăng bài (Giai đoạn 3) |
| Hồ sơ Google (Maps) của từng cơ sở trỏ về đúng trang cơ sở | Quyền quản lý hồ sơ Google (Casa facts: "chưa kiểm tra") | Giai đoạn 6 |
| Google Search Console, gửi sitemap | Quyền DNS | Giai đoạn 6 |
| Bài viết theo lịch nội dung 12 tuần (trên Docs) | Nội dung từng bài, chủ trường duyệt bài nói về Ciputra | Sau khi lên mạng |
