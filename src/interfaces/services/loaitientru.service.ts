import { ILoaiTienTruModel } from "../models/loaitientru.model";

export interface ILoaiTienTruService {
    getAllLoaiTienTru(): Promise<ILoaiTienTruModel[]>;
    createLoaiTienTru(data: ILoaiTienTruModel): Promise<void>;
    updateLoaiTienTru(id: number, data: ILoaiTienTruModel): Promise<void>;
    deleteLoaiTienTru(id: number): Promise<void>;
}
