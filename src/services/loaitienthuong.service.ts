import { ILoaiTienThuongService } from "../interfaces/services/loaitienthuong.service";
import { ILoaiTienThuongModel } from "../interfaces/models/loaitienthuong.model";
import LoaiTienThuongRepository from "../repositories/loaitienthuong.repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";

@injectable()
class LoaiTienThuongService implements ILoaiTienThuongService {
    constructor(@inject(TYPES.LoaiTienThuongRepository) private readonly loaiTienThuongRepository: LoaiTienThuongRepository) {}

    async getAllLoaiTienThuong(): Promise<ILoaiTienThuongModel[]> {
        return await this.loaiTienThuongRepository.findAll();
    }

    async createLoaiTienThuong(data: ILoaiTienThuongModel): Promise<void> {
        await this.loaiTienThuongRepository.create(data);
    }

    async updateLoaiTienThuong(id: number, data: ILoaiTienThuongModel): Promise<void> {
        await this.loaiTienThuongRepository.update(id, data);
    }

    async deleteLoaiTienThuong(id: number): Promise<void> {
        await this.loaiTienThuongRepository.delete(id);
    }
}

export default LoaiTienThuongService;
