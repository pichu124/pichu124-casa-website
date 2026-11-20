// Gửi email qua SMTP (Google Workspace: smtp.gmail.com, cổng 465, TLS ngay từ đầu), không dùng thư viện ngoài.
// Dữ liệu phụ huynh chỉ nằm trong tiêu đề và nội dung đã mã hoá base64, nên không chèn được dòng tiêu đề lạ.
// Địa chỉ người gửi, người nhận lấy từ tệp cấu hình trên máy chủ, không lấy từ form.

import net from 'node:net';
import tls from 'node:tls';
import crypto from 'node:crypto';

const DIA_CHI_EMAIL = /^[^\s<>@,;"]+@[^\s<>@,;"]+\.[^\s<>@,;"]+$/;

/** Mã hoá một chuỗi tiếng Việt cho dòng tiêu đề email (RFC 2047), chia nhỏ để mỗi dòng không quá dài. */
export function maHoaTieuDe(chuoi) {
  const s = String(chuoi).replace(/[\r\n]+/g, ' ');
  if (/^[\x20-\x7e]*$/.test(s)) return s;
  const manh = [];
  let hienTai = '';
  for (const kyTu of s) {
    if (Buffer.byteLength(hienTai + kyTu) > 45) { manh.push(hienTai); hienTai = ''; }
    hienTai += kyTu;
  }
  if (hienTai) manh.push(hienTai);
  return manh.map((m) => `=?UTF-8?B?${Buffer.from(m).toString('base64')}?=`).join('\r\n ');
}

/** Dựng toàn bộ nội dung thư (tiêu đề + thân) theo chuẩn MIME, xuống dòng CRLF. */
export function dungThu({ tu, tenNguoiGui, toi, tieuDe, noiDung, bayGio = new Date() }) {
  const tenMien = tu.split('@')[1];
  const than = Buffer.from(noiDung.replace(/\r?\n/g, '\r\n')).toString('base64').replace(/.{1,76}/g, '$&\r\n');
  return [
    `From: ${maHoaTieuDe(tenNguoiGui)} <${tu}>`,
    `To: ${toi.join(', ')}`,
    `Subject: ${maHoaTieuDe(tieuDe)}`,
    `Date: ${bayGio.toUTCString().replace('GMT', '+0000')}`,
    `Message-ID: <${crypto.randomUUID()}@${tenMien}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    than,
  ].join('\r\n');
}

/** Đọc từng phản hồi của máy chủ SMTP (có thể nhiều dòng, dòng cuối dạng "250 ..."). */
function taoBoDoc(socket) {
  let dem = '';
  const choDoi = [];
  const phanHoi = [];
  let loi = null;
  socket.setEncoding('utf8');
  socket.on('data', (d) => {
    dem += d;
    let i;
    while ((i = dem.indexOf('\r\n')) >= 0) {
      const dong = dem.slice(0, i);
      dem = dem.slice(i + 2);
      if (/^\d{3} /.test(dong) || /^\d{3}$/.test(dong)) {
        const r = { ma: Number(dong.slice(0, 3)), dong };
        if (choDoi.length) choDoi.shift().resolve(r); else phanHoi.push(r);
      }
    }
  });
  const baoLoi = (e) => { loi = e; while (choDoi.length) choDoi.shift().reject(e); };
  socket.on('error', baoLoi);
  socket.on('close', () => baoLoi(new Error('Máy chủ email đóng kết nối')));
  return () => new Promise((resolve, reject) => {
    if (phanHoi.length) return resolve(phanHoi.shift());
    if (loi) return reject(loi);
    choDoi.push({ resolve, reject });
  });
}

/**
 * Gửi một thư. Ném lỗi nếu máy chủ email từ chối hoặc quá thời gian chờ.
 * @param {object} c cấu hình: mayChu, cong, baoMat (true = TLS ngay từ đầu), taiKhoan, matKhau, tu, tenNguoiGui, toi (mảng)
 */
export async function guiThuSmtp(c, { tieuDe, noiDung }) {
  const toi = (Array.isArray(c.toi) ? c.toi : String(c.toi).split(',')).map((s) => s.trim()).filter(Boolean);
  for (const dc of [c.tu, ...toi]) if (!DIA_CHI_EMAIL.test(dc)) throw new Error(`Địa chỉ email không hợp lệ trong cấu hình: ${dc}`);

  const socket = c.baoMat === false
    ? net.connect({ host: c.mayChu, port: c.cong })
    : tls.connect({ host: c.mayChu, port: c.cong, servername: c.mayChu });
  const choDoi = c.thoiGianChoMs ?? 20000;
  socket.setTimeout(choDoi, () => socket.destroy(new Error('Quá thời gian chờ máy chủ email')));
  const doc = taoBoDoc(socket);
  const gui = (dong) => socket.write(dong + '\r\n');
  const can = async (maMongDoi, buoc) => {
    const r = await doc();
    if (r.ma !== maMongDoi) throw new Error(`Máy chủ email từ chối ở bước ${buoc}: ${r.dong}`);
    return r;
  };

  try {
    await can(220, 'chào');
    gui('EHLO casa-website-form'); await can(250, 'EHLO');
    if (c.taiKhoan) {
      gui('AUTH LOGIN'); await can(334, 'đăng nhập');
      gui(Buffer.from(c.taiKhoan).toString('base64')); await can(334, 'tài khoản');
      gui(Buffer.from(c.matKhau ?? '').toString('base64')); await can(235, 'mật khẩu');
    }
    gui(`MAIL FROM:<${c.tu}>`); await can(250, 'người gửi');
    for (const dc of toi) { gui(`RCPT TO:<${dc}>`); await can(250, 'người nhận'); }
    gui('DATA'); await can(354, 'nội dung');
    // Thân thư là base64 nên không có dòng nào bắt đầu bằng dấu chấm; vẫn đề phòng ở phần tiêu đề.
    const thu = dungThu({ tu: c.tu, tenNguoiGui: c.tenNguoiGui ?? 'Website', toi, tieuDe, noiDung })
      .replace(/^\./gm, '..');
    socket.write(thu + '\r\n.\r\n');
    await can(250, 'gửi thư');
    gui('QUIT');
  } finally {
    socket.end();
    setTimeout(() => socket.destroy(), 1000).unref();
  }
}
