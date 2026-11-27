// Ghi mỗi đăng ký thành một dòng JSON vào /var/lib/casa-website/dang-ky.jsonl. Chỉ user dịch vụ ghi được; nhóm
// casa-form đọc được để app chăm sóc lead (casa-lead) lấy đăng ký giao cho sale (QUYET-DINH Q43). Người khác không đọc được.
// Không bao giờ ghi vào dữ liệu của app casa-mamnon.

import fs from 'node:fs/promises';
import path from 'node:path';

export const TEN_TEP = 'dang-ky.jsonl';

export async function ghiDangKy(thuMuc, banGhi) {
  await fs.mkdir(thuMuc, { recursive: true, mode: 0o750 });
  await fs.appendFile(path.join(thuMuc, TEN_TEP), JSON.stringify(banGhi) + '\n', { mode: 0o640 });
}
