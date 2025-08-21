import {IsInt, IsNotEmpty, IsPositive} from "class-validator";
import {CreateLoaiTienTruDto} from "./create.loaitientru.dto";

export class UpdateLoaiTienTruDto extends CreateLoaiTienTruDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maLoaiTienTru: number;

    constructor(maLoaiTienTru: number, data: any) {
        super(data);
        this.maLoaiTienTru = maLoaiTienTru;
    }
}
