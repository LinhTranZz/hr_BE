import {IQuyenHanService} from "../interfaces/services/quyenhan.service";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import QuyenHanRepository from "../repositories/quyenhan.repository";
import {IQuyenHanModel} from "../interfaces/models/quyenhan.model";

@injectable()
class QuyenHanService implements IQuyenHanService {
    constructor(@inject(TYPES.QuyenHanRepository) private readonly quyenHanRepository: QuyenHanRepository) {
    }

    async getQuyenHans(): Promise<IQuyenHanModel[]> {
        return await this.quyenHanRepository.getAllQuyenHan();
    }

    async getQuyenHanById(maQuyenHan: string): Promise<IQuyenHanModel> {
        return await this.quyenHanRepository.getQuyenHanById(maQuyenHan);
    }

}

export default QuyenHanService;