# Sổ quyết định

Những quyết định chuyên môn Claude tự đưa ra theo phân quyền trong `CLAUDE.md`. Mỗi dòng ghi lý do và cách đổi. Người phụ trách dự án có thể đổi bất kỳ quyết định nào; khi đổi thì ghi thêm một dòng mới, không xoá dòng cũ.

Quyết định ở đây không được trái với "Quy tắc cứng" và không thay cho sự thật do nhà trường cung cấp.

| # | Ngày | Quyết định | Lý do |
|---|---|---|---|
| Q1 | 15/11/2026 | Cây trang và đường dẫn theo `docs/KE-HOACH-WEBSITE.md`, mục 3. Đường dẫn không dấu | Mỗi trang trả lời một nhu cầu của phụ huynh; đường dẫn không dấu chia sẻ qua Zalo, Facebook không lỗi |
| Q2 | 15/11/2026 | Hành động chính: đăng ký tham quan. Hành động phụ: gọi hotline. Trên điện thoại, hai nút này luôn hiện ở đáy màn hình | Phụ huynh mầm non quyết định sau khi tận mắt xem trường; phần lớn họ xem trên điện thoại |
| Q3 | 15/11/2026 | Dùng Astro xuất site tĩnh, không JS phía trình duyệt; form gửi bằng HTML thường | Đúng quy tắc site tĩnh; nhanh; form vẫn chạy khi tắt JS |
| Q4 | 15/11/2026 | Form có lựa chọn "Ciputra", ghi là nhận thông tin khi có lịch tham quan, kèm chữ "dự kiến khai trương quý 4/2027" | Giữ được phụ huynh quan tâm cơ sở mới mà không hứa ngày mở |
| Q5 | 15/11/2026 | Không dùng Google Analytics hay công cụ đặt cookie. Số đăng ký mỗi tháng đếm từ tệp dữ liệu form; nếu cần số lượt xem thì đọc nhật ký máy chủ, không theo dõi người xem | Không phải hiện hộp xin đồng ý theo Nghị định 13/2023; site nhanh hơn |
| Q6 | 15/11/2026 | Bỏ trang Nội quy và trang giới thiệu hệ thống liên lạc điện tử (app); đường dẫn cũ 301 về Tuyển sinh và Về Casa | Nội quy và app dành cho gia đình đang học, không giúp phụ huynh mới quyết định; giữ site tách khỏi app |
| Q7 | 15/11/2026 | Không làm trang Tuyển dụng riêng; `/tuyen-dung/` 301 về Liên hệ | Site phục vụ tuyển sinh; trang tuyển dụng cũ còn bị ghép nhầm với bản tiếng Anh "Admissions" |
| Q8 | 15/11/2026 | Bài viết cũ chỉ được viết lại khi nội dung khớp `docs/NGUON-SU-THAT.md` và quy tắc tên gọi. Ba bài ứng viên: triết lý giáo dục sớm tại Úc, phát triển giác quan, 5 lĩnh vực phát triển | Bài cũ nhiều chỗ lệch với thông tin hiện nay |
| Q9 | 15/11/2026 | Không có trang quản trị. Bài mới do nhà trường gửi nội dung, Claude đưa lên. Chỉ xem lại nếu nhà trường cần tự đăng bài thường xuyên (hỏi trong phiếu) | Đúng quy tắc site tĩnh; ít lỗ hổng bảo mật |
| Q10 | 15/11/2026 | Câu giới thiệu đầu trang chủ do Claude đề xuất trong bản thiết kế, chỉ dùng thông tin đã chốt | Nhà trường chưa có khẩu hiệu; việc viết câu chữ là chuyên môn |
| Q11 | 15/11/2026 | Các URL "Cầu Giấy" của site cũ tạm 301 về `/co-so/` cho tới khi nhà trường xác nhận đó là cơ sở nào | Không đoán cơ sở; `/co-so/` luôn đúng |
| Q12 | 15/11/2026 | Nội dung soạn sẵn trên Docs (trang Ciputra, FAQ, Bài 1) được dùng khi dựng trang ở Giai đoạn 3, rồi gửi chủ trường xác nhận đúng sự thật cùng các trang khác | Gom một lần xác nhận nội dung, không hỏi rải rác |
| Q13 | 15/11/2026 | Trang chương trình 3–6 tuổi đổi tên thành "Mẫu giáo 3–6 tuổi", đường dẫn `/chuong-trinh/mau-giao/` · `/en/programmes/kindergarten/` (thay cho `/chuong-trinh/cambridge-early-years/`). `<h1>` vẫn dùng đúng câu "chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi" | Nhãn theo tuổi dễ hiểu với phụ huynh; tránh trang chương trình tranh từ khoá với Bài 1; tên trang và đường dẫn không chứa chữ Cambridge |
| Q14 | 15/11/2026 | Menu chính có 4 mục (Chương trình, Các cơ sở, Tuyển sinh, Về Casa) và nút "Đăng ký tham quan". Bài viết và Liên hệ nằm ở chân trang và trong menu điện thoại; Bài viết lên menu chính khi có từ 6 bài | Ít lựa chọn thì phụ huynh mới vào dễ chọn đúng; tránh mục menu dẫn tới trang gần như trống |
| Q15 | 15/11/2026 | `npm run check` thêm một mục: báo đỏ trang mồ côi (không trang nào dẫn tới, trừ Cảm ơn và 404). Mỗi bài viết phải có đủ hai thứ tiếng | Siết thêm bộ kiểm tra, không nới; giữ `hreflang` luôn khớp cặp |
| Q16 | 15/11/2026 | Trên VPS dùng Caddy (đang có sẵn) thay cho nginx trong kế hoạch ban đầu. Site thêm tệp `/etc/caddy/sites/casa-website.caddy` và một dòng `import` cuối Caddyfile; bảng chuyển hướng sinh thêm bản Caddy (`deploy/redirects.caddy`) | Máy `casamamon` đã chạy Caddy giữ cổng 80/443 cho app; cài nginx sẽ tranh cổng và làm app ngừng. Caddy tự cấp HTTPS, có sẵn mật khẩu xem và thêm header |
