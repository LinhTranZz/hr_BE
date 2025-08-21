import {IsInt, IsNotEmpty, IsPositive, IsString, Length, validateOrReject} from "class-validator";

export class CreatePhongBanDto{
    @IsNotEmpty()
    @IsString()
    @Length(1, 100, { message: 'Tên phòng ban phải có độ dài từ 1 đến 100 ký tự' })
    tenPhongBan: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maCa: number;

    constructor(data: any) {
        this.tenPhongBan = data.tenPhongBan;
        this.maCa = data.maCa;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}