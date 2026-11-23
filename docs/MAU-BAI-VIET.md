# Mẫu và quy tắc viết bài (cho người và agent)

Áp dụng cho bài trong `src/bai-viet/` (QUYET-DINH Q32). Lịch bài và từ khóa: `docs/SEO-KE-HOACH.md` và `docs/KE-HOACH-VAN-HANH.md`, mục 1E.

## 1. Tạo bài

Tạo thư mục `src/bai-viet/<mã-bài>/`. Mã bài là chữ thường không dấu, ví dụ `be-15-thang-di-nha-tre`. Trong thư mục có hai tệp `vi.md` và `en.md`.

Phần đầu `vi.md`:

```markdown
---
duongDan: be-15-thang-di-nha-tre
tieuDe: "Bé 15 tháng đi nhà trẻ: dấu hiệu sẵn sàng và cách chuẩn bị"
moTa: "Những dấu hiệu cho thấy bé 15 tháng đã sẵn sàng đi nhà trẻ, và ba mẹ nên chuẩn bị gì trước tuần đầu tiên."
h1: "Bé 15 tháng đi nhà trẻ: dấu hiệu sẵn sàng và cách chuẩn bị"
tom: "Năm dấu hiệu bé sẵn sàng và những việc ba mẹ làm trước tuần đầu."
ngay: "2026-12-08"
danVe: nursery
---

Đoạn mở đầu: 2–3 câu nói bài giúp phụ huynh điều gì.

## Tiêu đề mục

Nội dung…
```

`en.md` có cùng các mục, viết bằng tiếng Anh. `duongDan` riêng, ví dụ `starting-nursery-at-15-months`. Mục `ngay`, `danVe` và `ciputra` phải giống bản tiếng Việt.

| Mục | Bắt buộc | Quy tắc |
|---|---|---|
| `duongDan` | Có | Chữ thường không dấu, số, dấu `-`. Thành `/tin-tuc/<duongDan>/` và `/en/news/<duongDan>/` |
| `tieuDe` | Có | Tối đa 65 ký tự; có từ khóa chính; khác mọi trang khác |
| `moTa` | Có | 70–160 ký tự; khác mọi trang khác |
| `h1` | Có | Tiêu đề lớn trên trang |
| `tom` | Có | Một câu, hiện ở danh sách bài |
| `ngay` | Có | `"YYYY-MM-DD"` |
| `danVe` | Có | Trang bài dẫn về: `admissions`, `nursery`, `kindergarten`, `programmes` hoặc `campuses` |
| `ciputra` | Không | `true` nếu bài nói về Ciputra. Bài chỉ hiện khi công tắc Ciputra bật |
| `nguon` | Không | Danh sách `{ ten, url }`, ví dụ trang của Cambridge International |

Thiếu mục, mục quá dài hay thiếu bản tiếng Anh thì build dừng và báo lỗi tiếng Việt. Danh sách bài, sitemap và `hreflang` tự cập nhật.

Phần cuối bài (lời mời đăng ký tham quan, nút gọi hotline, liên kết về trang `danVe`) do khung trang tự thêm, không viết vào tệp.

## 2. Thân bài

- **Độ dài:** 700–1.200 chữ. Mở đầu 2–3 câu, rồi 3–6 mục `##`. Không dùng `#` (trang đã có tiêu đề lớn).
- **Liên kết trong bài:** ít nhất 2 liên kết tới trang của site, viết đường dẫn bắt đầu bằng `/`. Bài tiếng Anh trỏ tới trang `/en/…`.
- **Câu:** ngắn, dễ hiểu với phụ huynh không chuyên. Một ý một đoạn.
- **Bản tiếng Anh** dịch đúng nghĩa bản tiếng Việt, không thêm thông tin.

## 3. Quy tắc sự thật (không có ngoại lệ)

- **Nguồn:** chỉ dùng dòng "Đã chốt" trong Casa facts. Dòng "Dự kiến" phải kèm chữ "dự kiến". Dòng "Chưa có" không viết. Bản chép: `docs/NGUON-SU-THAT.md`.
- **Cách gọi tên** theo `CLAUDE.md`:
  - Cambridge chỉ viết "chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi".
  - "Quốc tế" chỉ viết "hệ quốc tế: mỗi lớp có giáo viên nước ngoài".
  - Gọi "bé, trẻ, con", không gọi "học sinh".
- **Không viết:**
  - học phí, sĩ số, "tốt nhất", "số 1";
  - tên hay lời chê trường khác;
  - tên hay câu chuyện của một bé cụ thể;
  - kế hoạch nội bộ của trường.
- **Hệ học theo cơ sở** (phiếu câu 10): Kim Mã có hệ song ngữ; Chùa Láng và Mỹ Đình có hệ quốc tế. Không viết cơ sở nào có hệ mà nó không có.
- **Bài về Ciputra:** đặt `ciputra: true`. Bài không có mục này thì không được nhắc Ciputra; bộ kiểm tra sẽ báo đỏ.

## 4. Trước khi gửi duyệt

1. `npm run check` đạt. Nếu bài có `ciputra: true`, chạy thêm `npm run check:ciputra`.
2. Agent Kiểm duyệt (một agent khác, chỉ đọc bài, Casa facts và tệp này) ghi **Đạt** hoặc **Trả về** kèm lý do cho từng mục:
   - đúng sự thật;
   - cách gọi tên;
   - không lộ thông tin trẻ;
   - không nhồi từ khóa;
   - hai bản dịch khớp nghĩa;
   - có liên kết về trang đích.
3. Đẩy lên nhánh riêng `bai/<mã-bài>`. Người phụ trách dự án xem bản thử, đồng ý thì gộp vào `main`. Ba tháng đầu không bài nào đăng khi chưa có người duyệt.
