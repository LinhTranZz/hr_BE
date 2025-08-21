import { ICaLamModel } from "../models/calam.model";
import {CaLamResponseDto} from "../../dto/response/calam.response.dto";

export interface ICaLamService {
    getAllCaLams(): Promise<CaLamResponseDto[]>;
    createCaLam(caLamData: ICaLamModel): Promise<void>;
    updateCaLam(id: number, caLamData: ICaLamModel): Promise<void>;
    deleteCaLam(id: number): Promise<boolean>;
} 