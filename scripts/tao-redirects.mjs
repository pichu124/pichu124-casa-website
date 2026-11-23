#!/usr/bin/env node
// npm run redirects — sinh deploy/redirects.conf (nginx) từ docs/URL-CU.csv.
// Tệp sinh ra là một khối `map`, đặt ở ngữ cảnh http của nginx; khối server của site dùng:
//   if ($casa_chuyen_huong) { return 301 $casa_chuyen_huong; }
// Hướng dẫn cài nằm ở docs/TRIEN-KHAI.md (Giai đoạn 5). Không sửa tay tệp sinh ra.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const GOC = new URL('../', import.meta.url).pathname;
const text = readFileSync(join(GOC, 'docs/URL-CU.csv'), 'utf8');

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
const [dau, ...hang] = docCsv(text);
const iCu = dau.indexOf('url_cu'), iDich = dau.indexOf('dich_moi');
const kyTu = (s) => s.replace(/"/g, '\\"');

const dong = [];
let bo = 0;
for (const h of hang) {
  const cu = h[iCu], dich = h[iDich];
  if (!cu || !dich) throw new Error(`Thiếu đích cho ${cu}`);
  if (cu === dich) { bo++; continue; }
  dong.push(`    "${kyTu(cu)}" "${kyTu(dich)}";`);
  // Bản không có dấu "/" cuối của cùng URL cũ
  if (cu.endsWith('/') && cu !== '/') dong.push(`    "${kyTu(cu.slice(0, -1))}" "${kyTu(dich)}";`);
}

const noiDung = `# TỆP SINH TỰ ĐỘNG bởi "npm run redirects" từ docs/URL-CU.csv — không sửa tay.
# ${hang.length} URL cũ; ${bo} URL giữ nguyên đường dẫn (không cần chuyển hướng).
# Đặt trong ngữ cảnh http {} của nginx. Khối server của site dùng:
#   if ($casa_chuyen_huong) { return 301 $casa_chuyen_huong; }

map $uri $casa_chuyen_huong {
    default "";
${dong.join('\n')}

    # Quy tắc chung cho URL cũ không có trong sitemap (docs/KIEM-KE-SITE-CU.md)
    ~^/en/tag/                "/en/news/";
    ~^/tag/                   "/tin-tuc/";
    ~^/en/(.*/)?feed/?$       "/en/news/";
    ~^/(.*/)?feed/?$          "/tin-tuc/";
    ~^/en/(.+/)?page/[0-9]+/?$ "/en/news/";
    ~^/(.+/)?page/[0-9]+/?$   "/tin-tuc/";
}

# URL WordPress không còn dùng: trả 410 (đã gỡ). Đặt trong khối server:
#   location ~ ^/(wp-admin|wp-login\\.php|xmlrpc\\.php|wp-json|wp-content|wp-includes)(/|$) { return 410; }
# Dạng ?p=123, ?page_id=123, ?lang=en: xử lý trong khối server bằng $arg_p, $arg_page_id, $arg_lang
# (xem docs/TRIEN-KHAI.md, Giai đoạn 5).
`;
mkdirSync(join(GOC, 'deploy'), { recursive: true });
writeFileSync(join(GOC, 'deploy/redirects.conf'), noiDung);

// ---- Bản cho Caddy (máy chủ đang dùng Caddy, QUYET-DINH Q16): nhóm URL cũ theo đích
const theoDich = new Map();
for (const h of hang) {
  const cu = h[iCu], dich = h[iDich];
  if (cu === dich) continue;
  if (!theoDich.has(dich)) theoDich.set(dich, []);
  theoDich.get(dich).push(cu);
  if (cu.endsWith('/') && cu !== '/') theoDich.get(dich).push(cu.slice(0, -1));
}
const tenMatcher = (d) => 'cu_' + (d.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'goc');
const khoi = [...theoDich].map(([dich, ds]) =>
  `@${tenMatcher(dich)} path ${ds.join(' ')}\nredir @${tenMatcher(dich)} ${dich} 301`);
const caddy = `# TỆP SINH TỰ ĐỘNG bởi "npm run redirects" từ docs/URL-CU.csv — không sửa tay.
# Dùng ở Giai đoạn 6 (chuyển tên miền chính): import tệp này BÊN TRONG khối site của casadeibambini.edu.vn.
# ${hang.length} URL cũ; ${bo} URL giữ nguyên đường dẫn (không cần chuyển hướng).

${khoi.join('\n\n')}

# Quy tắc chung cho URL cũ không có trong sitemap (docs/KIEM-KE-SITE-CU.md)
@cu_tag_en path_regexp ^/en/tag/
redir @cu_tag_en /en/news/ 301
@cu_tag path_regexp ^/tag/
redir @cu_tag /tin-tuc/ 301
@cu_feed_en path_regexp ^/en/(.*/)?feed/?$
redir @cu_feed_en /en/news/ 301
@cu_feed path_regexp ^/(.*/)?feed/?$
redir @cu_feed /tin-tuc/ 301
@cu_trang_en path_regexp ^/en/(.+/)?page/[0-9]+/?$
redir @cu_trang_en /en/news/ 301
@cu_trang path_regexp ^/(.+/)?page/[0-9]+/?$
redir @cu_trang /tin-tuc/ 301
@cu_q_lang query lang=en
redir @cu_q_lang /en/ 301
# Hai matcher riêng: "query p=* page_id=*" trong một matcher nghĩa là phải có cả hai tham số
@cu_q_p query p=*
redir @cu_q_p / 301
@cu_q_page_id query page_id=*
redir @cu_q_page_id / 301

# URL WordPress không còn dùng: trả 410 (đã gỡ)
@cu_wp path_regexp ^/(wp-admin|wp-login\\.php|xmlrpc\\.php|wp-json|wp-content|wp-includes)(/|$)
respond @cu_wp 410
`;
writeFileSync(join(GOC, 'deploy/redirects.caddy'), caddy);
console.log(`Đã sinh deploy/redirects.conf (nginx) và deploy/redirects.caddy (Caddy, ${theoDich.size} nhóm đích): ${hang.length - bo} URL chuyển hướng, ${bo} URL giữ nguyên.`);
