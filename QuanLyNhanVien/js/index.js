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

  valid &=
    kiemTraTK(nv.tknv, 4, 6) &
    kiemTraTenNV(nv.tenNV) &
    kiemTraEmail(nv.email) &
    kiemTraPassword(nv.matKhau,6,10) & kiemTraNgayLam(nv.ngayLam) & kiemTraLuongCB(nv.luongCB,1000000,20000000) & kiemTraChucVu(nv.chucVu) & kiemTraGioLam(nv.gioLam,80,200);

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
document.querySelector("#btnCapNhat").onclick = function () {
  var nhanVienEdit = new NhanVien();
  nhanVienEdit.tknv = document.querySelector("#tknv").value;
  nhanVienEdit.tenNV = document.querySelector("#name").value;
  nhanVienEdit.email = document.querySelector("#email").value;
  nhanVienEdit.matKhau = document.querySelector("#password").value;
  nhanVienEdit.ngayLam = document.querySelector("#datepicker").value;
  nhanVienEdit.luongCB = document.querySelector("#luongCB").value;
  nhanVienEdit.chucVu = document.querySelector("#chucvu").value;
  nhanVienEdit.gioLam = document.querySelector("#gioLam").value;

  //Kiểm tra validation:
  var valid = true;

  valid &=
    kiemTraTK(nhanVienEdit.tknv, 4, 6) &
    kiemTraTenNV(nhanVienEdit.tenNV) &
    kiemTraEmail(nhanVienEdit.email) &
    kiemTraPassword(nhanVienEdit.matKhau,6,10) & kiemTraNgayLam(nhanVienEdit.ngayLam) & kiemTraLuongCB(nhanVienEdit.luongCB,1000000,20000000) & kiemTraChucVu(nhanVienEdit.chucVu) & kiemTraGioLam(nhanVienEdit.gioLam,80,200);

  if (!valid) {
    return;
  }
   
  for (var i = 0; i < mangNhanVien.length; i++) {
    if (mangNhanVien[i].tknv === nhanVienEdit.tknv) {
      mangNhanVien[i].tenNV = nhanVienEdit.tenNV;
      mangNhanVien[i].email = nhanVienEdit.email;
      mangNhanVien[i].matKhau = nhanVienEdit.matKhau;
      mangNhanVien[i].ngayLam = nhanVienEdit.ngayLam;
      mangNhanVien[i].luongCB = nhanVienEdit.luongCB;
      mangNhanVien[i].chucVu = nhanVienEdit.chucVu;
      mangNhanVien[i].gioLam = nhanVienEdit.gioLam;
    }
  }

  renderTableNhanVien(mangNhanVien);
};

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
