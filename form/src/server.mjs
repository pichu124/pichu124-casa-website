// Dịch vụ nhận form đăng ký tham quan của website Casa Preschool (Giai đoạn 4).
// Chỉ nghe trên 127.0.0.1; Caddy chuyển yêu cầu /api/* tới đây. Không dùng thư viện ngoài.
// Luồng: kiểm tra dữ liệu → gửi email về hộp thư tuyển sinh → ghi một dòng vào tệp dữ liệu → chuyển sang trang Cảm ơn.

import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { kiemTraDangKy, laThuRac, CO_SO, THONG_BAO } from './kiem-tra.mjs';
import { taoGioiHan } from './gioi-han.mjs';
import { guiThuSmtp } from './gui-thu.mjs';
import { ghiDangKy } from './luu.mjs';
import { trangLoi } from './trang.mjs';

const TRANG_CAM_ON = { vi: '/tuyen-sinh/cam-on/', en: '/en/admissions/thank-you/' };
const DUNG_LUONG_TOI_DA = 10 * 1024;

/** Đọc cấu hình từ biến môi trường (tệp /etc/casa-website/form.env trên máy chủ). */
export function docCauHinh(env = process.env) {
  return {
    diaChi: env.DIA_CHI ?? '127.0.0.1',
    cong: Number(env.CONG ?? 3100),
    thuMucDuLieu: env.THU_MUC_DU_LIEU ?? '/var/lib/casa-website',
    gioiHanMoiGio: Number(env.GIOI_HAN_MOI_GIO ?? 5),
    smtp: {
      mayChu: env.SMTP_MAY_CHU ?? 'smtp.gmail.com',
      cong: Number(env.SMTP_CONG ?? 465),
      baoMat: (env.SMTP_BAO_MAT ?? 'co') !== 'khong',
      taiKhoan: env.SMTP_TAI_KHOAN ?? '',
      matKhau: env.SMTP_MAT_KHAU ?? '',
      tu: env.THU_TU ?? env.SMTP_TAI_KHOAN ?? '',
      tenNguoiGui: env.TEN_NGUOI_GUI ?? 'Website Casa Preschool',
      toi: env.THU_GUI_TOI ?? 'tuyensinh@cdb.edu.vn',
    },
  };
}

/** Nội dung email gửi bộ phận tuyển sinh. */
export function noiDungThu(d, bayGio = new Date()) {
  const gio = bayGio.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const coSo = CO_SO[d.co_so].vi;
  return {
    tieuDe: `[Website] Đăng ký tham quan: ${d.ten} – ${coSo}`,
    noiDung: [
      'Có phụ huynh vừa đăng ký tham quan trên website.',
      '',
      `Họ tên ba/mẹ: ${d.ten}`,
      `Số điện thoại: ${d.sdt}`,
      `Tháng/năm sinh của bé: ${String(d.thang_sinh).padStart(2, '0')}/${d.nam_sinh}`,
      `Cơ sở muốn tham quan: ${coSo}`,
      `Ngôn ngữ trang: ${d.ngon_ngu === 'en' ? 'Tiếng Anh' : 'Tiếng Việt'}`,
      `Thời gian gửi: ${gio}`,
      '',
      'Phụ huynh đã đồng ý cho nhà trường dùng thông tin để liên hệ tư vấn, theo Chính sách bảo vệ dữ liệu cá nhân trên website.',
      'Nhà trường đã cam kết gọi lại trong ngày làm việc.',
      '',
      'Thư này gửi tự động từ website. Không trả lời thư này: hãy gọi trực tiếp cho phụ huynh.',
    ].join('\n'),
  };
}

function docThan(req) {
  return new Promise((resolve, reject) => {
    let kichThuoc = 0;
    let quaLon = false;
    const manh = [];
    req.on('data', (m) => {
      if (quaLon) return; // đọc bỏ phần còn lại để trả lời được cho trình duyệt
      kichThuoc += m.length;
      if (kichThuoc > DUNG_LUONG_TOI_DA) { quaLon = true; manh.length = 0; reject(Object.assign(new Error('quá lớn'), { ma: 413 })); return; }
      manh.push(m);
    });
    req.on('end', () => resolve(Buffer.concat(manh).toString('utf8')));
    req.on('error', reject);
  });
}

function guiHtml(res, ma, html) {
  if (ma === 413) res.setHeader('Connection', 'close');
  res.writeHead(ma, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(html);
}

function chuyenTrang(res, dich) {
  res.writeHead(303, { Location: dich, 'Cache-Control': 'no-store' });
  res.end();
}

/** Địa chỉ IP người gửi. Caddy (cùng máy) ghi X-Forwarded-For; chỉ tin tiêu đề này khi yêu cầu đến từ 127.0.0.1. */
function ipNguoiGui(req) {
  const tuMay = req.socket.remoteAddress ?? '';
  const noiBo = tuMay === '127.0.0.1' || tuMay === '::1' || tuMay === '::ffff:127.0.0.1';
  const xff = req.headers['x-forwarded-for'];
  if (noiBo && typeof xff === 'string' && xff.trim()) return xff.split(',')[0].trim();
  return tuMay;
}

/**
 * Tạo máy chủ HTTP. Các hàm gửi thư, ghi tệp được truyền vào để kiểm thử dễ.
 */
export function taoMayChu({
  cauHinh = docCauHinh(),
  guiThu = (thu) => guiThuSmtp(cauHinh.smtp, thu),
  luu = (banGhi) => ghiDangKy(cauHinh.thuMucDuLieu, banGhi),
  gioiHan = taoGioiHan({ toiDa: cauHinh.gioiHanMoiGio }),
  ghiNhatKy = (...a) => console.log(...a),
  bayGio = () => new Date(),
} = {}) {
  return http.createServer(async (req, res) => {
    const duongDan = (req.url ?? '/').split('?')[0];
    try {
      if (duongDan === '/api/suc-khoe' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
        return res.end('ok');
      }
      if (duongDan !== '/api/dang-ky') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Không tìm thấy');
      }
      if (req.method !== 'POST') {
        // Ai đó mở thẳng địa chỉ này trên trình duyệt: đưa về trang tuyển sinh.
        return chuyenTrang(res, '/tuyen-sinh/#dang-ky');
      }

      const loaiNoiDung = String(req.headers['content-type'] ?? '');
      if (!loaiNoiDung.startsWith('application/x-www-form-urlencoded')) {
        return guiHtml(res, 415, trangLoi({ tieuDe: 'Chưa gửi được đăng ký', doan: ['Trình duyệt gửi dữ liệu không đúng dạng. Xin thử lại từ form trên website.'] }));
      }

      const duLieuForm = new URLSearchParams(await docThan(req));
      const lang = duLieuForm.get('ngon_ngu') === 'en' ? 'en' : 'vi';
      const t = (vi, en) => (lang === 'en' ? en : vi);

      // Ô bẫy có chữ: coi như máy tự động gửi. Vẫn báo thành công để không lộ cách chặn, nhưng không lưu, không gửi thư.
      if (laThuRac(duLieuForm)) {
        ghiNhatKy('dang-ky: bo qua (o bay co du lieu)');
        return chuyenTrang(res, TRANG_CAM_ON[lang]);
      }

      if (!gioiHan.choPhep(ipNguoiGui(req))) {
        ghiNhatKy('dang-ky: tu choi (vuot gioi han so lan gui)');
        return guiHtml(res, 429, trangLoi({
          lang,
          tieuDe: t('Anh/chị đã gửi nhiều lần', 'You have sent several requests'),
          doan: [t('Nhà trường đã nhận các đăng ký trước đó của anh/chị. Để tránh trùng lặp, form tạm dừng nhận thêm từ thiết bị này trong ít phút.',
                   'We have received your earlier requests. To avoid duplicates, the form is paused for this device for a little while.')],
        }));
      }

      const kq = kiemTraDangKy(duLieuForm, bayGio());
      if (!kq.hopLe) {
        return guiHtml(res, 400, trangLoi({
          lang,
          tieuDe: t('Thông tin chưa đầy đủ', 'Some details need checking'),
          doan: [t('Xin bấm "Quay lại" để sửa các mục sau rồi gửi lại:', 'Please go back, correct the following and send again:')],
          ds: kq.loi.map((k) => THONG_BAO[k][lang]),
        }));
      }

      const thoiGian = bayGio();
      let daGuiThu = false;
      let daLuu = false;
      try {
        await guiThu(noiDungThu(kq.duLieu, thoiGian));
        daGuiThu = true;
      } catch (e) {
        ghiNhatKy('dang-ky: LOI gui email:', e.message);
      }
      try {
        await luu({ thoi_gian: thoiGian.toISOString(), ...kq.duLieu, dong_y: true, email: daGuiThu ? 'da-gui' : 'loi' });
        daLuu = true;
      } catch (e) {
        ghiNhatKy('dang-ky: LOI ghi tep du lieu:', e.message);
      }
      ghiNhatKy(`dang-ky: co_so=${kq.duLieu.co_so} email=${daGuiThu ? 'da-gui' : 'loi'} luu=${daLuu ? 'co' : 'loi'}`);

      // Email là cách bộ phận tuyển sinh biết có đăng ký. Email lỗi thì báo phụ huynh gọi hotline để không bị bỏ sót.
      if (daGuiThu) return chuyenTrang(res, TRANG_CAM_ON[lang]);
      return guiHtml(res, 503, trangLoi({
        lang,
        tieuDe: t('Hệ thống đang gặp sự cố', 'Something went wrong on our side'),
        doan: [t('Rất tiếc, đăng ký của anh/chị chưa đến được bộ phận tuyển sinh. Xin gọi trực tiếp để nhà trường hẹn lịch tham quan.',
                 'Sorry, your request did not reach our admissions team. Please call us directly to arrange a visit.')],
      }));
    } catch (e) {
      ghiNhatKy('dang-ky: LOI:', e.message);
      if (res.headersSent) return res.end();
      return guiHtml(res, e.ma === 413 ? 413 : 500, trangLoi({
        tieuDe: 'Chưa gửi được đăng ký',
        doan: ['Đã có lỗi khi gửi. Xin thử lại sau ít phút, hoặc gọi trực tiếp cho nhà trường.'],
      }));
    }
  });
}

// Chạy trực tiếp: node src/server.mjs
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cauHinh = docCauHinh();
  const thieu = ['taiKhoan', 'matKhau', 'tu'].filter((k) => !cauHinh.smtp[k]);
  if (thieu.length) {
    console.error(`Thiếu cấu hình email (${thieu.join(', ')}). Điền vào /etc/casa-website/form.env rồi khởi động lại.`);
    process.exit(1);
  }
  const mayChu = taoMayChu({ cauHinh });
  mayChu.headersTimeout = 10000;
  mayChu.requestTimeout = 15000;
  mayChu.listen(cauHinh.cong, cauHinh.diaChi, () => {
    console.log(`Dịch vụ form đang nghe ở http://${cauHinh.diaChi}:${cauHinh.cong} (gửi thư tới ${cauHinh.smtp.toi})`);
  });
  const dung = () => mayChu.close(() => process.exit(0));
  process.on('SIGTERM', dung);
  process.on('SIGINT', dung);
}
