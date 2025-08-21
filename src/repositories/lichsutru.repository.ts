// filepath: C:\Users\Administrator\Documents\workspace\PMChamCong-BE\src\repositories\lichsutru.repository.ts
import { ILichSuTruModel } from "../interfaces/models/lichsutru.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";

@injectable()
class LichSuTruRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<ILichSuTruModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_lichsutru")
        return result.recordset.map(row => ({
            maLichSuTru: row.MaLichSuTru,
            maLoaiTienTru: row.MaLoaiTienTru,
            maNhanVien: row.MaNhanVien,
            soTienTruKhac: row.SoTienTruKhac,
            ngayTao: row.NgayTao,
            liDo: row.LiDo
        }) as ILichSuTruModel)
    }

    async create(lichSuTruData: ILichSuTruModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienTru', lichSuTruData.maLoaiTienTru)
            .input('maNhanVien', lichSuTruData.maNhanVien)
            .input('soTienTruKhac', lichSuTruData.soTienTruKhac)
            .input('liDo', lichSuTruData.liDo)
            .execute("sp_create_lichsutru")
    }

    async update(lichSuTruData: ILichSuTruModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienTru', lichSuTruData.maLoaiTienTru)
            .input('maNhanVien', lichSuTruData.maNhanVien)
            .input('soTienTruKhac', lichSuTruData.soTienTruKhac)
            .input('liDo', lichSuTruData.liDo)
            .execute("sp_update_lichsutru")
    }

    async delete(maLoaiTienTru: number, maNhanVien: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienTru', maLoaiTienTru)
            .input('maNhanVien', maNhanVien)
            .execute("sp_delete_lichsutru")
    }
}

export default LichSuTruRepository;
