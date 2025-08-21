import {IsInt, IsNotEmpty, validateOrReject} from "class-validator";

export class DeleteQuyenHanDto {
    @IsNotEmpty()
    @IsInt()
    maQuyenHan: string;

    constructor(maQuyenHan: string) {
        this.maQuyenHan = maQuyenHan;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}