export interface IChamCongModel {
    ngayChamCong: Date;
    thoiGianVao?: Date;
    thoiGianRa?: Date;
    soGioThucTe?: number;
    trangThai?: string;
    cong?: number;
    maNhanVien: number;
}

export interface IChamCongChiTietModel extends IChamCongModel{
    hoTen?: string;
    maPhongBan?: number;
    tenPhongBan?: string;

}