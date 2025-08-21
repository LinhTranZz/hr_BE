import {ITaiKhoanModel} from "../../interfaces/models/taikhoan.model";

export class LoginResponseDto{
    token: string;
    taiKhoan: ITaiKhoanModel
    permissions: string[] = [];
    constructor(token: string, taiKhoan: ITaiKhoanModel, permissions: string[] = []) {
        this.token = token;
        this.taiKhoan = taiKhoan;
        this.permissions = permissions;
    }
}