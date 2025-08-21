import {IsInt, IsNotEmpty, validateOrReject} from "class-validator";

export class DeleteLichSuThuongDto {
    @IsNotEmpty()
    @IsInt()
    maLoaiTienThuong: number;

    @IsNotEmpty()
    @IsInt()
    maNhanVien: number;

    constructor(maLoaiTienThuong: number, maNhanVien: number) {
        this.maLoaiTienThuong = maLoaiTienThuong;
        this.maNhanVien = maNhanVien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
