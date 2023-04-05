/**------- Chuyển ký tự để thực hiện chức năng tìm kiếm---------- */
function stringToSlug(title) { 
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}


/** --------- Lưu dữ liệu vào cookie ------ */
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**---------- Validation ------------------- */
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
  function kiemTraPassword(value,minValue,maxValue) {
    regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (regexPassword.test(value) && value.length >= minValue && value.length <= maxValue) {
      document.querySelector("#tbMatKhau").innerHTML = "";
      return true;
    }
    document.querySelector("#tbMatKhau").innerHTML =
      "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return false;
  }

  //Kiểm tra validation ngày làm:
function kiemTraNgayLam (value) {
    regexNgay = /^\d{2}\/\d{2}\/\d{4}$/;
    if(regexNgay.test(value)){
        document.querySelector("#tbNgay").innerHTML = "";
        return true;
    }
    document.querySelector("#tbNgay").innerHTML = "Ngày làm chưa đúng định dạng!";
    return false;
}

//Kiểm tra validation lương cơ bản
function kiemTraLuongCB (value,minLuong,maxLuong) {
    if(Number(value) < minLuong || Number(value) > maxLuong) {
        document.querySelector("#tbLuongCB").innerHTML = "Lương cơ bản từ " + minLuong +" đến " + maxLuong 
        ;
        return false;
    }
    document.querySelector("#tbLuongCB").innerHTML = "";
    return true;
}

//Kiểm tra validation chức vụ:
function kiemTraChucVu (value) {
    if (value === 'Chọn chức vụ'){
        document.querySelector("#tbChucVu").innerHTML = "Chức vụ phải được chọn hợp lệ (Sếp, Trưởng phòng, Nhân viên)!";
        return false;
    }
    document.querySelector("#tbChucVu").innerHTML = "";
    return true;
}

//Kiểm tra validation giờ làm trong tháng:
function kiemTraGioLam (value,minGio,maxGio) {
    if(Number(value) < minGio || Number(value) > maxGio) {
        document.querySelector("#tbGiolam").innerHTML = "Giờ làm phải từ "+ minGio +" đến "+ maxGio + " giờ!"
        ;
        return false;
    }
    document.querySelector("#tbGiolam").innerHTML = "";
    return true;
}

