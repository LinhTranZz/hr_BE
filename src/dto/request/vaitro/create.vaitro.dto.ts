import {IsNotEmpty, IsString, validateOrReject} from "class-validator";

export class CreateVaiTroDto{
    @IsNotEmpty()
    @IsString()
    tenVaiTro: string;

    constructor(data: any) {
        this.tenVaiTro = data.tenVaiTro;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}