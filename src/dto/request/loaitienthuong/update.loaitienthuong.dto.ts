import {IsInt, IsNotEmpty, IsPositive} from "class-validator";
import {CreateLoaiTienThuongDto} from "./create.loaitienthuong.dto";

export class UpdateLoaiTienThuongDto extends CreateLoaiTienThuongDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maLoaiTienThuong: number;

    constructor(maLoaiTienThuong: number, data: any) {
        super(data)
        this.maLoaiTienThuong = maLoaiTienThuong;
    }
}
