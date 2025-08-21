export class TangCaResponseDto{
    ngayChamCongTangCa: string;
    gioTangCaBatDau: string;
    gioTangCaKetThuc: string;
    maPhongBan: number;

    constructor(data: {
        ngayChamCongTangCa: string,
        gioTangCaBatDau: string,
        gioTangCaKetThuc: string,
        maPhongBan: number
    }) {
        this.ngayChamCongTangCa = data.ngayChamCongTangCa;
        this.gioTangCaBatDau = data.gioTangCaBatDau;
        this.gioTangCaKetThuc = data.gioTangCaKetThuc;
        this.maPhongBan = data.maPhongBan;
    }
}
