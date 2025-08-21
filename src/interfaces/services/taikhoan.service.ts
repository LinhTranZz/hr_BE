import { ITaiKhoanModel } from "../models/taikhoan.model";
import {LoginResponseDto} from "../../dto/response/login.response.dto";

export interface ITaiKhoanService {
    getTaiKhoan(): Promise<ITaiKhoanModel[]>
    createTaiKhoan(taiKhoan: ITaiKhoanModel): Promise<void>
    updateTaiKhoan(taiKhoan: ITaiKhoanModel): Promise<void>
    deleteTaiKhoan(maNhanVien: number): Promise<void>
    login(tenDangNhap: string, matKhau: string): Promise<LoginResponseDto>
}