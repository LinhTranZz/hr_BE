import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {INgayNghiModel} from "../interfaces/models/ngaynghi.model";

@injectable()
class NgayNghiRepository{
    constructor(@inject(TYPES.Database)private readonly database: Database) {
    }

    async findAll(): Promise<INgayNghiModel[]> {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_ngaynghi");
        return result.recordset.map((row: any) => {
            return {
                maNghiPhep: row.MaNghiPhep,
                maNhanVien: row.MaNhanVien,
                ngayBatDau: row.NgayBatDau,
                ngayKetThuc: row.NgayKetThuc,
                liDo: row.LiDo,
                trangThaiPheDuyet: row.TrangThaiPheDuyet,
                tinhLuong: row.TinhLuong,
                tinhPhep: row.TinhPhep,
            } as INgayNghiModel;
        });
    }

    async create(data: INgayNghiModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maNhanVien", data.maNhanVien)
            .input("ngayBatDau", data.ngayBatDau)
            .input("ngayKetThuc", data.ngayKetThuc)
            .input("liDo", data.liDo)
            .input("trangThaiPheDuyet", data.trangThaiPheDuyet)
            .input("tinhLuong", data.tinhLuong)
            .input("tinhPhep", data.tinhPhep)
            .execute("sp_create_ngaynghi");
    }

    async update(maNghiPhep:number, data: INgayNghiModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maNghiPhep", maNghiPhep)
            .input("maNhanVien", data.maNhanVien)
            .input("ngayBatDau", data.ngayBatDau)
            .input("ngayKetThuc", data.ngayKetThuc)
            .input("liDo", data.liDo)
            .input("trangThaiPheDuyet", data.trangThaiPheDuyet)
            .input("tinhLuong", data.tinhLuong)
            .input("tinhPhep", data.tinhPhep)
            .execute("sp_update_ngaynghi");
    }

    async delete(maNghiPhep: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maNghiPhep", maNghiPhep)
            .execute("sp_delete_ngaynghi");
    }
}

export default NgayNghiRepository;