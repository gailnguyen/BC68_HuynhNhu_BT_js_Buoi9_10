class NhanVien {
  constructor() {
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = "";
    this.chucvu = "";
    this.gioLam = "";
  }

  // hàm tính toán

  tinhTongLuong = function () {
    let luongCung = this.luongCB * 1 * (this.gioLam * 1);
    if (this.chucvu == "Giám đốc") {
      return luongCung * 3;
    } else if (this.chucvu == "Trưởng phòng") {
      return luongCung * 2;
    } else {
      return luongCung;
    }
  };
  xepLoai = function () {
    let gioLam = this.gioLam * 1;
    if (gioLam >= 192) {
      return "Xuất sắc";
    } else if (gioLam < 192 && gioLam >= 176) {
      return "Giỏi";
    } else if (gioLam < 176 && gioLam >= 160) {
      return "Khá";
    } else {
      return "Trung Bình";
    }
  };
}
