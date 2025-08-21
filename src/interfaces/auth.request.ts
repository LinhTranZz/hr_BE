import { Request } from 'express';

export interface AuthenticatedUser {
    maNhanVien: number;
    tenDangNhap: string;
    maVaiTro: number;
}

export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}
