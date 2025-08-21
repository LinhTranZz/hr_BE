import { ILoaiTienTruModel } from "../interfaces/models/loaitientru.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";

@injectable()
class LoaiTienTruRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<ILoaiTienTruModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_loaitientru")
        return result.recordset.map(row => ({
            maLoaiTienTru: row.MaLoaiTienTru,
            tenLoaiTienTru: row.TenLoaiTienTru,
            soTienTru: row.SoTienTru,
            donVi: row.DonVi
        }) as ILoaiTienTruModel)
    }

    async create(loaiTienTruData: ILoaiTienTruModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('tenLoaiTienTru', loaiTienTruData.tenLoaiTienTru)
            .input('soTienTru', loaiTienTruData.soTienTru)
            .input('donVi', loaiTienTruData.donVi)
            .execute("sp_create_loaitientru")
    }

    async update(maLoaiTienTru: number, loaiTienTruData: ILoaiTienTruModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienTru', maLoaiTienTru)
            .input('tenLoaiTienTru', loaiTienTruData.tenLoaiTienTru)
            .input('soTienTru', loaiTienTruData.soTienTru)
            .input('donVi', loaiTienTruData.donVi)
            .execute("sp_update_loaitientru")
    }

    async delete(maLoaiTienTru: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienTru', maLoaiTienTru)
            .execute("sp_delete_loaitientru")
    }
}

export default LoaiTienTruRepository;
