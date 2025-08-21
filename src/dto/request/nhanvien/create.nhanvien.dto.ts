import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    validateOrReject
} from "class-validator";

export class CreateNhanVienDto {
    @IsOptional()
    @IsString()
    @Length(1, 100, { message: 'Họ tên phải có độ dài từ 1 đến 100 ký tự' })
    hoTen: string;

    @IsOptional()
    @IsDateString()
    ngaySinh: string;

    @IsOptional()
    @IsString()
    @Length(10, 11, { message: 'Số điện thoại phải có độ dài từ 10 đến 11 ký tự' })
    soDienThoai: string;

    @IsOptional()
    @IsString()
    @Length(9, 12, { message: 'CMND phải có độ dài từ 9 đến 12 ký tự' })
    cmnd: string;

    @IsOptional()
    @IsString()
    @Length(1, 200, { message: 'Địa chỉ phải có độ dài từ 1 đến 200 ký tự' })
    diaChi: string;

    @IsNotEmpty()
    @IsDateString()
    ngayVaoLam: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    luongCoBan: number;

    @IsOptional()
    @IsString()
    @Length(1, 50, { message: 'Trạng thái phải có độ dài từ 1 đến 50 ký tự' })
    trangThai?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    maVaiTro: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    maPhongBan: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    maUuTien: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    heSoTangCa: number;

    @IsOptional()
    @IsString()
    email: string;
    constructor(
        data: any
    ) {
        this.hoTen = data.hoTen;
        this.ngaySinh = data.ngaySinh ?? undefined;
        this.soDienThoai = data.soDienThoai;
        this.cmnd = data.cmnd;
        this.diaChi = data.diaChi;
        this.ngayVaoLam = data.ngayVaoLam;
        this.luongCoBan = data.luongCoBan;
        this.trangThai = data.trangThai;
        this.maVaiTro = data.maVaiTro;
        this.maPhongBan = data.maPhongBan;
        this.maUuTien = data.maUuTien;
        this.heSoTangCa = data.heSoTangCa;
        this.email = data.email;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}