// kiểm tra dữ liệu rỗng
function checkEmtyValue(value, errorField) {
  if (value) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Vui lòng không bỏ trống";
    return false;
  }
}

// check tài khoản 4-6 ký số
function checkAccount(value, errorField, min, max) {
  if (Number(value)) {
    if (min <= value.length && value.length <= max) {
      errorField.innerHTML = "";
      return true;
    } else {
      errorField.innerHTML = `Tài khoản yêu cầu từ ${min} đến ${max} ký số`;
      return false;
    }
  } else {
    errorField.innerHTML = "Vui lòng nhập số";
    return false;
  }
}

// check tên nhân viên phải là chữ
function checkTenNhanVien(value, errorField) {
  if (!Number(value)) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Vui lòng nhập định dạng chữ";
    return false;
  }
}

// check email đúng định dạng
function checkEmail(value, errorField) {
  let regexEmail =
    /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
  // dùng regex kiểm tra email
  let validEmail = regexEmail.test(value);
  console.log(validEmail);
  if (validEmail) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Email không đúng định dạng";
    return false;
  }
}

// check validation lương cơ bản
function checkLuongCB(value, errorField) {
  if (1000000 <= value && value <= 20000000) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Lương CB từ 1 triệu đến 20 triệu`;
    return false;
  }
}

// check validation giờ làm
function checkGioLam(value, errorField) {
  if (80 <= value && value <= 200) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Giờ làm từ 80 đến 200`;
    return false;
  }
}

// check password
function checkPassword(value, errorField) {
  let regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let validPassword = regexPassword.test(value);
  if (validPassword) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = "Password không đúng định dạng";
    return false;
  }
}
