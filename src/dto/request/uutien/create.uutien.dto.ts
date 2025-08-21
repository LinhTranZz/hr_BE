import {IsInt, IsNotEmpty, IsPositive, IsString, Length, Matches, validateOrReject} from "class-validator";

export class CreateUuTienDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100, { message: 'Tên ưu tiên phải có độ dài từ 1 đến 100 ký tự' })
    tenUuTien: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'Correct format is HH:mm:ss' })
    thoiGianBatDauCa: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'Correct format is HH:mm:ss' })
    thoiGianKetThucCa: string;


    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    thoiGianHieuLuc: number;


    constructor(data: any) {
        this.tenUuTien = data.tenUuTien;
        this.thoiGianBatDauCa = data.thoiGianBatDauCa;
        this.thoiGianKetThucCa = data.thoiGianKetThucCa;
        this.thoiGianHieuLuc = data.thoiGianHieuLuc
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}