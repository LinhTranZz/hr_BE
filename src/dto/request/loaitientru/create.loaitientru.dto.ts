import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    validateOrReject,
    ValidationError
} from "class-validator";

export class CreateLoaiTienTruDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100, { message: 'Tên loại tiền trừ phải có độ dài từ 1 đến 100 ký tự' })
    tenLoaiTienTru: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    soTienTru: number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 10, { message: 'Đơn vị phải có độ dài từ 1 đến 10 ký tự' })
    donVi: string;

    constructor(data: any) {
        this.tenLoaiTienTru = data.tenLoaiTienTru;
        this.soTienTru = data.soTienTru;
        this.donVi = data.donVi;
    }

    async validate(): Promise<void> {
        // Standard validation
        await validateOrReject(this);

        // Custom validation: If donVi is %, soTienTru must be between 1 and 100
        if (this.donVi === '%' && (this.soTienTru < 1 || this.soTienTru > 100)) {
            const error = new ValidationError();
            error.property = "soTienTru";
            error.constraints = { range: "When unit is percentage (%), deduction amount must be between 1 and 100" };
            throw error;
        }
    }
}
