import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    validateOrReject,
    ValidationError
} from "class-validator";

export class CaLamTrongTuanDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maCa: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    ngayTrongTuan: number;

    @IsNotEmpty()
    @IsInt()
    coLamViec: number;

    @IsOptional()
    @IsString()
    gioBatDau: string;

    @IsOptional()
    @IsString()
    gioKetThuc: string;

    @IsOptional()
    @IsString()
    gioNghiTruaBatDau: string;

    @IsOptional()
    @IsString()
    gioNghiTruaKetThuc: string;

    constructor(data: {
        maCa: number,
        ngayTrongTuan: number,
        coLamViec: number,
        gioBatDau: string,
        gioKetThuc: string,
        gioNghiTruaBatDau: string,
        gioNghiTruaKetThuc: string
    }) {
        this.maCa = data.maCa;
        this.ngayTrongTuan = data.ngayTrongTuan;
        this.coLamViec = data.coLamViec;
        this.gioBatDau = data.gioBatDau;
        this.gioKetThuc = data.gioKetThuc;
        this.gioNghiTruaBatDau = data.gioNghiTruaBatDau;
        this.gioNghiTruaKetThuc = data.gioNghiTruaKetThuc;
    }

    async validate(): Promise<void> {
        await validateOrReject(this);

        if (this.ngayTrongTuan < 1 || this.ngayTrongTuan > 7) {
            const error = new ValidationError();
            error.property = "ngayTrongTuan";
            error.constraints = {
                range: "Day of week must be between 1 and 7"
            };
            error.children = [];
            throw error;
        }

        if (this.coLamViec == 0) {
            return;
        }

        // Convert all time strings to Date objects for comparison
        const startTime = new Date(`1970-01-01T${this.gioBatDau}`);
        const endTime = new Date(`1970-01-01T${this.gioKetThuc}`);
        const lunchStartTime = new Date(`1970-01-01T${this.gioNghiTruaBatDau}`);
        const lunchEndTime = new Date(`1970-01-01T${this.gioNghiTruaKetThuc}`);

        // Check if work start and end times are different and in correct order
        if (this.gioBatDau === this.gioKetThuc) {
            const error = new ValidationError();
            error.property = "gioKetThuc";
            error.constraints = {
                timeComparison: "Start time cannot be the same as end time"
            };
            error.children = [];
            throw error;
        }

        if (endTime <= startTime) {
            const error = new ValidationError();
            error.property = "gioKetThuc";
            error.constraints = {
                timeComparison: "End time must be greater than start time"
            };
            error.children = [];
            throw error;
        }

        // Check if lunch break start and end times are different and in correct order
        if (this.gioNghiTruaBatDau === this.gioNghiTruaKetThuc) {
            const error = new ValidationError();
            error.property = "gioNghiTruaKetThuc";
            error.constraints = {
                timeComparison: "Lunch break start time cannot be the same as lunch break end time"
            };
            error.children = [];
            throw error;
        }

        if (lunchEndTime <= lunchStartTime) {
            const error = new ValidationError();
            error.property = "gioNghiTruaKetThuc";
            error.constraints = {
                timeComparison: "Lunch break end time must be greater than lunch break start time"
            };
            error.children = [];
            throw error;
        }

        // Check that all four times are unique from each other
        const timeSet = new Set([this.gioBatDau, this.gioKetThuc, this.gioNghiTruaBatDau, this.gioNghiTruaKetThuc]);
        if (timeSet.size !== 4) {
            const error = new ValidationError();
            error.property = "timeFields";
            error.constraints = {
                uniqueTimes: "All time fields (work start, work end, lunch start, lunch end) must be unique"
            };
            error.children = [];
            throw error;
        }
    }
}