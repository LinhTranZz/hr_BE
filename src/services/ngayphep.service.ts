import {INgayPhepService} from "../interfaces/services/ngayphep.service";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import NgayPhepRepository from "../repositories/ngayphep.repository";
import {QuyDoiNgayPhepResponseDto} from "../dto/response/ngayphep.response.dto";

@injectable()
class NgayPhepService implements INgayPhepService{

    constructor(@inject(TYPES.NgayPhepRepository) private readonly ngayPhepRepository: NgayPhepRepository,) {
    }

    async getAllNgayPhep(): Promise<any[]> {
        return await this.ngayPhepRepository.findAll();
    }
    async updateNgayPhepByMonth(nam: number, thang: number): Promise<void> {
        await this.ngayPhepRepository.updateByMonth(nam, thang);
    }

    async updateNgayPhepByYear(nam: number, thang?: number): Promise<void> {
        await this.ngayPhepRepository.updateByYear(nam, thang);
    }

    async convertNgayPhepToMoney(maNhanVien:number, nam:number, thang:number) : Promise<QuyDoiNgayPhepResponseDto[]> {
        return await this.ngayPhepRepository.convertToMoney(maNhanVien, nam, thang);
    }
}

export default NgayPhepService;

