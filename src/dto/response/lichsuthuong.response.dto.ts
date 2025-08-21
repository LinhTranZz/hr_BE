export class LichSuThuongResponseDto {
    maLoaiTienThuong: number;
    maNhanVien: number;
    soTienThuongKhac: number;
    ngayTao: string;
    lyDo: string;

    constructor(
        data: {
            maLoaiTienThuong: number,
            maNhanVien: number,
            soTienThuongKhac: number,
            ngayTao: string,
            lyDo: string
        }
    ) {

        this.maLoaiTienThuong = data.maLoaiTienThuong;
        this.maNhanVien = data.maNhanVien;
        this.soTienThuongKhac = data.soTienThuongKhac;
        this.ngayTao = data.ngayTao;
        this.lyDo = data.lyDo;

    }
}
