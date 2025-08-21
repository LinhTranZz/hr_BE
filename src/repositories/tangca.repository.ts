import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {ITangCaModel} from "../interfaces/models/tangca.model";

@injectable()
class TangCaRepository{
    constructor(@inject(TYPES.Database)private readonly database: Database) {
    }

    async findAll(): Promise<ITangCaModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_tangca");
        return result.recordset.map(row => ({
            ngayChamCongTangCa: row.NgayChamCongTangCa,
            maPhongBan: row.MaPhongBan,
            gioTangCaBatDau: row.GioTangCaBatDau,
            gioTangCaKetThuc: row.GioTangCaKetThuc,
        }) as ITangCaModel);
    }

    async create(tangCa: ITangCaModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('ngayChamCongTangCa', tangCa.ngayChamCongTangCa)
            .input('maPhongBan', tangCa.maPhongBan)
            .input('gioTangCaBatDau', tangCa.gioTangCaBatDau)
            .input('gioTangCaKetThuc', tangCa.gioTangCaKetThuc)
            .execute("sp_create_tangca");
    }

    async update(tangCa: ITangCaModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('ngayChamCongTangCa', tangCa.ngayChamCongTangCa)
            .input('maPhongBan', tangCa.maPhongBan)
            .input('gioTangCaBatDau', tangCa.gioTangCaBatDau)
            .input('gioTangCaKetThuc', tangCa.gioTangCaKetThuc)
            .execute("sp_update_tangca");
    }

    async delete(maPhongBan: number, ngayChamCongTangCa: Date): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maPhongBan', maPhongBan)
            .input('ngayChamCongTangCa', ngayChamCongTangCa)
            .execute("sp_delete_tangca");
    }
}

export default TangCaRepository;