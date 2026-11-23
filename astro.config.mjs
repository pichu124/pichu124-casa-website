import { defineConfig } from 'astro/config';

// Site tĩnh, hai thứ tiếng: tiếng Việt ở gốc "/", tiếng Anh ở "/en/".
// Đường dẫn kết thúc bằng "/" và mỗi trang là một thư mục có index.html.
// Bảng trong bài viết Markdown (src/bai-viet/): bọc trong khung cuộn ngang .bang-cuon như các bảng
// khác của site, để bảng rộng không kéo cả trang tràn ngang trên điện thoại.
function bocBangCuon() {
  return (cay, tep) => {
    const nhan = /[\\/]en\.md$/.test(tep?.path ?? '') ? 'Table' : 'Bảng';
    const duyet = (nut) => {
      if (!nut.children) return;
      nut.children = nut.children.map((con) => {
        if (con.type === 'element' && con.tagName === 'table') {
          const chu = (n) => (n.type === 'text' ? n.value : (n.children ?? []).map(chu).join('')).trim();
          const oDau = (n) => (n.tagName === 'th' ? n : (n.children ?? []).map(oDau).find(Boolean));
          const th = oDau(con);
          const o = th && chu(th) ? [null, chu(th)] : null;
          return {
            type: 'element', tagName: 'div',
            properties: { className: ['bang-cuon'], role: 'region', tabIndex: 0, ariaLabel: o ? `${nhan}: ${o[1]}` : nhan },
            children: [con],
          };
        }
        duyet(con);
        return con;
      });
    };
    duyet(cay);
  };
}

export default defineConfig({
  markdown: { rehypePlugins: [bocBangCuon] },
  site: 'https://casadeibambini.edu.vn',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
