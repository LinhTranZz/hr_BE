import {IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteLoaiTienThuongDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maLoaiTienThuong: number;

    constructor(maLoaiTienThuong: number) {
        this.maLoaiTienThuong = maLoaiTienThuong;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}
