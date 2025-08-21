import {IQuyenHanModel} from "../models/quyenhan.model";

export interface IQuyenHanService {
    getQuyenHans(): Promise<IQuyenHanModel[]>;
    getQuyenHanById(maQuyenHan: string): Promise<IQuyenHanModel>;
}