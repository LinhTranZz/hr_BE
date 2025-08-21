import {IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, validateOrReject} from "class-validator";

export class CreateTangCaDto {
    @IsNotEmpty()
    @IsDateString()
    ngayChamCongTangCa: string;

    @IsNotEmpty()
    @IsString()
    gioTangCaBatDau: string;

    @IsOptional()
    @IsString()
    gioTangCaKetThuc: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhongBan: number;

    constructor(data: any) {
        this.ngayChamCongTangCa = data.ngayChamCongTangCa;
        this.gioTangCaBatDau = data.gioTangCaBatDau;
        this.gioTangCaKetThuc = data.gioTangCaKetThuc;
        this.maPhongBan = data.maPhongBan;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}