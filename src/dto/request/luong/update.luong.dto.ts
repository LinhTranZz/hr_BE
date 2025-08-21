import {IsInt, IsNotEmpty, IsNumber, IsPositive, validateOrReject} from "class-validator";

export class UpdateLuongDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    luongCoBan: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNguoiChinh: number;

    constructor(maNguoiChinh: number, maNhanVien: number,data: any, ) {
        this.maNhanVien = maNhanVien;
        this.maNguoiChinh = maNguoiChinh;
        this.luongCoBan = data.luongCoBan;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}

