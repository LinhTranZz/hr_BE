import {
    IsNotEmpty,
    validateOrReject,
    IsDateString,
    IsOptional, IsInt, IsPositive
} from "class-validator";

export class CreateLichSuUuTienDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maUuTien: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    @IsOptional()
    @IsDateString()
    thoiGianHieuLucBatDau: string;


    constructor(data: any) {
        this.maUuTien = data.maUuTien;
        this.maNhanVien = data.maNhanVien;
        this.thoiGianHieuLucBatDau = data.thoiGianHieuLucBatDau;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
