// Tên hiển thị và logo (phiếu bổ sung thông tin, câu 3, 4, 9, 24 — 18/11/2026).
// Logo chính thức vẫn ghi "Casa dei Bambini – Montessori Preschool": dùng nguyên tệp, không sửa.
// Tên cũ giữ làm alternateName trong schema để Google nối với website cũ.
export const TEN = 'Casa Preschool';
export const TEN_CU = 'Casa dei Bambini';
export const KHAU_HIEU = { vi: 'Em bé hạnh phúc, Ba mẹ yên tâm', en: 'Happy children, carefree parents' };
export const LOGO = {
  ngang: { src: '/thuong-hieu/logo-primary.svg', rong: 681, cao: 283 },
  ngangTrang: { src: '/thuong-hieu/logo-primary-2.svg', rong: 681, cao: 283 },
  vuong: { src: '/thuong-hieu/logo-logomark.svg', rong: 291, cao: 283 },
  // alt khớp chữ thấy trên logo (WCAG 2.5.3)
  alt: 'Casa dei Bambini – Montessori Preschool',
};

/** Trạng thái Cambridge Early Years Centre (QUYET-DINH Q39; docs/CAMBRIDGE-HUONG-DAN.md).
 * Chứng nhận VN068 chỉ áp dụng cho cơ sở Chùa Láng: mọi câu nhắc trạng thái phải có tên Chùa Láng
 * (npm run check mục 3 báo đỏ nếu thiếu). Câu tiếng Anh theo câu mô tả Cambridge duyệt sẵn. */
export const CAMBRIDGE_CENTRE = {
  ma: 'VN068',
  cau: {
    vi: 'Cơ sở Chùa Láng là Trung tâm Cambridge Early Years được Cambridge chấp thuận (Cambridge Early Years Centre, mã VN068), đăng ký giảng dạy chương trình Cambridge Early Years cho trẻ 3–6 tuổi.',
    en: 'The Chùa Láng campus is an approved Cambridge Early Years Centre (centre number VN068), registered to offer the early years programme from the Cambridge Pathway.',
  },
};

/** Montessori là phần bổ trợ, chương trình chính là Cambridge Early Years (chủ trường, Q5 trong bản Kế hoạch, 26/11/2026; QUYET-DINH Q41). */
export const MONTESSORI_BO_TRO = {
  vi: 'Bên cạnh chương trình theo khung Cambridge Early Years, trường dùng phương pháp và giáo cụ Montessori để bổ trợ cho quá trình học tập của bé.',
  en: 'Alongside the programme based on the Cambridge Early Years framework, the school uses Montessori methods and materials to support children’s learning.',
};
