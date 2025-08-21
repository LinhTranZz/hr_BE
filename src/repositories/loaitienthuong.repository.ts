import { ILoaiTienThuongModel } from "../interfaces/models/loaitienthuong.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";

@injectable()
class LoaiTienThuongRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<ILoaiTienThuongModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_loaitienthuong")
        return result.recordset.map(row => ({
            maLoaiTienThuong: row.MaLoaiTienThuong,
            tenLoaiTienThuong: row.TenLoaiTienThuong,
            soTienThuong: row.SoTienThuong,
            donVi: row.DonVi
        }) as ILoaiTienThuongModel)
    }

    async create(loaiTienThuongData: ILoaiTienThuongModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('tenLoaiTienThuong', loaiTienThuongData.tenLoaiTienThuong)
            .input('soTienThuong', loaiTienThuongData.soTienThuong)
            .input('donVi', loaiTienThuongData.donVi)
            .execute("sp_create_loaitienthuong")
    }

    async update(maLoaiTienThuong: number, loaiTienThuongData: ILoaiTienThuongModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienThuong', maLoaiTienThuong)
            .input('tenLoaiTienThuong', loaiTienThuongData.tenLoaiTienThuong)
            .input('soTienThuong', loaiTienThuongData.soTienThuong)
            .input('donVi', loaiTienThuongData.donVi)
            .execute("sp_update_loaitienthuong")
    }

    async delete(maLoaiTienThuong: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maLoaiTienThuong', maLoaiTienThuong)
            .execute("sp_delete_loaitienthuong")
    }
}

export default LoaiTienThuongRepository;
