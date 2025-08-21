import { ILuongModel } from "../interfaces/models/luong.model";
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";
import {IDieuChinhLuongModel} from "../interfaces/models/dieuchinh.luong.model";

@injectable()
class LuongRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<ILuongModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_luong");

        return result.recordset.map(row => ({
            maNhanVien: row.MaNhanVien,
            nam: row.Nam,
            thang: row.Thang,
            soNgayLe: row.SoNgayLe,
            soNgayNghi: row.SoNgayNghi,
            soNgayCong: row.SoNgayCong,
            congChuanCuaThang: row.CongChuanCuaThang,
            soGioTangCa: row.SoGioTangCa,
            tienThuong: row.TienThuong,
            tongTienPhuCap: row.TongTienPhuCap,
            tongLuong: row.TongLuong,
            tienTru: row.TienTru,
            tongTienTangCa: row.TongTienTangCa,
            luongGio: row.LuongGio,
            soNgayNghiCoPhep: row.SoNgayNghiCoPhep,
            soNgayNghiCoLuong: row.SoNgayNghiCoLuong,
            luongTheoNgay: row.LuongTheoNgay,
            luongNgayNghi: row.LuongNgayNghi,
            soNgayNghiTruLuong: row.SoNgayNghiTruLuong,
            tongSoTienNgayNghiTruLuong: row.TongSoTienNgayNghiTruLuong,
        }) as ILuongModel);
    }

    async findLuongHistory(): Promise<IDieuChinhLuongModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_dieuchinhluong");
        return result.recordset.map(row => ({
            maNguoiChinh: row.MaNguoiChinh,
            maNguoiDuocChinh: row.MaNguoiDuocChinh,
            thoiGianThayDoi: row.ThoiGianThayDoi,
            luongCu: row.LuongCu,
            luongMoi: row.LuongMoi,
        }) as IDieuChinhLuongModel);
    }

    async create(nam: number, thang: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('Nam', nam)
            .input('Thang', thang)
            .execute("sp_create_luong");
    }

    async createEmployeeSalary(maNhanVien: number, nam: number, thang: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('MaNhanVien', maNhanVien)
            .input('Nam', nam)
            .input('Thang', thang)
            .execute("sp_create_luong_ca_nhan");
    }

    async updateTienThuong(maNhanVien: number, nam: number, thang: number, tienThuong: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('MaNhanVien', maNhanVien)
            .input('Nam', nam)
            .input('Thang', thang)
            .input('TienThuong', tienThuong)
            .execute("sp_update_luong");
    }

    async update(maNguoiChinh: number, maNhanVien: number, luongMoi: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('MaNhanVien', maNhanVien)
            .input("MaNguoiChinh", maNguoiChinh)
            .input("LuongMoi", luongMoi)
            .execute("sp_capnhat_luong_nhanvien");
    }

    async delete(maNhanVien: number, nam: number, thang: number): Promise<boolean> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input('MaNhanVien', maNhanVien)
            .input('Nam', nam)
            .input('Thang', thang)
            .execute("sp_delete_luong");

        return result.rowsAffected[0] > 0;
    }

    async deleteLuongHistory(maNguoiChinh: number, maNguoiDuocChinh: number, thoiGianThayDoi: Date): Promise<boolean> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input('MaNguoiChinh', maNguoiChinh)
            .input('MaNguoiDuocChinh', maNguoiDuocChinh)
            .input('ThoiGianThayDoi', thoiGianThayDoi)
            .execute("sp_delete_dieuchinhluong");

        return result.rowsAffected[0] > 0;
    }
}

export default LuongRepository;