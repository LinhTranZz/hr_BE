import { INgayLeModel } from "../interfaces/models/ngayle.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";

@injectable()
class NgayLeRepository {

    constructor(@inject(TYPES.Database) private readonly database: Database) {
    }

    async findAll(): Promise<INgayLeModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_ngayle")
        return result.recordset.map(row => ({
            maNgayLe: row.MaNgayLe,
            tenNgayLe: row.TenNgayLe,
            ngayBatDau: row.NgayBatDau,
            ngayKetThuc: row.NgayKetThuc,
            soNgayNghi: row.SoNgayNghi
        }) as INgayLeModel)
    }
    async create(ngayLeData: INgayLeModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('tenNgayLe', ngayLeData.tenNgayLe)
            .input('ngayBatDau', ngayLeData.ngayBatDau)
            .input('ngayKetThuc', ngayLeData.ngayKetThuc)
            .execute("sp_create_ngayle")
    }

    async update(maNgayLe: number, ngayLeData: INgayLeModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maNgayLe', maNgayLe)
            .input('tenNgayLe', ngayLeData.tenNgayLe)
            .input('ngayBatDau', ngayLeData.ngayBatDau)
            .input('ngayKetThuc', ngayLeData.ngayKetThuc)
            .execute("sp_update_ngayle")
    }

    async delete(maNgayLe: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input('maNgayLe', maNgayLe)
            .execute("sp_delete_ngayle")
    }
}

export default NgayLeRepository;
