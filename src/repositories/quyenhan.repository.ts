import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {IQuyenHanModel} from "../interfaces/models/quyenhan.model";

@injectable()
class QuyenHanRepository {
    constructor(@inject(TYPES.Database)private readonly database: Database) {
    }

    async getAllQuyenHan(): Promise<IQuyenHanModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_QuyenHan_GetAll");
        return result.recordset;
    }

    async getQuyenHanById(maQuyenHan: string): Promise<IQuyenHanModel> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input("MaQuyenHan", maQuyenHan)
            .execute("sp_QuyenHan_GetById");
        return result.recordset[0];
    }
}

export default QuyenHanRepository;