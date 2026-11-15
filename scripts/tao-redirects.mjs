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
console.log(`Đã sinh deploy/redirects.conf: ${dong.length} dòng chuyển hướng, ${bo} URL giữ nguyên.`);
