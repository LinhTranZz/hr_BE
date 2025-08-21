import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteLichSuUuTienDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maUuTien: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    constructor(maUuTien: number, maNhanVien: number) {
        this.maUuTien = maUuTien;
        this.maNhanVien = maNhanVien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
