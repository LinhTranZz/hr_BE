import { CreateNhanVienDto } from "./create.nhanvien.dto";

import {IsNotEmpty, IsDateString, IsOptional, IsInt, IsPositive} from "class-validator";

export class UpdateNhanVienDto extends CreateNhanVienDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    @IsOptional() // Override để không bắt buộc trong Update
    @IsDateString()
    ngayVaoLam: string;

    constructor(maNhanVien: number, data: any) {
        super(data);
        this.maNhanVien = maNhanVien;
        this.ngayVaoLam = data.ngayVaoLam;
    }
}
