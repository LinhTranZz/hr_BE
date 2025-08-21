export class VanTayResponseDto {
    maNhanVien: number;
    viTriNgonTay: number;

    constructor(maNhanVien: number, viTriNgonTay: number) {
        this.maNhanVien = maNhanVien;
        this.viTriNgonTay = viTriNgonTay;
    }
}