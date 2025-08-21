import {IPhongBanService} from "../interfaces/services/phongban.service";
import PhongBanRepository from "../repositories/phongban.repository";
import {IPhongBanModel} from "../interfaces/models/phongban.model";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import {IDieuChinhNhanSuModel} from "../interfaces/models/dieuchinh.nhansu.model";
import {NhanVienVangByPhongBanResponseDto} from "../dto/response/phongban.response.dto";

@injectable()
class PhongBanService implements IPhongBanService {
    constructor(@inject(TYPES.PhongBanRepository) private readonly phongBanRepository: PhongBanRepository) {}

    async getAll(): Promise<IPhongBanModel[]> {
        return await this.phongBanRepository.findAll();
    }

    async getMoveHistory(): Promise<IDieuChinhNhanSuModel[]> {
        return await this.phongBanRepository.findMoveHistory();
    }

    async getNhanVienVangByPhongBan(ngayHienTai:Date): Promise<NhanVienVangByPhongBanResponseDto[]> {
        const result = await this.phongBanRepository.findNhanVienVangByPhongBan(ngayHienTai);

        return result.map(item => {
            return new NhanVienVangByPhongBanResponseDto(item);
        });
    }

    async createPhongBan(data: IPhongBanModel): Promise<void> {
        await this.phongBanRepository.create(data);
    }

    async deletePhongBan(maPhongBan: number): Promise<void> {
        await this.phongBanRepository.delete(maPhongBan);
    }

    async deleteMoveHistory(maNguoiChinh: number, maNguoiDuocChinh: number, thoiGianThayDoi: Date): Promise<void> {
        await this.phongBanRepository.deleteMoveHistory(maNguoiChinh, maNguoiDuocChinh, thoiGianThayDoi);
    }

    async updatePhongBan(data: IPhongBanModel): Promise<void> {
        await this.phongBanRepository.update(data);
    }

    async moveNhanVien(maNguoiChinh: number, maPhongBan: number, maNhanVien: number): Promise<void> {
        await this.phongBanRepository.moveNhanVien(maNguoiChinh, maPhongBan, maNhanVien);
    }
}
export default PhongBanService;
