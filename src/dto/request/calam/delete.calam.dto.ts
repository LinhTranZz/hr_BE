import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteCaLamDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maCa: number;

    constructor(maCa: number) {
        this.maCa = maCa;
    }

    async validate() {
        await validateOrReject(this)
    }
}