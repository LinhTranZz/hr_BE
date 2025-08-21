import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";
import { ITaiKhoanModel } from "../interfaces/models/taikhoan.model";

@injectable()
class TaiKhoanRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) { }

    async findAll(): Promise<ITaiKhoanModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_taikhoan");
        return result.recordset.map(row => ({
            maNhanVien: row.MaNhanVien,
            tenDangNhap: row.TenDangNhap,
            matKhau: row.MatKhau,
        }) as ITaiKhoanModel);
    }

    async findByUsername(tenDangNhap: string){
        const pool = this.database.getPool();
        const result = await pool.request()
            .input('tenDangNhap', tenDangNhap)
            .execute("sp_login")

        if (result.recordset.length === 0) {
            return null;
        }

        return result.recordset[0];
    }

    async findByMaNhanVien(maNhanVien: number): Promise<ITaiKhoanModel | null> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input('maNhanVien', maNhanVien)
            .query("SELECT MaNhanVien, TenDangNhap, MatKhau FROM TaiKhoan WHERE MaNhanVien = @maNhanVien");

        if (result.recordset.length === 0) {
            return null;
        }

        const row = result.recordset[0];
        return {
            maNhanVien: row.MaNhanVien,
            tenDangNhap: row.TenDangNhap,
            matKhau: row.MatKhau,
        } as ITaiKhoanModel;
    }

    async create(taiKhoan: ITaiKhoanModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maNhanVien', taiKhoan.maNhanVien)
            .input('tenDangNhap', taiKhoan.tenDangNhap)
            .input('matKhau', taiKhoan.matKhau)
            .execute("sp_create_taikhoan");
    }

    async update(taiKhoan: ITaiKhoanModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maNhanVien', taiKhoan.maNhanVien)
            .input('tenDangNhap', taiKhoan.tenDangNhap)
            .input('matKhau', taiKhoan.matKhau)
            .execute("sp_update_taikhoan");
    }

    async delete(maNhanVien: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maNhanVien', maNhanVien)
            .execute("sp_delete_taikhoan");
    }
}

export default TaiKhoanRepository;
