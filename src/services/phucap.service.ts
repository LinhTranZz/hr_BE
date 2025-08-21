import {IPhuCapService} from "../interfaces/services/phucap.service";
import {IPhuCapModel} from "../interfaces/models/phucap.model";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import PhuCapRepository from "../repositories/phucap.repository";

@injectable()
class PhuCapService implements IPhuCapService {

    constructor(@inject(TYPES.PhuCapRepository) private readonly phuCapRepository: PhuCapRepository) {
    }

    async createPhuCap(phuCap: IPhuCapModel): Promise<void> {
        await this.phuCapRepository.create(phuCap);
    }

    async deletePhuCap(maPhuCap: number, maVaiTro: number): Promise<boolean> {
      return await this.phuCapRepository.delete(maPhuCap, maVaiTro);
    }

    async getAllPhuCaps(): Promise<IPhuCapModel[]> {
        return await this.phuCapRepository.findAll()
    }

    async updatePhuCap(phuCap: IPhuCapModel): Promise<void> {
        await this.phuCapRepository.update(phuCap);
    }
}

export default PhuCapService;