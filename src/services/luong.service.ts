import { ILuongModel } from "../interfaces/models/luong.model";
import {ILuongService} from "../interfaces/services/luong.service";
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import LuongRepository from "../repositories/luong.repository";
import {IDieuChinhLuongModel} from "../interfaces/models/dieuchinh.luong.model";

@injectable()
class LuongService implements ILuongService {

    constructor(@inject(TYPES.LuongRepository)private readonly luongRepository: LuongRepository) {
    }

    async getLuong(): Promise<ILuongModel[]> {
        return await this.luongRepository.findAll()
    }

    async getLuongHistory(): Promise<IDieuChinhLuongModel[]> {
        return await this.luongRepository.findLuongHistory()
    }

    async createLuong(nam:number, thang:number): Promise<void> {
        await this.luongRepository.create(nam, thang)
    }

    async createEmployeeSalary(maNhanVien: number, nam: number, thang: number): Promise<void> {
        await this.luongRepository.createEmployeeSalary(maNhanVien, nam, thang);
    }

    async updateLuongTienThuong(maNhanVien: number, nam: number, thang: number, tienThuong: number): Promise<void> {
        await this.luongRepository.updateTienThuong(maNhanVien, nam, thang, tienThuong)
    }

    async updateLuong(maNguoiChinh: number, maNhanVien: number, luongMoi: number): Promise<void> {
        await this.luongRepository.update(maNguoiChinh, maNhanVien, luongMoi)
    }

    async deleteLuong(maNhanVien: number, thang: number, nam: number): Promise<boolean> {
        return await this.luongRepository.delete(maNhanVien, nam, thang)
    }

    async deleteLuongHistory(maNguoiChinh: number, maNguoiDuocChinh: number, thoiGianThayDoi: Date): Promise<boolean> {
        return await this.luongRepository.deleteLuongHistory(maNguoiChinh, maNguoiDuocChinh, thoiGianThayDoi)
    }

}
export default LuongService;