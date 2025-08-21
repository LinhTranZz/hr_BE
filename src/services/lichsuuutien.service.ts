import { ILichSuUuTienService } from "../interfaces/services/lichsuuutien.service";
import { ILichSuUuTienModel } from "../interfaces/models/lichsuuutien.model";
import LichSuUuTienRepository from "../repositories/lichsuuutien.repository";
import { LichSuUuTienResponseDto } from "../dto/response/lichsuuutien.response.dto";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import dayjs from "dayjs";

@injectable()
class LichSuUuTienService implements ILichSuUuTienService {
    constructor(@inject(TYPES.LichSuUuTienRepository) private readonly lichSuUuTienRepository: LichSuUuTienRepository) {}

    async getAllLichSuUuTien(): Promise<LichSuUuTienResponseDto[]> {
        const result = await this.lichSuUuTienRepository.findAll();
        return result.map(row => new LichSuUuTienResponseDto(
            {
                maUuTien: row.maUuTien,
                maNhanVien: row.maNhanVien,
                thoiGianHieuLucBatDau: dayjs.utc(row.thoiGianHieuLucBatDau).format('DD/MM/YYYY'),
                thoiGianHieuLucKetThuc: dayjs.utc(row.thoiGianHieuLucKetThuc).format('DD/MM/YYYY')
            }
        ));
    }

    async createLichSuUuTien(data: ILichSuUuTienModel): Promise<void> {
        await this.lichSuUuTienRepository.create(data);
    }

    async updateLichSuUuTien(data: ILichSuUuTienModel): Promise<void> {
        await this.lichSuUuTienRepository.update(data);
    }

    async deleteLichSuUuTien(maUuTien:number, maNhanVien:number): Promise<void> {
        await this.lichSuUuTienRepository.delete(maUuTien, maNhanVien);
    }
}

export default LichSuUuTienService;
