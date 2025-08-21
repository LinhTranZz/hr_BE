import {IPhuCapModel} from "../models/phucap.model";

export interface IPhuCapService {
    getAllPhuCaps(): Promise<IPhuCapModel[]>;
    createPhuCap(phuCap: IPhuCapModel): Promise<void>;
    updatePhuCap(phuCap: IPhuCapModel): Promise<void>;
    deletePhuCap(maPhuCap: number, maVaiTro: number): Promise<boolean>;
}
