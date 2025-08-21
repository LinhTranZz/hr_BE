export class TaiKhoanResponseDto{
    maNhanVien: number;
    tenDangNhap: string;

    constructor(data: {
        maNhanVien: number,
        tenDangNhap: string
    }) {
        this.maNhanVien = data.maNhanVien;
        this.tenDangNhap = data.tenDangNhap;
    }
}
