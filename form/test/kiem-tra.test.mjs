import test from 'node:test';
import assert from 'node:assert/strict';
import { kiemTraDangKy, chuanHoaSdt, laThuRac, gon } from '../src/kiem-tra.mjs';
import { taoGioiHan } from '../src/gioi-han.mjs';

const NGAY = new Date('2026-11-20T10:00:00+07:00');
const hopLe = { ngon_ngu: 'vi', ten_phu_huynh: '  Nguyễn   Thị Lan ', so_dien_thoai: '0912 345 678', thang_sinh: '5', nam_sinh: '2023', co_so: 'kim-ma', dong_y: 'co' };

test('dữ liệu hợp lệ được chuẩn hoá', () => {
  const kq = kiemTraDangKy(hopLe, NGAY);
  assert.equal(kq.hopLe, true);
  assert.deepEqual(kq.duLieu, { ten: 'Nguyễn Thị Lan', sdt: '0912345678', thang_sinh: 5, nam_sinh: 2023, co_so: 'kim-ma', ngon_ngu: 'vi' });
});

test('nhận cả URLSearchParams', () => {
  assert.equal(kiemTraDangKy(new URLSearchParams(hopLe), NGAY).hopLe, true);
});

test('số điện thoại', () => {
  assert.equal(chuanHoaSdt('+84 912 345 678'), '0912345678');
  assert.equal(chuanHoaSdt('84912345678'), '0912345678');
  assert.equal(chuanHoaSdt('024.3765.4321'), '02437654321');
  assert.equal(chuanHoaSdt('0912-345-678'), '0912345678');
  for (const sai of ['', '12345', '0012345678', '09123456789012', 'abc0912345678', '0912 345 67']) assert.equal(chuanHoaSdt(sai), null, sai);
});

test('báo đủ các lỗi', () => {
  const kq = kiemTraDangKy({ ngon_ngu: 'en', ten_phu_huynh: 'A', so_dien_thoai: '123', thang_sinh: '13', nam_sinh: '2010', co_so: 'ha-noi' }, NGAY);
  assert.equal(kq.hopLe, false);
  assert.equal(kq.lang, 'en');
  assert.deepEqual(kq.loi, ['ten', 'sdt', 'ngaySinh', 'coSo', 'dongY']);
});

test('tháng sinh ở tương lai bị từ chối', () => {
  assert.deepEqual(kiemTraDangKy({ ...hopLe, thang_sinh: '12', nam_sinh: '2026' }, NGAY).loi, ['ngaySinh']);
  assert.equal(kiemTraDangKy({ ...hopLe, thang_sinh: '11', nam_sinh: '2026' }, NGAY).hopLe, true);
});

test('tên không có chữ cái, quá dài, có ký tự điều khiển', () => {
  assert.deepEqual(kiemTraDangKy({ ...hopLe, ten_phu_huynh: '12345' }, NGAY).loi, ['ten']);
  assert.deepEqual(kiemTraDangKy({ ...hopLe, ten_phu_huynh: 'a'.repeat(81) }, NGAY).loi, ['ten']);
  assert.equal(gon('Lan\r\nBcc: x@y.z'), 'Lan Bcc: x@y.z');
});

test('chỉ nhận cơ sở trong danh sách, kể cả "chưa chọn"', () => {
  assert.equal(kiemTraDangKy({ ...hopLe, co_so: 'chua-chon' }, NGAY).hopLe, true);
  assert.deepEqual(kiemTraDangKy({ ...hopLe, co_so: '__proto__' }, NGAY).loi, ['coSo']);
});

test('ô bẫy', () => {
  assert.equal(laThuRac({ website: '' }), false);
  assert.equal(laThuRac({}), false);
  assert.equal(laThuRac({ website: 'http://spam' }), true);
});

test('giới hạn số lần gửi theo IP', () => {
  const g = taoGioiHan({ toiDa: 3, khoangMs: 1000 });
  assert.equal(g.choPhep('1.1.1.1', 0), true);
  assert.equal(g.choPhep('1.1.1.1', 10), true);
  assert.equal(g.choPhep('1.1.1.1', 20), true);
  assert.equal(g.choPhep('1.1.1.1', 30), false);
  assert.equal(g.choPhep('2.2.2.2', 30), true);
  assert.equal(g.choPhep('1.1.1.1', 1015), true);
});

test('giới hạn số IP lưu trong bộ nhớ', () => {
  const g = taoGioiHan({ toiDa: 1, khoangMs: 1000, soIpToiDa: 100 });
  for (let i = 0; i < 500; i++) g.choPhep(`10.0.0.${i}`, i);
  assert.ok(g.soIp <= 100);
});
