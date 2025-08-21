import {CreateLuongDto} from "./create.luong.dto";
import {IsInt, IsNotEmpty, IsPositive} from "class-validator";

export class CreateEmployeeLuongDto extends CreateLuongDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    constructor(data:any, maNhanVien: number) {
        super(data);
        this.maNhanVien = maNhanVien;
    }
}