import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteTaiKhoanDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    constructor(maNhanVien: number) {
        this.maNhanVien = maNhanVien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}