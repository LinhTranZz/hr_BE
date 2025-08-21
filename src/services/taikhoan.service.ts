import { ITaiKhoanModel } from "../interfaces/models/taikhoan.model";
import { ITaiKhoanService } from "../interfaces/services/taikhoan.service";
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import TaiKhoanRepository from "../repositories/taikhoan.repository";
import PasswordUtils from "../utils/password.utils";
import JwtUtils from "../utils/jwt.utils";
import { LoginResponseDto } from "../dto/response/login.response.dto";
import VaiTroRepository from "../repositories/vaitro.repository";

@injectable()
class TaiKhoanService implements ITaiKhoanService {

    constructor(@inject(TYPES.TaiKhoanRepository) private readonly taiKhoanRepository: TaiKhoanRepository,
                @inject(TYPES.VaiTroRepository) private readonly vaiTroRepository: VaiTroRepository
                ) {}

    async getTaiKhoan(): Promise<ITaiKhoanModel[]> {
        return await this.taiKhoanRepository.findAll();
    }

    async createTaiKhoan(taiKhoan: ITaiKhoanModel): Promise<void> {
        const hashedPassword = await PasswordUtils.hashPassword(taiKhoan.matKhau!);

        const taiKhoanWithHashedPassword: ITaiKhoanModel = {
            ...taiKhoan,
            matKhau: hashedPassword
        };

        await this.taiKhoanRepository.create(taiKhoanWithHashedPassword);
    }

    async updateTaiKhoan(taiKhoan: ITaiKhoanModel): Promise<void> {
        let finalPassword = taiKhoan.matKhau;

        // If password is provided and not empty, hash it. Otherwise, keep the existing password
        if (taiKhoan.matKhau && taiKhoan.matKhau.trim() !== '') {
            finalPassword = await PasswordUtils.hashPassword(taiKhoan.matKhau);
        } else {
            // Get the existing password from database
            const existingTaiKhoan = await this.taiKhoanRepository.findByMaNhanVien(taiKhoan.maNhanVien);
            if (!existingTaiKhoan) {
                throw new Error("Tài khoản không tồn tại");
            }
            finalPassword = existingTaiKhoan.matKhau;
        }

        // Create a new object with the final password
        const taiKhoanToUpdate = {
            ...taiKhoan,
            matKhau: finalPassword
        };

        await this.taiKhoanRepository.update(taiKhoanToUpdate);
    }

    async deleteTaiKhoan(maNhanVien: number): Promise<void> {
        await this.taiKhoanRepository.delete(maNhanVien);
    }

    async login(tenDangNhap: string, matKhau: string): Promise<LoginResponseDto> {
        const taiKhoan = await this.taiKhoanRepository.findByUsername(tenDangNhap);
        if (!taiKhoan || taiKhoan.tenDangNhap !== tenDangNhap) {
            throw new Error("Invalid username");
        }

        const isPasswordValid = await PasswordUtils.comparePassword(matKhau, taiKhoan.matKhau);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const permissions = await this.vaiTroRepository.findPermissionByVaiTroId(taiKhoan.maVaiTro);

        const permissionCodes = permissions.map(permission => permission.maQuyenHan.toString());

        const token = JwtUtils.generateToken({
            maNhanVien: taiKhoan.maNhanVien,
            tenDangNhap: taiKhoan.tenDangNhap,
            maVaiTro: taiKhoan.maVaiTro,
        });

        const { matKhau: _, ...taiKhoanKhongMatKhau } = taiKhoan;

        return new LoginResponseDto(token, taiKhoanKhongMatKhau, permissionCodes);
    }
}

export default TaiKhoanService;
