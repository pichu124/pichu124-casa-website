# Kế hoạch SEO tuyển sinh: bản đối chiếu với site

Cập nhật 23/11/2026.

- **Nguồn kế hoạch:** tài liệu "Kế hoạch SEO tuyển sinh – tóm tắt cho repo website" trong Project Casa (https://claude.ai/artifact/LkUV8wqL7UZW9myu5BbBew).
- **Tệp này làm gì:** chép phần liên quan tới website, đổi đường dẫn đề xuất thành đường dẫn thật, ghi các chỗ vênh.
- **Khi lệch:** quyết định của chủ trường và Casa facts thắng (xem `CLAUDE.md`).

Không ghi học phí, sĩ số hay số liệu kinh doanh vào tệp này.

## 1. Chỉ số đo phần website

Thước đo cuối cùng là **số bé nhập học đến từ tìm kiếm và Google Maps**. Nhà trường đo con số này bằng câu "Anh/chị biết Casa qua đâu?" trên phiếu nhập học. Site không thu thêm trường thông tin nào ngoài 5 mục đã chốt.

| Chỉ số | Lấy ở đâu | Ai lấy |
|---|---|---|
| Đăng ký tham quan theo tháng và theo cơ sở | Tệp dữ liệu form trên VPS (lệnh ở mục 5) | Người quản trị VPS |
| Lượt nhấp, lượt hiển thị, từ khóa, trang lỗi | Search Console | Người phụ trách SEO, sau khi cài (hướng dẫn: https://claude.ai/artifact/AK4KJ2JLwxMBXpDAAhHnh2) |
| Trang đã lập chỉ mục | Search Console | Như trên. Đích: 100% trang công khai; 0 trang của app |
| Tốc độ | PageSpeed trên điện thoại | Claude, mỗi lần đổi giao diện. Đích: từ 90 điểm, ảnh đầu trang dưới 2,5 giây |
| URL cũ còn thứ hạng | Search Console + `docs/URL-CU.csv` | Kiểm 4 tuần sau ngày chuyển tên miền (Giai đoạn 6) |

Không dùng Google Analytics hay cookie (Q5). Mục tiêu số đăng ký chốt sau 2 tháng có số liệu thật.

## 2. Từ khóa và trang đích thật trên site

Đường dẫn trong tài liệu Project Casa là đề xuất. Cấu trúc chốt ở Giai đoạn 2 (Q1, Q13) là:

| Tài liệu đề xuất | Trang thật trên site |
|---|---|
| `/co-so-ciputra/` | `/co-so/ciputra/` · `/en/campuses/ciputra/` |
| `/dang-ky-tham-quan/` | `/tuyen-sinh/` (form ở `#dang-ky`) · `/en/admissions/` |
| `/tien-tieu-hoc/` | `/chuong-trinh/mau-giao/#tien-tieu-hoc` · `/en/programmes/kindergarten/#tien-tieu-hoc` |
| Trang chương trình nhà trẻ | `/chuong-trinh/nha-tre/` · `/en/programmes/nursery/` |
| Trang chương trình 3–6 tuổi | `/chuong-trinh/mau-giao/` · `/en/programmes/kindergarten/` |
| Bài viết | `/tin-tuc/<ten-bai>/` · `/en/news/<slug>/` |

Bảng từ khóa và trang đích:

| Nhóm | Từ khóa chính | Trang đích | Tình trạng trên site |
|---|---|---|---|
| Cơ sở | mầm non Ciputra; trường mầm non gần Ciputra | `/co-so/ciputra/` | Có. Tiêu đề đổi 23/11 thành "Mầm non Ciputra (Phú Thượng) – Casa Preschool…" |
| Cơ sở | mầm non bán trú Ciputra | `/co-so/ciputra/` qua bài 8 | Trang có; bài chưa viết |
| Cơ sở | mầm non Kim Mã / Chùa Láng / Mỹ Đình | `/co-so/kim-ma/`, `/co-so/chua-lang/`, `/co-so/my-dinh/` | Có, tiêu đề dạng "Mầm non <cơ sở> – Casa Preschool (<địa chỉ>)". URL cũ 301 về đây |
| Độ tuổi | nhà trẻ cho bé 15 tháng | `/chuong-trinh/nha-tre/` và mục nhà trẻ trang Ciputra | Có |
| Độ tuổi | chuẩn bị cho con vào lớp 1; lớp tiền tiểu học | `/chuong-trinh/mau-giao/#tien-tieu-hoc` qua bài 7 | Mục có; bài chưa viết |
| Chương trình | Cambridge Early Years là gì | `/tin-tuc/cambridge-early-years-la-gi/` (bài 1) | Đã đăng trên bản thử. **Chờ quyết định về chữ Cambridge** (mục 3) |
| Chương trình | mầm non Cambridge Hà Nội / Ciputra | Không nhắm cho tới khi có quyết định | Không có trang nào lấy cụm này làm tiêu đề |
| Chương trình | lớp trộn tuổi Montessori | `/chuong-trinh/nha-tre/` qua bài 4 | Mục có; bài chưa viết |
| Chương trình | mầm non song ngữ hay quốc tế | `/chuong-trinh/` (bảng so sánh hai hệ) qua bài 5 | Có |
| Chương trình | cho bé học tiếng Anh mầm non | `/co-so/ciputra/` qua bài 11 | Bài chưa viết |
| Khu vực | mầm non Phú Thượng; gần Starlake, Nam Thăng Long, Ngoại Giao Đoàn, Xuân La | Một bài (bài 2) → `/co-so/ciputra/` | Không làm trang riêng cho từng khu |
| Thời điểm | tuyển sinh mầm non 2027 | `/tuyen-sinh/` qua bài 10 | Bài chưa viết |
| Tiếng Anh | preschool Ciputra Hanoi; nursery from 15 months Hanoi | `/en/campuses/ciputra/`, `/en/programmes/nursery/` | Có. Tiêu đề EN trang Ciputra đổi 23/11 |
| Không nhắm | mầm non quốc tế Ciputra; học phí mầm non Ciputra | — | Không dùng chữ "quốc tế" làm tên; chưa có học phí |

Quy tắc nối trang:

- Mỗi bài kết thúc bằng một liên kết tới trang cơ sở hoặc `/tuyen-sinh/`.
- Bài 1 là bài nền: bài 6, 7, 11 và trang Ciputra cùng dẫn về bài 1.
- Không tạo hàng loạt trang giống nhau chỉ đổi tên phường.

## 3. Chỗ vênh giữa kế hoạch, Casa facts và site

| # | Chỗ vênh | Site đang làm | Ai quyết |
|---|---|---|---|
| V1 | **Chữ Cambridge.** Tài liệu SEO dẫn Handbook 2026–2027 của Cambridge: không dùng chữ "Cambridge" trong tên hoặc phần mô tả trường. Casa facts chưa sửa, vẫn cho viết "chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi" | Giữ đúng cách viết của Casa facts trên trang chương trình và bài 1. Bỏ chữ Cambridge khỏi tiêu đề trang Ciputra (trang mô tả trường) để giảm rủi ro. Bộ canh chặn thêm "Đại học Cambridge" | **Đã giải quyết 26/11/2026 (QUYET-DINH Q39):** hướng dẫn của Cambridge chỉ cấm chữ Cambridge trong **tên** trường; cơ sở Chùa Láng là Cambridge Early Years Centre (VN068) và được viết câu trạng thái theo mẫu Cambridge (`docs/CAMBRIDGE-HUONG-DAN.md`). Có thể nhắm từ khóa "mầm non Cambridge Chùa Láng / Láng Hạ" cho trang Chùa Láng và bài tin |
| V2 | **Tên thương hiệu.** Tài liệu SEO và Casa facts còn ghi "Casa dei Bambini". Nhà trường đã xác nhận tên hiển thị "Casa Preschool" (phiếu câu 3–4, 18/11) | Dùng "Casa Preschool"; "Casa dei Bambini" ở logo và `alternateName` (Q18, Q22) | Chủ trường sửa tệp quyết định và Casa facts cho khớp. Tên bài 9 và 12 viết theo tên đã sửa |
| V3 | **Nhận bé từ 12 tháng.** Casa facts (15/11) ghi "có thể nhận từ 12 tháng nếu bé đạt yêu cầu" là Đã chốt; tài liệu SEO ghi "trường trao đổi với từng gia đình". Phiếu câu 12 (18/11) bảo chưa công bố | Không viết. Bộ canh vẫn chặn "từ 12 tháng" (Q21) | Chủ trường chọn một câu. Khi đã chọn, sửa Q21 và bộ canh theo quyết định đó, không tự nới |
| V4 | **Việc đổi site.** Tài liệu SEO ghi "chưa chốt" | Site mới đã chạy bản thử trên VPS, form đã hoạt động; chưa đổi tên miền | Chủ trường chốt ngày đổi tên miền (Giai đoạn 6) |
| V5 | **Pháp nhân.** Casa facts ghi pháp nhân trên website cũ là một công ty cổ phần | Chân trang ghi "Trường mầm non Casa Preschool" (phiếu câu 17, Q24) | Không đổi; chờ rà pháp lý chính sách dữ liệu |
| V6 | **Địa chỉ Chùa Láng.** Casa facts còn ghi hai dạng | Dùng dạng phiếu: Tòa HongKong Tower, 185 Huỳnh Thúc Kháng | Chủ trường cập nhật Casa facts; Google Maps phải ghi giống hệt |
| V7 | **Câu định vị** "Trường mầm non Cambridge trong lòng Ciputra…" | Không dùng (dính V1 và học phí) | Chủ trường |

Các việc tài liệu SEO còn ghi "chờ" nhưng thực tế đã xong (để Project Casa cập nhật):

- quyền DNS;
- quyền quản trị WordPress;
- logo, màu, ảnh cơ sở và giáo viên (đồng ý 19/11);
- thông tin VPS (máy dùng Caddy, không dùng nginx);
- tên các cơ sở ("Cầu Giấy" là Chùa Láng, Q20);
- tên đơn vị ở chân trang.

## 4. Quy trình đăng bài trên site mới

Theo nguyên tắc của kế hoạch: agent soạn, agent khác kiểm, người duyệt, máy đăng. Trên repo này, các bước là:

1. **Thứ Ba – Agent Nội dung** soạn một bài trên một nhánh riêng, gồm:
   - bản tiếng Việt và bản tiếng Anh (bắt buộc, Q15);
   - một liên kết tới trang cơ sở hoặc `/tuyen-sinh/`;
   - mục trong `docs/URL-CU.csv` nếu bài thay một bài cũ.
2. **Agent Kiểm duyệt** chỉ đọc bản nháp, Casa facts và `docs/NGUON-SU-THAT.md`, rồi ghi **Đạt** hoặc **Trả về** kèm lý do.
3. **`npm run check` phải qua.** Bộ canh sự thật không được nới để bài qua; đỏ thì sửa bài.
4. **Thứ Tư – người duyệt** xem bản thử rồi đồng ý gộp. Theo `CLAUDE.md`, gộp vào nhánh chính cần người phụ trách dự án xác nhận. Đăng nội dung chưa xác nhận cần chủ trường.
5. **Thứ Năm** người quản trị chạy `deploy/cap-nhat-ban-thu.sh` (sau Giai đoạn 6 là bản chính).

Quyền tự đăng:

- 3 tháng đầu, không gì được đăng khi chưa có người duyệt.
- Sau đó chỉ các sửa kỹ thuật nhỏ (meta, link hỏng, ảnh nén) được bỏ bước người duyệt khi Agent Kiểm duyệt cho đạt. Việc đưa lên máy chủ vẫn do người quản trị chạy.

Giới hạn và ghi chú:

- **Một bài mỗi tuần**, để người duyệt theo kịp.
- **Agent Kỹ thuật** (ngày 1 hằng tháng) không chạy được từ máy chủ đám mây. Ngày 23/11/2026 mạng của phiên đám mây chặn cả bản thử `casa-website-thu.duckdns.org`. Agent cần chạy trên máy của trường, hoặc nhờ người phụ trách cho phép tên miền đó trong cài đặt mạng của môi trường.
- **Để agent soạn bài dễ hơn**, nên chuyển bài viết sang dạng Markdown, mỗi bài một tệp với tiêu đề, mô tả, ngày và cặp tiếng. Hiện mỗi bài là một trang `.astro` viết tay. Việc này làm trước bài thứ hai (đề xuất, chưa làm).

## 5. Báo cáo hằng tháng (mẫu)

Gửi đầu tháng cho ban giám hiệu, một trang.

**1. Đăng ký tham quan qua website.** Ghi số lượt theo từng cơ sở, theo "biết Casa qua đâu" và theo nguồn truy cập (từ 26/11/2026, QUYET-DINH Q42), so với tháng trước. Người quản trị lấy số trên VPS bằng lệnh dưới đây. Lệnh chỉ đếm, không in tên hay số điện thoại.

```bash
sudo -u casa-form node -e 'const f="/var/lib/casa-website/dang-ky.jsonl";const fs=require("fs");if(!fs.existsSync(f)){console.log("Chưa có đăng ký nào.");process.exit(0)}const d={},q={},n={};for(const l of fs.readFileSync(f,"utf8").split("\n").filter(Boolean)){const r=JSON.parse(l);const t=r.thoi_gian.slice(0,7);const a=t+"  "+r.co_so,b=t+"  "+(r.biet_qua||"(không chọn)"),c=t+"  "+(r.nguon||"(không rõ)");d[a]=(d[a]||0)+1;q[b]=(q[b]||0)+1;n[c]=(n[c]||0)+1}console.log("Theo cơ sở:");console.table(d);console.log("Biết Casa qua:");console.table(q);console.log("Nguồn truy cập:");console.table(n)'
```

**1b. Nguồn khách ngoài website.** Bộ phận tuyển sinh hỏi mọi phụ huynh liên hệ (điện thoại, Zalo, form) "Anh/chị biết Casa qua đâu?" và ghi vào hệ thống quản lý tuyển sinh; mỗi tháng gửi số đếm theo nguồn (Google, Google Maps, Facebook, Zalo, người quen, đi ngang qua, khác). Đây là số chính xác nhất.

**1c. Google Maps** (Thông tin chi tiết của từng hồ sơ): số cuộc gọi, số lượt chỉ đường, số lượt bấm vào website, số lượt xem hồ sơ; số đánh giá mới.

**2. Search Console** (sau khi cài):

- lượt nhấp, lượt hiển thị;
- 10 từ khóa có nhiều lượt nhấp nhất;
- trang bị lỗi 404 hoặc chưa được lập chỉ mục.

**3. Bài đã đăng trong tháng**, kèm bài đang chờ duyệt.

**4. Việc chờ** chủ trường hoặc nhà trường đang chặn SEO (xem mục 3).

**5. Đề xuất tháng sau**, tối đa 3 việc.
