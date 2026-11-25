// Bài viết dạng tệp (QUYET-DINH Q32): mỗi bài một thư mục src/bai-viet/<mã-bài>/ có vi.md và en.md.
// Hướng dẫn viết và mẫu: docs/MAU-BAI-VIET.md. Bài nền "Cambridge Early Years là gì" vẫn là trang
// viết tay (components/trang/BaiCambridge.astro) vì có phần riêng theo công tắc Ciputra.
// Thiếu bản dịch, thiếu mục bắt buộc hay mục quá dài: build dừng và báo lỗi bằng tiếng Việt.
import { CIPUTRA_CONG_KHAI, type Lang } from './co-so';

export interface ThongTinBai {
  /** Phần cuối đường dẫn: /tin-tuc/<duongDan>/ hoặc /en/news/<duongDan>/ — chữ thường, không dấu, nối bằng "-" */
  duongDan: string;
  /** <title>, tối đa 65 ký tự */
  tieuDe: string;
  /** meta description, 70–160 ký tự */
  moTa: string;
  /** Tiêu đề lớn trên trang */
  h1: string;
  /** Một câu tóm tắt hiện ở danh sách bài */
  tom: string;
  /** Ngày đăng YYYY-MM-DD */
  ngay: string;
  /** Khoá trang mà bài dẫn về ở cuối bài (admissions, nursery, kindergarten, programmes, campuses; bài Ciputra dùng co-so-ciputra) */
  danVe: string;
  /** true = bài về Ciputra: chỉ dựng khi công tắc Ciputra bật */
  ciputra?: boolean;
  /** true = bản nháp: không dựng lên site (QUYET-DINH Q38). Đăng = bỏ dòng này và đặt ngày thật */
  nhap?: boolean;
  /** Nguồn tham khảo (tuỳ chọn) */
  nguon?: { ten: string; url: string }[];
}

export interface Bai { ma: string; vi: ThongTinBai; en: ThongTinBai }

const tep = import.meta.glob<Record<string, unknown>>('../bai-viet/*/*.md', { eager: true, import: 'frontmatter' });

// YAML đọc ngày không có ngoặc kép thành Date (hoặc chuỗi ISO có giờ): chỉ giữ YYYY-MM-DD
const ngayChuoi = (v: unknown) => {
  const s = v instanceof Date ? v.toISOString() : String(v ?? '');
  return /^\d{4}-\d{2}-\d{2}(T|$)/.test(s) ? s.slice(0, 10) : s;
};

function kiemTra(ma: string, lang: Lang, f: Record<string, unknown> | undefined): ThongTinBai {
  const noi = `src/bai-viet/${ma}/${lang}.md`;
  if (!f) throw new Error(`Bài "${ma}" thiếu bản ${lang === 'vi' ? 'tiếng Việt' : 'tiếng Anh'}: cần tệp ${noi}`);
  for (const k of ['duongDan', 'tieuDe', 'moTa', 'h1', 'tom', 'ngay', 'danVe']) {
    if (!f[k] || !String(f[k]).trim()) throw new Error(`${noi}: thiếu mục "${k}" ở đầu tệp`);
  }
  const b = { ...f, ngay: ngayChuoi(f.ngay) } as unknown as ThongTinBai;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(b.duongDan)) throw new Error(`${noi}: "duongDan" chỉ dùng chữ thường không dấu, số và dấu "-"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.ngay)) throw new Error(`${noi}: "ngay" phải có dạng YYYY-MM-DD`);
  if (b.tieuDe.length > 65) throw new Error(`${noi}: "tieuDe" dài ${b.tieuDe.length} ký tự, tối đa 65`);
  if (b.moTa.length < 70 || b.moTa.length > 160) throw new Error(`${noi}: "moTa" dài ${b.moTa.length} ký tự, cần 70–160`);
  return b;
}

const theoMa = new Map<string, Partial<Record<Lang, Record<string, unknown>>>>();
for (const [duong, fm] of Object.entries(tep)) {
  const m = duong.match(/\/bai-viet\/([^/]+)\/(vi|en)\.md$/);
  if (!m) throw new Error(`Tệp bài viết đặt sai chỗ: ${duong} (cần src/bai-viet/<mã-bài>/vi.md hoặc en.md)`);
  const [, ma, lang] = m;
  if (!theoMa.has(ma)) theoMa.set(ma, {});
  theoMa.get(ma)![lang as Lang] = fm;
}

const TAT_CA: Bai[] = [...theoMa].map(([ma, ds]) => {
  const vi = kiemTra(ma, 'vi', ds.vi), en = kiemTra(ma, 'en', ds.en);
  if (Boolean(vi.ciputra) !== Boolean(en.ciputra)) throw new Error(`Bài "${ma}": mục "ciputra" ở vi.md và en.md phải giống nhau`);
  if (Boolean(vi.nhap) !== Boolean(en.nhap)) throw new Error(`Bài "${ma}": mục "nhap" ở vi.md và en.md phải giống nhau`);
  if (vi.danVe !== en.danVe) throw new Error(`Bài "${ma}": mục "danVe" ở vi.md và en.md phải giống nhau`);
  if (vi.danVe === 'co-so-ciputra' && !vi.ciputra) throw new Error(`Bài "${ma}": dẫn về trang Ciputra thì phải có "ciputra: true"`);
  return { ma, vi, en };
});
for (const lang of ['vi', 'en'] as const) {
  const daCo = new Map<string, string>();
  for (const b of TAT_CA) {
    const d = b[lang].duongDan;
    if (daCo.has(d)) throw new Error(`Hai bài "${daCo.get(d)}" và "${b.ma}" trùng đường dẫn ${lang}: ${d}`);
    daCo.set(d, b.ma);
  }
}

/** Dựng cả bản nháp, chỉ để kiểm tra (npm run check:nhap). Không bao giờ bật trên máy chủ. */
const DUNG_NHAP = process.env.CASA_NHAP === '1';

/** Bài được dựng trên bản này, mới nhất trước. Bài Ciputra chỉ có khi công tắc bật; bản nháp không dựng. */
export const BAI_VIET: Bai[] = TAT_CA
  .filter((b) => CIPUTRA_CONG_KHAI || !b.vi.ciputra)
  .filter((b) => DUNG_NHAP || !b.vi.nhap)
  .sort((a, b) => b.vi.ngay.localeCompare(a.vi.ngay));

export const khoaBai = (ma: string) => `bai-${ma}`;
