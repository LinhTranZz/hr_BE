import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {IPhuCapModel} from "../interfaces/models/phucap.model";

@injectable()
class PhuCapRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<IPhuCapModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_phucap");
        return result.recordset.map((row: any) => {
            return {
                maPhuCap: row.MaPhuCap,
                maVaiTro: row.MaVaiTro,
                tenPhuCap: row.TenPhuCap,
                soTienPhuCap: row.SoTienPhuCap,
            } as IPhuCapModel;
        });
    }

    async create(data: IPhuCapModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maVaiTro", data.maVaiTro)
            .input("tenPhuCap", data.tenPhuCap)
            .input("soTienPhuCap", data.soTienPhuCap)
            .execute("sp_create_phucap");
    }

    async update(data: IPhuCapModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maPhuCap", data.maPhuCap)
            .input("maVaiTro", data.maVaiTro)
            .input("tenPhuCap", data.tenPhuCap)
            .input("soTienPhuCap", data.soTienPhuCap)
            .execute("sp_update_phucap");
    }

    async delete(maPhuCap: number, maVaiTro: number): Promise<boolean> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input("maPhuCap", maPhuCap)
            .input("maVaiTro", maVaiTro)
            .execute("sp_delete_phucap");
        return result.rowsAffected[0] > 0;
    }
}

export default PhuCapRepository;