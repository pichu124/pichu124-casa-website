# CLAUDE.md: website Casa dei Bambini

Repo này là website mới của hệ thống trường mầm non Casa dei Bambini (Hà Nội), thay cho site WordPress hiện tại ở https://casadeibambini.edu.vn. Chỉ giữ lại tên miền. Site mới chạy trên VPS InterData của trường (máy `casamamon`, Ubuntu), chung máy nhưng tách hẳn với app liên lạc casa-mamnon.

## Bối cảnh

- Casa dei Bambini là một hệ thống xuyên suốt hơn 10 năm. Hiện có ba cơ sở: Kim Mã, Chùa Láng, Mỹ Đình. Cơ sở mới tại khu đô thị Ciputra (phường Phú Thượng; tầng 2, tầng 3 và sân thượng tòa Block 1, theo Casa facts 21/11/2026) dự kiến khai trương quý 4/2027.
- Ba cơ sở cũ vẫn hoạt động và vẫn tuyển sinh. Site phải phục vụ cả bốn cơ sở, không chỉ Ciputra.
- Lên site theo hai bước (người phụ trách dự án quyết 23/11/2026, QUYET-DINH Q30): bản 3 cơ sở cũ chạy chính thức trước; nội dung và SEO Ciputra làm song song nhưng nằm sau công tắc `CIPUTRA_CONG_KHAI` trong `src/data/co-so.ts`, chỉ bật khi người phụ trách dự án báo. Khi công tắc tắt, `npm run check` báo đỏ nếu bản dựng còn chữ "Ciputra"; sửa nội dung Ciputra thì chạy thêm `npm run check:ciputra`.
- Kế hoạch đóng cơ sở cũ và việc Ciputra là pháp nhân riêng là thông tin nội bộ: **không bao giờ viết lên site**.

## Nguồn sự thật (nguồn trên thắng nguồn dưới)

1. Quyết định của chủ trường, trong Project Casa trên claude.ai (`claude/quyet-dinh-va-so-lieu-chinh.md`).
2. Casa facts: https://claude.ai/artifact/3tsvDG2LQaGt2UB6dqtdgy. Đọc bằng công cụ Claude Docs. Chỉ dòng "Đã chốt" mới được viết lên site; dòng "Dự kiến" phải kèm chữ "dự kiến"; dòng "Chưa có" không được viết.
3. Nội dung đã soạn sẵn:
   - Trang Ciputra, FAQ, schema: https://claude.ai/artifact/JhsPdvadPMzSpUvk4NvtPp
   - Bài 1 "Cambridge Early Years là gì": https://claude.ai/artifact/FrJdSXt17WaoqnNQJSWpb9
4. `docs/NGUON-SU-THAT.md` trong repo là bản chép của mục 1–2 để làm việc khi không đọc được Docs. Khi lệch, Casa facts thắng; sửa bản chép, không sửa ngược.

Không tự bịa con số, bằng cấp, giải thưởng, sĩ số, học phí. Thiếu thông tin thì để chỗ trống `[CẦN: ...]` và liệt kê trong báo cáo.

## Quy tắc cứng

- **Site tĩnh**: HTML/CSS, chỉ dùng JS khi thật cần. Không PHP, không cơ sở dữ liệu, không trang quản trị. Phần chạy được trên máy chủ chỉ có dịch vụ nhận form (Giai đoạn 4).
- **Hai thứ tiếng**: tiếng Việt (mặc định, ở gốc `/`) và tiếng Anh (`/en/`), có `hreflang` hai chiều. Bản tiếng Anh dịch đúng nghĩa, không thêm thông tin.
- **Tên gọi** (sai một chữ có thể thành quảng cáo sai sự thật):
  - Cambridge: chỉ viết "chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi". Không viết "trường Cambridge", "Cambridge International School"; không dùng logo Cambridge.
  - "Quốc tế": chỉ viết "hệ quốc tế: mỗi lớp có giáo viên nước ngoài". Không dùng "trường mầm non quốc tế" làm tên hay tiêu đề.
  - Montessori: "lớp trộn tuổi theo tinh thần Montessori" cho nhóm dưới 3 tuổi ở Ciputra; không dùng làm định vị chính.
  - Gọi "bé", "trẻ", "con", không gọi "học sinh". Không nêu tên hay chê trường khác; không viết "tốt nhất", "số 1".
- **Ảnh trẻ**: không đăng ảnh thấy rõ mặt bé, tên hay câu chuyện của một bé cụ thể, trừ khi chủ trường xác nhận đã có đồng ý bằng văn bản của phụ huynh. Ưu tiên ảnh cơ sở vật chất, giáo viên, ảnh chụp từ phía sau hoặc làm mờ.
- **Không công bố**: học phí (cho tới khi chủ trường chốt; chỉ viết "liên hệ để nhận biểu phí"), sĩ số, doanh thu, lương, tiền thuê, kế hoạch đóng cơ sở cũ, cấu trúc pháp nhân, "đã được cấp phép" cho Ciputra.
- **Liên hệ** (chép đúng):
  - Hotline: 0989 059 838 (+84 989 059 838)
  - Email: tuyensinh@cdb.edu.vn
  - Facebook: facebook.com/CasadeiBambiniSchools
  - Zalo: 0989 059 838; Zalo OA: https://zalo.me/3250239571046935262 (phiếu câu 25)
- **Tên hiển thị trên site**: "Casa Preschool" (phiếu câu 3, 18/11/2026); tên cũ "Casa dei Bambini" giữ ở logo, Facebook và `alternateName` trong schema.
- **Tách khỏi app casa-mamnon**: không đọc, không gọi, không sửa gì của app hay dữ liệu của app. App ở `app.casadeibambini.edu.vn`, site ở `casadeibambini.edu.vn` và `www`. Trên máy chủ, site có thư mục riêng, khối cấu hình máy chủ web riêng (Caddy, xem dưới), dịch vụ form riêng, dữ liệu form riêng.
- Giao diện và thông báo lỗi bằng tiếng Việt, dễ hiểu với phụ huynh không rành máy tính.

## Phân quyền quyết định

- **Claude tự quyết**, ghi lý do vào `docs/QUYET-DINH.md`: cấu trúc trang, đường dẫn, menu, nút hành động; cách viết và thứ tự nội dung trên trang; giữ hay bỏ nội dung cũ, chuyển hướng, SEO; công nghệ, bộ kiểm tra, tốc độ, bố cục thiết kế; các lựa chọn mặc định đã ghi trong `docs/QUYET-DINH.md`.
- **Người phụ trách dự án** (người giao việc trong các phiên làm việc này) quyết các bước: xem báo cáo cuối mỗi giai đoạn, cho phép sang giai đoạn sau, đổi một quyết định của Claude.
- **Nhà trường cung cấp sự thật** qua `docs/PHIEU-BO-SUNG-THONG-TIN.docx`: địa chỉ, tên gọi, chương trình từng cơ sở, pháp nhân, dữ liệu form, logo, ảnh. Claude không tự điền thay.
- **Chủ trường xác nhận cuối**: nội dung đúng sự thật trước khi đăng; các ranh giới trong "Quy tắc cứng"; đổi DNS và triển khai.

## Phải được xác nhận trước khi làm

- Người phụ trách dự án xác nhận: push hoặc merge vào nhánh chính.
- Chủ trường xác nhận: đổi DNS; triển khai lên máy chủ; xoá bất cứ thứ gì trên máy chủ; đăng bất kỳ nội dung nào chưa được xác nhận.

Lệnh chạy trên VPS thì soạn sẵn để người được giao tự chạy. Không bao giờ hỏi hay ghi mật khẩu vào chat hay repo.

## Kiểm tra trước mỗi commit (`npm run check`, dựng ở Giai đoạn 2)

1. Build thành công, không cảnh báo.
2. Không có liên kết hỏng trong site (cả `/` và `/en/`).
3. Bộ canh sự thật: quét toàn bộ HTML đã build, báo đỏ nếu gặp: "trường Cambridge", "Cambridge International School", "trường mầm non quốc tế" trong `<title>` hoặc `<h1>`, "học sinh", "tốt nhất", "số 1", "đã được cấp phép", "tuyensinh@casadeibambini", "tháng 9/2027", "18 tháng", và mọi con số đi liền "triệu" hay "VNĐ" (đề phòng lộ học phí). Danh sách nằm trong một tệp cấu hình để chủ trường thêm được.
4. Mỗi trang có đúng một `<h1>`, `<title>` và `meta description` riêng, `hreflang` khớp cặp, ảnh có `alt`.
5. Schema JSON-LD hợp lệ (parse được, có `@type`).
6. Kiểm tra bảng chuyển hướng: mọi URL cũ trong `docs/URL-CU.csv` đều có đích 301 trỏ tới một trang tồn tại.

**Không nới bộ canh để cho code qua. Đỏ thì sửa nội dung.**

## Quy trình theo giai đoạn

Mỗi giai đoạn kết thúc bằng một báo cáo ngắn và chờ người phụ trách dự án xem rồi mới sang giai đoạn sau.

### Giai đoạn 1: Kiểm kê site cũ

- Lấy toàn bộ URL của site cũ từ `https://casadeibambini.edu.vn/sitemap_index.xml` (Yoast) và các sitemap con, gồm cả bản tiếng Anh `/en/` của WPML và trang danh mục, thẻ, ảnh đính kèm.
- Máy chủ đám mây có thể không tải được site này. Nếu bị chặn, nói ngay và đề nghị chủ trường mở sitemap bằng trình duyệt rồi gửi tệp; đừng thử vòng qua bằng cách khác.
- Ghi vào `docs/URL-CU.csv`: URL, ngôn ngữ, loại (trang, bài, danh mục…), tiêu đề, đề xuất đích mới hoặc "gộp vào trang X". Không để URL nào không có đích.
- Liệt kê nội dung đáng giữ từ site cũ (bài viết, trang giới thiệu) và nội dung nên bỏ.

### Giai đoạn 2: Cấu trúc, công nghệ, thiết kế

- Đề xuất cây trang hai thứ tiếng. Gợi ý: Trang chủ (hệ thống) · Chương trình (Cambridge Early Years 3–6 tuổi; Nhà trẻ 15–36 tháng) · Các cơ sở (Ciputra "sắp khai trương", Kim Mã, Chùa Láng, Mỹ Đình) · Tuyển sinh và đăng ký tham quan · Tin tức và bài viết · Về Casa · Liên hệ · Chính sách bảo vệ dữ liệu cá nhân (bắt buộc vì form thu thông tin, theo Nghị định 13/2023 và Luật 91/2025).
- Đề xuất công nghệ. Gợi ý: Astro xuất site tĩnh (có sẵn đa ngôn ngữ, sitemap, tối ưu ảnh), không cần JS phía trình duyệt. Nêu lý do nếu chọn khác.
- Dựng `npm run check` trước khi viết trang đầu tiên.
- Làm bản thiết kế trang chủ và một trang cơ sở để người phụ trách dự án xem giao diện. Màu và logo lấy theo nhận diện hiện có; hỏi nếu cần tệp gốc.
- Mục tiêu tốc độ: Lighthouse trên điện thoại từ 90 điểm, ảnh đầu trang dưới 2,5 giây.

### Giai đoạn 3: Dựng nội dung

- Dựng từng trang, tiếng Việt trước, tiếng Anh sau. Dùng nội dung đã soạn trong Docs cho trang Ciputra, FAQ, Bài 1.
- Schema, `sitemap.xml`, `robots.txt`, trang 404 hai thứ tiếng, ảnh AVIF/WebP có kích thước cố định, chỉ ảnh đầu trang tải ngay.
- Bảng chuyển hướng 301 sinh từ `docs/URL-CU.csv` bằng `npm run redirects`: `deploy/redirects.caddy` (dùng trên VPS) và `deploy/redirects.conf` (bản nginx, dự phòng).

### Giai đoạn 4: Form đăng ký tham quan

- Một dịch vụ Node nhỏ, riêng, chỉ nghe trên `127.0.0.1` (ví dụ cổng 3100), chạy bằng systemd dưới một người dùng riêng.
- Chỉ thu: tên phụ huynh, số điện thoại, tháng/năm sinh của bé, cơ sở quan tâm, ô đồng ý xử lý dữ liệu (bắt buộc, có liên kết tới trang chính sách).
- Gửi email về tuyensinh@cdb.edu.vn qua SMTP của Google Workspace (mật khẩu ứng dụng do chủ trường tự đặt vào tệp môi trường trên máy chủ, không qua chat), và ghi thêm một dòng vào tệp dữ liệu ở `/var/lib/casa-website/`, không bao giờ ghi vào dữ liệu của app casa-mamnon.
- Chống spam: ô bẫy ẩn, giới hạn số lần gửi theo IP. Báo lỗi bằng tiếng Việt; gửi hỏng thì hiện số hotline.

### Giai đoạn 5: Bản thử trên VPS

- Hướng dẫn: `docs/TRIEN-KHAI.md`, để người quản trị tự chạy trên VPS: thư mục `/var/www/casa-website/releases/<ngày-giờ>` + liên kết `current` (quay lui một lệnh), user `casa-website` riêng, tệp `/etc/caddy/sites/casa-website.caddy` riêng (không sửa khối của app), dịch vụ form, HTTPS do Caddy tự cấp.
- **Máy chủ dùng Caddy, không dùng nginx** (kiểm tra 15/11/2026: Caddy 2.11.9 giữ cổng 80/443, app ở `127.0.0.1:3000`; QUYET-DINH Q16). Không cài nginx: sẽ tranh cổng với Caddy và làm app ngừng chạy. Cấu hình của site chỉ được thêm vào (một dòng `import` cuối Caddyfile + tệp riêng), không thay khối của app. Hỏi người phụ trách dự án tình trạng máy trước khi viết lệnh mới.
- Bản thử chạy ở tên miền phụ (ví dụ `moi.casadeibambini.edu.vn`) có mật khẩu xem và `X-Robots-Tag: noindex`, để Google không lập chỉ mục bản thử.

### Giai đoạn 6: Chuyển tên miền chính

- Trước ngày chuyển: cài Google Search Console cho tên miền (nên xác minh bằng bản ghi DNS); hạ TTL bản ghi DNS xuống 300 giây trước 24 giờ.
- Ngày chuyển: đổi bản ghi A của `casadeibambini.edu.vn` và `www` sang IP của VPS (chủ trường làm); thêm khối Caddy cho tên miền chính có `import` `deploy/redirects.caddy`, bỏ mật khẩu và `noindex`; chạy kịch bản kiểm tra mọi URL cũ trả về 301 đúng đích; gửi sitemap mới trên Search Console.
- Sau khi chuyển: theo dõi Search Console 4 tuần (lỗi 404, số trang được lập chỉ mục). Giữ gói hosting WordPress thêm 1–2 tháng làm đường lui rồi mới huỷ.

## Còn chờ nhà trường

Liệt kê lại trong mỗi báo cáo nếu chặn việc. Câu hỏi chi tiết nằm trong `docs/PHIEU-BO-SUNG-THONG-TIN.docx`.

- Quyền DNS: người phụ trách dự án có tài khoản quản trị tên miền (phiếu câu 28); chỉ cần ở Giai đoạn 6.
- Ảnh cho Ciputra (phối cảnh, mặt tiền) khi có. (Ảnh 3 cơ sở cũ đã có và đã được đồng ý từ 19/11/2026; logo, màu nhận diện có từ 18/11/2026.)
- Số nhà của tòa Block 1 ở Ciputra.
- Duyệt thời hạn lưu dữ liệu 12 tháng và rà pháp lý Chính sách dữ liệu. (Chân trang ghi "Trường mầm non Casa Preschool" theo phiếu câu 17.)
- (Bản thử đã chạy ở `casa-website-thu.duckdns.org` từ 15/11/2026; VPS IP `103.195.238.114`.)
