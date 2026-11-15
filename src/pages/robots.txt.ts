import { SITE } from '../data/lien-he';
// Bản thử ở tên miền phụ được chặn bằng mật khẩu và X-Robots-Tag ở nginx (Giai đoạn 5), không qua tệp này.
export function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
