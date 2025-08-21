import {CreatePhuCapDto} from "./create.phucap.dto";
import {IsInt, IsNotEmpty, IsPositive} from "class-validator";

export class UpdatePhuCapDto extends CreatePhuCapDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhuCap: number;

    constructor(maPhuCap: number, data: {
        maVaiTro: number;
        tenPhuCap?: string;
        soTienPhuCap?: number;
    }) {
        super(data);
        this.maPhuCap = maPhuCap;
    }
}