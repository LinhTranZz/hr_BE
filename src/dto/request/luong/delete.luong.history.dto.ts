import {IsDateString, IsInt, IsNotEmpty, IsPositive, validateOrReject} from "class-validator";

export class DeleteLuongHistoryDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNguoiChinh: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maNguoiDuocChinh: number;

    @IsNotEmpty()
    @IsDateString()
    thoiGianThayDoi: string;

    constructor(data: any) {
        this.maNguoiChinh = data.maNguoiChinh;
        this.maNguoiDuocChinh = data.maNguoiDuocChinh;
        this.thoiGianThayDoi = data.thoiGianThayDoi;
    }

    async validate() : Promise<void> {
        await validateOrReject(this);
    }
}