import {IsNotEmpty, IsNumber, IsPositive, IsString, Length, validateOrReject, ValidationError} from "class-validator";

export class CreateLoaiTienThuongDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100, { message: 'Tên loại tiền thưởng phải có độ dài từ 1 đến 100 ký tự' })
    tenLoaiTienThuong: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    soTienThuong: number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 10, { message: 'Đơn vị phải có độ dài từ 1 đến 10 ký tự' })
    donVi: string;

    constructor(data: any) {
        this.tenLoaiTienThuong = data.tenLoaiTienThuong;
        this.soTienThuong = data.soTienThuong;
        this.donVi = data.donVi;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);

        if (this.donVi === '%' && (this.soTienThuong < 1 || this.soTienThuong > 100)) {
            const error = new ValidationError();
            error.property = "soTienThuong";
            error.constraints = { range: "When unit is percentage (%), bonus amount must be between 1 and 100" };
            throw error;
        }
    }
}
