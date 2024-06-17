// console.log(!Number("abc123"));
// console.log(!Number(123));

let arrNhanVien = [];

// validation
function getValue() {
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  let nhanVien = new NhanVien();

  let isValid = true;

  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;
    let parent = field.parentElement;
    let errorField = parent.querySelector("span");
    let checkEmpty = checkEmtyValue(value, errorField);
    // check trường bị bỏ trống
    isValid &= checkEmpty;
    // console.log((isValid &= checkEmpty));
    // check tknv
    if (checkEmpty && id == "tknv") {
      isValid &= checkAccount(value, errorField, 4, 6);
    }
    // check tên nhân viên
    if (checkEmpty && id == "name") {
      isValid &= checkTenNhanVien(value, errorField);
    }
    // check email
    if (checkEmpty && id == "email") {
      isValid &= checkEmail(value, errorField);
    }
    // check password
    if (checkEmpty && id == "password") {
      isValid &= checkPassword(value, errorField);
    }
    // check lương CB
    if (checkEmpty && id == "luongCB") {
      isValid &= checkLuongCB(value, errorField);
    }
    // check giờ làm
    if (checkEmpty && id == "gioLam") {
      isValid &= checkGioLam(value, errorField);
    }
  }
  console.log(nhanVien);
  console.log(isValid);
  if (isValid) {
    return nhanVien;
  }
}

// chức năng thêm sinh viên
document.getElementById("btnThemNV").onclick = function (event) {
  // let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  // let nhanVien = new NhanVien();
  // for (let field of arrField) {
  //   let { id, value } = field;
  //   nhanVien[id] = value;
  // }

  let nhanVien = getValue();
  if (!nhanVien) {
    return;
  }

  arrNhanVien.push(nhanVien);

  renderArrNhanVien();
  saveLocalStorage();

  document.getElementById("formQLNV").reset();
};

// render
function renderArrNhanVien(arr = arrNhanVien) {
  let content = "";
  // console.log(arrNhanVien);
  for (let nhanVien of arr) {
    // console.log(nhanVien);
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    // console.log(newNhanVien);
    let { tknv, name, email, datepicker, chucvu } = newNhanVien;
    console.log(typeof datepicker);
    let date = new Date(datepicker);
    content += `
    <tr>
    <td>${tknv}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${date.toLocaleDateString("en-US")}</td>
    <td>${chucvu}</td>
    <td>${newNhanVien
      .tinhTongLuong()
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
    <td>${newNhanVien.xepLoai()}</td>
    <td>
    <button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger">Xóa</button>
    <button onclick="getInfoNhanVien('${tknv}')" class="btn btn-success" data-toggle="modal" data-target="#myModal">Sửa</button>
    </td>
    </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

getLocalStorage();

// localStorage.setItem(key, chuoiJSON)
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let arrChuoiJsonSV = JSON.stringify(value);
  localStorage.setItem(key, arrChuoiJsonSV);
}

// localStorage.getItem(key)
function getLocalStorage(key = "arrNhanVien") {
  let arrData = localStorage.getItem(key);
  arrNhanVien = arrData ? JSON.parse(arrData) : [];
  // console.log(arrNhanVien);
  renderArrNhanVien();
}

// xóa nhân viên
function deleteNhanVien(tknv) {
  console.log("xóa nhân viên");
  let deleteIndex = arrNhanVien.findIndex((nhanvien, index) => {
    return nhanvien.tknv == tknv;
  });
  // console.log(viTriNhanVien);
  if (deleteIndex != -1) {
    arrNhanVien.splice(deleteIndex, 1);
    renderArrNhanVien();
    saveLocalStorage();
  }
}

// lấy thông tin nhân viên trả về input
function getInfoNhanVien(tknv) {
  // console.log("update thông tin");
  // tìm nhân viên muốn update trong mảng
  let nhanVien = arrNhanVien.find((nhanvien, index) => {
    return nhanvien.tknv == tknv;
  });
  // console.log(nhanVien);
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  for (let field of arrField) {
    field.value = nhanVien[field.id];
  }
  document.getElementById("tknv").readOnly = true;
}

// update thông tin
function updateSinhVien(tknv) {
  let arrField = document.querySelectorAll("#formQLNV input,#formQLNV select");
  let nhanVien = new NhanVien();
  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;
  }

  let index = arrNhanVien.findIndex((item, index) => {
    return item.tknv == nhanVien.tknv;
  });
  console.log(nhanVien);

  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderArrNhanVien();
    saveLocalStorage();
  }
}

// chức năng tìm kiếm
function searchNhanVien(event) {
  // console.log(event.target.value);
  let newKeyWord = toNonAccentVietnamese(
    event.target.value.toLowerCase().trim()
  );
  console.log(newKeyWord);

  let newArrNhanVien = [];
  // console.log(arrNhanVien);
  for (let nhanVien of arrNhanVien) {
    // console.log(nhanVien);
    let nhanVienFilter = new NhanVien();
    Object.assign(nhanVienFilter, nhanVien);
    // console.log(nhanVienFilter);

    nhanVienFilter.xepLoai = nhanVienFilter.xepLoai();
    // nhanVienFilter.tinhTongLuong = nhanVienFilter.tinhTongLuong();
    // console.log(nhanVienFilter);

    newArrNhanVien.push(nhanVienFilter);
    // console.log(newArrNhanVien);
    // return newArrNhanVien;
  }

  // console.log(newArrNhanVien);
  let arrNhanVienFilter = newArrNhanVien.filter((item, index) => {
    let newXepLoai = toNonAccentVietnamese(item.xepLoai.toLowerCase().trim());
    console.log(newXepLoai);
    return newXepLoai.includes(newKeyWord);
  });

  let filteredArray = arrNhanVien.filter((item1, index) => {
    return arrNhanVienFilter.some((item2, index) => {
      return item2.tknv === item1.tknv;
    });
  });
  console.log(filteredArray);

  renderArrNhanVien(filteredArray);
}
document.getElementById("searchName").oninput = searchNhanVien;
