import {CreateLuongDto} from "./create.luong.dto";
import {IsInt, IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class UpdateTienThuongDto extends CreateLuongDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNhanVien: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    tienThuong: number;

    constructor(data: any) {
        super(data);
        this.maNhanVien = data.maNhanVien;
        this.tienThuong = data.tienThuong;
    }
}