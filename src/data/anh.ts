// Ảnh dùng trên site. Nguồn: thư mục Drive "Ảnh cho web" của nhà trường.
// Ảnh có trẻ: nhà trường xác nhận đã có đồng ý của phụ huynh (QUYET-DINH Q25). Không ghi tên bé.
import type { ImageMetadata } from 'astro';
import type { HaiNgu } from './co-so';

import kmSanChoi from '../assets/anh/kim-ma/san-choi.jpg';
import kmLopMontessori from '../assets/anh/kim-ma/lop-montessori.jpg';
import kmVongTron from '../assets/anh/kim-ma/vong-tron-sang.jpg';
import kmChuCai from '../assets/anh/kim-ma/hoc-chu-cai.jpg';
import kmKyNang from '../assets/anh/kim-ma/ky-nang-song.jpg';
import kmVanDong from '../assets/anh/kim-ma/van-dong-ngoai-troi.jpg';
import kmNauAn from '../assets/anh/kim-ma/nau-an.jpg';
import kmKhoaHoc from '../assets/anh/kim-ma/kham-pha-khoa-hoc.jpg';
import kmNhaTre from '../assets/anh/kim-ma/nha-tre.jpg';

import clLopHoc from '../assets/anh/chua-lang/lop-hoc.jpg';
import clThuVien from '../assets/anh/chua-lang/thu-vien.jpg';
import clGvNuocNgoai from '../assets/anh/chua-lang/giao-vien-nuoc-ngoai.jpg';
import clVanDong from '../assets/anh/chua-lang/phong-van-dong.jpg';
import clMontessori from '../assets/anh/chua-lang/gio-montessori.jpg';
import clPiano from '../assets/anh/chua-lang/piano.jpg';
import clAmNhac from '../assets/anh/chua-lang/am-nhac-van-dong.jpg';
import clTuPhucVu from '../assets/anh/chua-lang/tu-phuc-vu.jpg';

import mdLopHoc from '../assets/anh/my-dinh/lop-hoc.jpg';
import mdDocSach from '../assets/anh/my-dinh/doc-sach-cung-thay.jpg';
import mdGocDoc from '../assets/anh/my-dinh/goc-doc-sach.jpg';
import mdTiengAnh from '../assets/anh/my-dinh/gio-tieng-anh.jpg';
import mdMontessori from '../assets/anh/my-dinh/gio-montessori.jpg';
import mdNauAn from '../assets/anh/my-dinh/nau-an.jpg';
import mdKhoaHoc from '../assets/anh/my-dinh/kham-pha-khoa-hoc.jpg';
import mdVanDong from '../assets/anh/my-dinh/khu-van-dong.jpg';
import mdThuVien from '../assets/anh/my-dinh/thu-vien.jpg';

import dauTrang from '../assets/anh/chung/dau-trang.jpg';
import banTay from '../assets/anh/chung/ban-tay.jpg';
import lopHocTron from '../assets/anh/chung/lop-hoc-tron.jpg';
import gioHocBan from '../assets/anh/chung/gio-hoc-ban.jpg';
import giaoVien1 from '../assets/anh/chung/giao-vien-1.jpg';
import giaoVien2 from '../assets/anh/chung/giao-vien-2.jpg';
import nhaTreCoVaBe from '../assets/anh/chung/nha-tre-co-va-be.jpg';
import nhaTreChamCay from '../assets/anh/chung/nha-tre-cham-cay.jpg';
import tienTieuHoc from '../assets/anh/chung/tien-tieu-hoc.jpg';
import donTre from '../assets/anh/chung/don-tre.jpg';

export interface AnhSite { src: ImageMetadata; alt: HaiNgu }
const a = (src: ImageMetadata, vi: string, en: string): AnhSite => ({ src, alt: { vi, en } });

export const ANH = {
  dauTrang: a(dauTrang, 'Thầy giáo nước ngoài trò chuyện cùng các bé quanh bàn học', 'A foreign teacher talking with children around a classroom table'),
  banTay: a(banTay, 'Bàn tay của thầy giáo và các bé đặt chồng lên nhau', "A teacher's hand and the children's hands stacked together"),
  lopHocTron: a(lopHocTron, 'Các bé ngồi thành vòng, giơ tay phát biểu trong lớp học có kệ học cụ bằng gỗ', 'Children sitting in a circle, raising their hands in a classroom with wooden shelves'),
  gioHocBan: a(gioHocBan, 'Cô giáo hướng dẫn các bé làm bài ở bàn', 'Teachers guiding children with their work at the table'),
  giaoVien1: a(giaoVien1, 'Cô giáo nước ngoài đập tay cùng một bé trong lớp', 'A foreign teacher giving a child a high five in class'),
  giaoVien2: a(giaoVien2, 'Cô giáo ngồi cùng bé với bộ chữ cái Montessori trên sàn', 'A teacher sitting with a child and Montessori letter materials on the floor'),
  nhaTreCoVaBe: a(nhaTreCoVaBe, 'Cô giáo chơi cùng một bé nhà trẻ trên thảm', 'A teacher playing with a nursery child on a mat'),
  nhaTreChamCay: a(nhaTreChamCay, 'Cô giáo hướng dẫn bé nhà trẻ lau lá cây', 'A teacher showing a nursery child how to wipe plant leaves'),
  tienTieuHoc: a(tienTieuHoc, 'Cô giáo hướng dẫn các bé lớp lớn tập viết', 'A teacher helping older children practise writing'),
  donTre: a(donTre, 'Cô giáo dắt tay bé vào trường buổi sáng', 'A teacher walking a child into school in the morning'),
};

export const ANH_CO_SO: Record<string, AnhSite[]> = {
  'kim-ma': [
    a(kmSanChoi, 'Sân chơi cỏ ngoài trời với cầu trượt, xích đu ở cơ sở Kim Mã', 'The outdoor grass playground with slides and swings at Kim Mã'),
    a(kmLopMontessori, 'Lớp học có kệ học cụ Montessori và cửa sổ nhìn ra cây xanh', 'A classroom with Montessori shelves and windows looking onto trees'),
    a(kmVongTron, 'Giờ sinh hoạt vòng tròn trên thảm bản đồ thế giới', 'Circle time on a world-map rug'),
    a(kmChuCai, 'Cô giáo cùng bé ghép chữ với bộ chữ cái di động', 'A teacher and child building words with the movable alphabet'),
    a(kmKyNang, 'Bé tập rót nước trong giờ kỹ năng sống', 'A child practising pouring during practical-life time'),
    a(kmVanDong, 'Thầy giáo cùng các bé vận động ngoài sân', 'A teacher leading outdoor play with the children'),
    a(kmNauAn, 'Giờ nấu ăn: cô và bé chuẩn bị rau củ', 'Cooking class: a teacher and child preparing vegetables'),
    a(kmKhoaHoc, 'Các bé quan sát bể cá trong giờ khám phá khoa học', 'Children observing a fish tank during science time'),
    a(kmNhaTre, 'Cô giáo và bé nhà trẻ với giỏ học cụ', 'A teacher and a nursery child with a basket of materials'),
  ],
  'chua-lang': [
    a(clLopHoc, 'Lớp học rộng có kệ học cụ Montessori ở cơ sở Chùa Láng', 'A spacious classroom with Montessori shelves at Chùa Láng'),
    a(clThuVien, 'Góc thư viện với kệ sách và ghế tròn đọc truyện', 'The library corner with bookshelves and a round reading seat'),
    a(clGvNuocNgoai, 'Cô giáo nước ngoài cùng các bé trong giờ học', 'A foreign teacher with children during a lesson'),
    a(clVanDong, 'Phòng vận động có thảm mềm và dụng cụ leo trèo', 'The movement room with soft mats and climbing equipment'),
    a(clMontessori, 'Các bé làm việc với học cụ trên thảm riêng', 'Children working with materials on their own mats'),
    a(clPiano, 'Bé tập đàn piano', 'A child playing the piano'),
    a(clAmNhac, 'Giờ âm nhạc và vận động cùng cô giáo', 'Music and movement time with the teacher'),
    a(clTuPhucVu, 'Bé tự rửa tay', 'A child washing their hands'),
  ],
  'my-dinh': [
    a(mdLopHoc, 'Lớp học sáng, cửa kính lớn và kệ học cụ bằng gỗ ở cơ sở Mỹ Đình', 'A bright classroom with large windows and wooden shelves at Mỹ Đình'),
    a(mdDocSach, 'Thầy giáo nước ngoài đọc sách cùng các bé ở góc thư viện', 'A foreign teacher reading with children in the library corner'),
    a(mdTiengAnh, 'Giờ tiếng Anh với thầy giáo nước ngoài', 'An English lesson with a foreign teacher'),
    a(mdThuVien, 'Thư viện với kệ sách và góc đọc hình vòm', 'The library with bookshelves and an arched reading nook'),
    a(mdMontessori, 'Cô giáo cùng bé với học cụ Montessori', 'A teacher and child with Montessori materials'),
    a(mdGocDoc, 'Bé ngồi đọc sách ở góc đọc', 'A child reading in the reading corner'),
    a(mdKhoaHoc, 'Các bé làm thí nghiệm núi lửa cùng cô giáo', 'Children doing a volcano experiment with their teacher'),
    a(mdNauAn, 'Giờ nấu ăn: bé cắt rau củ cùng cô', 'Cooking class: a child cutting vegetables with the teacher'),
    a(mdVanDong, 'Khu vận động trong nhà với cầu trượt và dụng cụ leo', 'The indoor play area with slides and climbing equipment'),
  ],
};
