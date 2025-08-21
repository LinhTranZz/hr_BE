import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteNgayLeDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNgayLe: number;

    constructor(maNgayLe: number) {
        this.maNgayLe = maNgayLe;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
