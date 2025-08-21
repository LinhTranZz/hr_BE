import {ITangCaService} from "../interfaces/services/tangca.service";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import TangCaRepository from "../repositories/tangca.repository";
import {ITangCaModel} from "../interfaces/models/tangca.model";
import {TangCaResponseDto} from "../dto/response/tangca.response.dto";
import dayjs from "dayjs";

@injectable()
class TangCaService implements ITangCaService{

    constructor(@inject(TYPES.TangCaRepository) private readonly tangCaRepository: TangCaRepository) {
    }

    async getTangCa(): Promise<TangCaResponseDto[]> {
        const result = await this.tangCaRepository.findAll();
        return result.map(tangca => new TangCaResponseDto({
            ngayChamCongTangCa: dayjs(tangca.ngayChamCongTangCa).format('YYYY-MM-DD'),
            maPhongBan: tangca.maPhongBan,
            gioTangCaBatDau: dayjs.utc(tangca.gioTangCaBatDau).format('HH:mm:ss'),
            gioTangCaKetThuc: dayjs.utc(tangca.gioTangCaKetThuc).format('HH:mm:ss'),
        }));
    }

    async createTangCa(tangCa: ITangCaModel): Promise<void> {
        await this.tangCaRepository.create(tangCa);
    }

    async updateTangCa(tangCa: ITangCaModel): Promise<void> {
        await this.tangCaRepository.update(tangCa);
    }

    async deleteTangCa(maPhongBan: number, ngayChamCongTangCa: Date): Promise<void> {
        await this.tangCaRepository.delete(maPhongBan, ngayChamCongTangCa);
    }
}

export default TangCaService;