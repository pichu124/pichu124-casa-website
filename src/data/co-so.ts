// Một nguồn duy nhất cho thông tin bốn cơ sở (docs/KIEN-TRUC-THONG-TIN.md, mục 3).
// Giá trị null = chưa có thông tin đã chốt → giao diện hiện [CẦN: …], không suy đoán.
// Lớp và hệ ở ba cơ sở cũ: phiếu câu 10 (18/11/2026); Ciputra theo Casa facts (dự kiến).

export type Lang = 'vi' | 'en';
export type HaiNgu = { vi: string; en: string };

/** Có / không / chưa biết. Với Ciputra: 'du-kien' = có, theo kế hoạch.
 * 'buoi-chieu' (chỉ cho tiền tiểu học): không có lớp riêng, bé 5–6 tuổi học chương trình tiền tiểu học buổi chiều (A6, 25/11/2026). */
export type GiaTriLop = 'co' | 'khong' | 'du-kien' | 'buoi-chieu' | null;

// Bữa ăn theo cơ sở (chủ trường phản hồi A6, 25/11/2026). Mọi bữa do bếp một chiều của trường tự nấu.
const BUA_4 = { so: 4, chiTiet: { vi: 'sáng, phụ sáng, trưa, phụ chiều', en: 'breakfast, morning snack, lunch, afternoon snack' } };
const BUA_5 = { so: 5, chiTiet: { vi: 'sáng, phụ sáng, trưa, phụ chiều và bữa sữa tươi lúc 16h', en: 'breakfast, morning snack, lunch, afternoon snack and fresh milk at 16:00' } };

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
  /** Bữa ăn mỗi ngày (chủ trường, A6 25/11/2026); null = chưa chốt */
  buaAn: { so: number; chiTiet: HaiNgu } | null;
  /** Mã Cambridge Early Years Centre nếu cơ sở đã đăng ký (chứng nhận VN068 chỉ cho Chùa Láng, QUYET-DINH Q39); null = không */
  maCambridge?: string | null;
  /** Thông tin thực tế cho phụ huynh, theo phiếu 6 câu của từng cơ sở (S7, 26/11/2026; QUYET-DINH Q40) */
  thucTe?: { duongDen: HaiNgu; guiXe: HaiNgu; donTra: HaiNgu; khongGian: HaiNgu; diemRieng: HaiNgu[] };
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
    lop: { nhaTre: 'co', songNgu: 'co', quocTe: 'khong', tienTieuHoc: 'buoi-chieu' },
    thucTe: {
      duongDen: { vi: 'Từ phố Kim Mã, rẽ vào ngõ 294/2 (đầu ngõ có quán Phê La Núi Trúc). Đi tiếp đến siêu thị Prolife sẽ thấy cổng chào "Cổng làng Vạn Phúc"; qua cổng khoảng 5 m, trường ở bên tay phải.', en: 'From Kim Mã street, turn into lane 294/2 (Phê La Núi Trúc is at the entrance of the lane). Continue to the Prolife supermarket and you will see the "Vạn Phúc village gate"; about 5 m past the gate, the school is on your right.' },
      guiXe: { vi: 'Ba mẹ nên đi xe máy; xe máy để ngay trước cổng trường. Ô tô vào được tới trường nhưng không có chỗ đỗ, nên nếu đi ô tô, ba mẹ nên dùng xe công nghệ.', en: 'We recommend coming by motorbike; motorbikes can park right in front of the school. Cars can reach the school but there is no parking, so if you come by car, a ride-hailing service is easiest.' },
      donTra: { vi: 'Cô đón và trả bé trong khuôn viên trường.', en: 'Teachers receive and hand over children inside the school grounds.' },
      khongGian: { vi: 'Sân chơi ngoài trời trong khuôn viên căn biệt thự, phòng thư viện và phòng nghệ thuật.', en: 'An outdoor playground within the villa grounds, a library room and an art room.' },
      diemRieng: [
        { vi: 'Không gian yên tĩnh, gần gũi: trường nằm trong khu Vạn Phúc, tách khỏi sự ồn ào của trục đường lớn, giúp bé thấy nhẹ nhàng, thân thiện mỗi ngày tới lớp.', en: 'A quiet, homely setting: the school is in the Vạn Phúc area, away from the noise of the main road, so children feel calm and at ease each day.' },
        { vi: 'Chăm sóc sát sao: lớp học ấm cúng giúp cô theo sát nhịp sinh hoạt, bữa ăn, giấc ngủ và cảm xúc của từng bé.', en: 'Close care: cosy classes let teachers follow each child’s routine, meals, sleep and feelings closely.' },
        { vi: 'Học qua trải nghiệm: hoạt động khám phá, ngôn ngữ và kỹ năng gần gũi với lứa tuổi mầm non; lớp nhà trẻ theo định hướng Montessori.', en: 'Learning through experience: exploration, language and skills activities suited to preschool age; nursery classes are guided by Montessori principles.' },
      ],
    },
    buaAn: BUA_4,
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
    thucTe: {
      duongDen: { vi: 'Trường ở tòa HongKong Tower (185 Huỳnh Thúc Kháng), ngay gần tòa Icon 4 Tower. Ba mẹ đi qua bốt bảo vệ rồi vào sảnh A1.', en: 'The school is in HongKong Tower (185 Huỳnh Thúc Kháng), right next to Icon 4 Tower. Pass the security booth and go into Lobby A1.' },
      guiXe: { vi: 'Xe máy và ô tô gửi dưới tầng hầm của tòa nhà.', en: 'Motorbikes and cars park in the building’s basement.' },
      donTra: { vi: 'Đón và trả bé ở sảnh tầng 1 hoặc tại tầng 2.', en: 'Children are received and handed over in the ground-floor lobby or on the 2nd floor.' },
      khongGian: { vi: 'Hai sân chơi trong nhà và phòng thư viện.', en: 'Two indoor play areas and a library room.' },
      diemRieng: [
        { vi: 'Thuận tiện đưa đón: trường nằm trong khu tòa nhà văn phòng và căn hộ, gửi xe ngay dưới hầm.', en: 'Easy drop-off and pick-up: the school is in an office and apartment building, with parking in the basement.' },
        { vi: 'Giáo viên nước ngoài toàn thời gian: lớp 3–6 tuổi học hệ quốc tế, mỗi lớp có giáo viên nước ngoài toàn thời gian cùng đội ngũ giáo viên tâm huyết, giúp bé làm quen tiếng Anh tự nhiên mỗi ngày.', en: 'A full-time foreign teacher: classes for ages 3–6 follow the international track, with a full-time foreign teacher in every class alongside a dedicated teaching team, so children get used to English naturally every day.' },
        { vi: 'Trung tâm Cambridge Early Years: cơ sở Chùa Láng được Cambridge chấp thuận là Trung tâm Cambridge Early Years (mã VN068).', en: 'A Cambridge Early Years Centre: the Chùa Láng campus is an approved Cambridge Early Years Centre (centre number VN068).' },
      ],
    },
    buaAn: BUA_5,
    maCambridge: 'VN068',
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
    thucTe: {
      duongDen: { vi: 'Trường ở tầng 3 tòa FLC Complex (36 Phạm Hùng), gần Bến xe Mỹ Đình.', en: 'The school is on the 3rd floor of FLC Complex (36 Phạm Hùng), near Mỹ Đình bus station.' },
      guiXe: { vi: 'Xe máy và ô tô gửi dưới tầng hầm của tòa nhà.', en: 'Motorbikes and cars park in the building’s basement.' },
      donTra: { vi: 'Đón và trả bé ở sảnh tầng 1 hoặc tại tầng 3.', en: 'Children are received and handed over in the ground-floor lobby or on the 3rd floor.' },
      khongGian: { vi: 'Hai khu vui chơi trong nhà, phòng thư viện và khu vui chơi ngoài trời.', en: 'Two indoor play areas, a library room and an outdoor play area.' },
      diemRieng: [
        { vi: 'Thuận tiện đưa đón: trường nằm trong khu tòa nhà văn phòng và căn hộ, gửi xe ngay dưới hầm.', en: 'Easy drop-off and pick-up: the school is in an office and apartment building, with parking in the basement.' },
        { vi: 'Giáo viên nước ngoài toàn thời gian: lớp 3–6 tuổi học hệ quốc tế, mỗi lớp có giáo viên nước ngoài toàn thời gian cùng đội ngũ giáo viên tâm huyết, giúp bé làm quen tiếng Anh tự nhiên mỗi ngày.', en: 'A full-time foreign teacher: classes for ages 3–6 follow the international track, with a full-time foreign teacher in every class alongside a dedicated teaching team, so children get used to English naturally every day.' },
        { vi: 'Chương trình theo khung Cambridge Early Years cho trẻ 3–6 tuổi: bé học qua chơi trong sáu lĩnh vực phát triển, trong đó có giao tiếp, ngôn ngữ và đọc viết.', en: 'A programme based on the Cambridge Early Years framework for children aged 3–6: children learn through play across six areas of development, including communication, language and literacy.' },
      ],
    },
    buaAn: BUA_5,
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
    buaAn: null,
  },
];

/** Các cơ sở được công bố trên bản dựng này. */
export const CO_SO: CoSo[] = TAT_CA_CO_SO.filter((c) => c.slug !== 'ciputra' || CIPUTRA_CONG_KHAI);

export const coSoTheoSlug = (slug: string) => CO_SO.find((c) => c.slug === slug);

export const linkBanDo = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
