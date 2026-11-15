// sitemap.xml: chỉ các trang được lập chỉ mục, kèm cặp hreflang vi/en.
import { ROUTES } from '../i18n/routes';
import { SITE } from '../data/lien-he';

const KHONG_LAP_CHI_MUC = new Set(['thanks']);

export function GET() {
  const dong: string[] = [];
  for (const [key, r] of Object.entries(ROUTES)) {
    if (KHONG_LAP_CHI_MUC.has(key)) continue;
    for (const lang of ['vi', 'en'] as const) {
      dong.push(
        `  <url>\n    <loc>${SITE}${r[lang]}</loc>\n` +
          `    <xhtml:link rel="alternate" hreflang="vi" href="${SITE}${r.vi}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${r.en}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${r.vi}"/>\n  </url>`,
      );
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${dong.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
