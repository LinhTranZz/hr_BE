import {ILuongModel} from "../models/luong.model";
import {IDieuChinhLuongModel} from "../models/dieuchinh.luong.model";

export interface ILuongService {
    getLuong(): Promise<ILuongModel[]>
    getLuongHistory(maNhanVien: number): Promise<IDieuChinhLuongModel[]>
    createLuong(nam: number, thang: number): Promise<void>
    createEmployeeSalary(maNhanVien: number, nam: number, thang: number): Promise<void>
    updateLuongTienThuong(maNhanVien: number, nam: number, thang: number, tienThuong: number): Promise<void>
    updateLuong(maNguoiChinh: number, maNhanVien: number, luongMoi: number): Promise<void>
    deleteLuong(maNhanVien: number, thang: number, nam: number): Promise<boolean>
    deleteLuongHistory(maNguoiChinh: number, maNguoiDuocChinh: number, thoiGianThayDoi: Date): Promise<boolean>
}
