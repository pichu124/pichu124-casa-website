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
