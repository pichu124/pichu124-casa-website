// Một nguồn duy nhất cho thông tin bốn cơ sở (docs/KIEN-TRUC-THONG-TIN.md, mục 3).
// Giá trị null = chưa có thông tin đã chốt → giao diện hiện [CẦN: …], không suy đoán.
// Chương trình trong Casa facts là mô hình Ciputra; ba cơ sở cũ chờ phiếu câu 9–10.

export type Lang = 'vi' | 'en';
export type HaiNgu = { vi: string; en: string };

/** Có / không / chưa biết. Với Ciputra: 'du-kien' = có, theo kế hoạch. */
export type GiaTriLop = 'co' | 'khong' | 'du-kien' | null;

export interface CoSo {
  slug: string;
  ten: HaiNgu;
  trangThai: 'dang-tuyen-sinh' | 'sap-khai-truong';
  /** Địa chỉ hiển thị; null = chưa chốt */
  diaChi: HaiNgu | null;
  /** Địa chỉ ngắn cho thẻ, chân trang */
  diaChiNgan: HaiNgu | null;
  /** Chuỗi tìm trên Google Maps; null = không đặt liên kết bản đồ */
  banDo: string | null;
  /** Đủ để gắn schema Preschool (CLAUDE: chỉ khi có địa chỉ đầy đủ) */
  schema: { streetAddress: string; addressLocality: string } | null;
  lop: { nhaTre: GiaTriLop; songNgu: GiaTriLop; quocTe: GiaTriLop; tienTieuHoc: GiaTriLop };
}

export const CO_SO: CoSo[] = [
  {
    slug: 'kim-ma',
    ten: { vi: 'Kim Mã', en: 'Kim Mã' },
    trangThai: 'dang-tuyen-sinh',
    diaChi: { vi: '23 ngõ 294 Kim Mã, Hà Nội', en: '23, Lane 294 Kim Mã, Hanoi' },
    diaChiNgan: { vi: '23 ngõ 294 Kim Mã', en: '23, Lane 294 Kim Mã' },
    banDo: '23 ngõ 294 Kim Mã, Hà Nội',
    schema: { streetAddress: '23 ngõ 294 Kim Mã', addressLocality: 'Hà Nội' },
    lop: { nhaTre: null, songNgu: null, quocTe: null, tienTieuHoc: null },
  },
  {
    slug: 'chua-lang',
    ten: { vi: 'Chùa Láng', en: 'Chùa Láng' },
    trangThai: 'dang-tuyen-sinh',
    diaChi: null,
    diaChiNgan: null,
    banDo: null,
    schema: null,
    lop: { nhaTre: null, songNgu: null, quocTe: null, tienTieuHoc: null },
  },
  {
    slug: 'my-dinh',
    ten: { vi: 'Mỹ Đình', en: 'Mỹ Đình' },
    trangThai: 'dang-tuyen-sinh',
    diaChi: { vi: 'Tầng 3 tòa FLC, 36 Phạm Hùng, Hà Nội', en: '3rd floor, FLC Building, 36 Phạm Hùng, Hanoi' },
    diaChiNgan: { vi: 'Tầng 3 tòa FLC, 36 Phạm Hùng', en: '3rd floor, FLC Building, 36 Phạm Hùng' },
    banDo: 'Tòa FLC, 36 Phạm Hùng, Hà Nội',
    schema: { streetAddress: 'Tầng 3 tòa FLC, 36 Phạm Hùng', addressLocality: 'Hà Nội' },
    lop: { nhaTre: null, songNgu: null, quocTe: null, tienTieuHoc: null },
  },
  {
    slug: 'ciputra',
    ten: { vi: 'Ciputra', en: 'Ciputra' },
    trangThai: 'sap-khai-truong',
    diaChi: {
      vi: 'Tầng 3, tầng 4 và sân thượng của một tòa nhà 4 tầng, khu đô thị Ciputra, phường Phú Thượng, Hà Nội',
      en: '3rd and 4th floors and rooftop of a four-storey building, Ciputra urban area, Phú Thượng ward, Hanoi',
    },
    diaChiNgan: { vi: 'Khu đô thị Ciputra, phường Phú Thượng', en: 'Ciputra urban area, Phú Thượng ward' },
    banDo: null, // chưa có số nhà, tên tòa
    schema: null, // Casa facts: chỉ gắn schema khi có địa chỉ đầy đủ
    lop: { nhaTre: 'du-kien', songNgu: 'du-kien', quocTe: 'du-kien', tienTieuHoc: 'du-kien' },
  },
];

export const coSoTheoSlug = (slug: string) => CO_SO.find((c) => c.slug === slug);

export const linkBanDo = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
