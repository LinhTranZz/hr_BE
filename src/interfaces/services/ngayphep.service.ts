import {INgayPhepModel} from "../models/ngayphep.model";
import {QuyDoiNgayPhepResponseDto} from "../../dto/response/ngayphep.response.dto";

export interface INgayPhepService{
    getAllNgayPhep(): Promise<INgayPhepModel[]>;
    updateNgayPhepByMonth(nam: number, thang: number): Promise<void>;
    updateNgayPhepByYear(nam: number, thang?: number): Promise<void>;
    convertNgayPhepToMoney(maNhanVien: number, nam: number, thang: number): Promise<QuyDoiNgayPhepResponseDto[]>;
}