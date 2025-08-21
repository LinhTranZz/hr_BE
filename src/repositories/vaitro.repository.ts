import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import Database from "../configs/database";
import {IVaiTroModel} from "../interfaces/models/vaitro.model";
import {VaiTroResponseDto} from "../dto/response/vaitro.response.dto";

@injectable()
class VaiTroRepository {
    constructor(@inject(TYPES.Database) private readonly database: Database) {}

    async findAll() {
        const pool = this.database.getPool();
        const result = await pool.request().execute("sp_read_vaitro");
        return result.recordset.map((row: any) => {
            return {
                maVaiTro: row.MaVaiTro,
                tenVaiTro: row.TenVaiTro,
                // maPhongBan: row.MaPhongBan
            } as IVaiTroModel;
        });
    }

    async create(data: IVaiTroModel) {
        const pool = this.database.getPool();
        await pool.request()
            .input("tenVaiTro", data.tenVaiTro)
            // .input("maPhongBan", data.maPhongBan)
            .execute("sp_create_vaitro");
    }

    async delete(maVaiTro: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maVaiTro", maVaiTro)
            .execute("sp_delete_vaitro");
    }

    async update(data: IVaiTroModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("maVaiTro", data.maVaiTro)
            .input("tenVaiTro", data.tenVaiTro)
            // .input("maPhongBan", data.maPhongBan)
            .execute("sp_update_vaitro");
    }

    // async findVaiTroByIdPhongBan(maPhongBan: number): Promise<IVaiTroModel[]>{
    //     const pool = this.database.getPool()
    //     const res = await pool.request()
    //     .input('maPhongBan',maPhongBan)
    //     .execute('sp_read_vaitro_by_id_phongban')
    //     return res.recordset.map((vt: any) => ({
    //         maVaiTro: vt.MaVaiTro,
    //         tenVaiTro: vt.TenVaiTro,
    //         maPhongBan: vt.MaPhongBan
    //     } as IVaiTroModel))
    // }

    async addPermission(maVaiTro: number, maQuyenHan: string): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("MaVaiTro", maVaiTro)
            .input("MaQuyenHan", maQuyenHan)
            .execute("sp_VaiTro_GanQuyen");
    }

    async deletePermission(maVaiTro: number, maQuyenHan: string): Promise<boolean> {
        const pool = this.database.getPool();
        const result =  await pool.request()
            .input("MaVaiTro", maVaiTro)
            .input("MaQuyenHan", maQuyenHan)
            .execute("sp_VaiTro_XoaQuyen");

        return result.rowsAffected[0] > 0;
    }

    async findAllPermissions(): Promise<VaiTroResponseDto[]> {
        const pool = this.database.getPool();
    const result = await pool.request().execute("sp_VaiTro_QuyenHan_GetAll");
        return result.recordset.map((row: any) => new VaiTroResponseDto(
            row.MaVaiTro,
            row.MaQuyenHan,
            row.TenVaiTro,
            row.TenQuyenHan,
            row.MoTa
        ));
    }

    async findPermissionByVaiTroId(maVaiTro: number): Promise<VaiTroResponseDto[]> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input("MaVaiTro", maVaiTro)
            .execute("sp_VaiTro_LayQuyen");

        return result.recordset.map((row: any) => new VaiTroResponseDto(
            row.MaVaiTro,
            row.MaQuyenHan,
            row.TenVaiTro,
            row.TenQuyenHan,
            row.MoTa
        ));
    }
}

export default VaiTroRepository;

