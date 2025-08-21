import {IsDateString, IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteTangCaDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maPhongBan: number;

    @IsNotEmpty()
    @IsDateString()
    ngayChamCongTangCa: string;

    constructor(data: any) {
        this.maPhongBan = data.maPhongBan;
        this.ngayChamCongTangCa = data.ngayChamCongTangCa;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}

