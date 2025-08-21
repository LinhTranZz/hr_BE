import { ILoaiTienTruService } from "../interfaces/services/loaitientru.service";
import { ILoaiTienTruModel } from "../interfaces/models/loaitientru.model";
import LoaiTienTruRepository from "../repositories/loaitientru.repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";

@injectable()
class LoaiTienTruService implements ILoaiTienTruService {
    constructor(@inject(TYPES.LoaiTienTruRepository) private readonly loaiTienTruRepository: LoaiTienTruRepository) {}

    async getAllLoaiTienTru(): Promise<ILoaiTienTruModel[]> {
        return await this.loaiTienTruRepository.findAll()
    }

    async createLoaiTienTru(data: ILoaiTienTruModel): Promise<void> {
        await this.loaiTienTruRepository.create(data);
    }

    async updateLoaiTienTru(id: number, data: ILoaiTienTruModel): Promise<void> {
        await this.loaiTienTruRepository.update(id, data);
    }

    async deleteLoaiTienTru(id: number): Promise<void> {
        await this.loaiTienTruRepository.delete(id);
    }
}

export default LoaiTienTruService;
