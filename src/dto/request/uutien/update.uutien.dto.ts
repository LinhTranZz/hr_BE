import {CreateUuTienDto} from "./create.uutien.dto";
import {IsInt, IsNotEmpty, IsPositive} from "class-validator";

export class UpdateUuTienDto extends CreateUuTienDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maUuTien: number;

    constructor(maUuTien: number, data: any) {
        super(data);
        this.maUuTien = maUuTien;
    }
}