// Máy chủ SMTP giả (không mã hoá) để kiểm thử: ghi lại lệnh và nội dung thư nhận được.
import net from 'node:net';

export function taoSmtpGia({ tuChoiMatKhau = false } = {}) {
  const thuNhan = [];
  const lenh = [];
  const mayChu = net.createServer((s) => {
    s.setEncoding('utf8');
    let dem = '';
    let dangNhanData = false;
    let buocDangNhap = 0;
    let duLieu = '';
    s.write('220 smtp-gia san sang\r\n');
    s.on('data', (d) => {
      dem += d;
      let i;
      while ((i = dem.indexOf('\r\n')) >= 0) {
        const dong = dem.slice(0, i);
        dem = dem.slice(i + 2);
        if (dangNhanData) {
          if (dong === '.') { dangNhanData = false; thuNhan.push(duLieu); duLieu = ''; s.write('250 OK da nhan\r\n'); }
          else duLieu += (dong.startsWith('..') ? dong.slice(1) : dong) + '\r\n';
          continue;
        }
        lenh.push(dong);
        if (buocDangNhap === 1) { buocDangNhap = 2; s.write('334 UGFzc3dvcmQ6\r\n'); continue; }
        if (buocDangNhap === 2) { buocDangNhap = 0; s.write(tuChoiMatKhau ? '535 5.7.8 Sai mat khau\r\n' : '235 OK\r\n'); continue; }
        if (dong.startsWith('EHLO')) s.write('250-smtp-gia\r\n250-AUTH LOGIN PLAIN\r\n250 8BITMIME\r\n');
        else if (dong === 'AUTH LOGIN') { buocDangNhap = 1; s.write('334 VXNlcm5hbWU6\r\n'); }
        else if (dong.startsWith('MAIL FROM') || dong.startsWith('RCPT TO')) s.write('250 OK\r\n');
        else if (dong === 'DATA') { dangNhanData = true; s.write('354 Bat dau\r\n'); }
        else if (dong === 'QUIT') { s.write('221 Tam biet\r\n'); s.end(); }
        else s.write('500 Khong hieu\r\n');
      }
    });
  });
  return new Promise((resolve) => mayChu.listen(0, '127.0.0.1', () => resolve({
    cong: mayChu.address().port, thuNhan, lenh, dong: () => new Promise((r) => mayChu.close(r)),
  })));
}
