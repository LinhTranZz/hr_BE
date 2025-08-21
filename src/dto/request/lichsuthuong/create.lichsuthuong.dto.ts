import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    Min,
    validateOrReject
} from "class-validator";

export class CreateLichSuThuongDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maLoaiTienThuong: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Số tiền thưởng khác phải là số dương' })
    soTienThuongKhac?: number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 500, { message: 'Lý do phải có độ dài từ 1 đến 500 ký tự' })
    lyDo: string;

    constructor(data: any) {
        this.maLoaiTienThuong = data.maLoaiTienThuong;
        this.maNhanVien = data.maNhanVien;
        this.soTienThuongKhac = data.soTienThuongKhac;
        this.lyDo = data.lyDo;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
