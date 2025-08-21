export class UuTienResponseDto {
    maUuTien: number;
    tenUuTien: string;
    thoiGianBatDauCa: string;
    thoiGianKetThucCa: string;
    thoiGianHieuLuc: number;

    constructor(
        data: {
            maUuTien: number,
            tenUuTien: string,
            thoiGianBatDauCa: string,
            thoiGianKetThucCa: string,
            thoiGianHieuLuc: number,
        }
    ) {
        this.maUuTien = data.maUuTien;
        this.tenUuTien = data.tenUuTien;
        this.thoiGianBatDauCa = data.thoiGianBatDauCa;
        this.thoiGianKetThucCa = data.thoiGianKetThucCa;
        this.thoiGianHieuLuc = data.thoiGianHieuLuc;
    }
}
