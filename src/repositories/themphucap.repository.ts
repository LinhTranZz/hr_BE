import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {IThemPhuCapModel} from "../interfaces/models/themphucap.model";

@injectable()
class ThemPhuCapRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<IThemPhuCapModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_themphucap");
        return result.recordset.map((row: any) => {
            return {
                maPhuCap: row.MaPhuCap,
                maNhanVien: row.MaNhanVien,
            } as IThemPhuCapModel;
        });
    }

    async create(data: IThemPhuCapModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maPhuCap", data.maPhuCap)
            .input("maNhanVien", data.maNhanVien)
            .execute("sp_create_themphucap");
    }

    async delete(data: IThemPhuCapModel): Promise<boolean> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input("maPhuCap", data.maPhuCap)
            .input("maNhanVien", data.maNhanVien)
            .execute("sp_delete_themphucap");
        return result.rowsAffected[0] > 0;
    }

    async deleteAll(maNhanVien: number): Promise<boolean> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input("maNhanVien", maNhanVien)
            .execute("sp_delete_all_themphucap");
        return result.rowsAffected[0] > 0;
    }
}

export default ThemPhuCapRepository;