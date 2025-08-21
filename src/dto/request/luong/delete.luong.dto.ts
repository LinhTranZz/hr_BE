import {CreateLuongDto} from "./create.luong.dto";
import {IsInt, IsNotEmpty, IsPositive} from "class-validator";

export class DeleteLuongDto extends CreateLuongDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;
    constructor(data: any) {
        super(data);
        this.maNhanVien = data.maNhanVien;
    }
}