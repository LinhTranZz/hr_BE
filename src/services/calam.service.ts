import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import { ICaLamService } from '../interfaces/services/calam.service';
import { ICaLamModel } from '../interfaces/models/calam.model';
import {CaLamResponseDto} from "../dto/response/calam.response.dto";
import CaLamRepository from '../repositories/calam.repository';

@injectable()
class CaLamService implements ICaLamService{
    constructor(@inject(TYPES.CaLamRepository) private readonly caLamRepository: CaLamRepository) {}

    async getAllCaLams(): Promise<CaLamResponseDto[]> {
        const result = await this.caLamRepository.findAll();

        return result.map(row => new CaLamResponseDto(
            {
                maCa: row.maCa ?? 0,
                tenCa: row.tenCa,
            }
        ));
    }

    async createCaLam(calamData: ICaLamModel): Promise<void> {
        await this.caLamRepository.create(calamData);
    }

    async updateCaLam(id: number, calamData: ICaLamModel): Promise<void> {
        await this.caLamRepository.update(id, calamData);
    }

    async deleteCaLam(id: number): Promise<boolean> {
        return await this.caLamRepository.delete(id);
    }
}

export default CaLamService

