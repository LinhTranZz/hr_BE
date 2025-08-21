import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, validateOrReject} from "class-validator";

export class CreatePhuCapDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maVaiTro: number;

    @IsOptional()
    @IsString()
    tenPhuCap: string;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    soTienPhuCap: number;

    constructor(data : {
        maVaiTro: number;
        tenPhuCap?: string;
        soTienPhuCap?: number;
    }) {
        this.maVaiTro = data.maVaiTro;
        this.tenPhuCap = data.tenPhuCap ?? "";
        this.soTienPhuCap = data.soTienPhuCap ?? 0;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}

export class CreateThemPhuCapDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhuCap: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;
    constructor(
        maPhuCap: number,
        maNhanVien: number
    ) {
        this.maNhanVien = maNhanVien;
        this.maPhuCap = maPhuCap;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}