import { LichSuThuongResponseDto } from "../../dto/response/lichsuthuong.response.dto";
import { ILichSuThuongModel } from "../models/lichsuthuong.model";

export interface ILichSuThuongService {
    getAllLichSuThuong(): Promise<LichSuThuongResponseDto[]>;
    createLichSuThuong(data: ILichSuThuongModel): Promise<void>;
    updateLichSuThuong(data: ILichSuThuongModel): Promise<void>;
    deleteLichSuThuong(maLoaiTienThuong: number, maNhanVien: number): Promise<void>;
}
