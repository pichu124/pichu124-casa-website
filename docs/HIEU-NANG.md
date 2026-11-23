# Hiệu năng và Core Web Vitals

Đo ngày 15/11/2026, bản build tại commit `770ff15`.

**Cách đo:**
- Lighthouse 12.6.1 (chế độ điện thoại mặc định có giả lập mạng chậm và CPU chậm; chế độ máy tính `--preset=desktop`), Chromium của Playwright, không giao diện.
- Site chạy bằng `astro preview` trên chính máy đo (`127.0.0.1`).

**Đầu vào:**
- Nền tảng: Astro xuất site tĩnh, không JS phía trình duyệt.
- Số đo thật đang có: chỉ số phòng thí nghiệm ở bảng dưới. **Chưa có dữ liệu người dùng thật**, vì site chưa lên mạng và không dùng công cụ theo dõi (QUYET-DINH Q5).
- Ràng buộc: Lighthouse trên điện thoại từ 90 điểm; ảnh đầu trang dưới 2,5 giây; không thêm bên thứ ba.

## 1. Số đo (phòng thí nghiệm)

| Trang | Thiết bị | Điểm hiệu năng | LCP | FCP | CLS | TBT | Dung lượng |
|---|---|---|---|---|---|---|---|
| Trang chủ `/` | Điện thoại | 100 | 1,5 s | 1,5 s | 0 | 0 ms | 110 KiB |
| Trang chủ `/` | Máy tính | 100 | 0,4 s | 0,4 s | 0 | 0 ms | 110 KiB |
| Cơ sở Kim Mã | Điện thoại | 100 | 1,2 s | 1,2 s | 0 | 0 ms | 111 KiB |
| Cơ sở Kim Mã | Máy tính | 100 | 0,4 s | 0,4 s | 0 | 0 ms | 111 KiB |
| Tuyển sinh | Điện thoại | 100 | 1,2 s | 1,2 s | 0 | 0 ms | 111 KiB |
| Tuyển sinh | Máy tính | 100 | 0,3 s | 0,3 s | 0,006 | 0 ms | 111 KiB |
| Bài Cambridge Early Years | Điện thoại | 100 | 1,2 s | 1,2 s | 0 | 0 ms | 111 KiB |
| Bài Cambridge Early Years | Máy tính | 100 | 0,3 s | 0,3 s | 0 | 0 ms | 111 KiB |

Cả bốn trang cũng đạt 100 ở Khả năng truy cập, Thực hành tốt và SEO cơ bản của Lighthouse.

**Giới hạn của số đo này** (đừng coi là kết quả cuối):
- Máy chủ nằm ngay trên máy đo nên thời gian phản hồi gần 0. Trên VPS thật, phụ huynh dùng 4G sẽ chậm hơn.
- Chưa có ảnh thật nào. Khi có ảnh, ảnh đầu trang thường trở thành phần tử LCP.
- Chỉ đo 4 trang, mỗi trang một lần.

## 2. Đã quan sát được

| # | Quan sát | Bằng chứng | Ảnh hưởng |
|---|---|---|---|
| O1 | Phần tử LCP là **chữ** (`<h1>`), không phải ảnh | Lighthouse "largest-contentful-paint-element" | LCP thấp vì không chờ tải ảnh |
| O2 | **Phông chữ chiếm khoảng 90% dung lượng:** 6 tệp woff2 (3 độ đậm × 2 bộ ký tự Latin + tiếng Việt), khoảng 101 KiB | Danh sách tải trong báo cáo: HTML 9 KiB, phông 101 KiB | Tệp nặng nhất trên trang |
| O3 | Không có tài nguyên chặn hiển thị: CSS nằm ngay trong HTML, không có JS | "render-blocking-resources": 0 | FCP sớm |
| O4 | Phông dùng `font-display: swap` | Audit "font-display" đạt | Chữ hiện ngay bằng phông dự phòng, rồi đổi sang Be Vietnam Pro |
| O5 | CLS 0,006 ở trang Tuyển sinh (máy tính), tại phần Câu hỏi thường gặp | "layout-shift-elements" | Rất nhỏ; nhiều khả năng do đổi phông làm dòng chữ dài/ngắn khác (giả thuyết, xem H2) |
| O6 | HTML được nén khi truyền (35 KiB → 9 KiB) bởi máy chủ xem trước | Kích thước truyền trong báo cáo | **Chưa chắc nginx trên VPS sẽ nén giống vậy** (xem A1) |
| O7 | Không có bên thứ ba: không nhúng bản đồ, không Google Analytics, không Facebook pixel | Danh sách tải chỉ có tài nguyên cùng tên miền | Giữ nguyên |

## 3. Giả thuyết (chưa có bằng chứng, cần đo khi có điều kiện)

| # | Giả thuyết | Đo bằng cách nào |
|---|---|---|
| H1 | Trên VPS thật với 4G, LCP trên điện thoại sẽ nằm khoảng 1,5–2,5 giây, phụ thuộc thời gian phản hồi máy chủ và nén | PageSpeed Insights / Lighthouse trên bản thử ở tên miền phụ (Giai đoạn 5) |
| H2 | CLS 0,006 do đổi phông; có thể về 0 nếu chỉnh số đo của phông dự phòng (`size-adjust`) | So sánh CLS trước và sau trên trang Tuyển sinh |
| H3 | Bỏ độ đậm 600 (dùng 700 thay thế) giảm khoảng 34 KiB mỗi trang | Đo dung lượng và LCP trước và sau |
| H4 | Khi thêm ảnh thật không tối ưu, LCP trên điện thoại có thể vượt 2,5 giây | Đo lại ngay khi thêm ảnh đầu tiên |

## 4. Việc nên làm, theo thứ tự

| Ưu tiên | Việc | Chỉ số bị ảnh hưởng | Đánh đổi | Khi nào |
|---|---|---|---|---|
| A1 | nginx: bật gzip (và brotli nếu có module) cho HTML, CSS, SVG, XML, TXT; bật HTTP/2 | TTFB, FCP, LCP | Tốn một ít CPU máy chủ, không đáng kể với site tĩnh | Giai đoạn 5 (`docs/TRIEN-KHAI.md`) |
| A2 | nginx: `/_astro/*` lưu cache 1 năm (`immutable`, tên tệp đã có mã băm); HTML `no-cache` | Lượt xem lại nhanh hơn | Không có: đổi nội dung thì tên tệp đổi theo | Giai đoạn 5 |
| A3 | Ảnh thật: dùng thành phần ảnh của Astro (AVIF/WebP, `srcset`, có `width`/`height`). Chỉ ảnh đầu trang tải ngay với `fetchpriority="high"`, còn lại tải lười | LCP, CLS | Build lâu hơn một chút | Khi nhận ảnh (Giai đoạn 3) |
| A4 | Giới hạn ảnh đầu trang dưới 150 KiB ở bề rộng điện thoại; thêm vào `npm run check` một mục cảnh báo ảnh quá nặng | LCP | Ảnh nén mạnh có thể giảm chất lượng; xem bằng mắt trước khi duyệt | Giai đoạn 3 |
| A5 | Thử H3 (bỏ độ đậm 600) và H2 (`size-adjust` cho phông dự phòng). Chỉ giữ thay đổi nếu đo thấy lợi | Dung lượng, CLS | Mất một độ đậm trong thiết kế | Tuỳ chọn, sau A1–A4 |
| A6 | Giữ nguyên: không thêm bản đồ nhúng, công cụ theo dõi, nút chia sẻ hay chat của bên thứ ba khi chưa đo tác động | Mọi chỉ số | — | Luôn luôn |

**Thực hiện an toàn và quay lui:**
- Mỗi việc là một commit riêng. Cấu hình nginx nằm trong repo (`deploy/`).
- Trên VPS, bản phát hành theo thư mục `releases/<ngày-giờ>` + liên kết `current`, nên quay lui là đổi liên kết về bản trước (Giai đoạn 5).
- Thay đổi nginx: chạy `nginx -t` trước khi nạp lại. Giữ bản cấu hình cũ để chép đè khi cần.

## 5. Kế hoạch đo lại

| Khi nào | Đo gì | Công cụ |
|---|---|---|
| Mỗi lần đổi giao diện, thêm ảnh | 4 trang ở bảng trên, điện thoại và máy tính | Lighthouse cục bộ (lệnh ở cuối tài liệu) |
| Giai đoạn 5, bản thử trên VPS | Cùng 4 trang qua mạng thật | Lighthouse từ máy ngoài. **PageSpeed Insights không vào được bản thử có mật khẩu**, nên đo bằng Lighthouse trong Chrome DevTools sau khi đăng nhập |
| 4 tuần sau khi chuyển tên miền | Dữ liệu người dùng thật (LCP, INP, CLS ở phân vị 75) | Báo cáo Core Web Vitals trong Google Search Console và phần "dữ liệu thực tế" của PageSpeed Insights. Chỉ có khi đủ lượt truy cập Chrome (CrUX); site nhỏ có thể không đủ |
| Nếu CrUX không đủ dữ liệu | Đo định kỳ trên điện thoại Android tầm trung thật, mạng 4G | Chrome DevTools nối điện thoại |

Không thêm thư viện đo người dùng thật vào trang lúc này, để giữ site không có JS và không theo dõi người xem (QUYET-DINH Q5).

**Lệnh đo lại:**

```bash
npm run build && npx astro preview --port 4321
```

```bash
npx lighthouse http://127.0.0.1:4321/ --only-categories=performance --view
```

## Đo lại 23/11/2026 (bản 3 cơ sở, sau khi thêm ảnh và video)

Lighthouse 12.6 chế độ điện thoại (mô phỏng mạng chậm), máy chủ thử tại chỗ (`astro preview`, chưa nén như Caddy). Thứ tự điểm: Hiệu năng / Truy cập / Thực hành tốt / SEO.

| Trang | Điểm | LCP | CLS | TBT |
|---|---|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 1,7 s | 0 | 0 ms |
| `/co-so/kim-ma/` | 98 / 100 / 100 / 100 | 2,4 s | 0,033 | 0 ms |
| `/chuong-trinh/nha-tre/` | 99 / 100 / 100 / 100 | 1,6 s | 0,013 | 0 ms |
| `/ve-casa/` (có video) | 99 / 100 / 100 / 100 | 1,8 s | 0 | 0 ms |
| `/en/` | 99 / 100 / 100 / 100 | 1,9 s | 0,055 | 0 ms |

Đạt mục tiêu: từ 90 điểm, ảnh đầu trang dưới 2,5 giây. Trang Kim Mã sát ngưỡng (2,4 s). Đo lại bằng PageSpeed trên tên miền thật trong tuần đầu sau ngày chuyển; nếu LCP vượt 2,5 s thì giảm kích thước ảnh đầu trang cơ sở.
