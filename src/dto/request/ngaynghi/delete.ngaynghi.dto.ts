import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteNgayNghiDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNghiPhep: number;

    constructor(maNgayNghi: number) {
        this.maNghiPhep = maNgayNghi;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}