import { ICaLamTrongTuanService } from "../interfaces/services/calam.trongtuan.service";
import { ICaLamTrongTuanModel } from "../interfaces/models/calam.trongtuan.model";
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import CaLamTrongTuanRepository from "../repositories/calam.trongtuan.repository";
import { CaLamTrongTuanResponseDto } from "../dto/response/calam.response.dto";
import dayjs from "dayjs";

@injectable()
class CaLamTrongTuanService implements ICaLamTrongTuanService {

    constructor(@inject(TYPES.CaLamTrongTuanRepository) private readonly caLamTrongTuanRepository: CaLamTrongTuanRepository) {
    }

    async getAllCaLamTrongTuan(): Promise<CaLamTrongTuanResponseDto[]> {
        const result = await this.caLamTrongTuanRepository.findAll();
        return result.map(caLam => new CaLamTrongTuanResponseDto({
            maCa: caLam.maCa ?? 0,
            ngayTrongTuan: caLam.ngayTrongTuan,
            coLamViec: caLam.coLamViec,
            gioBatDau: dayjs.utc(caLam.gioBatDau).format("HH:mm:ss"),
            gioKetThuc: dayjs.utc(caLam.gioKetThuc).format("HH:mm:ss"),
            gioNghiTruaBatDau: dayjs.utc(caLam.gioNghiTruaBatDau).format("HH:mm:ss"),
            gioNghiTruaKetThuc: dayjs.utc(caLam.gioNghiTruaKetThuc).format("HH:mm:ss"),
            soGioLamViec: caLam.soGioLamViec ?? 0
        }));
    }

    async getCaLamTrongTuan(maCa: number): Promise<CaLamTrongTuanResponseDto[]> {
        const result = await this.caLamTrongTuanRepository.findByMaCa(maCa);
        return result.map(caLam => new CaLamTrongTuanResponseDto({
            maCa: caLam.maCa ?? 0,
            ngayTrongTuan: caLam.ngayTrongTuan,
            coLamViec: caLam.coLamViec ? 1 : 0,
            gioBatDau: dayjs.utc(caLam.gioBatDau).format("HH:mm:ss"),
            gioKetThuc: dayjs.utc(caLam.gioKetThuc).format("HH:mm:ss"),
            gioNghiTruaBatDau: dayjs.utc(caLam.gioNghiTruaBatDau).format("HH:mm:ss"),
            gioNghiTruaKetThuc: dayjs.utc(caLam.gioNghiTruaKetThuc).format("HH:mm:ss"),
            soGioLamViec: caLam.soGioLamViec ?? 0
        }));
    }

    async createCaLamTrongTuan(data: ICaLamTrongTuanModel): Promise<void> {
        await this.caLamTrongTuanRepository.create(data);
    }

    async deleteCaLamTrongTuan(maCa: number, ngayTrongTuan: number): Promise<boolean> {
        const pool = this.caLamTrongTuanRepository['database'].getPool();
        const result = await pool.request()
            .input("maCa", maCa)
            .input("ngayTrongTuan", ngayTrongTuan)
            .execute("sp_delete_calamviec_ngaytrongtuan");
        return result.rowsAffected[0] > 0;
    }

    async updateCaLamTrongTuan(data: ICaLamTrongTuanModel): Promise<void> {
        await this.caLamTrongTuanRepository.update(data);
    }

}

export default CaLamTrongTuanService;