function NhanVien (){
    this.tknv = '';
    this.tenNV = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCB = '';
    this.chucVu = '';
    this.gioLam = 0;
    this.tongLuong = function(){
        var tongLuong = 0;
        var chucVu = this.chucVu;
        if(chucVu === 'Sếp'){
            tongLuong += this.luongCB*3
        } else if (chucVu === 'Trưởng phòng'){
            tongLuong += this.luongCB*2
        } else if (chucVu === 'Nhân viên'){
            tongLuong += this.luongCB*1
        }
        return tongLuong;
    };
    this.xepLoai = function (){
        var xepLoai = '';
        if(this.gioLam >= 192 ){
            xepLoai = 'Nhân viên xuất sắc'
        } else if(this.gioLam >= 176 && this.gioLam < 192 ){
            xepLoai = 'Nhân viên giỏi'
        } else if(this.gioLam >= 160 && this.gioLam < 176 ){
            xepLoai = 'Nhân viên khá'
        } else if (this.gioLam < 160){
            xepLoai = 'Nhân viên trung bình'
        }
        return xepLoai;
    }
}