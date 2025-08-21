// filepath: C:\Users\Administrator\Documents\workspace\PMChamCong-BE\src\services\ngayle.service.ts
import { INgayLeService } from "../interfaces/services/ngayle.service";
import { INgayLeModel } from "../interfaces/models/ngayle.model";
import NgayLeRepository from "../repositories/ngayle.repository";
import { NgayLeResponseDto } from "../dto/response/ngayle.response.dto";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import dayjs from "dayjs";

@injectable()
class NgayLeService implements INgayLeService {
    constructor(@inject(TYPES.NgayLeRepository) private readonly ngayLeRepository: NgayLeRepository) {}

    async getAllNgayLe(): Promise<NgayLeResponseDto[]> {
        const result = await this.ngayLeRepository.findAll();
        return result.map(row => new NgayLeResponseDto(
            {
                maNgayLe: row.maNgayLe ?? 0,
                tenNgayLe: row.tenNgayLe,
                ngayBatDau: dayjs(row.ngayBatDau).format('YYYY-MM-DD'),
                ngayKetThuc: dayjs(row.ngayKetThuc).format('YYYY-MM-DD'),
                soNgayNghi: row.soNgayNghi ?? 0
            }
        ));
    }

    async createNgayLe(data: INgayLeModel): Promise<void> {
        await this.ngayLeRepository.create(data);
    }

    async updateNgayLe(id: number, data: INgayLeModel): Promise<void> {
        await this.ngayLeRepository.update(id, data);
    }

    async deleteNgayLe(id: number): Promise<void> {
        await this.ngayLeRepository.delete(id);
    }
}

export default NgayLeService;
