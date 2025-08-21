import { ILichSuThuongService } from "../interfaces/services/lichsuthuong.service";
import { ILichSuThuongModel } from "../interfaces/models/lichsuthuong.model";
import LichSuThuongRepository from "../repositories/lichsuthuong.repository";
import { LichSuThuongResponseDto } from "../dto/response/lichsuthuong.response.dto";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import dayjs from "dayjs";

@injectable()
class LichSuThuongService implements ILichSuThuongService {
    constructor(@inject(TYPES.LichSuThuongRepository) private readonly lichSuThuongRepository: LichSuThuongRepository) {}

    async getAllLichSuThuong(): Promise<LichSuThuongResponseDto[]> {
        const result = await this.lichSuThuongRepository.findAll();
        return result.map(row => new LichSuThuongResponseDto(
            {
                maLoaiTienThuong:row.maLoaiTienThuong,
                maNhanVien: row.maNhanVien,
                soTienThuongKhac: row.soTienThuongKhac ?? 0,
                ngayTao: dayjs(row.ngayTao).format('YYYY-MM-DD'),
                lyDo: row.lyDo
            }
        ));
    }

    async createLichSuThuong(data: ILichSuThuongModel): Promise<void> {
        await this.lichSuThuongRepository.create(data);
    }

    async updateLichSuThuong(data: ILichSuThuongModel): Promise<void> {
        await this.lichSuThuongRepository.update(data);
    }

    async deleteLichSuThuong(maLoaiTienThuong:number, maNhanVien:number): Promise<void> {
        await this.lichSuThuongRepository.delete(maLoaiTienThuong, maNhanVien);
    }
}

export default LichSuThuongService;
