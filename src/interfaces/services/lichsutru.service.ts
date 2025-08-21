import { LichSuTruResponseDto } from "../../dto/response/lichsutru.response.dto";
import { ILichSuTruModel } from "../models/lichsutru.model";

export interface ILichSuTruService {
    getAllLichSuTru(): Promise<LichSuTruResponseDto[]>;
    createLichSuTru(data: ILichSuTruModel): Promise<void>;
    updateLichSuTru(data: ILichSuTruModel): Promise<void>;
    deleteLichSuTru(maLoaiTienTru: number, maNhanVien: number): Promise<void>;
}
