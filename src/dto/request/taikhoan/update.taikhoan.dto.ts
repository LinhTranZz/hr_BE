import {IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Matches, validateOrReject} from "class-validator";

export class UpdateTaiKhoanDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    @IsOptional()
    @IsString()
    tenDangNhap: string;

    @IsOptional()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character" }
    )
    matKhau?: string;

    constructor(data: any) {
        this.maNhanVien = data.maNhanVien;
        this.tenDangNhap = data.tenDangNhap;
        // Only set password if it's provided and not empty
        if (data.matKhau && data.matKhau.trim() !== '') {
            this.matKhau = data.matKhau;
        }
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}