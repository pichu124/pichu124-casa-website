// Thông tin liên hệ: chép đúng theo CLAUDE.md. Không sửa nếu chưa có quyết định mới.
export const SITE = 'https://casadeibambini.edu.vn';

export const LIEN_HE = {
  hotline: '0989 059 838',
  hotlineQuocTe: '+84 989 059 838',
  tel: 'tel:+84989059838',
  telSchema: '+84989059838',
  email: 'tuyensinh@cdb.edu.vn',
  facebook: 'https://www.facebook.com/CasadeiBambiniSchools',
  facebookHienThi: 'facebook.com/CasadeiBambiniSchools',
  // Chưa có: để null thì giao diện hiện [CẦN: …]
  // Zalo: phiếu câu 25 (18/11/2026)
  zalo: 'https://zalo.me/3250239571046935262' as string | null,
  zaloSo: '0989 059 838',
  // Phiếu câu 17 (18/11/2026): web chỉ thể hiện tên truyền thông của trường, không ghi pháp nhân
  donVi: { vi: 'Trường mầm non Casa Preschool', en: 'Casa Preschool' } as { vi: string; en: string } | null,
  diaChiDonVi: {
    vi: 'Tầng 1–2, sảnh A1, tòa HongKong Tower, 185 Huỳnh Thúc Kháng, phường Láng, Hà Nội',
    en: '1st–2nd floors, Lobby A1, HongKong Tower, 185 Huỳnh Thúc Kháng, Láng ward, Hanoi',
  },
};

// Form đăng ký tham quan (Giai đoạn 4). Khi dịch vụ form chạy thật trên máy chủ,
// đổi FORM_DA_HOAT_DONG thành true để bỏ dòng cảnh báo trong bản xem trước.
export const FORM_ACTION = '/api/dang-ky';
export const FORM_DA_HOAT_DONG = true; // dịch vụ form có trong form/ (Giai đoạn 4, 20/11/2026)
