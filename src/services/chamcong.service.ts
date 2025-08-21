import {IChamCongService} from "../interfaces/services/chamcong.service";
import ChamCongRepository from "../repositories/chamcong.repository";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import {ChamCongResponseDetailDto, ChamCongResponseDto} from "../dto/response/chamcong.response.dto";
import dayjs from "dayjs";

@injectable()
class ChamCongService implements IChamCongService{

    constructor(@inject(TYPES.ChamCongRepository) private readonly chamCongRepository: ChamCongRepository) { }

    async getChamCong(): Promise<ChamCongResponseDto[]> {
        const result = await this.chamCongRepository.findAll();
        return result.map(row => new ChamCongResponseDto(
            {
                ngayChamCong: dayjs.utc(row.ngayChamCong).format('DD/MM/YYYY'),
                maNhanVien: row.maNhanVien,
                cong: row.cong ?? 0,
                thoiGianVao: dayjs.utc(row.thoiGianVao).format('HH:mm:ss'),
                thoiGianRa: dayjs.utc(row.thoiGianRa).format('HH:mm:ss'),
                soGioThucTe: row.soGioThucTe ?? 0,
                trangThai: row.trangThai ?? "",
            }
        ));
    }
    async getChamCongDetail():Promise<ChamCongResponseDetailDto[]>{
        const result =  await this.chamCongRepository.findAllDetail()
        return result.map( row => new ChamCongResponseDetailDto({
            ngayChamCong: dayjs.utc(row.ngayChamCong).format('YYYY-MM-DD'),
            maNhanVien: row.maNhanVien,
            thoiGianVao: dayjs.utc(row.thoiGianVao).format('HH:mm:ss'),
            thoiGianRa: dayjs.utc(row.thoiGianRa).format('HH:mm:ss'),
            soGioThucTe: row.soGioThucTe,
            trangThai: row.trangThai,
            maPhongBan: row.maPhongBan,
            hoTen: row.hoTen,
            cong: row.cong,
            tenPhongBan: row.tenPhongBan,
        }))
    }
}

export default ChamCongService;