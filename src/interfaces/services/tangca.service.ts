import {ITangCaModel} from "../models/tangca.model";
import {TangCaResponseDto} from "../../dto/response/tangca.response.dto";

export interface ITangCaService {
    getTangCa(): Promise<TangCaResponseDto[]>;
    createTangCa(tangCaData: ITangCaModel): Promise<void>;
    updateTangCa(tangCaData: ITangCaModel): Promise<void>;
    deleteTangCa(maPhongBan: number, ngayChamCongTangCa: Date): Promise<void>;
}