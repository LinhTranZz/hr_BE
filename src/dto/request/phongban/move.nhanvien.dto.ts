import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class MoveNhanVienDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNguoiChinh: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhongBan: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    constructor(maNguoiChinh: number, maNhanVien:number, data:any) {
        this.maNguoiChinh = maNguoiChinh;
        this.maPhongBan = data.maPhongBan;
        this.maNhanVien = maNhanVien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}