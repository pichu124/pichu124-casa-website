import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { taoMayChu, docCauHinh } from '../src/server.mjs';
import { taoGioiHan } from '../src/gioi-han.mjs';
import { taoSmtpGia } from './smtp-gia.mjs';

const NGAY = new Date('2026-11-20T10:00:00+07:00');
const FORM = { ngon_ngu: 'vi', website: '', ten_phu_huynh: 'Nguyễn Thị Lan', so_dien_thoai: '0912 345 678', thang_sinh: '5', nam_sinh: '2023', co_so: 'chua-lang', dong_y: 'co' };

async function chay(tuyChon, fn) {
  const mayChu = taoMayChu({ ghiNhatKy: () => {}, bayGio: () => NGAY, ...tuyChon });
  await new Promise((r) => mayChu.listen(0, '127.0.0.1', r));
  const goc = `http://127.0.0.1:${mayChu.address().port}`;
  try { return await fn(goc); } finally { await new Promise((r) => mayChu.close(r)); }
}
const gui = (goc, duLieu, them = {}) => fetch(goc + '/api/dang-ky', {
  method: 'POST', redirect: 'manual',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...them },
  body: new URLSearchParams(duLieu).toString(),
});

test('đăng ký hợp lệ: gửi thư, lưu, chuyển sang trang Cảm ơn', async () => {
  const thu = []; const luu = [];
  await chay({ guiThu: async (t) => thu.push(t), luu: async (b) => luu.push(b) }, async (goc) => {
    const r = await gui(goc, FORM);
    assert.equal(r.status, 303);
    assert.equal(r.headers.get('location'), '/tuyen-sinh/cam-on/');
  });
  assert.equal(thu.length, 1);
  assert.match(thu[0].tieuDe, /Nguyễn Thị Lan – Chùa Láng/);
  assert.match(thu[0].noiDung, /Số điện thoại: 0912345678/);
  assert.match(thu[0].noiDung, /Tháng\/năm sinh của bé: 05\/2023/);
  assert.equal(luu[0].email, 'da-gui');
  assert.equal(luu[0].dong_y, true);
  assert.equal(luu[0].sdt, '0912345678');
  assert.ok(!('ip' in luu[0]), 'không lưu IP');
});

test('trang tiếng Anh chuyển sang trang Cảm ơn tiếng Anh', async () => {
  await chay({ guiThu: async () => {}, luu: async () => {} }, async (goc) => {
    const r = await gui(goc, { ...FORM, ngon_ngu: 'en' });
    assert.equal(r.headers.get('location'), '/en/admissions/thank-you/');
  });
});

test('ô bẫy có chữ: báo thành công nhưng không gửi, không lưu', async () => {
  let goi = 0;
  await chay({ guiThu: async () => goi++, luu: async () => goi++ }, async (goc) => {
    const r = await gui(goc, { ...FORM, website: 'spam' });
    assert.equal(r.status, 303);
  });
  assert.equal(goi, 0);
});

test('thiếu thông tin: trang lỗi tiếng Việt có hotline, không gửi thư', async () => {
  let goi = 0;
  await chay({ guiThu: async () => goi++, luu: async () => goi++ }, async (goc) => {
    const r = await gui(goc, { ...FORM, so_dien_thoai: '123', dong_y: '' });
    assert.equal(r.status, 400);
    const html = await r.text();
    assert.match(html, /Số điện thoại chưa đúng/);
    assert.match(html, /tích vào ô đồng ý/);
    assert.match(html, /0989 059 838/);
    assert.match(html, /<html lang="vi">/);
  });
  assert.equal(goi, 0);
});

test('lỗi gửi email: vẫn lưu (đánh dấu lỗi) và báo phụ huynh gọi hotline', async () => {
  const luu = [];
  await chay({ guiThu: async () => { throw new Error('535 sai mật khẩu'); }, luu: async (b) => luu.push(b) }, async (goc) => {
    const r = await gui(goc, FORM);
    assert.equal(r.status, 503);
    assert.match(await r.text(), /0989 059 838/);
  });
  assert.equal(luu[0].email, 'loi');
});

test('lỗi ghi tệp nhưng email đã gửi: vẫn báo thành công', async () => {
  await chay({ guiThu: async () => {}, luu: async () => { throw new Error('EACCES'); } }, async (goc) => {
    assert.equal((await gui(goc, FORM)).status, 303);
  });
});

test('giới hạn số lần gửi theo IP từ Caddy', async () => {
  await chay({ guiThu: async () => {}, luu: async () => {}, gioiHan: taoGioiHan({ toiDa: 2 }) }, async (goc) => {
    const ip = { 'X-Forwarded-For': '203.0.113.5' };
    assert.equal((await gui(goc, FORM, ip)).status, 303);
    assert.equal((await gui(goc, FORM, ip)).status, 303);
    const r = await gui(goc, FORM, ip);
    assert.equal(r.status, 429);
    assert.match(await r.text(), /gửi nhiều lần/);
    assert.equal((await gui(goc, FORM, { 'X-Forwarded-For': '203.0.113.6' })).status, 303);
  });
});

test('các trường hợp khác: GET, sai đường dẫn, sai kiểu dữ liệu, quá lớn, kiểm tra sức khoẻ', async () => {
  await chay({ guiThu: async () => {}, luu: async () => {} }, async (goc) => {
    const g = await fetch(goc + '/api/dang-ky', { redirect: 'manual' });
    assert.equal(g.status, 303);
    assert.equal((await fetch(goc + '/api/khac')).status, 404);
    const j = await fetch(goc + '/api/dang-ky', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    assert.equal(j.status, 415);
    const lon = await gui(goc, { ...FORM, ten_phu_huynh: 'x'.repeat(20000) });
    assert.equal(lon.status, 413);
    const s = await fetch(goc + '/api/suc-khoe');
    assert.equal(await s.text(), 'ok');
  });
});

test('chạy thật từ đầu đến cuối: SMTP giả + ghi tệp vào thư mục tạm', async () => {
  const smtp = await taoSmtpGia();
  const thuMuc = await fs.mkdtemp(path.join(os.tmpdir(), 'casa-form-'));
  const cauHinh = docCauHinh({ THU_MUC_DU_LIEU: thuMuc, SMTP_MAY_CHU: '127.0.0.1', SMTP_CONG: String(smtp.cong), SMTP_BAO_MAT: 'khong', SMTP_TAI_KHOAN: 'tuyensinh@cdb.edu.vn', SMTP_MAT_KHAU: 'x', THU_GUI_TOI: 'tuyensinh@cdb.edu.vn' });
  try {
    await chay({ cauHinh }, async (goc) => assert.equal((await gui(goc, FORM)).status, 303));
    assert.equal(smtp.thuNhan.length, 1);
    const tep = path.join(thuMuc, 'dang-ky.jsonl');
    const dong = (await fs.readFile(tep, 'utf8')).trim().split('\n');
    assert.equal(dong.length, 1);
    assert.equal(JSON.parse(dong[0]).co_so, 'chua-lang');
    assert.equal((await fs.stat(tep)).mode & 0o777, 0o640, 'user dịch vụ ghi, nhóm casa-form đọc, người khác không (Q43)');

    // Dọn dữ liệu quá hạn: thêm một bản ghi cũ 400 ngày rồi chạy kịch bản dọn.
    const cu = { ...JSON.parse(dong[0]), thoi_gian: new Date(Date.now() - 400 * 864e5).toISOString() };
    await fs.appendFile(tep, JSON.stringify(cu) + '\n');
    const { stdout } = await promisify(execFile)(process.execPath, [new URL('../scripts/don-du-lieu.mjs', import.meta.url).pathname], { env: { ...process.env, THU_MUC_DU_LIEU: thuMuc } });
    assert.match(stdout, /Đã xoá 1 đăng ký/);
    assert.equal((await fs.readFile(tep, 'utf8')).trim().split('\n').length, 1);
  } finally {
    await smtp.dong();
    await fs.rm(thuMuc, { recursive: true, force: true });
  }
});
