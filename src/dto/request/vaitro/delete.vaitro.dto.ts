import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteVaiTroDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maVaiTro: number;

    constructor(maVaiTro: number) {
        this.maVaiTro = maVaiTro;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}