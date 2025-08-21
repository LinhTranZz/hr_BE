import {IsInt, IsNotEmpty, IsOptional, IsPositive, validateOrReject} from "class-validator";

export class UpdateNgayPhepByMonthDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    nam: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    thang: number;

    constructor(nam: number, thang: number) {
        this.nam = nam;
        this.thang = thang;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}

export class UpdateNgayPhepByYearDto{
    @IsNotEmpty()
    @IsInt()
    nam: number;

    @IsOptional()
    thang?: number;

    constructor(nam: number, thang?: number) {
        this.nam = nam;
        this.thang = thang;
    }

    async validate(): Promise<void> {
        await validateOrReject(this)
    }
}