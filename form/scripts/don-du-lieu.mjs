// Xoá các đăng ký đã lưu quá thời hạn (mặc định 365 ngày = 12 tháng, theo Chính sách bảo vệ dữ liệu).
// Chạy hằng ngày bằng systemd timer casa-website-form-don.timer.
// Thời hạn 12 tháng còn chờ Ban lãnh đạo duyệt; đổi bằng biến LUU_TOI_DA_NGAY trong /etc/casa-website/form.env.

import fs from 'node:fs/promises';
import path from 'node:path';

const thuMuc = process.env.THU_MUC_DU_LIEU ?? '/var/lib/casa-website';
const soNgay = Number(process.env.LUU_TOI_DA_NGAY ?? 365);
const tep = path.join(thuMuc, 'dang-ky.jsonl');

let noiDung;
try {
  noiDung = await fs.readFile(tep, 'utf8');
} catch (e) {
  if (e.code === 'ENOENT') { console.log('Chưa có tệp dữ liệu, không có gì để dọn.'); process.exit(0); }
  throw e;
}

const moc = Date.now() - soNgay * 24 * 60 * 60 * 1000;
const giu = [];
let xoa = 0;
for (const dong of noiDung.split('\n')) {
  if (!dong.trim()) continue;
  let t = NaN;
  try { t = Date.parse(JSON.parse(dong).thoi_gian); } catch { /* dòng hỏng: giữ lại để người quản trị xem */ }
  if (Number.isFinite(t) && t < moc) xoa++; else giu.push(dong);
}

if (xoa === 0) { console.log(`Không có đăng ký nào quá ${soNgay} ngày. Đang lưu ${giu.length} đăng ký.`); process.exit(0); }
const tam = tep + '.tam';
await fs.writeFile(tam, giu.length ? giu.join('\n') + '\n' : '', { mode: 0o640 }); // nhóm casa-form đọc được (QUYET-DINH Q43)
await fs.rename(tam, tep);
console.log(`Đã xoá ${xoa} đăng ký quá ${soNgay} ngày. Còn lưu ${giu.length} đăng ký.`);
