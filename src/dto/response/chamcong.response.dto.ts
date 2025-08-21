export class ChamCongResponseDto {
    ngayChamCong: string;
    maNhanVien: number;
    cong?: number;
    soGioThucTe?: number;
    thoiGianVao?: string;
    thoiGianRa?: string;
    trangThai?: string;

    constructor(data: {
        ngayChamCong: string;
        maNhanVien: number;
        cong: number;
        soGioThucTe: number;
        thoiGianVao: string;
        thoiGianRa: string;
        trangThai: string;
    }) {
        this.ngayChamCong = data.ngayChamCong ?? null;
        this.maNhanVien = data.maNhanVien ?? null;
        this.cong = data.cong ?? null;
        this.soGioThucTe = data.soGioThucTe ?? null;
        this.thoiGianVao = data.thoiGianVao ?? null;
        this.thoiGianRa = data.thoiGianRa ?? null;
        this.trangThai = data.trangThai ?? null;
    }
}

export class ChamCongResponseDetailDto extends ChamCongResponseDto {
    hoTen?: string;
    tenPhongBan?: string;
    maPhongBan?: string;
    constructor(data: any) {
        super(data);
        this.hoTen = data?.hoTen ?? null;
        this.tenPhongBan = data?.tenPhongBan ?? null;
        this.maPhongBan = data?.maPhongBan ?? null;
    }
}
