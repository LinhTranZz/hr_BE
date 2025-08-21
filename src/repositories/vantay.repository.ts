import {IVanTayModel} from "../interfaces/models/vantay.model";
import Database from "../configs/database";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
@injectable()
class VanTayRepository{

    constructor(@inject(TYPES.Database) private readonly database: Database) {}
    async create(data: IVanTayModel): Promise<void> {
        const pool = this.database.getPool();
        await pool.request()
            .input("thoiGian", data.thoiGian)
            .input("maNhanVien", data.maNhanVien)
            .execute("sp_create_duLieuQuetVanTay");
    }
}

export default VanTayRepository;