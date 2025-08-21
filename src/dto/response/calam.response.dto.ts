export class CaLamResponseDto {
    maCa?: number;
    tenCa: string;

    constructor(
        data: {
            maCa: number,
            tenCa: string,
        }
    ) {
        this.maCa = data.maCa;
        this.tenCa = data.tenCa;
    }
}

export class CaLamTrongTuanResponseDto {
    maCa: number;
    ngayTrongTuan: number;
    coLamViec: number;
    gioBatDau: string;
    gioKetThuc: string;
    gioNghiTruaBatDau: string;
    gioNghiTruaKetThuc: string;
    soGioLamViec: number;

    constructor(data: {
        maCa: number,
        ngayTrongTuan: number,
        coLamViec: number,
        gioBatDau: string,
        gioKetThuc: string,
        gioNghiTruaBatDau: string,
        gioNghiTruaKetThuc: string,
        soGioLamViec: number
    }) {
        this.maCa = data.maCa;
        this.ngayTrongTuan = data.ngayTrongTuan;
        this.coLamViec = data.coLamViec;
        this.gioBatDau = data.gioBatDau;
        this.gioKetThuc = data.gioKetThuc;
        this.gioNghiTruaBatDau = data.gioNghiTruaBatDau;
        this.gioNghiTruaKetThuc = data.gioNghiTruaKetThuc;
        this.soGioLamViec = data.soGioLamViec;
    }
}