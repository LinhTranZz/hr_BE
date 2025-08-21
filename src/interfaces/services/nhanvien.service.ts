import {NhanVienDetailResponse, NhanVienResponseDto} from "../../dto/response/nhanvien.response.dto";
import {INhanVienModel} from "../models/nhanvien.model";
import {INhanVienVanTayModel} from "../models/vantay.model";

export interface INhanVienService {
    getAllNhanVien(): Promise<NhanVienResponseDto[]>;
    getAllNhanVienVanTay(maNhanVienIds: Array<number>): Promise<INhanVienVanTayModel[]>;
    getAllNhanVienDetail(): Promise<NhanVienDetailResponse[]>
    getNhanVienVanTay(maNhanVien: number): Promise<INhanVienVanTayModel[]>
    createNhanVien(data: INhanVienModel): Promise<void>;
    updateNhanVien(maNhanVien: number, data: INhanVienModel): Promise<void>;
    updateEmailNhanVien(maNhanVien: number, email: string): Promise<void>;
    deleteNhanVien(maNhanVien: number): Promise<void>;
}