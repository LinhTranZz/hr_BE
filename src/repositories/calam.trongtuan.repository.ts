import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {ICaLamTrongTuanModel} from "../interfaces/models/calam.trongtuan.model";

@injectable()
class CaLamTrongTuanRepository {
    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<ICaLamTrongTuanModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_calamviec_ngaytrongtuan");
        return result.recordset.map((row: any) => {
            return {
                maCa: row.MaCa,
                ngayTrongTuan: row.NgayTrongTuan,
                coLamViec: row.CoLamViec,
                gioBatDau: row.GioBatDau,
                gioKetThuc: row.GioKetThuc,
                gioNghiTruaBatDau: row.GioNghiTruaBatDau,
                gioNghiTruaKetThuc: row.GioNghiTruaKetThuc,
                soGioLamViec: row.SoGioLamViec,
            } as ICaLamTrongTuanModel;
        });
    }

    findByMaCa(maCa: number): Promise<ICaLamTrongTuanModel[]> {
        const pool = this.database.getPool();
        return pool.request()
            .input("maCa", maCa)
            .execute("sp_read_calamtrongtuan_by_maCa")
            .then(result => result.recordset.map((row: any) => ({
                maCa: row.MaCa,
                ngayTrongTuan: row.NgayTrongTuan,
                coLamViec: row.CoLamViec,
                gioBatDau: row.GioBatDau,
                gioKetThuc: row.GioKetThuc,
                gioNghiTruaBatDau: row.GioNghiTruaBatDau,
                gioNghiTruaKetThuc: row.GioNghiTruaKetThuc,
                soGioLamViec: row.SoGioLamViec
            } as ICaLamTrongTuanModel)));
    }

    async create(data: ICaLamTrongTuanModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("MaCa", data.maCa)
            .input("NgayTrongTuan", data.ngayTrongTuan)
            .input("CoLamViec", data.coLamViec)
            .input("GioBatDau", data.gioBatDau)
            .input("GioKetThuc", data.gioKetThuc)
            .input("GioNghiTruaBatDau", data.gioNghiTruaBatDau)
            .input("GioNghiTruaKetThuc", data.gioNghiTruaKetThuc)
            .execute("sp_create_calamviec_ngaytrongtuan");
    }

    async update (data: ICaLamTrongTuanModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("MaCa", data.maCa)
            .input("NgayTrongTuan", data.ngayTrongTuan)
            .input("CoLamViec", data.coLamViec)
            .input("GioBatDau", data.gioBatDau)
            .input("GioKetThuc", data.gioKetThuc)
            .input("GioNghiTruaBatDau", data.gioNghiTruaBatDau)
            .input("GioNghiTruaKetThuc", data.gioNghiTruaKetThuc)
            .execute("sp_update_calamviec_ngaytrongtuan");
    }

    async delete (maCa: number, ngayTrongTuan: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maCa", maCa)
            .input("ngayTrongTuan", ngayTrongTuan)
            .execute("sp_delete_calamviec_ngaytrongtuan");
    }
}

export default CaLamTrongTuanRepository;
