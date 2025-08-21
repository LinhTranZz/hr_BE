import {IUuTienModel} from "../models/uutien.model";
import {UuTienResponseDto} from "../../dto/response/uutien.response.dto";

export interface IUuTienService {
    getAllUuTien(): Promise<UuTienResponseDto[]>;
    createUuTien(data: IUuTienModel): Promise<void>;
    updateUuTien(data: IUuTienModel): Promise<void>;
    deleteUuTien(maUuTien: number): Promise<void>;
}
