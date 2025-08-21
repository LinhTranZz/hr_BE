import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";
import {IPhongBanModel, IPhongBanWithNhanVienVangModel} from "../interfaces/models/phongban.model";
import {IDieuChinhNhanSuModel} from "../interfaces/models/dieuchinh.nhansu.model";

@injectable()
class PhongBanRepository {
    constructor(@inject(TYPES.Database) private readonly database: Database) {}
    async findAll() {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_phongban");
        return result.recordset.map((row: any) => {
            return {
                maPhongBan: row.MaPhongBan,
                tenPhongBan: row.TenPhongBan,
                maCa: row.MaCa
            } as IPhongBanModel;
        });

    }

    async findMoveHistory(){
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_dieuchinhnhansu");
        return result.recordset.map((row: any) => {
            return {
                maNguoiChinh: row.MaNguoiChinh,
                maNguoiDuocChinh: row.MaNguoiDuocChinh,
                thoiGianThayDoi: row.ThoiGianThayDoi,
                phongBanCu: row.PhongBanCu,
                phongBanMoi: row.PhongBanMoi,
            } as IDieuChinhNhanSuModel;
        });
    }

    async findNhanVienVangByPhongBan(ngayHienTai: Date) {
        const pool = this.database.getPool();

        const phongBans = await pool.request()
            .execute("sp_read_phongban");

        const phongBanMap: Record<string, IPhongBanWithNhanVienVangModel> = {};

        phongBans.recordset.forEach((phongBan: any) => {
            if (phongBan.MaPhongBan) {
                phongBanMap[phongBan.MaPhongBan] = {
                    tenPhongBan: phongBan.TenPhongBan,
                    nhanVienVang: []
                };
            }
        });

        const nhanViens = await pool.request()
            .execute("sp_read_nhanvien");

        const ngayFormatted = ngayHienTai.toISOString().split('T')[0];

        const chamCongs = await pool.request()
            .input("NgayHienTai", ngayFormatted)
            .query("SELECT * FROM ChamCong WHERE CAST(NgayChamCong AS DATE) = @NgayHienTai");
        const chamCongMap: Record<string, boolean> = {};
        chamCongs.recordset.forEach((chamCong: any) => {
            if (chamCong.MaNhanVien) {
                chamCongMap[chamCong.MaNhanVien] = true;
            }
        });

        nhanViens.recordset.forEach((nhanVien: any) => {
            if (nhanVien.MaNhanVien && !chamCongMap[nhanVien.MaNhanVien]) {
                if (nhanVien.MaPhongBan && phongBanMap[nhanVien.MaPhongBan]) {
                    phongBanMap[nhanVien.MaPhongBan].nhanVienVang.push({
                        maNhanVien: nhanVien.MaNhanVien,
                        hoTen: nhanVien.HoTen,
                        soDienThoai: nhanVien.SoDienThoai,
                        cccd: nhanVien.CMND,
                    });
                }
            }
        });

        const finalResult = Object.values(phongBanMap);

        return finalResult.filter((phongBan: IPhongBanWithNhanVienVangModel) => phongBan.nhanVienVang.length > 0);
    }

    async create(data: IPhongBanModel) {
        const pool = this.database.getPool();
        await pool.request()
            .input("tenPhongBan", data.tenPhongBan)
            .input("maCa", data.maCa)
            .execute("sp_create_phongban");
    }

    async delete(maPhongBan: number): Promise<void> {
        const  pool = this.database.getPool();
        await pool.request()
            .input("maPhongBan", maPhongBan)
            .execute("sp_delete_phongban");
    }

    async deleteMoveHistory(maNguoiChinh: number, maNguoiDuocChinh: number, thoiGianThayDoi: Date): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("MaNguoiChinh", maNguoiChinh)
            .input("MaNguoiDuocChinh", maNguoiDuocChinh)
            .input("ThoiGianThayDoi", thoiGianThayDoi)
            .execute("sp_delete_dieuchinhnhansu");
    }

    async update(data: IPhongBanModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maPhongBan", data.maPhongBan)
            .input("tenPhongBan", data.tenPhongBan)
            .input("maCa", data.maCa)
            .execute("sp_update_phongban");
    }

    async moveNhanVien(maNguoiChinh: number, maPhongBan: number, maNhanVien: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("MaNguoiChinh", maNguoiChinh)
            .input("MaPhongBanMoi", maPhongBan)
            .input("MaNhanVien", maNhanVien)
            .execute("sp_capnhat_phongban_nhanvien");
    }
}

export default PhongBanRepository;
