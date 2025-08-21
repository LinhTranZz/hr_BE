import {CreateNgayNghiDto} from "./create.ngaynghi.dto";
import {IsInt, IsNotEmpty, IsPositive} from "class-validator";

export class UpdateNgayNghiDto extends CreateNgayNghiDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNghiPhep: number

    constructor(maNghiPhep: number, data: any) {
        super(data);
        this.maNghiPhep = maNghiPhep;
    }
}