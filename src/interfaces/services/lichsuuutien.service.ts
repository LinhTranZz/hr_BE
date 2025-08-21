import { LichSuUuTienResponseDto } from "../../dto/response/lichsuuutien.response.dto";
import { ILichSuUuTienModel } from "../models/lichsuuutien.model";

export interface ILichSuUuTienService {
    getAllLichSuUuTien(): Promise<LichSuUuTienResponseDto[]>;
    createLichSuUuTien(data: ILichSuUuTienModel): Promise<void>;
    updateLichSuUuTien(data: ILichSuUuTienModel): Promise<void>;
    deleteLichSuUuTien(maUuTien: number, maNhanVien: number): Promise<void>;
}
