import {INgayNghiService} from "../interfaces/services/ngaynghi.service";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import NgayNghiRepository from "../repositories/ngaynghi.repository";
import {NgayNghiResponseDto} from "../dto/response/ngaynghi.response.dto";
import {INgayNghiModel} from "../interfaces/models/ngaynghi.model";
import dayjs from "dayjs";

@injectable()
class NgayNghiService implements INgayNghiService {
    constructor(@inject(TYPES.NgayNghiRepository) private readonly ngayNghiRepository: NgayNghiRepository) {
    }

    async getNgayNghi(): Promise<NgayNghiResponseDto[]> {
        const result = await this.ngayNghiRepository.findAll();
        return result.map(row => new NgayNghiResponseDto({
            maNghiPhep: row.maNghiPhep ?? 0,
            maNhanVien: row.maNhanVien,
            ngayBatDau: dayjs.utc(row.ngayBatDau).format('DD/MM/YYYY HH:mm:ss'),
            ngayKetThuc: dayjs.utc(row.ngayKetThuc).format('DD/MM/YYYY HH:mm:ss'),
            liDo: row.liDo,
            trangThaiPheDuyet: row.trangThaiPheDuyet,
            tinhLuong: row.tinhLuong,
            tinhPhep: row.tinhPhep
        }));
    }
    async createNgayNghi(data:INgayNghiModel): Promise<void> {
        await this.ngayNghiRepository.create(data)
    }
    async updateNgayNghi(maNghiPhep:number, data:INgayNghiModel): Promise<void> {
        await this.ngayNghiRepository.update(maNghiPhep, data)
    }
    async deleteNgayNghi(maNghiPhep:number): Promise<void> {
        await this.ngayNghiRepository.delete(maNghiPhep)
    }
}

export default NgayNghiService;

