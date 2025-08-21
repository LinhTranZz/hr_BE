import {IPhongBanModel} from "../models/phongban.model";
import {IDieuChinhNhanSuModel} from "../models/dieuchinh.nhansu.model";
import {NhanVienVangByPhongBanResponseDto} from "../../dto/response/phongban.response.dto";

export interface IPhongBanService {
    getAll(): Promise<IPhongBanModel[]>;
    getMoveHistory(): Promise<IDieuChinhNhanSuModel[]>;
    getNhanVienVangByPhongBan(ngayHienTai: Date): Promise<NhanVienVangByPhongBanResponseDto[]>;
    createPhongBan(data: IPhongBanModel): Promise<void>;
    deletePhongBan(maPhongBan: number): Promise<void>;
    deleteMoveHistory(maNguoiChinh: number, maNguoiDuocChinh: number, thoiGianThayDoi: Date): Promise<void>;
    updatePhongBan(data: IPhongBanModel): Promise<void>;
    moveNhanVien(maNguoiChinh: number, maPhongBan: number, maNhanVien: number): Promise<void>;
}