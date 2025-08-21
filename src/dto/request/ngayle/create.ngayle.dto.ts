import {
    IsNotEmpty,
    IsString,
    validateOrReject,
    ValidationError,
    IsDateString
} from "class-validator";

export class CreateNgayLeDto {
    @IsNotEmpty()
    @IsString()
    tenNgayLe: string;

    @IsNotEmpty()
    @IsDateString()
    ngayBatDau: string;

    @IsNotEmpty()
    @IsDateString()
    ngayKetThuc: string;

    constructor(data: any) {
        this.tenNgayLe = data.tenNgayLe;
        this.ngayBatDau = data.ngayBatDau;
        this.ngayKetThuc = data.ngayKetThuc;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);

        if (this.ngayBatDau > this.ngayKetThuc) {
            const error = new ValidationError();
            error.property = "ngayBatDau";
            error.constraints = {
                isBeforeEndDate: "Start date must be before or equal to end date"
            };
            throw error;
        }
    }
}
