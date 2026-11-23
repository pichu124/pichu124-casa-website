// Một nguồn duy nhất cho thông tin bốn cơ sở (docs/KIEN-TRUC-THONG-TIN.md, mục 3).
// Giá trị null = chưa có thông tin đã chốt → giao diện hiện [CẦN: …], không suy đoán.
// Lớp và hệ ở ba cơ sở cũ: phiếu câu 10 (18/11/2026); Ciputra theo Casa facts (dự kiến).

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

/**
 * Công tắc công bố cơ sở Ciputra (QUYET-DINH Q30).
 * false: bản dựng không có trang, liên kết hay chữ "Ciputra" nào (npm run check báo đỏ nếu sót).
 * Chỉ đổi thành true khi người phụ trách dự án báo chạy chính thức.
 * Xem trước bản có Ciputra mà không đổi tệp: CASA_CIPUTRA=1 npm run build
 */
export const CIPUTRA_CONG_KHAI: boolean = false || process.env.CASA_CIPUTRA === '1';

const TAT_CA_CO_SO: CoSo[] = [
  // Địa chỉ, lớp và hệ: phiếu bổ sung thông tin câu 6, 7, 10 (18/11/2026)
  {
    slug: 'kim-ma',
    ten: { vi: 'Kim Mã', en: 'Kim Mã' },
    trangThai: 'dang-tuyen-sinh',
    diaChi: { vi: 'Số 23, ngõ 294 Kim Mã, Hà Nội', en: 'No. 23, Lane 294 Kim Mã, Hanoi' },
    diaChiNgan: { vi: 'Số 23, ngõ 294 Kim Mã', en: 'No. 23, Lane 294 Kim Mã' },
    banDo: '23 ngõ 294 Kim Mã, Hà Nội',
    schema: { streetAddress: 'Số 23, ngõ 294 Kim Mã', addressLocality: 'Hà Nội' },
    lop: { nhaTre: 'co', songNgu: 'co', quocTe: 'khong', tienTieuHoc: 'co' },
  },
  {
    slug: 'chua-lang',
    ten: { vi: 'Chùa Láng', en: 'Chùa Láng' },
    trangThai: 'dang-tuyen-sinh',
    diaChi: {
      vi: 'Tầng 1–2, sảnh A1, tòa HongKong Tower, 185 Huỳnh Thúc Kháng, phường Láng, Hà Nội',
      en: '1st–2nd floors, Lobby A1, HongKong Tower, 185 Huỳnh Thúc Kháng, Láng ward, Hanoi',
    },
    diaChiNgan: { vi: 'Tòa HongKong Tower, 185 Huỳnh Thúc Kháng', en: 'HongKong Tower, 185 Huỳnh Thúc Kháng' },
    banDo: 'HongKong Tower, 185 Huỳnh Thúc Kháng, Hà Nội',
    schema: { streetAddress: 'Tầng 1–2, sảnh A1, tòa HongKong Tower, 185 Huỳnh Thúc Kháng, phường Láng', addressLocality: 'Hà Nội' },
    lop: { nhaTre: 'co', songNgu: 'khong', quocTe: 'co', tienTieuHoc: 'co' },
  },
  {
    slug: 'my-dinh',
    ten: { vi: 'Mỹ Đình', en: 'Mỹ Đình' },
    trangThai: 'dang-tuyen-sinh',
    diaChi: { vi: 'Tầng 3, tòa FLC Complex, số 36 Phạm Hùng, Hà Nội', en: '3rd floor, FLC Complex, 36 Phạm Hùng, Hanoi' },
    diaChiNgan: { vi: 'Tầng 3, tòa FLC Complex, 36 Phạm Hùng', en: '3rd floor, FLC Complex, 36 Phạm Hùng' },
    banDo: 'FLC Complex, 36 Phạm Hùng, Hà Nội',
    schema: { streetAddress: 'Tầng 3, tòa FLC Complex, số 36 Phạm Hùng', addressLocality: 'Hà Nội' },
    lop: { nhaTre: 'co', songNgu: 'khong', quocTe: 'co', tienTieuHoc: 'co' },
  },
  {
    slug: 'ciputra',
    ten: { vi: 'Ciputra', en: 'Ciputra' },
    trangThai: 'sap-khai-truong',
    diaChi: {
      vi: 'Tầng 2, tầng 3 và sân thượng tòa Block 1, khu đô thị Ciputra, phường Phú Thượng, Hà Nội',
      en: '2nd and 3rd floors and rooftop of Block 1, Ciputra urban area, Phú Thượng ward, Hanoi',
    },
    diaChiNgan: { vi: 'Khu đô thị Ciputra, phường Phú Thượng', en: 'Ciputra urban area, Phú Thượng ward' },
    banDo: null, // Casa facts 21/11/2026: tầng 2, tầng 3, sân thượng tòa Block 1; chưa có số nhà
    schema: null, // Casa facts: chỉ gắn schema khi có địa chỉ đầy đủ
    lop: { nhaTre: 'du-kien', songNgu: 'du-kien', quocTe: 'du-kien', tienTieuHoc: 'du-kien' },
  },
];

/** Các cơ sở được công bố trên bản dựng này. */
export const CO_SO: CoSo[] = TAT_CA_CO_SO.filter((c) => c.slug !== 'ciputra' || CIPUTRA_CONG_KHAI);

export const coSoTheoSlug = (slug: string) => CO_SO.find((c) => c.slug === slug);

export const linkBanDo = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
