import {IsNotEmpty, IsString, validateOrReject} from "class-validator";

export class QuyenhanDto {
    @IsNotEmpty()
    @IsString()
    maQuyenHan: string;

    @IsNotEmpty()
    @IsString()
    tenQuyenHan: string;

    @IsNotEmpty()
    @IsString()
    moTa: string
    constructor(data: {maQuyenHan: string, tenQuyenHan: string, moTa: string }) {
        this.tenQuyenHan = data.tenQuyenHan;
        this.moTa = data.moTa;
        this.maQuyenHan = data.maQuyenHan;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}