#!/usr/bin/env node
// Kiểm tra bảng chuyển hướng 301 trên một máy chủ đang chạy (Giai đoạn 6).
// Đọc docs/URL-CU.csv; với mỗi URL cũ (có và không có dấu "/" cuối):
//   - giữ nguyên đường dẫn → phải trả 200;
//   - còn lại → phải trả 301 với Location đúng đích, và đích phải trả 200.
// Thêm: các quy tắc chung (tag, feed, ?p=, ?lang=en, wp-*), trang 404, dịch vụ form.
//
// Cách chạy trên VPS (bằng user casa-website: chỉ user này đọc được /opt/casa-website):
//   Bản thử (có mật khẩu xem; mật khẩu gõ vào, không hiện, không lưu, không ghi vào nhật ký sudo):
//     read -rsp "Mật khẩu xem bản thử: " CASA_MK; echo; export CASA_MK
//     sudo --preserve-env=CASA_MK -H -u casa-website node /opt/casa-website/src/scripts/kiem-tra-chuyen-huong.mjs https://casa-website-thu.duckdns.org
//     unset CASA_MK
//   Tên miền chính (sau khi đổi DNS):
//     sudo -H -u casa-website node /opt/casa-website/src/scripts/kiem-tra-chuyen-huong.mjs https://casadeibambini.edu.vn --chinh
// Kết quả cuối: "✔ Đạt" (mã thoát 0) hoặc danh sách URL sai (mã thoát 1).

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const GOC = new URL('../', import.meta.url).pathname;
const thamSo = process.argv.slice(2);
const coso = thamSo.find((a) => !a.startsWith('--'));
const CHINH = thamSo.includes('--chinh');
if (!coso) {
  console.log('Cách dùng: node scripts/kiem-tra-chuyen-huong.mjs <địa chỉ gốc> [--chinh]');
  process.exit(2);
}
const GOC_URL = new URL(coso);
const NGUOI_XEM = process.env.CASA_NGUOI_XEM || 'xem';
const xacThuc = process.env.CASA_MK
  ? { Authorization: 'Basic ' + Buffer.from(`${NGUOI_XEM}:${process.env.CASA_MK}`).toString('base64') }
  : {};

function docCsv(t) {
  const dong = []; let o = '', hang = [], ngoac = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (ngoac) { if (c === '"' && t[i + 1] === '"') { o += '"'; i++; } else if (c === '"') ngoac = false; else o += c; }
    else if (c === '"') ngoac = true;
    else if (c === ',') { hang.push(o); o = ''; }
    else if (c === '\n') { hang.push(o); dong.push(hang); hang = []; o = ''; }
    else if (c !== '\r') o += c;
  }
  if (o || hang.length) { hang.push(o); dong.push(hang); }
  return dong.filter((h) => h.length > 1);
}

const [dau, ...hang] = docCsv(readFileSync(join(GOC, 'docs/URL-CU.csv'), 'utf8'));
const iCu = dau.indexOf('url_cu'), iDich = dau.indexOf('dich_moi');

// Danh sách phép thử: [đường dẫn, mã mong đợi, đích mong đợi (nếu 301)]
const phepThu = [];
for (const h of hang) {
  const cu = h[iCu], dich = h[iDich];
  if (cu === dich) { phepThu.push([cu, 200]); continue; }
  phepThu.push([cu, 301, dich]);
  if (cu.endsWith('/') && cu !== '/') phepThu.push([cu.slice(0, -1), 301, dich]);
}
// Quy tắc chung (deploy/redirects.caddy, cuối tệp)
phepThu.push(
  ['/tag/mam-non/', 301, '/tin-tuc/'],
  ['/en/tag/preschool/', 301, '/en/news/'],
  ['/feed/', 301, '/tin-tuc/'],
  ['/en/feed/', 301, '/en/news/'],
  ['/tin-tuc-su-kien/page/2/', 301, '/tin-tuc/'],
  ['/?p=123', 301, '/'],
  ['/?page_id=45', 301, '/'],
  ['/?lang=en', 301, '/en/'],
  ['/wp-login.php', 410],
  ['/wp-content/uploads/2024/01/anh.jpg', 410],
  ['/duong-dan-khong-ton-tai-kiem-tra/', 404],
  ['/en/duong-dan-khong-ton-tai-kiem-tra/', 404],
  ['/sitemap.xml', 200],
  ['/robots.txt', 200],
  ['/api/suc-khoe', 200],
);

async function goi(duongDan, them = {}) {
  const url = new URL(duongDan, GOC_URL);
  for (let lan = 1; ; lan++) {
    try {
      return await fetch(url, { method: 'GET', redirect: 'manual', headers: { ...xacThuc, 'User-Agent': 'casa-kiem-tra-chuyen-huong' }, ...them });
    } catch (e) {
      if (lan >= 3) throw e;
      await new Promise((r) => setTimeout(r, 500 * lan));
    }
  }
}

const loi = [];
const dichDaThu = new Map();
async function thuDich(dich) {
  if (!dichDaThu.has(dich)) dichDaThu.set(dich, goi(dich).then((r) => r.status));
  return dichDaThu.get(dich);
}

async function chay([duongDan, ma, dich]) {
  let r;
  try { r = await goi(duongDan); } catch (e) { loi.push(`${duongDan}: không kết nối được (${e.cause?.code || e.message})`); return; }
  await r.arrayBuffer().catch(() => {});
  if (r.status === 401) { loi.push(`${duongDan}: 401, cần mật khẩu xem (đặt CASA_MK như hướng dẫn đầu tệp)`); return; }
  if (r.status !== ma) { loi.push(`${duongDan}: trả ${r.status}, mong đợi ${ma}${dich ? ` → ${dich}` : ''}`); return; }
  if (ma === 301) {
    const den = new URL(r.headers.get('location') || '', GOC_URL);
    const dung = den.pathname + den.search === dich && (den.host === GOC_URL.host);
    if (!dung) { loi.push(`${duongDan}: chuyển tới ${den.href}, mong đợi ${dich}`); return; }
    const maDich = await thuDich(dich);
    if (maDich !== 200) loi.push(`${duongDan}: đích ${dich} trả ${maDich}, mong đợi 200`);
  }
}

// Chạy song song có giới hạn để không dồn máy chủ
async function songSong(ds, n, f) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < ds.length) await f(ds[i++]); }));
}

console.log(`▶ Kiểm tra ${phepThu.length} đường dẫn trên ${GOC_URL.origin}${CHINH ? ' (tên miền chính)' : ''}`);
{
  let r;
  try { r = await goi('/'); } catch (e) {
    console.log(`✘ Không kết nối được tới ${GOC_URL.origin} (${e.cause?.code || e.message}).`);
    process.exit(1);
  }
  await r.arrayBuffer().catch(() => {});
  if (r.status === 401) {
    console.log(process.env.CASA_MK
      ? '✘ Mật khẩu xem không đúng (máy chủ trả 401).'
      : '✘ Trang cần mật khẩu xem. Gõ mật khẩu theo hướng dẫn ở đầu tệp này rồi chạy lại.');
    process.exit(1);
  }
}
await songSong(phepThu, 6, chay);

// Tiêu đề trang chủ: bản thử phải có noindex; tên miền chính tuyệt đối không
{
  const r = await goi('/');
  await r.arrayBuffer().catch(() => {});
  const robots = r.headers.get('x-robots-tag') || '';
  if (CHINH && /noindex/i.test(robots)) loi.push('Trang chủ còn "X-Robots-Tag: noindex": Google sẽ không lập chỉ mục site');
  if (!CHINH && !/noindex/i.test(robots)) loi.push('Bản thử thiếu "X-Robots-Tag: noindex"');
}

if (CHINH) {
  const robotsTxt = await (await goi('/robots.txt')).text();
  if (/^Disallow:\s*\/\s*$/m.test(robotsTxt)) loi.push('robots.txt đang chặn toàn bộ site');
  // www → tên miền gốc, giữ đường dẫn
  const www = new URL(GOC_URL); www.hostname = 'www.' + GOC_URL.hostname;
  try {
    const r = await fetch(new URL('/lien-he/', www), { redirect: 'manual' });
    const den = r.headers.get('location') || '';
    if (r.status !== 301 || den !== `${GOC_URL.origin}/lien-he/`) loi.push(`www: trả ${r.status} → ${den || '(không có)'}, mong đợi 301 → ${GOC_URL.origin}/lien-he/`);
  } catch (e) { loi.push(`www: không kết nối được (${e.cause?.code || e.message})`); }
  // http → https
  const http = new URL(GOC_URL); http.protocol = 'http:';
  try {
    const r = await fetch(new URL('/tuyen-sinh/', http), { redirect: 'manual' });
    const den = r.headers.get('location') || '';
    if (![301, 308].includes(r.status) || !den.startsWith('https://')) loi.push(`http: trả ${r.status} → ${den || '(không có)'}, mong đợi chuyển sang https`);
  } catch (e) { loi.push(`http: không kết nối được (${e.cause?.code || e.message})`); }
}

if (loi.length) {
  console.log(`\n✘ ${loi.length} chỗ sai:`);
  for (const l of loi.sort()) console.log('   ' + l);
  process.exit(1);
}
console.log(`✔ Đạt: ${phepThu.length} đường dẫn đúng, ${dichDaThu.size} trang đích đều mở được.`);
