import {IsInt, IsNotEmpty, IsPositive} from "class-validator";
import {CreateCaLamDto} from "./create.calam.dto";

export class UpdateCaLamDto extends CreateCaLamDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maCa: number;

    constructor(maCa: number, data: any) {
        super(data);
        this.maCa = maCa;
    }
}