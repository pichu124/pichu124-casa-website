// Giới hạn số lần gửi theo địa chỉ IP, giữ trong bộ nhớ (khởi động lại dịch vụ thì đếm lại từ đầu).
// Không ghi IP xuống đĩa: chỉ dùng để chống spam.

export function taoGioiHan({ toiDa = 5, khoangMs = 60 * 60 * 1000, soIpToiDa = 10000 } = {}) {
  const lanGui = new Map();
  return {
    /** Trả true nếu IP còn được gửi, và ghi nhận lần gửi này. */
    choPhep(ip, bayGio = Date.now()) {
      const truoc = (lanGui.get(ip) ?? []).filter((t) => bayGio - t < khoangMs);
      if (truoc.length >= toiDa) {
        lanGui.set(ip, truoc);
        return false;
      }
      truoc.push(bayGio);
      lanGui.set(ip, truoc);
      if (lanGui.size > soIpToiDa) {
        // Dọn các IP không còn lượt nào trong khoảng thời gian; vẫn quá nhiều thì xoá bản ghi cũ nhất.
        for (const [k, v] of lanGui) if (v.every((t) => bayGio - t >= khoangMs)) lanGui.delete(k);
        while (lanGui.size > soIpToiDa) lanGui.delete(lanGui.keys().next().value);
      }
      return true;
    },
    get soIp() { return lanGui.size; },
  };
}
