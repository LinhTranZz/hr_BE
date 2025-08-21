
export class NhanVienResponseDto {
    maNhanVien: number;
    hoTen: string;
    ngaySinh: string;
    soDienThoai: string;
    cmnd: string;
    diaChi: string;
    ngayVaoLam: string;
    luongCoBan: number;
    trangThai: string;
    maVaiTro: number;
    maPhongBan: number;
    maUuTien: number;
    heSoTangCa: number;
    email: string;

    constructor(data: {
        maNhanVien: number;
        hoTen: string;
        ngaySinh: string;
        soDienThoai: string;
        cmnd: string;
        diaChi: string;
        ngayVaoLam: string;
        luongCoBan: number;
        trangThai: string;
        maVaiTro: number;
        maPhongBan: number;
        maUuTien: number;
        heSoTangCa: number;
        email: string;

    }) {
        this.maNhanVien = data.maNhanVien;
        this.hoTen = data.hoTen;
        this.ngaySinh = data.ngaySinh;
        this.soDienThoai = data.soDienThoai;
        this.cmnd = data.cmnd;
        this.diaChi = data.diaChi;
        this.ngayVaoLam = data.ngayVaoLam;
        this.luongCoBan = data.luongCoBan;
        this.trangThai = data.trangThai;
        this.maVaiTro = data.maVaiTro;
        this.maPhongBan = data.maPhongBan;
        this.maUuTien = data.maUuTien;
        this.heSoTangCa = data.heSoTangCa;
        this.email = data.email
    }
}

export class NhanVienGiayNghiPhepResponseDto {
    maNhanVien: number;
    hoTen: string;
    email: string;

    constructor(data: {
        maNhanVien: number;
        hoTen: string;
        email: string;

    }) {
        this.maNhanVien = data.maNhanVien;
        this.hoTen = data.hoTen;
        this.email = data.email;
    }
}

export class NhanVienDetailResponse {
    maNhanVien: number;
    hoTen: string;
    ngaySinh: string;
    soDienThoai: string;
    cmnd: string;
    diaChi: string;
    ngayVaoLam: string;
    luongCoBan: number;
    trangThai: string;
    maVaiTro: number;
    maPhongBan: number;
    maUuTien: number;
    heSoTangCa: number;
    tenPhongBan?: string;
    tenVaiTro?: string;
    tenUuTien?: string;
    email?: string;

    constructor(data: {
        maNhanVien: number;
        hoTen: string;
        ngaySinh: string;
        soDienThoai: string;
        cmnd: string;
        diaChi: string;
        ngayVaoLam: string;
        luongCoBan: number;
        trangThai: string;
        maVaiTro: number;
        maPhongBan: number;
        maUuTien: number;
        heSoTangCa: number;
        tenPhongBan?: string;
        tenVaiTro?: string;
        tenUuTien?: string;
        email?: string;
    }) {
        this.maNhanVien = data.maNhanVien;
        this.hoTen = data.hoTen;
        this.ngaySinh = data.ngaySinh;
        this.soDienThoai = data.soDienThoai;
        this.cmnd = data.cmnd;
        this.diaChi = data.diaChi;
        this.ngayVaoLam = data.ngayVaoLam;
        this.luongCoBan = data.luongCoBan;
        this.trangThai = data.trangThai;
        this.maVaiTro = data.maVaiTro;
        this.maPhongBan = data.maPhongBan;
        this.maUuTien = data.maUuTien;
        this.heSoTangCa = data.heSoTangCa;
        this.tenPhongBan = data.tenPhongBan;
        this.tenVaiTro = data.tenVaiTro;
        this.tenUuTien = data.tenUuTien;
        this.email = data.email;
    }
}
