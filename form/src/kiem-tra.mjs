// Kiểm tra dữ liệu form đăng ký tham quan: 4 thông tin bắt buộc + ô đồng ý (CLAUDE.md, Giai đoạn 4),
// thêm 2 thông tin không bắt buộc để đo nguồn khách (QUYET-DINH Q42): biết Casa qua đâu, nguồn truy cập.
// Danh sách cơ sở phải khớp src/data/co-so.ts; danh sách BIET_QUA phải khớp src/data/lien-he.ts của website.

export const CO_SO = {
  'chua-chon': { vi: 'Chưa chọn, nhờ trường tư vấn', en: 'Not sure yet' },
  'kim-ma': { vi: 'Kim Mã', en: 'Kim Mã' },
  'chua-lang': { vi: 'Chùa Láng', en: 'Chùa Láng' },
  'my-dinh': { vi: 'Mỹ Đình', en: 'Mỹ Đình' },
  'ciputra': { vi: 'Ciputra (sắp khai trương)', en: 'Ciputra (opening soon)' },
};

/** "Ba mẹ biết Casa qua đâu?" (không bắt buộc). Khớp BIET_QUA trong src/data/lien-he.ts. */
export const BIET_QUA = {
  google: { vi: 'Tìm trên Google', en: 'Google search' },
  'google-maps': { vi: 'Google Maps', en: 'Google Maps' },
  facebook: { vi: 'Facebook', en: 'Facebook' },
  zalo: { vi: 'Zalo', en: 'Zalo' },
  'nguoi-quen': { vi: 'Người quen giới thiệu', en: 'Recommended by someone' },
  'di-ngang-qua': { vi: 'Đi ngang qua trường', en: 'Passed by the school' },
  khac: { vi: 'Khác', en: 'Other' },
};

/** Nguồn truy cập (ô ẩn, lấy từ ?nguon=… hoặc tên miền trang dẫn tới): chỉ chữ thường, số, dấu - và ., tối đa 60 ký tự. */
export function chuanHoaNguon(s) {
  const v = String(s ?? '').trim().toLowerCase();
  return /^[a-z0-9][a-z0-9.-]{0,59}$/.test(v) ? v : '';
}

export const THONG_BAO = {
  ten: {
    vi: 'Họ tên ba/mẹ: xin nhập từ 2 đến 80 ký tự.',
    en: "Parent's name: please enter 2 to 80 characters.",
  },
  sdt: {
    vi: 'Số điện thoại chưa đúng. Xin nhập số di động hoặc số bàn của Việt Nam, ví dụ 0912 345 678.',
    en: 'The phone number is not valid. Please enter a Vietnamese mobile or landline number, e.g. 0912 345 678.',
  },
  ngaySinh: {
    vi: 'Tháng và năm sinh của bé chưa đúng. Xin chọn lại tháng và năm.',
    en: "Your child's month and year of birth are not valid. Please choose them again.",
  },
  coSo: {
    vi: 'Xin chọn cơ sở muốn tham quan.',
    en: 'Please choose the campus you would like to visit.',
  },
  dongY: {
    vi: 'Xin tích vào ô đồng ý để nhà trường được dùng thông tin này liên hệ tư vấn.',
    en: 'Please tick the consent box so the school can use this information to contact you.',
  },
};

const KY_TU_DIEU_KHIEN = new RegExp('[\\u0000-\\u001f\\u007f-\\u009f\\u2028\\u2029]', 'g');

/** Gọn khoảng trắng, bỏ ký tự điều khiển. */
export function gon(s) {
  return String(s ?? '').replace(KY_TU_DIEU_KHIEN, ' ').replace(/\s+/g, ' ').trim();
}

/** Chuẩn hoá số điện thoại Việt Nam về dạng 0xxxxxxxxx; trả null nếu không hợp lệ. */
export function chuanHoaSdt(s) {
  let so = String(s ?? '').replace(/[\s.\-()]/g, '');
  if (so.startsWith('+84')) so = '0' + so.slice(3);
  else if (so.startsWith('84') && so.length >= 11) so = '0' + so.slice(2);
  // Di động hiện hành: 10 số, đầu 03, 05, 07, 08, 09 (đầu 01x cũ đã đổi từ 2018).
  // Số bàn: 11 số, đầu 02 (mã vùng sau năm 2017, ví dụ 024 Hà Nội).
  return /^0[35789]\d{8}$/.test(so) || /^02\d{9}$/.test(so) ? so : null;
}

/**
 * Kiểm tra dữ liệu từ form (URLSearchParams hoặc object).
 * @returns {{ hopLe: boolean, loi: string[], lang: 'vi'|'en', duLieu?: object }}
 */
export function kiemTraDangKy(dauVao, bayGio = new Date()) {
  const lay = (k) => (typeof dauVao.get === 'function' ? dauVao.get(k) : dauVao[k]);
  const lang = lay('ngon_ngu') === 'en' ? 'en' : 'vi';
  const loi = [];

  const ten = gon(lay('ten_phu_huynh'));
  if (ten.length < 2 || ten.length > 80 || !/\p{L}/u.test(ten)) loi.push('ten');

  const sdt = chuanHoaSdt(lay('so_dien_thoai'));
  if (!sdt) loi.push('sdt');

  const thang = Number(lay('thang_sinh'));
  const nam = Number(lay('nam_sinh'));
  const namNay = bayGio.getFullYear();
  const thangNay = bayGio.getMonth() + 1;
  const ngaySinhHopLe =
    Number.isInteger(thang) && thang >= 1 && thang <= 12 &&
    Number.isInteger(nam) && nam >= namNay - 8 && nam <= namNay &&
    !(nam === namNay && thang > thangNay);
  if (!ngaySinhHopLe) loi.push('ngaySinh');

  const coSo = String(lay('co_so') ?? '');
  if (!Object.hasOwn(CO_SO, coSo)) loi.push('coSo');

  if (lay('dong_y') !== 'co') loi.push('dongY');

  // Hai ô không bắt buộc: giá trị lạ thì bỏ qua, không làm hỏng đăng ký.
  const bietQuaVao = String(lay('biet_qua') ?? '');
  const bietQua = Object.hasOwn(BIET_QUA, bietQuaVao) ? bietQuaVao : '';
  const nguon = chuanHoaNguon(lay('nguon'));

  if (loi.length) return { hopLe: false, loi, lang };
  return {
    hopLe: true,
    loi,
    lang,
    duLieu: { ten, sdt, thang_sinh: thang, nam_sinh: nam, co_so: coSo, ngon_ngu: lang, biet_qua: bietQua, nguon },
  };
}

/** Ô bẫy chống spam: người thật không thấy ô này nên để trống. */
export function laThuRac(dauVao) {
  const lay = (k) => (typeof dauVao.get === 'function' ? dauVao.get(k) : dauVao[k]);
  return gon(lay('website')).length > 0;
}
