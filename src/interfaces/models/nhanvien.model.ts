export interface INhanVienModel {
    maNhanVien?: number;
    hoTen?: string;
    ngaySinh?: Date | null;
    soDienThoai?: string;
    email?: string;
    cmnd?: string;
    diaChi?: string;
    ngayVaoLam: Date;
    luongCoBan?: number;
    trangThai?: string;
    maVaiTro?: number;
    maPhongBan?: number;
    maUuTien?: number;
    heSoTangCa?: number;
}

export interface INhanVienDetailModel extends INhanVienModel {
    tenPhongBan?: string;
    tenVaiTro?: string;
    tenUuTien?: string;
}
