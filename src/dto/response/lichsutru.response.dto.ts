export class LichSuTruResponseDto {
    maLoaiTienTru: number;
    maNhanVien: number;
    soTienTruKhac: number;
    ngayTao: string;
    liDo: string;

    constructor(
        data:{
            maLoaiTienTru: number,
            maNhanVien: number,
            soTienTruKhac: number,
            ngayTao: string,
            liDo: string
        }
    ) {
        this.maLoaiTienTru = data.maLoaiTienTru;
        this.maNhanVien = data.maNhanVien;
        this.soTienTruKhac = data.soTienTruKhac;
        this.ngayTao = data.ngayTao;
        this.liDo = data.liDo;
    }
}
