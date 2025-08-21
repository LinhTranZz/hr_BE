import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteUuTienDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maUuTien: number;

    constructor(maUuTien: number) {
        this.maUuTien = maUuTien;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}