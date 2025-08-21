import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteLichSuTruDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maLoaiTienTru: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;
    constructor(maLoaiTienTru: number, maNhanVien: number) {
        this.maLoaiTienTru = maLoaiTienTru;
        this.maNhanVien = maNhanVien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
