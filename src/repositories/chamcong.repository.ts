import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {IChamCongChiTietModel, IChamCongModel} from "../interfaces/models/chamcong.model";

@injectable()
class ChamCongRepository {

    constructor(@inject(TYPES.Database)private readonly database: Database) {
    }

    async findAll(): Promise<IChamCongModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_chamcong");
        return result.recordset.map((row: any) => {
            return {
                ngayChamCong: row.NgayChamCong,
                maNhanVien: row.MaNhanVien,
                cong: row.Cong,
                soGioThucTe: row.SoGioThucTe,
                thoiGianVao: row.ThoiGianVao,
                thoiGianRa: row.ThoiGianRa,
                trangThai: row.TrangThai,
            } as IChamCongModel;
        });
    }

    async findAllDetail(): Promise<IChamCongChiTietModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_chamcong_chitiet");
        return result.recordset.map((row:any) => {
            return {
                ngayChamCong: row.NgayChamCong,
                maNhanVien: row.MaNhanVien,
                cong: row.Cong,
                soGioThucTe: row.SoGioThucTe,
                thoiGianVao: row.ThoiGianVao,
                thoiGianRa: row.ThoiGianRa,
                trangThai: row.TrangThai,
                hoTen: row.HoTen,
                maPhongBan: row.MaPhongBan,
                tenPhongBan: row.TenPhongBan,
            }
        })
    }
}

export default ChamCongRepository;