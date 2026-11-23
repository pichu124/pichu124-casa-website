// Bảng đường dẫn hai thứ tiếng (docs/KIEN-TRUC-THONG-TIN.md, mục 1).
// Mỗi trang tiếng Việt có đúng một trang tiếng Anh tương ứng.
import type { Lang } from '../data/co-so';
import { CO_SO } from '../data/co-so';
import { BAI_VIET, khoaBai } from '../data/bai-viet';

const coSo = Object.fromEntries(
  CO_SO.map((c) => [`co-so-${c.slug}`, { vi: `/co-so/${c.slug}/`, en: `/en/campuses/${c.slug}/` }]),
);

export const ROUTES = {
  home: { vi: '/', en: '/en/' },
  programmes: { vi: '/chuong-trinh/', en: '/en/programmes/' },
  nursery: { vi: '/chuong-trinh/nha-tre/', en: '/en/programmes/nursery/' },
  kindergarten: { vi: '/chuong-trinh/mau-giao/', en: '/en/programmes/kindergarten/' },
  campuses: { vi: '/co-so/', en: '/en/campuses/' },
  admissions: { vi: '/tuyen-sinh/', en: '/en/admissions/' },
  thanks: { vi: '/tuyen-sinh/cam-on/', en: '/en/admissions/thank-you/' },
  about: { vi: '/ve-casa/', en: '/en/about/' },
  articles: { vi: '/tin-tuc/', en: '/en/news/' },
  'article-cey': { vi: '/tin-tuc/cambridge-early-years-la-gi/', en: '/en/news/what-is-cambridge-early-years/' },
  contact: { vi: '/lien-he/', en: '/en/contact/' },
  privacy: { vi: '/chinh-sach-bao-ve-du-lieu/', en: '/en/privacy-policy/' },
  ...coSo,
  ...Object.fromEntries(BAI_VIET.map((b) => [khoaBai(b.ma), { vi: `/tin-tuc/${b.vi.duongDan}/`, en: `/en/news/${b.en.duongDan}/` }])),
} as Record<string, { vi: string; en: string }>;

export type RouteKey = keyof typeof ROUTES;

export const url = (key: string, lang: Lang) => {
  const r = ROUTES[key];
  if (!r) throw new Error(`Không có đường dẫn cho khoá "${key}"`);
  return r[lang];
};

/** Hàm chọn chữ theo ngôn ngữ: t('Tiếng Việt', 'English') */
export const taoT = (lang: Lang) => (vi: string, en: string) => (lang === 'en' ? en : vi);

export const FORM_ANCHOR = '#dang-ky';
