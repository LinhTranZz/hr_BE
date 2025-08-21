import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from '../configs/database';
import { ICaLamModel } from '../interfaces/models/calam.model';

@injectable()
class CaLamRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {}

    async findAll(): Promise<ICaLamModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_calam");
        return result.recordset.map((row: any) => {
            return {
                maCa: row.MaCa,
                tenCa: row.TenCa,
                gioBatDau: row.GioBatDau,
                gioKetThuc: row.GioKetThuc,
                gioNghiBatDau: row.GioNghiTruaBatDau,
                gioNghiKetThuc: row.GioNghiTruaKetThuc,
                soGioLamViec: row.SoGioLamViec,
            } as ICaLamModel;
        });
    }

    async create(calam: ICaLamModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("tenCa", calam.tenCa)
            .execute("sp_create_calam");
    }
    async update(id: number, calam: ICaLamModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maCa", id)
            .input("tenCa", calam.tenCa)
            .execute("sp_update_calam");
    }

    async delete(id: number): Promise<boolean> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input("maCa", id)
            .execute("sp_delete_calam");
        return result.rowsAffected[0] > 0;
    }
}

export default CaLamRepository

