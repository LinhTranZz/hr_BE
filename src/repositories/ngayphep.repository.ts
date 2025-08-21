import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import Database from "../configs/database";
import {INgayPhepModel} from "../interfaces/models/ngayphep.model";
import {QuyDoiNgayPhepResponseDto} from "../dto/response/ngayphep.response.dto";

@injectable()
class NgayPhepRepository{

    constructor(@inject(TYPES.Database) private  readonly database: Database) {
    }
    async findAll(): Promise<INgayPhepModel[]> {
        const pool = this.database.getPool();
        return await pool.request()
            .execute("sp_read_ngayphep")
            .then(result => result.recordset.map((row: any) => {
                return {
                    maNhanVien: row.MaNhanVien,
                    nam: row.Nam,
                    thang1: row.Thang1,
                    thang2: row.Thang2,
                    thang3: row.Thang3,
                    thang4: row.Thang4,
                    thang5: row.Thang5,
                    thang6: row.Thang6,
                    thang7: row.Thang7,
                    thang8: row.Thang8,
                    thang9: row.Thang9,
                    thang10: row.Thang10,
                    thang11: row.Thang11,
                    thang12: row.Thang12,
                    ngayPhepTichLuy: row.NgayPhepTichLuy,
                    ngayPhepDaSuDung: row.NgayPhepDaSuDung,
                    ngayPhepConLai: row.NgayPhepConLai,
                    ngayCapNhat: row.NgayCapNhat ? new Date(row.NgayCapNhat) : null
                } as INgayPhepModel;
            }));
    }

    async convertToMoney(maNhanVien: number, nam: number, thang: number): Promise<QuyDoiNgayPhepResponseDto[]> {
        const pool = this.database.getPool();
        const result = await pool.request()
            .input("MaNhanVien", maNhanVien)
            .input("Nam", nam)
            .input("Thang", thang)
            .query("SELECT * FROM dbo.fc_quydoi_phep(@Nam, @Thang, @MaNhanVien)");

        return result.recordset.map((row: any) => {
            return new QuyDoiNgayPhepResponseDto({
                maNhanVien: row.MaNhanVien,
                nam: row.Nam,
                thang: row.Thang,
                soNgayPhepSuDung: row.SoNgayPhepSuDung,
                soNgayPhepTichLuy: row.SoNgayPhepTichLuy,
                tongSoNgayPhep: row.TongSoNgayPhep,
                soTienQuyDoi: row.SoTienQuyDoi,
            });
        });
    }

    async updateByMonth(mam: number, thang: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("Nam", mam)
            .input("Thang", thang)
            .execute("sp_CapNhatNgayPhep_Cursor");
    }

    async updateByYear(mam: number, thang?: number): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("Nam", mam)
            .input("Thang", thang ?? null)
            .execute("sp_CapNhatToanBoNgayPhep");
    }
}

export default NgayPhepRepository;