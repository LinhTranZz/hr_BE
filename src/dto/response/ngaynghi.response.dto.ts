export class NgayNghiResponseDto {
    maNghiPhep: number;
    ngayBatDau: string;
    ngayKetThuc: string;
    liDo: string;
    trangThaiPheDuyet: string;
    tinhLuong: boolean;
    tinhPhep: boolean;
    maNhanVien: number;

    constructor(
        data: {
            maNghiPhep: number;
            ngayBatDau: string;
            ngayKetThuc: string;
            liDo: string;
            trangThaiPheDuyet: string;
            tinhLuong: boolean;
            tinhPhep: boolean;
            maNhanVien: number;
        }

    ) {
        this.maNghiPhep = data.maNghiPhep;
        this.ngayBatDau = data.ngayBatDau;
        this.ngayKetThuc = data.ngayKetThuc;
        this.liDo = data.liDo;
        this.trangThaiPheDuyet = data.trangThaiPheDuyet;
        this.tinhLuong = data.tinhLuong;
        this.tinhPhep = data.tinhPhep;
        this.maNhanVien = data.maNhanVien;
    }
}