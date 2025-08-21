export class NgayLeResponseDto {
    maNgayLe: number;
    tenNgayLe: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    soNgayNghi: number;

    constructor(
        data:{
            maNgayLe: number,
            tenNgayLe: string,
            ngayBatDau: string,
            ngayKetThuc: string,
            soNgayNghi: number
        }
    ) {
        this.maNgayLe = data.maNgayLe;
        this.tenNgayLe = data.tenNgayLe;
        this.ngayBatDau = data.ngayBatDau;
        this.ngayKetThuc = data.ngayKetThuc;
        this.soNgayNghi = data.soNgayNghi;
    }
}
