// Trang báo lỗi gửi form (tiếng Việt / tiếng Anh), dễ hiểu, luôn kèm số hotline. Không cần JS.

const HOTLINE = { vi: '0989 059 838', en: '+84 989 059 838', tel: '+84989059838' };

const thoat = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function trangLoi({ lang = 'vi', tieuDe, doan = [], ds = [], quayLai = null }) {
  const t = (vi, en) => (lang === 'en' ? en : vi);
  const linkForm = quayLai ?? t('/tuyen-sinh/#dang-ky', '/en/admissions/#dang-ky');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${thoat(tieuDe)} | Casa Preschool</title>
<style>
  body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; font-size: 1.125rem; line-height: 1.6; color: #2b2d3a; background: #eef4fb; }
  main { max-width: 36rem; margin: 2rem auto; padding: 2rem 1.25rem; background: #fff; border-radius: 16px; }
  h1 { color: #23265a; font-size: 1.6rem; line-height: 1.2; margin: 0 0 1rem; }
  ul { padding-left: 1.25rem; }
  li { margin-bottom: .5rem; }
  a { color: #23265a; }
  .nut { display: inline-block; margin: .5rem .5rem 0 0; padding: .75rem 1.25rem; border-radius: 999px; font-weight: 700; text-decoration: none; }
  .nut--chinh { background: #e54041; color: #fff; font-size: 1.1875rem; }
  .nut--phu { border: 2px solid #23265a; color: #23265a; }
</style>
</head>
<body>
<main>
  <h1>${thoat(tieuDe)}</h1>
  ${doan.map((p) => `<p>${thoat(p)}</p>`).join('\n  ')}
  ${ds.length ? `<ul>${ds.map((d) => `<li>${thoat(d)}</li>`).join('')}</ul>` : ''}
  <p>${t('Cần gấp, xin gọi', 'If it is urgent, please call')} <a href="tel:${HOTLINE.tel}"><strong>${t(HOTLINE.vi, HOTLINE.en)}</strong></a>.</p>
  <p>
    <a class="nut nut--chinh" href="${thoat(linkForm)}">${t('Quay lại form đăng ký', 'Back to the form')}</a>
    <a class="nut nut--phu" href="tel:${HOTLINE.tel}">${t('Gọi nhà trường', 'Call the school')}</a>
  </p>
</main>
</body>
</html>`;
}
