import {IsDateString, IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class CreateVanTayDto{
    @IsNotEmpty()
    @IsDateString()
    thoiGian: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    constructor(data: any) {
        this.thoiGian = data.thoiGian;
        this.maNhanVien = data.maNhanVien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}