# Kiểm kê site cũ (Giai đoạn 1)

Lập ngày 15/11/2026 từ các sitemap Yoast do chủ trường tải về: `docs/site-cu/sitemap/` gồm `sitemap_index.xml` và đủ 8 sitemap con mà nó liệt kê. Máy chủ đám mây không vào được site cũ, nên bản kiểm kê này chỉ dựa trên đường dẫn và ngày sửa. Chưa đọc được nội dung từng trang.

Bảng đầy đủ: `docs/URL-CU.csv`, gồm 226 URL. URL nào cũng đã có đích mới.

## Cột trong `URL-CU.csv`

| Cột | Ý nghĩa |
|---|---|
| `url_cu` | Đường dẫn trên site cũ |
| `ngon_ngu` | `vi` hoặc `en` |
| `loai` | `trang`, `bai-viet`, `danh-muc`, `danh-muc-lop`, `lop`, `giao-vien`, `album-anh`, `tac-gia`, `sitemap` |
| `tieu_de` | Để trống: sitemap không ghi tiêu đề. Sẽ điền khi có bản xuất WordPress |
| `dich_moi` | Đích 301 trên site mới. Trùng `url_cu` thì giữ nguyên đường dẫn, không cần chuyển hướng |
| `noi_dung` | `viết lại` (dùng làm tư liệu cho trang mới), `chủ trường chọn`, `hỏi chủ trường`, `bỏ` |
| `ghi_chu` | Lý do |
| `sitemap`, `sua_lan_cuoi` | Lấy từ sitemap cũ |

Các đích trong bảng dựa trên cây trang đề xuất ở Giai đoạn 2. Nếu chủ trường đổi tên hay đường dẫn trang, sẽ sửa lại cột `dich_moi`.

## Số lượng

| Loại | Tiếng Việt | Tiếng Anh |
|---|---|---|
| Trang | 24 | 23 |
| Bài viết | 109 | 8 |
| Danh mục bài viết | 6 | 4 |
| Lớp và danh mục lớp | 1 | 15 |
| Giáo viên | 9 | 9 |
| Album ảnh | 2 | 3 |
| Tác giả | 2 | 2 |
| Tệp sitemap | 9 | |

7 URL giữ nguyên đường dẫn: `/`, `/en/`, `/ve-casa/`, `/co-so/`, `/tin-tuc/`, `/en/admissions/`, `/en/privacy-policy/`.

## Nội dung đáng giữ, làm tư liệu để viết lại

Không chép nguyên văn sang site mới. Mỗi đoạn dùng lại phải đối chiếu `docs/NGUON-SU-THAT.md` và quy tắc tên gọi.

- **Về Casa:** `/ve-casa/`, `/thong-diep-nha-truong/`, `/gia-tri-cot-loi/`, `/ly-do-chon-casa/`, `/doi-ngu-giao-vien/`, và bài `/casa-dei-bambini-hanh-trinh-10-nam-gieo-mam-yeu-thuong/`.
- **Chương trình:** `/chuong-trinh-hoc/`, `/phuong-phap-giao-duc/`, `/3-5-tuoi/`, `/chuong-trinh-hoc-cho-tre-3-5-tuoi/`, `/tien-tieu-hoc/`, `/chuong-trinh-hoc-cho-tre-18-36-thang/`, `/tre-18-36-thang-version-2/`, `/hoat-dong-ngoai-khoa/`, `/che-do-dinh-duong/`.
- **Cơ sở:** `/co-so/`, `/co-so-kim-ma/`, `/co-so-my-dinh/`, `/co-so-cau-giay/`. Cần các trang này để chủ trường xác nhận chương trình từng cơ sở cũ.
- **Bài viết có thể viết lại** (chủ trường chọn): `/buoi-chia-se-triet-ly-giao-duc-som-tai-australia/`, `/phat-trien-giac-quan-cho-tre/`, `/5-linh-vuc-phat-trien-cua-tre-mam-non/`.

## Nội dung nên bỏ (vẫn có 301)

- **Bài viết vướng quy tắc cứng:**
  - `/kham-pha-nngoi-truong-mam-non-so-1-trong-long-to-nhe-casa-dei-bambini/` có cụm "số 1".
  - `/hoc-phi-truong-mam-non-quoc-te/` nói về học phí và dùng "trường mầm non quốc tế".
  - `/truong-nhan-tre-tu-6-thang-tuoi-o-ha-noi/` ghi 6 tháng, sai với độ tuổi nhận trẻ hiện nay.
  - `/truong-mam-non-quoc-te-ha-noi/`, `/tieu-chuan-truong-mam-non-quoc-te/`, `/co-nen-cho-con-hoc-truong-mam-non-quoc-te/` dễ vướng tên gọi "quốc tế".
- **25 tin hoạt động của bé** (làm bánh, Family Day, Year End Party, Casa Cup, 8/3…): gần như chắc chắn có ảnh thấy rõ mặt trẻ, chưa rõ đã có đồng ý bằng văn bản của phụ huynh.
- **32 bài về phương pháp giáo dục** (Montessori, Reggio Emilia, Steiner, Shichida, Glenn Doman, HighScope, STEAM…): Montessori không còn là định vị chính, các phương pháp khác không thuộc chương trình.
- **37 bài SEO chung hoặc theo địa bàn** (giáo án, trang trí lớp, câu đố, thực đơn, "trường công lập là gì", "trường mầm non Mỹ Đình"…): không gắn với chương trình mới.
- **16 bài về tiền tiểu học, vào lớp 1, chọn trường, độ tuổi nhập học, mầm non tiếng Anh:** 301 về trang chương trình hoặc tuyển sinh gần nhất.
- **Hồ sơ giáo viên năm 2022:** phần lớn là dữ liệu mẫu của giao diện (`ms-fray-2` đến `ms-fray-6`, `mrs-zenny-copy`, ảnh "Thiet-ke-chua-co-ten.png").
- **Trang lớp năm 2022** (Seoul, Berlin, London…), chỉ có bản tiếng Anh.
- **Thư viện ảnh, album ảnh, trang tác giả, danh mục bài viết.**
- **Chính sách bảo mật cũ:** viết mới theo Nghị định 13/2023 và Luật 91/2025.

## Phát hiện trên site cũ

1. **Ghép cặp tiếng Anh sai:** `/en/admissions/` (Tuyển sinh) đang được WPML ghép với `/tuyen-dung/` (Tuyển dụng). Site cũ không có trang Tuyển sinh tiếng Việt.
2. **Trùng đường dẫn:** `/phuong-phap-giao-duc/` vừa là trang vừa là danh mục, do Yoast bỏ tiền tố `category/`.
3. **Số liệu cũ lệch với hiện nay:** site cũ ghi chương trình "18–36 tháng" (bản tiếng Anh ghi "18–26 month") và "3–5 tuổi". Nay là từ 15 tháng và 3–6 tuổi. Bộ canh sự thật đã có cụm "18 tháng" để chặn việc chép nhầm.
4. **Ba tên cơ sở cũ:** Cầu Giấy, Kim Mã, Mỹ Đình. Site mới dùng Kim Mã, Chùa Láng, Mỹ Đình. Chưa rõ "Cầu Giấy" là cơ sở nào, nên tạm cho các URL Cầu Giấy về `/co-so/`.
5. **Slug tiếng Việt trong `/en/`:** nhiều bài tiếng Anh dùng slug tiếng Việt (ví dụ `/en/phuong-phap-la-gi/`). Chuyển hướng vẫn hoạt động bình thường.
6. **Thiếu sitemap thẻ và ảnh đính kèm:** sitemap không có mục thẻ (tag) hay trang ảnh đính kèm. Những URL này có thể vẫn tồn tại, nên cần quy tắc chung ở dưới.

## Quy tắc chung đề xuất cho `deploy/redirects.conf` (Giai đoạn 3)

Để bắt những URL cũ không có trong sitemap:

| Mẫu URL cũ | Xử lý |
|---|---|
| `/tag/…`, `/en/tag/…` | 301 về `/tin-tuc/`, `/en/news/` |
| `…/page/<số>/`, `…/feed/` | 301 về trang danh sách tương ứng |
| `/?p=<số>`, `/?page_id=<số>`, `/?lang=en` | 301 về `/` hoặc `/en/` |
| `/wp-content/uploads/…` | 410 (đã gỡ). Không chuyển ảnh cũ sang, vì có ảnh trẻ |
| `/wp-admin`, `/wp-login.php`, `/xmlrpc.php`, `/wp-json/…` | 410 |
| Còn lại | Trang 404 hai thứ tiếng, có liên kết về các trang chính |

## Cần thêm từ chủ trường

- **Bản xuất WordPress:** vào Quản trị → Công cụ → Xuất → "Tất cả nội dung", rồi gửi tệp `.xml` (không chứa mật khẩu). Có tệp này mới điền được tiêu đề và đọc được nội dung các trang "viết lại", thay vì chỉ đoán theo đường dẫn.
- "Cầu Giấy" là cơ sở nào: Chùa Láng hay Mỹ Đình?
- Có giữ trang Tuyển dụng, Nội quy, và trang giới thiệu app liên lạc không?
