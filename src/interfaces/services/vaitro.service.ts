import {IVaiTroModel} from "../models/vaitro.model";
import {VaiTroResponseDto} from "../../dto/response/vaitro.response.dto";

export interface IVaiTroService{
    getAllVaiTro(): Promise<IVaiTroModel[]>;
    // getAllVaiTroByIdPhongBan(maPhongBan: number): Promise<IVaiTroModel[]>;
    createVaiTro(data: IVaiTroModel): Promise<void>;
    deleteVaiTro(maVaiTro: number, currentUser: any): Promise<void>;
    updateVaiTro(data: IVaiTroModel): Promise<void>;
    addPermissionToVaiTro(maVaiTro: number, maQuyenHan: string, currentUser: any): Promise<void>;
    removePermissionFromVaiTro(maVaiTro: number, maQuyenHan: string, currentUser: any): Promise<boolean>;
    getAllPermissions(): Promise<VaiTroResponseDto[]>;
    getPermissionsByVaiTro(maVaiTro: number): Promise<VaiTroResponseDto[]>;
}