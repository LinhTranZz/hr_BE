import {NgayNghiResponseDto} from "../../dto/response/ngaynghi.response.dto";
import {INgayNghiModel} from "../models/ngaynghi.model";

export interface INgayNghiService {
    getNgayNghi(): Promise<NgayNghiResponseDto[]>;
    createNgayNghi(data: INgayNghiModel): Promise<void>;
    updateNgayNghi(maNghiPhep: number, data: INgayNghiModel): Promise<void>;
    deleteNgayNghi(maNghiPhep: number): Promise<void>;
}