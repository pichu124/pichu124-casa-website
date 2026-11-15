# Kiến trúc thông tin

Lập ngày 15/11/2026. Tài liệu này tiếp nối `docs/KE-HOACH-WEBSITE.md` và các quyết định trong `docs/QUYET-DINH.md`. Nếu đường dẫn hay tên trang ở đây lệch với các tài liệu cũ hơn, theo tài liệu này.

**Đầu vào**

| Mục | Nội dung |
|---|---|
| Loại website | Website tuyển sinh của một hệ thống mầm non bốn cơ sở, hai thứ tiếng, site tĩnh |
| Người xem | Phụ huynh có con từ 15 tháng đến 6 tuổi, lần đầu tìm hiểu Casa, phần lớn xem trên điện thoại |
| Nội dung và điều trường mang lại | Chương trình 3–6 tuổi theo khung Cambridge Early Years, nhà trẻ 15–36 tháng, hai hệ song ngữ và quốc tế, bốn cơ sở, nội dung soạn sẵn (trang Ciputra, FAQ, Bài 1), tư liệu trang cũ |
| Hành động chuyển đổi chính | Đăng ký tham quan |
| Số mục menu chính tối đa | 5, gồm 4 mục chữ và 1 nút "Đăng ký tham quan" (QUYET-DINH Q14) |

---

## 1. Sơ đồ trang

Phụ huynh tìm trường theo hai câu hỏi đầu tiên: "con mình học gì ở tuổi này" và "cơ sở nào gần mình". Vì vậy hai nhánh chính là **Chương trình (theo tuổi)** và **Các cơ sở (theo nơi)**. Hai nhánh này đều dẫn về **Tuyển sinh**, nơi có form.

```
Trang chủ  /                                   [bắt buộc]
│
├── Chương trình  /chuong-trinh/               [bắt buộc]  ý định: con học gì
│   ├── Nhà trẻ 15–36 tháng  /chuong-trinh/nha-tre/          [bắt buộc]
│   └── Mẫu giáo 3–6 tuổi  /chuong-trinh/mau-giao/           [bắt buộc]
│
├── Các cơ sở  /co-so/                         [bắt buộc]  ý định: học ở đâu
│   ├── Kim Mã  /co-so/kim-ma/                               [bắt buộc]
│   ├── Chùa Láng  /co-so/chua-lang/                         [bắt buộc]
│   ├── Mỹ Đình  /co-so/my-dinh/                             [bắt buộc]
│   └── Ciputra (sắp khai trương)  /co-so/ciputra/           [bắt buộc]
│
├── Tuyển sinh  /tuyen-sinh/                   [bắt buộc]  ý định: đăng ký
│   │   (quy trình, câu hỏi thường gặp, biểu phí, form ở #dang-ky)
│   └── Cảm ơn  /tuyen-sinh/cam-on/                          [bắt buộc, không lập chỉ mục]
│
├── Về Casa  /ve-casa/                         [bắt buộc]  ý định: có đáng tin không
│
├── Bài viết  /tin-tuc/                        [bắt buộc]  ý định: tìm hiểu sâu
│   └── Cambridge Early Years là gì  /tin-tuc/cambridge-early-years-la-gi/   [bắt buộc]
│
├── Liên hệ  /lien-he/                         [bắt buộc]  ý định: liên lạc ngay
├── Chính sách bảo vệ dữ liệu cá nhân  /chinh-sach-bao-ve-du-lieu/   [bắt buộc]
└── 404                                         [bắt buộc, không lập chỉ mục]
```

Bản tiếng Anh có cây giống hệt, mỗi trang tiếng Việt có đúng một trang tiếng Anh tương ứng:

| Tiếng Việt | Tiếng Anh |
|---|---|
| `/` | `/en/` |
| `/chuong-trinh/` | `/en/programmes/` |
| `/chuong-trinh/nha-tre/` | `/en/programmes/nursery/` |
| `/chuong-trinh/mau-giao/` | `/en/programmes/kindergarten/` |
| `/co-so/`, `/co-so/<ten>/` | `/en/campuses/`, `/en/campuses/<name>/` |
| `/tuyen-sinh/`, `/tuyen-sinh/cam-on/` | `/en/admissions/`, `/en/admissions/thank-you/` |
| `/ve-casa/` | `/en/about/` |
| `/tin-tuc/`, `/tin-tuc/<bai>/` | `/en/news/`, `/en/news/<article>/` |
| `/lien-he/` | `/en/contact/` |
| `/chinh-sach-bao-ve-du-lieu/` | `/en/privacy-policy/` |

Trang Bài viết giữ đường dẫn cũ `/tin-tuc/` để không mất thứ hạng tìm kiếm của site cũ; nhãn hiển thị là "Bài viết" (tiếng Anh: "Articles") vì nội dung là bài giải thích cho phụ huynh, không phải tin hoạt động.

Tên các cơ sở trong đường dẫn là tên đang dùng tạm, `[CẦN: nhà trường chốt tên thống nhất]`. Nếu tên đổi, đổi đường dẫn trước khi đăng.

### Trang có thể thêm sau (chưa làm)

Mỗi trang chỉ thêm khi có một nhu cầu riêng của phụ huynh mà trang hiện có chưa đáp ứng.

| Trang | Điều kiện để thêm |
|---|---|
| Biểu phí | Khi chủ trường quyết định công bố học phí |
| Một ngày ở Casa (trang riêng) | Khi có đủ ảnh đã được đồng ý và nội dung dài hơn một mục trong trang Chương trình |
| Ngày hội tham quan | Khi trường tổ chức buổi tham quan chung có lịch cố định |
| Tuyển dụng | Khi trường cần tuyển qua website (hiện đã quyết không làm, QUYET-DINH Q7) |
| Chuyên mục bài viết | Khi có từ 12 bài trở lên, đủ để chia nhóm |

## 2. Danh mục trang

Mỗi trang trả lời một câu hỏi khác nhau. Cột "Góc riêng" là thứ chỉ trang đó có; nếu hai trang trùng góc riêng thì một trong hai không cần tồn tại.

| Trang | Thuộc | Câu hỏi phụ huynh mang tới | Góc riêng (chỉ trang này có) | Hành động chính |
|---|---|---|---|---|
| Trang chủ | | "Casa là gì, có hợp với con mình không?" | Toàn cảnh hệ thống trong một màn hình: hai lối chọn theo tuổi và theo nơi, tóm tắt hai hệ, giờ học | Đăng ký tham quan |
| Chương trình | | "Ở mỗi tuổi con học gì, nên chọn hệ nào?" | Bảng so sánh hai hệ song ngữ và quốc tế; mục "Một ngày ở Casa" (giờ học, đón muộn, hè, 4 bữa, ngoại khoá) | Xem chương trình theo tuổi |
| Nhà trẻ 15–36 tháng | Chương trình | "Con còn nhỏ, trường chăm và dạy thế nào?" | Mô hình cho bé dưới 3 tuổi, ghi rõ cơ sở nào áp dụng mô hình nào; độ tuổi nhận | Đăng ký tham quan |
| Mẫu giáo 3–6 tuổi | Chương trình | "Ba năm mẫu giáo con được gì, có sẵn sàng vào lớp 1 không?" | Chương trình theo khung Cambridge Early Years ở Casa, lớp tiền tiểu học, hệ có ở từng cơ sở | Đăng ký tham quan |
| Các cơ sở | | "Cơ sở nào gần tôi, cơ sở nào có lớp cho con tôi?" | Bảng bốn cơ sở: địa chỉ, lớp và hệ có ở từng nơi, trạng thái | Xem cơ sở |
| Trang cơ sở (×4) | Các cơ sở | "Nơi con học trông thế nào, đi lại ra sao?" | Địa chỉ, bản đồ, ảnh cơ sở vật chất, lớp và hệ của riêng cơ sở; form điền sẵn tên cơ sở. Ciputra: tiến độ dự kiến và FAQ riêng | Đăng ký tham quan cơ sở này |
| Tuyển sinh | | "Đăng ký thế nào, học phí ra sao, cần chuẩn bị gì?" | Quy trình nhập học, câu hỏi thường gặp chung, "liên hệ để nhận biểu phí", form | Gửi đăng ký |
| Cảm ơn | Tuyển sinh | "Gửi được chưa, bao giờ trường gọi?" | Xác nhận và bước tiếp theo; nếu lỗi thì hiện hotline | Gọi hotline |
| Về Casa | | "Trường này có đáng tin không?" | Thông điệp, giá trị cốt lõi, đội ngũ, hành trình hơn 10 năm | Xem các cơ sở |
| Bài viết | | "Tôi muốn hiểu kỹ hơn trước khi chọn" | Danh sách bài giải thích cho phụ huynh | Đọc bài |
| Bài: Cambridge Early Years là gì | Bài viết | "Khung Cambridge Early Years là gì?" | Giải thích bản thân khung chương trình, không phải chương trình của Casa | Xem chương trình Mẫu giáo |
| Liên hệ | | "Gọi ai, gửi đâu?" | Mọi kênh liên lạc trên một trang, kèm việc nào nên liên hệ kênh nào | Gọi hotline |
| Chính sách dữ liệu | | "Thông tin tôi gửi được dùng thế nào?" | Bên kiểm soát dữ liệu, mục đích, thời gian lưu, quyền của phụ huynh | Không có |
| 404 | | "Trang tôi tìm đâu rồi?" | Lối về các trang chính | Về trang chủ |

## 3. Trang trùng hoặc chồng lấn, và cách xử lý

| Chồng lấn | Rủi ro | Cách xử lý |
|---|---|---|
| **Mẫu giáo 3–6 tuổi** và **bài "Cambridge Early Years là gì"** | Hai trang tranh nhau cùng một từ khoá; phụ huynh không biết đọc trang nào | Trang chương trình nói về **việc con học ở Casa**; bài viết giải thích **bản thân khung chương trình**. Hai trang có tiêu đề và `<h1>` khác nhau và dẫn qua lại. Đường dẫn trang chương trình đổi thành `/chuong-trinh/mau-giao/`, để từ khoá "Cambridge Early Years" thuộc về bài viết (QUYET-DINH Q13) |
| **Liên hệ**, **Các cơ sở** và **Tuyển sinh** | Ba trang cùng có địa chỉ, hotline | Địa chỉ đầy đủ chỉ nằm ở trang Các cơ sở và trang từng cơ sở. Liên hệ chỉ ghi tên cơ sở và dẫn sang đó. Tuyển sinh chỉ có hotline và form. Liên hệ không nằm trong menu chính |
| **Câu hỏi thường gặp** ở Tuyển sinh và ở trang Ciputra | Một câu hỏi xuất hiện hai nơi với hai câu trả lời lệch nhau | Mỗi câu hỏi chỉ nằm ở một nơi. Câu riêng về Ciputra ở trang Ciputra; câu chung ở Tuyển sinh. Schema `FAQPage` chỉ gắn ở nơi câu hỏi nằm |
| **Lớp và hệ có ở cơ sở nào**: hiện ở trang Chương trình, hai trang con, trang Các cơ sở và trang từng cơ sở | Sửa một chỗ quên chỗ khác | Một tệp dữ liệu duy nhất (cơ sở × lớp × hệ) sinh ra nội dung cho mọi trang khi build |
| **Trang chủ** và **Các cơ sở** đều có thẻ bốn cơ sở | Trang chủ thành bản sao của trang Các cơ sở | Trang chủ chỉ có tên cơ sở và một dòng; bảng so sánh đầy đủ chỉ có ở trang Các cơ sở |
| **Trang chủ** và **Chương trình** đều nói về hai hệ | Lặp nội dung | Trang chủ có hai câu tóm tắt; bảng so sánh chỉ có ở trang Chương trình |
| Trang "Đăng ký tham quan" riêng | Trùng với Tuyển sinh | Không làm trang riêng. Nút "Đăng ký tham quan" dẫn tới `/tuyen-sinh/#dang-ky`; trang cơ sở có form riêng điền sẵn tên cơ sở |
| **Bài viết** khi mới có 1–4 bài | Mục menu dẫn tới trang gần như trống, làm site trông bỏ bê | Chưa đưa Bài viết vào menu chính; dẫn từ chân trang và từ các trang liên quan. Đưa vào menu khi có từ 6 bài (QUYET-DINH Q14) |

Không có trang nào được thêm chỉ để nhắm thêm từ khoá. Các bài SEO theo địa bàn của site cũ ("trường mầm non Mỹ Đình", "…Ba Đình", "…Đống Đa") không làm lại: nhu cầu đó đã được trang từng cơ sở đáp ứng.

## 4. Menu đầu trang và chân trang

### Đầu trang, màn hình rộng

```
[Logo Casa dei Bambini]   Chương trình ▾   Các cơ sở ▾   Tuyển sinh   Về Casa      0989 059 838   VI | EN   [ Đăng ký tham quan ]
```

| Mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Trang con trong menu thả xuống |
|---|---|---|---|
| 1 | Chương trình | Programmes | Nhà trẻ 15–36 tháng · Mẫu giáo 3–6 tuổi |
| 2 | Các cơ sở | Campuses | Kim Mã · Chùa Láng · Mỹ Đình · Ciputra (sắp khai trương) |
| 3 | Tuyển sinh | Admissions | Không có |
| 4 | Về Casa | About Casa | Không có |
| Nút | Đăng ký tham quan | Book a visit | Dẫn tới `/tuyen-sinh/#dang-ky` |

- **Nhãn theo tuổi, không theo tên chương trình.** Phụ huynh biết con mình bao nhiêu tuổi, chưa chắc biết "Cambridge Early Years" là gì. Nhãn menu cũng không chứa chữ "Cambridge", nên tránh được việc bị hiểu thành "trường Cambridge".
- Menu thả xuống mở bằng CSS khi rê chuột hoặc khi chuyển tới bằng phím Tab, không cần JS. Bấm vào nhãn cha là vào trang cha thật, nên menu vẫn dùng được khi menu thả xuống không mở.
- Hotline là liên kết `tel:`. "VI | EN" dẫn tới **trang tương ứng** ở thứ tiếng kia, không dẫn về trang chủ.
- Trang đang xem được đánh dấu trong menu (`aria-current="page"`).

### Chân trang

| Cột 1: Các cơ sở | Cột 2: Tìm hiểu | Cột 3: Về trường | Cột 4: Liên hệ |
|---|---|---|---|
| Kim Mã: địa chỉ ngắn | Nhà trẻ 15–36 tháng | Về Casa | Hotline 0989 059 838 |
| Chùa Láng: `[CẦN: địa chỉ]` | Mẫu giáo 3–6 tuổi | Bài viết | tuyensinh@cdb.edu.vn |
| Mỹ Đình: địa chỉ ngắn | Tuyển sinh | Liên hệ | Facebook |
| Ciputra: dự kiến khai trương quý 4/2027 | Đăng ký tham quan | Chính sách bảo vệ dữ liệu cá nhân | Zalo `[CẦN: nếu có]` |

Dòng cuối chân trang: tên đơn vị `[CẦN: pháp nhân]` · © năm · VI | EN.

## 5. Đường đi từ trang chủ tới đăng ký

| Đường đi | Ai đi đường này | Các bước | Số lần bấm tới form |
|---|---|---|---|
| **A. Theo nơi (đường chính)** | Phụ huynh đã biết khu vực mình ở | Trang chủ → khối "Chọn cơ sở gần bạn" → trang cơ sở → form điền sẵn tên cơ sở ngay trên trang | 1 (form nằm cuối trang cơ sở) |
| B. Theo tuổi | Phụ huynh muốn biết con học gì trước | Trang chủ → khối "Con bạn bao nhiêu tuổi?" → Nhà trẻ hoặc Mẫu giáo → nút "Đăng ký tham quan" → form ở Tuyển sinh (chọn cơ sở) | 2 |
| C. Đã quyết | Phụ huynh được giới thiệu, đã muốn đến xem | Nút "Đăng ký tham quan" ở đầu trang hoặc thanh đáy điện thoại → form | 1 |
| D. Muốn nói chuyện | Phụ huynh thích gọi điện | Nút "Gọi" trên thanh đáy hoặc đầu trang | 1 |
| E. Hỏi học phí | Phụ huynh tìm học phí đầu tiên | Tuyển sinh → mục "Biểu phí": "liên hệ để nhận biểu phí", ngay cạnh form và nút gọi | 0 (form cùng trang) |

Mọi trang trừ Chính sách, Cảm ơn và 404 đều có ít nhất một nút dẫn tới form.

## 6. Kế hoạch liên kết nội bộ

### Quy tắc chung

1. **Mỗi trang nội dung kết thúc bằng một khối hành động:** nút "Đăng ký tham quan" và hotline. Trang cơ sở có form ngay trong khối này.
2. **Dòng đường dẫn** (Trang chủ › Các cơ sở › Kim Mã) ở mọi trang tầng 2, kèm schema `BreadcrumbList`.
3. **Chữ liên kết mô tả đích đến** ("Xem cơ sở Mỹ Đình", "Đọc: Cambridge Early Years là gì"), không dùng "bấm vào đây" hay "xem thêm".
4. **Trang tiếng Anh chỉ dẫn tới trang tiếng Anh.** Mỗi bài viết có đủ cả hai thứ tiếng, để `hreflang` luôn khớp cặp.
5. **Không có trang mồ côi:** bộ kiểm tra `npm run check` báo đỏ nếu một trang không được trang nào dẫn tới (trừ Cảm ơn và 404).

### Bảng liên kết

| Từ trang | Dẫn tới | Lý do |
|---|---|---|
| Trang chủ | 4 trang cơ sở; Nhà trẻ; Mẫu giáo; Chương trình (so sánh hai hệ); Về Casa; Tuyển sinh | Hai lối chọn theo nơi và theo tuổi; lối tạo niềm tin |
| Chương trình | Nhà trẻ; Mẫu giáo; Các cơ sở | Từ tổng quan xuống chi tiết; xem hệ có ở đâu |
| Nhà trẻ | Trang các cơ sở có nhà trẻ; Ciputra (mô hình trộn tuổi); Tuyển sinh | Từ "học gì" sang "học ở đâu" |
| Mẫu giáo | Bài "Cambridge Early Years là gì"; trang các cơ sở có lớp mẫu giáo; phần so sánh hai hệ ở trang Chương trình; Tuyển sinh | Giải thích sâu nằm ở bài viết, không lặp lại trên trang |
| Các cơ sở | 4 trang cơ sở | |
| Trang cơ sở | Nhà trẻ và/hoặc Mẫu giáo (theo lớp có ở cơ sở); Các cơ sở; form tại chỗ | Hiểu chương trình mà không rời luồng đăng ký |
| Ciputra | Nhà trẻ; Mẫu giáo; Các cơ sở (cơ sở đang hoạt động); form (chọn Ciputra) | Phụ huynh cần trường ngay có lối sang cơ sở đang tuyển sinh |
| Tuyển sinh | Chính sách dữ liệu (cạnh ô đồng ý); Các cơ sở; Liên hệ | Bắt buộc theo Nghị định 13; giúp chọn cơ sở |
| Cảm ơn | Các cơ sở; Chương trình | Có việc để làm trong lúc chờ trường gọi |
| Về Casa | Các cơ sở; Chương trình; Tuyển sinh | Từ tin tưởng sang hành động |
| Bài "Cambridge Early Years là gì" | Mẫu giáo; Tuyển sinh | Đưa người đọc từ tìm hiểu sang trang chuyển đổi |
| Liên hệ | 4 trang cơ sở; Tuyển sinh | Địa chỉ chi tiết nằm ở trang cơ sở |
| 404 | Trang chủ; Chương trình; Các cơ sở; Tuyển sinh | |

## 7. Cách menu hoạt động trên điện thoại

Phần lớn phụ huynh xem trên điện thoại, nên đây là bố cục chính chứ không phải bản thu nhỏ.

**Đầu trang (dính trên cùng khi cuộn):**
```
[Logo]                         [EN]  [☎]  [☰ Menu]
```
- Nút menu có cả biểu tượng và chữ "Menu", vì không phải phụ huynh nào cũng hiểu biểu tượng ba gạch.
- Nút "EN" ("VI" trên trang tiếng Anh) luôn hiện, không giấu trong menu.

**Bảng menu khi mở:** dùng thẻ `<details>`, không cần JS.
- Mở toàn màn hình. Các trang con hiện sẵn dưới nhãn cha, không có menu xếp tầng bấm thêm một lần nữa mới mở.
- Thứ tự: Chương trình (Nhà trẻ 15–36 tháng, Mẫu giáo 3–6 tuổi) · Các cơ sở (4 cơ sở) · Tuyển sinh · Về Casa · Bài viết · Liên hệ.
- Cuối bảng: nút lớn "Đăng ký tham quan" và "Gọi 0989 059 838".

**Thanh đáy màn hình (luôn hiện):**
```
[ ☎ Gọi ngay ]  [ Đăng ký tham quan ]
```
- Cao khoảng 56 px, chừa vùng an toàn của iPhone. Nút "Đăng ký tham quan" có màu nổi.
- Trên trang Cảm ơn không có thanh đáy (đã đăng ký rồi). Trên trang Tuyển sinh, nút đăng ký trên thanh đáy cuộn xuống form của chính trang.

**Kích thước và khả năng truy cập:**
- Mọi vùng bấm từ 44 × 44 px, chữ thân bài từ 16 px.
- Menu và form dùng được bằng bàn phím và trình đọc màn hình.
- Không có gì chỉ hiện khi rê chuột.
