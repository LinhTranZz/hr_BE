import {IsNotEmpty, Min, Max, validateOrReject, IsInt} from "class-validator";

export class CreateLuongDto {
    @IsNotEmpty({ message: "Month is not empty" })
    @IsInt({ message: "Month is integer" })
    @Min(1, { message: "Month from 1 to 2" })
    @Max(12, { message: "Month from 1 to 2" })
    thang: number;

    @IsNotEmpty({ message: "Year is not empty" })
    @IsInt({ message: "Year is integer" })
    @Min(1000, { message: "Year have 4 digit" })
    @Max(9999, { message: "Year have 4 digit" })
    nam: number;

    constructor(data: any) {
        this.thang = data.thang;
        this.nam = data.nam;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}