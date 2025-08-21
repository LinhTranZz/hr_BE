export class QuyDoiNgayPhepResponseDto {
    nam: number;
    thang: number;
    maNhanVien: number;
    soNgayPhepSuDung: number;
    soNgayPhepTichLuy: number;
    tongSoNgayPhep: number;
    soTienQuyDoi: number;

    constructor(data: Partial<QuyDoiNgayPhepResponseDto>) {
        this.nam = data.nam ?? 0;
        this.thang = data.thang ?? 0;
        this.maNhanVien = data.maNhanVien ?? 0;
        this.soNgayPhepSuDung = data.soNgayPhepSuDung ?? 0;
        this.soNgayPhepTichLuy = data.soNgayPhepTichLuy ?? 0;
        this.tongSoNgayPhep = data.tongSoNgayPhep ?? 0;
        this.soTienQuyDoi = data.soTienQuyDoi ?? 0;
    }
}