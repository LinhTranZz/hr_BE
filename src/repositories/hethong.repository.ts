import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {IHeThongModel} from "../interfaces/models/hethong.model";

@injectable()
class HeThongRepository {

    constructor(@inject(TYPES.Database)private readonly database: Database) {
    }

    async findAll(): Promise<IHeThongModel[]> {
        const pool = this.database.getPool();
        return await pool.request()
            .execute("sp_read_hethong")
            .then(result => result.recordset.map((row: any) => {
                return {
                    khoangCachGiuaCacLanChamCong: row.KhoangCachGiuaCacLanChamCong,
                    congNgayChuNhat: row.CongNgayChuNhat,
                    nguongThoiGianPheDuyetNgayNghi: row.NguongThoiGianPheDuyetNgayNghi,
                    soNgayPhepTrongNam: row.SoNgayPhepTrongNam,
                } as IHeThongModel;
            }));
    }

    async  update(data: IHeThongModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("KhoangCachGiuaCacLanChamCong", data.khoangCachGiuaCacLanChamCong)
            .input("CongNgayChuNhat", data.congNgayChuNhat)
            .input("NguongThoiGianPheDuyetNgayNghi", data.nguongThoiGianPheDuyetNgayNghi)
            .input("SoNgayPhepTrongNam", data.soNgayPhepTrongNam)
            .execute("sp_update_hethong");
    }
}

export default HeThongRepository;