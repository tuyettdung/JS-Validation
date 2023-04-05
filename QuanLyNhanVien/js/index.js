var mangNhanVien = [];

document.querySelector("#btnThemNV").onclick = function () {
  var nv = new NhanVien();
  nv.tknv = document.querySelector("#tknv").value;
  nv.tenNV = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.matKhau = document.querySelector("#password").value;
  nv.ngayLam = document.querySelector("#datepicker").value;
  nv.luongCB = +document.querySelector("#luongCB").value;
  nv.chucVu = document.querySelector("#chucvu").value;
  nv.gioLam = +document.querySelector("#gioLam").value;

  /**----------- Kiểm tra Validation trước khi thêm nhân viên vào mảng----------- */
  var valid = true;

  //Kiểm tra validation tài khoản nhân viên:
  function kiemTraTK(value, minLength, maxLength) {
    var regexTK = /^[0-9]+$/;
    if (
      regexTK.test(value) &&
      value.length >= minLength &&
      value.length <= maxLength
    ) {
      document.querySelector("#tbTKNV").innerHTML = "";
      return true;
    }
    document.querySelector("#tbTKNV").innerHTML = "Tài khoản từ 4-6 ký số!";
    return false;
  }
  //Kiểm tra validation tên nhân viên:
  function kiemTraTenNV(value) {
    var regexKyTu =
      /^[a-zA-Z_Ă€ĂĂ‚ĂƒĂˆĂ‰Ăáº¾ĂŒĂĂ’Ă“Ă”Ă•Ă™ĂÄ‚ÄÄ¨Å¨Æ Ă Ă¡Ă¢Ă£Ă¨Ă©ĂªĂ¬Ă­Ă²Ă³Ă´ĂµĂ¹ĂºÄƒÄ‘Ä©Å©Æ¡Æ¯Ä‚áº áº¢áº¤áº¦áº¨áºªáº¬áº®áº°áº²áº´áº¶" + "áº¸áººáº¼á»€á»€á»‚Æ°Äƒáº¡áº£áº¥áº§áº©áº«áº­áº¯áº±áº³áºµáº·áº¹áº»áº½á»á»á»ƒáº¿á»„á»†á»ˆá»á»Œá»á»á»’á»”á»–á»˜á»á»œá»á» á»¢á»¤á»¦á»¨á»ªá»…á»‡á»‰á»‹á»á»á»‘á»“á»•á»—á»™á»›á»á»Ÿá»¡á»£" + "á»¥á»§á»©á»«á»¬á»®á»°á»²á»´Ăá»¶á»¸á»­á»¯á»±á»³á»µá»·á»¹\\s]+$/;
    if (regexKyTu.test(value)) {
      document.querySelector("#tbTen").innerHTML = "";
      return true;
    }
    document.querySelector("#tbTen").innerHTML = "Họ tên chưa đúng định dạng!";
    return false;
  }
  //Kiểm tra validation email
  function kiemTraEmail(value) {
    var regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
      document.querySelector("#tbEmail").innerHTML = "";
      return true;
    }
    document.querySelector("#tbEmail").innerHTML = "Email chưa đúng định dạng!";
    return false;
  }
  //Kiểm tra validation password
  function kiemTraPassword(value) {
    regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (regexPassword.test(value)) {
      document.querySelector("#tbMatKhau").innerHTML = "";
      return true;
    }
    document.querySelector("#tbMatKhau").innerHTML =
      "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return false;
  }

  //Kiểm tra các validation:
  valid &=
    kiemTraTK(nv.tknv, 4, 6) &
    kiemTraTenNV(nv.tenNV) &
    kiemTraEmail(nv.email) &
    kiemTraPassword(nv.matKhau);
  if (!valid) {
    return;
  }

  //Thêm nhân viên có validation hợp lệ vào mảng
  mangNhanVien.push(nv);
  //render ra table từ mảng nhân viên:
  renderTableNhanVien(mangNhanVien);
  //Lưu vào store table nhân viên:
  // saveStore();
};

function renderTableNhanVien(arrNV) {
  var outputTable = "";
  for (var i = 0; i < mangNhanVien.length; i++) {
    var nhanVien = arrNV[i];
    var nhanVienNew = new NhanVien();
    Object.assign(nhanVienNew, nhanVien);
    outputTable += `
                      <tr>
                         <td>${nhanVienNew.tknv}</td>
                         <td>${nhanVienNew.tenNV}</td>
                         <td>${nhanVienNew.email}</td>
                         <td>${nhanVienNew.ngayLam}</td>
                         <td>${nhanVienNew.chucVu}</td>
                         <td>${nhanVienNew.tongLuong()}</td>
                         <td>${nhanVienNew.xepLoai()}</td>
                         <td>
                         <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick ="suaNV('${
                           nhanVienNew.tknv
                         }')">Sửa</button>
                           <button class="btn btn-danger" onclick = "xoaNV('${
                             nhanVienNew.tknv
                           }')">Xóa</button>
                         </td>
                       </tr>
                     `;
  }
  document.querySelector("#tableDanhSach").innerHTML = outputTable;
}

//Button Sửa:
function suaNV(nvclick) {
  var indexEdit = -1;
  for (var i = 0; i < mangNhanVien.length; i++) {
    if (mangNhanVien[i].tknv === nvclick) {
      indexEdit = i;
      break;
    }
  }

  if (indexEdit !== -1) {
    var nvEdit = mangNhanVien[indexEdit];
    document.querySelector("#tknv").value = nvEdit.tknv;
    document.querySelector("#name").value = nvEdit.tenNV;
    document.querySelector("#email").value = nvEdit.email;
    document.querySelector("#password").value = nvEdit.matKhau;
    document.querySelector("#datepicker").value = nvEdit.ngayLam;
    document.querySelector("#luongCB").value = nvEdit.luongCB;
    document.querySelector("#chucvu").value = nvEdit.chucVu;
    document.querySelector("#gioLam").value = nvEdit.gioLam;
  }
}

//Button cập nhật:
document.querySelector("#btnCapNhat").onclick = function(){
 var nhanVienEdit = NhanVien();
 nhanVienEdit.tknv = document.querySelector("#tknv").value;
 nhanVienEdit.tenNV = document.querySelector("#name").value;
 nhanVienEdit.email = document.querySelector("#email").value;
 nhanVienEdit.matKhau = document.querySelector("#password").value;
 nhanVienEdit.ngayLam = document.querySelector("#datepicker").value;
 nhanVienEdit.luongCB = document.querySelector("#luongCB").value;
 nhanVienEdit.chucVu = document.querySelector("#chucvu").value;
 nhanVienEdit.gioLam = document.querySelector("#gioLam").value;

for(var i = 0; i < mangNhanVien.length; i++){
  if( mangNhanVien[i].tknv === nhanVienEdit.tknv){
    nhanVienEdit.tenNV = mangNhanVien[i].tenNV;
    nhanVienEdit.email = mangNhanVien[i].email ;
    nhanVienEdit.matKhau = mangNhanVien[i].matKhau; 
    nhanVienEdit.ngayLam = mangNhanVien[i].ngayLam ;
    nhanVienEdit.luongCB = mangNhanVien[i].luongCB ;
    nhanVienEdit.chucVu = mangNhanVien[i].chucVu ;
    nhanVienEdit.gioLam = mangNhanVien[i].gioLam ;
  }
 }

renderTableNhanVien(mangNhanVien);
}

//Button Xóa:
function xoaNV(nvClick) {
  var indexDel = -1;
  for (var i = 0; i < mangNhanVien.length; i++) {
    if (mangNhanVien[i].tknv === nvClick) {
      indexDel = i;
      break;
    }
  }
  if (indexDel !== -1) {
    mangNhanVien.splice(indexDel, 1);
  }
  renderTableNhanVien(mangNhanVien);
}

/** Chức năng tìm kiếm nhân viên theo xếp loại NV và hiển thị */
document.querySelector("#searchName").oninput = function () {
  var tuKhoa = document.querySelector("#searchName").value.trim();
  tuKhoa = stringToSlug(tuKhoa);
  var mangTimKiem = [];
  for (var i = 0; i < mangNhanVien.length; i++) {
    var nhanVienTK = mangNhanVien[i];
    var nvTKNew = new NhanVien();
    Object.assign(nvTKNew, nhanVienTK);
    var loai = nvTKNew.xepLoai();
    if (stringToSlug(loai.trim()).search(tuKhoa) !== -1) {
      mangTimKiem.push(nvTKNew);
    }
  }
  renderTableNhanVien(mangTimKiem);
};

/** localStorage  */
// function saveStore (){
//     var sArrNV = JSON.stringify(mangNhanVien);
//     localStorage.setItem("mangNhanVien",sArrNV);
//     //Lưu dữ liệu vào cookie
//     setCookie('mangNhanVien',sArrNV,90);
// }
// function getStore(){
//    if(localStorage.getItem("mangNhanVien")){
//     var strArr = localStorage.getItem("mangNhanVien");
//     mangNhanVien = JSON.parse(strArr);
//    }
// }
// getStore();
// renderTableNhanVien(mangNhanVien);
