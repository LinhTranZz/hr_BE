import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeletePhuCapDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhuCap: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maVaiTro: number;
    constructor(maPhuCap: number, maVaiTro: number) {
        this.maPhuCap = maPhuCap;
        this.maVaiTro = maVaiTro;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}

export class DeleteThemPhuCapDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhuCap: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;


    constructor(maPhuCap: number, maNhanVien: number) {
        this.maPhuCap = maPhuCap;
        this.maNhanVien = maNhanVien;
    }
    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}

export class DeleteAllThemPhuCapDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    constructor(maNhanVien: number) {
        this.maNhanVien = maNhanVien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
