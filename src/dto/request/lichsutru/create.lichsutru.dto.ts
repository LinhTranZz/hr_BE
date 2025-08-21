import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsString,
    validateOrReject,
    IsPositive,
    Min
} from "class-validator";

export class CreateLichSuTruDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maLoaiTienTru: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    @IsOptional()
    @IsNumber()
    @Min(0, {"message": "Số tiền trừ khác phải lớn hơn hoặc bằng 0"})
    soTienTruKhac: number;

    @IsNotEmpty()
    @IsString()
    liDo: string;

    constructor(data: any) {
        this.maLoaiTienTru = data.maLoaiTienTru;
        this.maNhanVien = data.maNhanVien;
        this.soTienTruKhac = data.soTienTruKhac;
        this.liDo = data.liDo;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
