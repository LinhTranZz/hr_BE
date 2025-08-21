import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteLoaiTienTruDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maLoaiTienTru: number;

    constructor(maLoaiTienTru: number) {
        this.maLoaiTienTru = maLoaiTienTru;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}
