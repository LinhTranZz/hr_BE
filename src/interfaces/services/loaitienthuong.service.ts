import { ILoaiTienThuongModel } from "../models/loaitienthuong.model";

export interface ILoaiTienThuongService {
    getAllLoaiTienThuong(): Promise<ILoaiTienThuongModel[]>;
    createLoaiTienThuong(data: ILoaiTienThuongModel): Promise<void>;
    updateLoaiTienThuong(id: number, data: ILoaiTienThuongModel): Promise<void>;
    deleteLoaiTienThuong(id: number): Promise<void>;
}
