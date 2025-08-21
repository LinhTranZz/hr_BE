import { INhanVienDetailModel, INhanVienModel } from "../interfaces/models/nhanvien.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";
import { INhanVienVanTayModel } from "../interfaces/models/vantay.model";

@injectable()
class NhanVienRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }
    async findAll(): Promise<INhanVienModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_nhanvien")
        return result.recordset.map(row => ({
            maNhanVien: row.MaNhanVien,
            hoTen: row.HoTen,
            ngaySinh: row.NgaySinh,
            soDienThoai: row.SoDienThoai,
            cmnd: row.CMND,
            diaChi: row.DiaChi,
            ngayVaoLam: row.NgayVaoLam,
            luongCoBan: row.LuongCoBan,
            trangThai: row.TrangThai,
            maVaiTro: row.MaVaiTro,
            maPhongBan: row.MaPhongBan,
            maUuTien: row.MaUuTien,
            heSoTangCa: row.HeSoTangCa,
            email: row.Email
        }) as INhanVienModel)
    }

    async findAllVanTay(maNhanVien: number): Promise<INhanVienVanTayModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input('maNhanVien', maNhanVien)
            .execute("sp_read_vantay");

        return result.recordset.map(row => ({
            maNhanVien: row.MaNhanVien,
            viTriNgonTay: row.ViTriNgonTay,
            duLieuNgonTay: row.DuLieuVanTay,
        }) as INhanVienVanTayModel);
    }

    async findAllDetail(): Promise<INhanVienDetailModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_thong_tin_chi_tiet_nhanvien");

        return result.recordset.map(row => ({
            maNhanVien: row.MaNhanVien,
            hoTen: row.HoTen,
            ngaySinh: row.NgaySinh,
            soDienThoai: row.SoDienThoai,
            email: row.Email,
            cmnd: row.CMND,
            diaChi: row.DiaChi,
            ngayVaoLam: row.NgayVaoLam,
            luongCoBan: row.LuongCoBan,
            trangThai: row.TrangThai,
            maVaiTro: row.MaVaiTro,
            maPhongBan: row.MaPhongBan,
            maUuTien: row.MaUuTien,
            tenPhongBan: row.TenPhongBan,
            tenVaiTro: row.TenVaiTro,
            tenUuTien: row.TenUuTien,
            heSoTangCa: row.HeSoTangCa,
        }) as INhanVienDetailModel);
    }

    async findById(maNhanVien: number): Promise<INhanVienModel | null> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input('maNhanVien', maNhanVien)
            .query(`
            SELECT *
            FROM NhanVien
            WHERE MaNhanVien = @maNhanVien`);

        if (result.recordset.length === 0) {
            return null;
        }
        const row = result.recordset[0];
        return {
            maNhanVien: row.MaNhanVien,
            hoTen: row.HoTen,
            ngaySinh: row.NgaySinh,
            soDienThoai: row.SoDienThoai,
            email: row.Email,
            cmnd: row.CMND,
            diaChi: row.DiaChi,
            ngayVaoLam: row.NgayVaoLam,
            luongCoBan: row.LuongCoBan,
            trangThai: row.TrangThai,
            maVaiTro: row.MaVaiTro,
            maPhongBan: row.MaPhongBan,
            maUuTien: row.MaUuTien,
            heSoTangCa: row.HeSoTangCa
        } as INhanVienModel;
    }
    async findByCCCD(CMND: number): Promise<INhanVienModel | null> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input('CMND', CMND)
            .query(`
            SELECT *
            FROM NhanVien
            WHERE CMND = @CMND`);

        if (result.recordset.length === 0) {
            return null;
        }
        const row = result.recordset[0];
        return {
            maNhanVien: row.MaNhanVien,
            hoTen: row.HoTen,
            email: row.Email,
        } as INhanVienModel;
    }


    async create(nhanVienData: INhanVienModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('hoTen', nhanVienData.hoTen)
            .input('ngaySinh', nhanVienData.ngaySinh)
            .input('soDienThoai', nhanVienData.soDienThoai)
            .input('cmnd', nhanVienData.cmnd)
            .input('diaChi', nhanVienData.diaChi)
            .input('ngayVaoLam', nhanVienData.ngayVaoLam)
            .input('luongCoBan', nhanVienData.luongCoBan)
            .input('trangThai', nhanVienData.trangThai)
            .input('maVaiTro', nhanVienData.maVaiTro)
            .input('maPhongBan', nhanVienData.maPhongBan)
            .input('maUuTien', nhanVienData.maUuTien)
            .input('heSoTangCa', nhanVienData.heSoTangCa)
            .input('email', nhanVienData.email)
            .execute("sp_create_nhanvien")
    }

    async update(maNhanVien: number, nhanVienData: INhanVienModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maNhanVien', maNhanVien)
            .input('hoTen', nhanVienData.hoTen)
            .input('ngaySinh', nhanVienData.ngaySinh)
            .input('soDienThoai', nhanVienData.soDienThoai)
            .input('cmnd', nhanVienData.cmnd)
            .input('diaChi', nhanVienData.diaChi)
            .input('ngayVaoLam', nhanVienData.ngayVaoLam)
            .input('luongCoBan', nhanVienData.luongCoBan)
            .input('trangThai', nhanVienData.trangThai)
            .input('maVaiTro', nhanVienData.maVaiTro)
            .input('maPhongBan', nhanVienData.maPhongBan)
            .input('maUuTien', nhanVienData.maUuTien)
            .input('heSoTangCa', nhanVienData.heSoTangCa)
            .input('email', nhanVienData.email)
            .execute("sp_update_nhanvien")
    }

    async updateEmail(maNhanVien: number, email: string): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maNhanVien', maNhanVien)
            .input('email', email)
            .query(`UPDATE NhanVien SET Email = @email WHERE MaNhanVien = @maNhanVien`);
    }

    async delete(maNhanVien: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maNhanVien', maNhanVien)
            .execute("sp_delete_nhanvien")
    }

    async reloadTrangThaiNhanVien(): Promise<void> {
        const pool = this.database.getPool();
        await pool.request().execute('sp_reload_trangthai_nhanvien_all')
    }
}

export default NhanVienRepository


