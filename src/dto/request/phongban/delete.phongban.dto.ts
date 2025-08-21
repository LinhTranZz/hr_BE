import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeletePhongBanDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhongBan: number;

    constructor(maPhongBan: number) {
        this.maPhongBan = maPhongBan;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}