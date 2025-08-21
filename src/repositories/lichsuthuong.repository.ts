// filepath: C:\Users\Administrator\Documents\workspace\PMChamCong-BE\src\repositories\lichsuthuong.repository.ts
import { ILichSuThuongModel } from "../interfaces/models/lichsuthuong.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";

@injectable()
class LichSuThuongRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<ILichSuThuongModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_lichsuthuong")
        return result.recordset.map(row => ({
            maLoaiTienThuong: row.MaLoaiTienThuong,
            maNhanVien: row.MaNhanVien,
            soTienThuongKhac: row.SoTienThuongKhac,
            ngayTao: row.NgayTao,
            lyDo: row.LiDo
        }) as ILichSuThuongModel)
    }

    async create(lichSuThuongData: ILichSuThuongModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienThuong', lichSuThuongData.maLoaiTienThuong)
            .input('maNhanVien', lichSuThuongData.maNhanVien)
            .input('soTienThuongKhac', lichSuThuongData.soTienThuongKhac)
            .input('liDo', lichSuThuongData.lyDo)
            .execute("sp_create_lichsuthuong")
    }

    async update(lichSuThuongData: ILichSuThuongModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienThuong', lichSuThuongData.maLoaiTienThuong)
            .input('maNhanVien', lichSuThuongData.maNhanVien)
            .input('soTienThuongKhac', lichSuThuongData.soTienThuongKhac)
            .input('liDo', lichSuThuongData.lyDo)
            .execute("sp_update_lichsuthuong")
    }

    async delete(maLoaiTienThuong:number, maNhanVien: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienThuong', maLoaiTienThuong)
            .input('maNhanVien', maNhanVien)
            .execute("sp_delete_lichsuthuong")
    }
}

export default LichSuThuongRepository;
