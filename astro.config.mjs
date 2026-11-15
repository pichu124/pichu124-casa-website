import { defineConfig } from 'astro/config';

// Site tĩnh, hai thứ tiếng: tiếng Việt ở gốc "/", tiếng Anh ở "/en/".
// Đường dẫn kết thúc bằng "/" và mỗi trang là một thư mục có index.html.
export default defineConfig({
  site: 'https://casadeibambini.edu.vn',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
