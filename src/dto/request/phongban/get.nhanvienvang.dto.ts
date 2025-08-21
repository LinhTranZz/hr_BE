import {IsDateString, IsNotEmpty, validateOrReject} from "class-validator";

export class GetNhanVienVangDto{

    @IsNotEmpty()
    @IsDateString()
    ngayHomNay: string;

    constructor(ngayHomNay: string) {
        this.ngayHomNay = ngayHomNay;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}