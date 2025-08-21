import {IsInt, IsNotEmpty, IsPositive, IsString, validateOrReject} from "class-validator";

export class UpdateVaiTroDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maVaiTro: number;

    @IsNotEmpty()
    @IsString()
    tenVaiTro: string;

    constructor(maVaiTro: number, data: any) {
        this.maVaiTro = maVaiTro;
        this.tenVaiTro = data.tenVaiTro;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}