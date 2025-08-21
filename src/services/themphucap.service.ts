import {IThemPhuCapService} from "../interfaces/services/themphucap.service";
import {IThemPhuCapModel} from "../interfaces/models/themphucap.model";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import ThemPhuCapRepository from "../repositories/themphucap.repository";

@injectable()
class ThemPhuCapService implements IThemPhuCapService {

    constructor(@inject(TYPES.ThemPhuCapRepository) private readonly themPhuCapRepository: ThemPhuCapRepository) {
    }

    async createThemPhuCap(themPhuCap: IThemPhuCapModel): Promise<void> {
        await this.themPhuCapRepository.create(themPhuCap);
    }

    deleteThemPhuCap(themPhuCap:IThemPhuCapModel): Promise<boolean> {
        return this.themPhuCapRepository.delete(themPhuCap);
    }

    deleteAllThemPhuCap(maNhanVien: number): Promise<boolean> {
        return this.themPhuCapRepository.deleteAll(maNhanVien);
    }

    getThemPhuCaps(): Promise<IThemPhuCapModel[]> {
        return this.themPhuCapRepository.findAll();
    }

}

export default ThemPhuCapService;