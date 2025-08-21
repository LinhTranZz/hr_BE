import {ICaLamTrongTuanModel} from "../models/calam.trongtuan.model";
import {CaLamTrongTuanResponseDto} from "../../dto/response/calam.response.dto";

export interface ICaLamTrongTuanService{
    getAllCaLamTrongTuan(): Promise<CaLamTrongTuanResponseDto[]>;
    getCaLamTrongTuan(maCa: number): Promise<CaLamTrongTuanResponseDto[]>;
    createCaLamTrongTuan(data: ICaLamTrongTuanModel): Promise<void>;
    updateCaLamTrongTuan(data: ICaLamTrongTuanModel): Promise<void>;
    deleteCaLamTrongTuan(maCa: number, ngayTrongTuan: number): Promise<boolean>;
}