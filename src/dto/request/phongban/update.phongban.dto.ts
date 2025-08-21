import {CreatePhongBanDto} from "./create.phongban.dto";
import {IsInt, IsNotEmpty, IsPositive} from "class-validator";

export class UpdatePhongBanDto extends CreatePhongBanDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhongBan: number;

    constructor(maPhongBan: number, data: any) {
        super(data);
        this.maPhongBan = maPhongBan;
    }
}