import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import {IUuTienService} from "../interfaces/services/uutien.service";
import {IUuTienModel} from "../interfaces/models/uutien.model";
import UuTienRepository from "../repositories/uutien.repository";
import dayjs from "dayjs";
import {UuTienResponseDto} from "../dto/response/uutien.response.dto";

@injectable()
class UutTienService implements IUuTienService {
    constructor(@inject(TYPES.UuTienRepository) private readonly uuTienRepository: UuTienRepository) {}

    async getAllUuTien(): Promise<UuTienResponseDto[]> {
        const result = await this.uuTienRepository.findAll();

        return result.map(row => new UuTienResponseDto(
            {
                maUuTien: row.maUuTien ?? 0,
                tenUuTien: row.tenUuTien,
                thoiGianBatDauCa: dayjs.utc(row.thoiGianBatDauCa).format("HH:mm:ss"),
                thoiGianKetThucCa: dayjs.utc(row.thoiGianKetThucCa).format("HH:mm:ss"),
                thoiGianHieuLuc: row.thoiGianHieuLuc ?? 0,
            }
        ));

    }

    async createUuTien(data: IUuTienModel): Promise<void> {
        await this.uuTienRepository.create(data);
    }

    async updateUuTien(data: IUuTienModel): Promise<void> {
        await this.uuTienRepository.update(data);
    }

    async deleteUuTien(maUuTien: number): Promise<void> {
        await this.uuTienRepository.delete(maUuTien);
    }
}

export default UutTienService
