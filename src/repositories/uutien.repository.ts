import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";
import { IUuTienModel } from "../interfaces/models/uutien.model";

@injectable()
class UuTienRepository {
    constructor(@inject(TYPES.Database) private readonly database: Database) { }

    async findAll() {
        const pool = this.database.getPool();
        return await pool.request().execute("sp_read_doituonguutien")
            .then(result => result.recordset.map((row: any) => {
                return {
                    maUuTien: row.MaUuTien,
                    tenUuTien: row.TenUuTien,
                    thoiGianBatDauCa: row.ThoiGianBatDauCa,
                    thoiGianKetThucCa: row.ThoiGianKetThucCa,
                    thoiGianHieuLuc: row.ThoiGianHieuLuc,
                    maPhongBan: row.MaPhongBan,
                } as IUuTienModel;
            }));
    }

    async create(data: IUuTienModel) {
        const pool = this.database.getPool();
        await pool.request()
            .input("tenUuTien", data.tenUuTien)
            .input("thoiGianBatDauCa", data.thoiGianBatDauCa)
            .input("thoiGianKetThucCa", data.thoiGianKetThucCa)
            .input("thoiGianHieuLuc", data.thoiGianHieuLuc)
            .execute("sp_create_doituonguutien");
    }

    async delete(maUuTien: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maUuTien", maUuTien)
            .execute("sp_delete_doituonguutien");
    }

    async update(data: IUuTienModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maUuTien", data.maUuTien)
            .input("tenUuTien", data.tenUuTien)
            .input("thoiGianBatDauCa", data.thoiGianBatDauCa)
            .input("thoiGianKetThucCa", data.thoiGianKetThucCa)
            .input("thoiGianHieuLuc", data.thoiGianHieuLuc)
            .execute("sp_update_doituonguutien");
    }
}

export default UuTienRepository

