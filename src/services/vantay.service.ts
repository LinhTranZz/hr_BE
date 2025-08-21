import {IVanTayService} from "../interfaces/services/vantay.service";
import {IVanTayModel} from "../interfaces/models/vantay.model";
import {inject, injectable} from "inversify";
import VanTayRepository from "../repositories/vantay.repository";
import {TYPES} from "../configs/types";
@injectable()
class VanTayService implements IVanTayService{

    constructor(@inject(TYPES.VanTayRepository) private readonly vanTayRepository: VanTayRepository) { }

    async createVanTayData(data: IVanTayModel): Promise<void> {
        await this.vanTayRepository.create(data);
    }

}

export default VanTayService;