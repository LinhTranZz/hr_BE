export class LichSuUuTienResponseDto {
    maUuTien: number;
    maNhanVien: number;
    thoiGianHieuLucBatDau: string;
    thoiGianHieuLucKetThuc: string;

    constructor(
        data:{
            maUuTien: number,
            maNhanVien: number,
            thoiGianHieuLucBatDau: string,
            thoiGianHieuLucKetThuc: string

        }
    ) {
        this.maUuTien = data.maUuTien;
        this.maNhanVien = data.maNhanVien;
        this.thoiGianHieuLucBatDau = data.thoiGianHieuLucBatDau;
        this.thoiGianHieuLucKetThuc = data.thoiGianHieuLucKetThuc;
    }
}
