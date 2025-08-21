import { NgayLeResponseDto } from "../../dto/response/ngayle.response.dto";
import { INgayLeModel } from "../models/ngayle.model";

export interface INgayLeService {
    getAllNgayLe(): Promise<NgayLeResponseDto[]>;
    createNgayLe(data: INgayLeModel): Promise<void>;
    updateNgayLe(id: number, data: INgayLeModel): Promise<void>;
    deleteNgayLe(id: number): Promise<void>;
}
