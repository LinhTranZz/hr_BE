import {IHeThongService} from "../interfaces/services/hethong.service";
import {IHeThongModel} from "../interfaces/models/hethong.model";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import HeThongRepository from "../repositories/hethong.repository";
import {HeThongResponseDto} from "../dto/response/hethong.response.dto";
import dayjs from "dayjs";

@injectable()
class HeThongService implements IHeThongService {

    constructor(@inject(TYPES.HeThongRepository) private readonly heThongRepository: HeThongRepository) {
    }

    async getHeThong(): Promise<HeThongResponseDto[]> {
        const result = await this.heThongRepository.findAll();
        return result.map(item => new HeThongResponseDto({
            congNgayChuNhat: item.congNgayChuNhat,
            khoangCachGiuaCacLanChamCong: dayjs.utc(item.khoangCachGiuaCacLanChamCong).format("HH:mm:ss"),
            nguongThoiGianPheDuyetNgayNghi: item.nguongThoiGianPheDuyetNgayNghi,
            soNgayPhepTrongNam: item.soNgayPhepTrongNam
        }));
    }

    async updateHeThong(data: IHeThongModel): Promise<void> {
        await this.heThongRepository.update(data);
    }
}

export default HeThongService;