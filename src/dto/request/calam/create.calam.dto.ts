import {IsString, IsNotEmpty, validateOrReject} from 'class-validator';

export class CreateCaLamDto {
    @IsNotEmpty()
    @IsString()
    tenCa: string;

    constructor(
        data: any
    ) {
        this.tenCa = data.tenCa;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}
