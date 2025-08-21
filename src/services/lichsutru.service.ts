import { ILichSuTruService } from "../interfaces/services/lichsutru.service";
import { ILichSuTruModel } from "../interfaces/models/lichsutru.model";
import LichSuTruRepository from "../repositories/lichsutru.repository";
import { LichSuTruResponseDto } from "../dto/response/lichsutru.response.dto";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import dayjs from "dayjs";

@injectable()
class LichSuTruService implements ILichSuTruService {
    constructor(@inject(TYPES.LichSuTruRepository) private readonly lichSuTruRepository: LichSuTruRepository) {}

    async getAllLichSuTru(): Promise<LichSuTruResponseDto[]> {
        const result = await this.lichSuTruRepository.findAll();
        return result.map(row => new LichSuTruResponseDto(
            {
                maLoaiTienTru: row.maLoaiTienTru,
                maNhanVien: row.maNhanVien,
                soTienTruKhac: row.soTienTruKhac ?? 0,
                ngayTao: dayjs.utc(row.ngayTao).format('YYYY-MM-DD'),
                liDo: row.liDo
            }
        ));
    }

    async createLichSuTru(data: ILichSuTruModel): Promise<void> {
        await this.lichSuTruRepository.create(data);
    }

    async updateLichSuTru(data: ILichSuTruModel): Promise<void> {
        await this.lichSuTruRepository.update(data);
    }

    async deleteLichSuTru(maLoaiTienTru:number, maNhanVien:number): Promise<void> {
        await this.lichSuTruRepository.delete(maLoaiTienTru, maNhanVien);
    }
}

export default LichSuTruService;
