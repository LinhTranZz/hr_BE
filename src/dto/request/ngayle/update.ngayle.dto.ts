import {
    IsInt,
    IsNotEmpty, IsPositive,
} from "class-validator";
import {CreateNgayLeDto} from "./create.ngayle.dto";

export class UpdateNgayLeDto extends CreateNgayLeDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNgayLe: number;

    constructor(maNgayLe: number, data: any) {
        super(data);
        this.maNgayLe = maNgayLe;
    }
}
