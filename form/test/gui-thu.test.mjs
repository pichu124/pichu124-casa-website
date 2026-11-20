import test from 'node:test';
import assert from 'node:assert/strict';
import { guiThuSmtp, maHoaTieuDe, dungThu } from '../src/gui-thu.mjs';
import { taoSmtpGia } from './smtp-gia.mjs';

const giaiMaTieuDe = (s) => s.replace(/=\?UTF-8\?B\?([^?]+)\?=\s*/g, (_, b) => Buffer.from(b, 'base64').toString('utf8'));

test('mã hoá tiêu đề tiếng Việt và chặn xuống dòng', () => {
  const m = maHoaTieuDe('Đăng ký tham quan: Nguyễn Thị Lan – Chùa Láng\r\nBcc: ke-xau@vi-du.vn');
  assert.ok(!/\r\n(?! )/.test(m), 'mọi dòng tiếp theo phải bắt đầu bằng dấu cách');
  assert.equal(giaiMaTieuDe(m), 'Đăng ký tham quan: Nguyễn Thị Lan – Chùa Láng Bcc: ke-xau@vi-du.vn');
  assert.equal(maHoaTieuDe('Plain ASCII'), 'Plain ASCII');
});

test('thân thư mã hoá base64, không có dòng tiêu đề lạ', () => {
  const thu = dungThu({ tu: 'a@cdb.edu.vn', tenNguoiGui: 'Website', toi: ['b@cdb.edu.vn'], tieuDe: 'T', noiDung: 'Dòng 1\nBcc: x@y.z\n.' });
  const [dau, than] = thu.split('\r\n\r\n');
  assert.ok(!/Bcc/i.test(dau));
  assert.equal(Buffer.from(than.replace(/\r\n/g, ''), 'base64').toString('utf8'), 'Dòng 1\r\nBcc: x@y.z\r\n.');
});

test('gửi thư qua SMTP: đăng nhập, người gửi, người nhận, nội dung', async () => {
  const smtp = await taoSmtpGia();
  try {
    await guiThuSmtp({ mayChu: '127.0.0.1', cong: smtp.cong, baoMat: false, taiKhoan: 'tuyensinh@cdb.edu.vn', matKhau: 'mat-khau-thu', tu: 'tuyensinh@cdb.edu.vn', toi: 'tuyensinh@cdb.edu.vn, khac@cdb.edu.vn' },
      { tieuDe: 'Đăng ký mới', noiDung: 'Họ tên: Lan' });
    assert.equal(smtp.thuNhan.length, 1);
    assert.ok(smtp.lenh.includes('MAIL FROM:<tuyensinh@cdb.edu.vn>'));
    assert.ok(smtp.lenh.includes('RCPT TO:<khac@cdb.edu.vn>'));
    assert.ok(smtp.lenh.includes(Buffer.from('mat-khau-thu').toString('base64')));
    const [dau, than] = smtp.thuNhan[0].split('\r\n\r\n');
    assert.match(giaiMaTieuDe(dau), /Subject: Đăng ký mới/);
    assert.equal(Buffer.from(than.replace(/\r\n/g, ''), 'base64').toString('utf8'), 'Họ tên: Lan');
  } finally { await smtp.dong(); }
});

test('sai mật khẩu ứng dụng thì báo lỗi rõ ràng', async () => {
  const smtp = await taoSmtpGia({ tuChoiMatKhau: true });
  try {
    await assert.rejects(
      guiThuSmtp({ mayChu: '127.0.0.1', cong: smtp.cong, baoMat: false, taiKhoan: 'a@cdb.edu.vn', matKhau: 'sai', tu: 'a@cdb.edu.vn', toi: 'a@cdb.edu.vn' }, { tieuDe: 'x', noiDung: 'y' }),
      /mật khẩu: 535/,
    );
  } finally { await smtp.dong(); }
});

test('không có máy chủ email thì báo lỗi, không treo', async () => {
  await assert.rejects(guiThuSmtp({ mayChu: '127.0.0.1', cong: 1, baoMat: false, tu: 'a@cdb.edu.vn', toi: 'a@cdb.edu.vn', thoiGianChoMs: 2000 }, { tieuDe: 'x', noiDung: 'y' }));
});

test('địa chỉ email sai trong cấu hình bị chặn trước khi kết nối', async () => {
  await assert.rejects(guiThuSmtp({ mayChu: '127.0.0.1', cong: 1, tu: 'a@cdb.edu.vn', toi: 'x@y.z>\r\nRCPT TO:<z@z.z' }, { tieuDe: 'x', noiDung: 'y' }), /không hợp lệ/);
});
