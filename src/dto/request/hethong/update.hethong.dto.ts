import {IsNumber, IsString, IsOptional, validateOrReject, IsInt, IsPositive, Matches, Min, Max} from "class-validator";

export class UpdateHeThongDto{

    @IsOptional()
    @IsNumber()
    @IsPositive()
    congNgayChuNhat?: number;

    @IsOptional()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'Time format must be HH:mm:ss' })
    khoangCachGiuaCacLanChamCong?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @Min(0, { message: 'nguongThoiGianPheDuyetNgayNghi must be at least 0' })
    @Max(365, { message: 'nguongThoiGianPheDuyetNgayNghi cannot exceed 365' })
    nguongThoiGianPheDuyetNgayNghi?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    soNgayPhepTrongNam?: number;

    constructor(data: any) {
        this.congNgayChuNhat = data.congNgayChuNhat;
        this.khoangCachGiuaCacLanChamCong = data.khoangCachGiuaCacLanChamCong;
        this.nguongThoiGianPheDuyetNgayNghi = data.nguongThoiGianPheDuyetNgayNghi;
        this.soNgayPhepTrongNam = data.soNgayPhepTrongNam;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}