import { ILichSuUuTienModel } from "../interfaces/models/lichsuuutien.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";

@injectable()
class LichSuUuTienRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<ILichSuUuTienModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_lichsuuutien")
        return result.recordset.map(row => ({
            maUuTien: row.MaUuTien,
            maNhanVien: row.MaNhanVien,
            thoiGianHieuLucBatDau: row.ThoiGianHieuLucBatDau,
            thoiGianHieuLucKetThuc: row.ThoiGianHieuLucKetThuc
        }) as ILichSuUuTienModel)
    }

    async create(lichSuUuTienData: ILichSuUuTienModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maUuTien', lichSuUuTienData.maUuTien)
            .input('maNhanVien', lichSuUuTienData.maNhanVien)
            .input('thoiGianHieuLucBatDau', lichSuUuTienData.thoiGianHieuLucBatDau)
            .execute("sp_create_lichsuuutien")
    }

    async update(lichSuUuTienData: ILichSuUuTienModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maUuTien', lichSuUuTienData.maUuTien)
            .input('maNhanVien', lichSuUuTienData.maNhanVien)
            .input('thoiGianHieuLucBatDau', lichSuUuTienData.thoiGianHieuLucBatDau)
            .execute("sp_update_lichsuuutien")
    }

    async delete(maUuTien: number, maNhanVien: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maUuTien', maUuTien)
            .input('maNhanVien', maNhanVien)
            .execute("sp_delete_lichsuuutien")
    }
}

export default LichSuUuTienRepository;
