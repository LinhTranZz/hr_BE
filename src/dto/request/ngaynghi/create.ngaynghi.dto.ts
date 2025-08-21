import {
    IsBoolean,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
    Length,
    validateOrReject
} from "class-validator";

export class CreateNgayNghiDto{
    @IsNotEmpty()
    @IsDateString()
    ngayBatDau: string;

    @IsNotEmpty()
    @IsDateString()
    ngayKetThuc: string;

    @IsNotEmpty()
    @IsString()
    liDo: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 50, { message: 'Trạng thái phê duyệt phải có độ dài từ 1 đến 50 ký tự' })
    trangThaiPheDuyet: string;

    @IsNotEmpty()
    @IsBoolean()
    tinhLuong: boolean;

    @IsNotEmpty()
    @IsBoolean()
    tinhPhep: boolean;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    constructor(data: any) {
        this.ngayBatDau = data.ngayBatDau;
        this.ngayKetThuc = data.ngayKetThuc;
        this.liDo = data.liDo;
        this.trangThaiPheDuyet = data.trangThaiPheDuyet;
        this.tinhLuong = data.tinhLuong;
        this.tinhPhep = data.tinhPhep;
        this.maNhanVien = data.maNhanVien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}
