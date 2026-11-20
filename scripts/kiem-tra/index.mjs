#!/usr/bin/env node
// npm run check — kiểm tra trước mỗi commit (CLAUDE.md, mục "Kiểm tra trước mỗi commit").
// npm run check:truoc-khi-dang — thêm: báo đỏ nếu còn [CẦN: …] trên trang.
// Mục 10 chạy kiểm thử của dịch vụ nhận form (thư mục form/).
// Không nới bộ canh để cho code qua. Đỏ thì sửa nội dung.

import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parse } from 'node-html-parser';

const GOC = new URL('../../', import.meta.url).pathname;
const DIST = join(GOC, 'dist');
const SITE = 'https://casadeibambini.edu.vn';
const TRUOC_KHI_DANG = process.argv.includes('--truoc-khi-dang');
const BO_QUA_BUILD = process.argv.includes('--khong-build');

// Trang không có cặp hreflang, không cần được dẫn tới, không lập chỉ mục
const TRANG_TIEN_ICH = new Set(['/404.html', '/en/404/', '/tuyen-sinh/cam-on/', '/en/admissions/thank-you/']);

let soLoi = 0;
const loi = (muc, noi) => { soLoi++; console.log(`   ✘ ${muc}: ${noi}`); };
const tieuDe = (s) => console.log(`\n▶ ${s}`);
const dat = (s) => console.log(`   ✔ ${s}`);

// ---------------------------------------------------------------- 1. Build
tieuDe('1. Build thành công, không cảnh báo');
if (!BO_QUA_BUILD) {
  const r = spawnSync('npx', ['astro', 'build'], { cwd: GOC, encoding: 'utf8', env: { ...process.env, FORCE_COLOR: '0' } });
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0) { console.log(out); loi('Build', `lỗi (mã ${r.status})`); finish(); }
  const canhBao = out.split('\n').filter((d) => /\[WARN\]|\bwarning\b|\[warn\]/i.test(d));
  if (canhBao.length) canhBao.forEach((d) => loi('Cảnh báo build', d.trim()));
  else dat('Build xong, không có cảnh báo');
} else dat('Bỏ qua build (--khong-build)');

// ---------------------------------------------------------------- Đọc trang
function lietKe(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? lietKe(p) : [p];
  });
}
const tatCaTep = lietKe(DIST);
const tepHtml = tatCaTep.filter((f) => f.endsWith('.html'));
const duongDanCua = (f) => {
  const r = '/' + relative(DIST, f).split(sep).join('/');
  return r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r;
};
const TRANG = new Map();
for (const f of tepHtml) {
  const html = readFileSync(f, 'utf8');
  TRANG.set(duongDanCua(f), { html, doc: parse(html, { comment: false }) });
}
const tonTai = (p) => {
  if (TRANG.has(p)) return true;
  const f = join(DIST, p);
  return existsSync(f) && statSync(f).isFile();
};
const noiBo = (href) => href.startsWith('/') && !href.startsWith('//') ? href : href.startsWith(SITE) ? href.slice(SITE.length) || '/' : null;

// ---------------------------------------------------------------- 2. Liên kết
tieuDe('2. Không có liên kết hỏng (cả / và /en/)');
const denTrang = new Map([...TRANG.keys()].map((k) => [k, new Set()]));
let soLienKet = 0;
const soLoiTruoc2 = soLoi;
for (const [p, { doc }] of TRANG) {
  for (const el of doc.querySelectorAll('a[href], link[href], img[src], script[src], source[srcset]')) {
    const tag = el.tagName.toLowerCase();
    if (tag === 'link' && /alternate|canonical/.test(el.getAttribute('rel') || '')) continue; // kiểm ở mục 4
    const raw = el.getAttribute('href') ?? el.getAttribute('src') ?? el.getAttribute('srcset').split(' ')[0];
    const nb = noiBo(raw);
    if (nb === null) {
      if (raw.startsWith('#')) {
        const id = raw.slice(1);
        if (id && !doc.querySelector(`[id="${id}"]`)) loi('Neo hỏng', `${p} → ${raw}`);
      }
      continue;
    }
    soLienKet++;
    const [duong, neo] = nb.split('#');
    const sach = duong.split('?')[0];
    if (sach.startsWith('/api/')) continue;
    if (!tonTai(sach)) { loi('Liên kết hỏng', `${p} → ${raw}`); continue; }
    if (neo && TRANG.has(sach) && !TRANG.get(sach).doc.querySelector(`[id="${neo}"]`)) loi('Neo hỏng', `${p} → ${raw}`);
    if (tag === 'a' && sach !== p && denTrang.has(sach)) denTrang.get(sach).add(p);
  }
}
if (soLoi === soLoiTruoc2) dat(`${soLienKet} liên kết nội bộ đều trỏ tới trang/tệp có thật`);

// ---------------------------------------------------------------- 3. Bộ canh sự thật
tieuDe('3. Bộ canh sự thật (kiem-tra/tu-cam.json)');
const cauHinh = JSON.parse(readFileSync(join(GOC, 'kiem-tra/tu-cam.json'), 'utf8'));
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const quyTac = cauHinh.quy_tac.map((q) => ({ ...q, re: new RegExp(q.kieu === 'regex' ? q.mau : escape(q.mau), 'iu') }));
const chuCuaTrang = (doc) => {
  const copy = parse(doc.toString());
  copy.querySelectorAll('style, script:not([type="application/ld+json"])').forEach((e) => e.remove());
  const thuocTinh = copy.querySelectorAll('[alt], [aria-label], [title], meta[content]').map((e) =>
    [e.getAttribute('alt'), e.getAttribute('aria-label'), e.getAttribute('title'), e.getAttribute('content')].filter(Boolean).join(' '));
  return (copy.textContent + ' ' + thuocTinh.join(' ')).normalize('NFC').replace(/\s+/g, ' ');
};
const truocLoi3 = soLoi;
for (const [p, { doc }] of TRANG) {
  const toanTrang = chuCuaTrang(doc);
  const tieuDeTrang = ((doc.querySelector('title')?.textContent || '') + ' ' + doc.querySelectorAll('h1').map((h) => h.textContent).join(' ')).normalize('NFC');
  for (const q of quyTac) {
    const nguon = q.pham_vi === 'tieu-de' ? tieuDeTrang : toanTrang;
    const m = nguon.match(q.re);
    if (m) loi('Cụm cấm', `${p}: "${m[0]}" (${q.ly_do})`);
  }
}
if (soLoi === truocLoi3) dat(`${quyTac.length} quy tắc, không trang nào vi phạm`);

// ---------------------------------------------------------------- 4. Cấu trúc từng trang
tieuDe('4. Một <h1>; <title>, mô tả riêng; hreflang khớp cặp; ảnh có alt');
const truocLoi4 = soLoi;
const daGap = { title: new Map(), desc: new Map() };
for (const [p, { doc }] of TRANG) {
  const h1 = doc.querySelectorAll('h1').length;
  if (h1 !== 1) loi('Số <h1>', `${p} có ${h1}`);
  const title = doc.querySelector('title')?.textContent.trim();
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim();
  if (!title) loi('Thiếu <title>', p);
  if (!desc) loi('Thiếu meta description', p);
  for (const [loai, v] of [['title', title], ['desc', desc]]) {
    if (!v) continue;
    if (daGap[loai].has(v)) loi(loai === 'title' ? '<title> trùng' : 'Mô tả trùng', `${p} và ${daGap[loai].get(v)}`);
    else daGap[loai].set(v, p);
  }
  if (desc && desc.length > 160) loi('Mô tả quá dài', `${p} (${desc.length} ký tự, tối đa 160)`);
  for (const img of doc.querySelectorAll('img')) if (img.getAttribute('alt') === undefined) loi('Ảnh thiếu alt', `${p}: ${img.getAttribute('src')}`);

  if (TRANG_TIEN_ICH.has(p)) {
    if (!/noindex/.test(doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '')) loi('Thiếu noindex', p);
    continue;
  }
  const lang = doc.querySelector('html')?.getAttribute('lang');
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (canonical !== SITE + p) loi('Canonical sai', `${p} → ${canonical}`);
  const alt = Object.fromEntries(doc.querySelectorAll('link[rel="alternate"][hreflang]').map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')]));
  for (const hl of ['vi', 'en', 'x-default']) if (!alt[hl]) loi('Thiếu hreflang', `${p}: ${hl}`);
  if (alt[lang] !== SITE + p) loi('hreflang không tự trỏ về chính trang', `${p}`);
  const doi = lang === 'vi' ? 'en' : 'vi';
  const dich = alt[doi] && noiBo(alt[doi]);
  if (!dich || !TRANG.has(dich)) { loi('hreflang trỏ tới trang không có', `${p} → ${alt[doi]}`); continue; }
  const altDoi = Object.fromEntries(TRANG.get(dich).doc.querySelectorAll('link[rel="alternate"][hreflang]').map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')]));
  if (altDoi[lang] !== SITE + p) loi('hreflang không khớp hai chiều', `${p} ⇄ ${dich}`);
  if (TRANG.get(dich).doc.querySelector('html')?.getAttribute('lang') !== doi) loi('lang của trang đối ứng sai', dich);
}
if (soLoi === truocLoi4) dat(`${TRANG.size} trang đạt`);

// ---------------------------------------------------------------- 5. JSON-LD
tieuDe('5. Schema JSON-LD hợp lệ (parse được, có @type)');
const truocLoi5 = soLoi;
let soSchema = 0;
for (const [p, { doc }] of TRANG) {
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    soSchema++;
    let obj;
    try { obj = JSON.parse(s.textContent); } catch (e) { loi('JSON-LD không parse được', `${p}: ${e.message}`); continue; }
    const muc = Array.isArray(obj) ? obj : obj['@graph'] ?? [obj];
    for (const m of muc) if (!m['@type']) loi('JSON-LD thiếu @type', p);
    if (JSON.stringify(obj).includes('priceRange')) loi('JSON-LD có priceRange', p);
  }
}
if (soLoi === truocLoi5) dat(`${soSchema} khối schema hợp lệ`);

// ---------------------------------------------------------------- 6. Bảng chuyển hướng
tieuDe('6. Mọi URL cũ trong docs/URL-CU.csv có đích 301 tồn tại');
const truocLoi6 = soLoi;
function docCsv(text) {
  const dong = []; let o = '', hang = [], ngoac = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (ngoac) { if (c === '"' && text[i + 1] === '"') { o += '"'; i++; } else if (c === '"') ngoac = false; else o += c; }
    else if (c === '"') ngoac = true;
    else if (c === ',') { hang.push(o); o = ''; }
    else if (c === '\n') { hang.push(o); dong.push(hang); hang = []; o = ''; }
    else if (c !== '\r') o += c;
  }
  if (o || hang.length) { hang.push(o); dong.push(hang); }
  return dong;
}
const [dau, ...hangCsv] = docCsv(readFileSync(join(GOC, 'docs/URL-CU.csv'), 'utf8')).filter((h) => h.length > 1);
const iCu = dau.indexOf('url_cu'), iDich = dau.indexOf('dich_moi');
for (const h of hangCsv) {
  const dich = h[iDich];
  if (!dich) loi('URL cũ không có đích', h[iCu]);
  else if (!tonTai(dich)) loi('Đích 301 không tồn tại', `${h[iCu]} → ${dich}`);
}
if (soLoi === truocLoi6) dat(`${hangCsv.length} URL cũ đều có đích tồn tại`);

// ---------------------------------------------------------------- 7. Trang mồ côi (QUYET-DINH Q15)
tieuDe('7. Không có trang mồ côi');
const truocLoi7 = soLoi;
for (const [p, tu] of denTrang) if (!TRANG_TIEN_ICH.has(p) && p !== '/' && tu.size === 0) loi('Trang mồ côi', p);
if (soLoi === truocLoi7) dat('Mọi trang đều được ít nhất một trang khác dẫn tới');

// ---------------------------------------------------------------- 8. Sitemap
tieuDe('8. sitemap.xml khớp các trang được lập chỉ mục');
const truocLoi8 = soLoi;
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].slice(SITE.length));
for (const l of locs) { if (!TRANG.has(l)) loi('Sitemap trỏ tới trang không có', l); if (TRANG_TIEN_ICH.has(l)) loi('Sitemap có trang noindex', l); }
for (const p of TRANG.keys()) if (!TRANG_TIEN_ICH.has(p) && !locs.includes(p)) loi('Trang thiếu trong sitemap', p);
if (soLoi === truocLoi8) dat(`${locs.length} trang trong sitemap`);

// ---------------------------------------------------------------- 9. Chỗ còn thiếu thông tin
tieuDe(`9. Chỗ [CẦN: …] còn trên trang${TRUOC_KHI_DANG ? ' (chế độ trước khi đăng: báo đỏ)' : ' (chỉ báo cáo)'}`);
let tongCan = 0;
for (const [p, { doc }] of TRANG) {
  const n = (doc.textContent.match(/\[CẦN:/g) || []).length;
  if (!n) continue;
  tongCan += n;
  if (TRUOC_KHI_DANG) loi('Còn thiếu thông tin', `${p}: ${n} chỗ`);
  else console.log(`   · ${p}: ${n} chỗ`);
}
console.log(`   Tổng: ${tongCan} chỗ [CẦN] trên ${TRANG.size} trang`);

// ---------------------------------------------------------------- 10. Dịch vụ nhận form (Giai đoạn 4)
tieuDe('10. Dịch vụ nhận form: kiểm thử tự động');
const kiemThuForm = spawnSync(process.execPath, ['--test', '--test-reporter=dot', ...readdirSync(join(GOC, 'form/test')).filter((f) => f.endsWith('.test.mjs')).map((f) => join(GOC, 'form/test', f))], { encoding: 'utf8' });
if (kiemThuForm.status === 0) dat('Các bài kiểm thử dịch vụ form đều đạt');
else { loi('Kiểm thử dịch vụ form', 'có bài không đạt'); console.log((kiemThuForm.stdout + kiemThuForm.stderr).split('\n').slice(-40).join('\n')); }

finish();
function finish() {
  console.log(soLoi ? `\n✘ ${soLoi} lỗi. Sửa nội dung rồi chạy lại; không nới bộ canh.` : '\n✔ Tất cả kiểm tra đạt.');
  process.exit(soLoi ? 1 : 0);
}
