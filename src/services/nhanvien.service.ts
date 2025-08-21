import { INhanVienService } from "../interfaces/services/nhanvien.service";
import { INhanVienModel } from "../interfaces/models/nhanvien.model";
import NhanVienRepository from "../repositories/nhanvien.repository";
import dayjs from "dayjs";
import { NhanVienDetailResponse, NhanVienGiayNghiPhepResponseDto, NhanVienResponseDto } from "../dto/response/nhanvien.response.dto";
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import { INhanVienVanTayModel } from "../interfaces/models/vantay.model";

@injectable()
class NhanVienService implements INhanVienService {
    constructor(@inject(TYPES.NhanVienRepository) private readonly nhanVienRepository: NhanVienRepository) { }

    async getAllNhanVien(): Promise<NhanVienResponseDto[]> {
        const result = await this.nhanVienRepository.findAll();
        return result.map(row => new NhanVienResponseDto({
            maNhanVien: row.maNhanVien ?? 0,
            hoTen: row.hoTen ?? '',
            ngaySinh: dayjs(row.ngaySinh).format('YYYY-MM-DD'),
            soDienThoai: row.soDienThoai ?? '',
            cmnd: row.cmnd ?? '',
            diaChi: row.diaChi ?? '',
            ngayVaoLam: dayjs(row.ngayVaoLam).format('YYYY-MM-DD'),
            luongCoBan: row.luongCoBan ?? 0,
            trangThai: row.trangThai ?? '',
            maVaiTro: row.maVaiTro ?? 0,
            maPhongBan: row.maPhongBan ?? 0,
            maUuTien: row.maUuTien ?? 0,
            heSoTangCa: row.heSoTangCa ?? 0,
            email: row.email ?? ''
        }));
    }
    async getAllNhanVienVanTay(maNhanVienIds: Array<number>): Promise<INhanVienVanTayModel[]> {
        const vanTayData: INhanVienVanTayModel[] = [];

        for (const id of maNhanVienIds) {
            if (id <= 0) {
                throw new Error(`Invalid maNhanVien: ${id}`);
            }
            const result = await this.nhanVienRepository.findAllVanTay(id);
            vanTayData.push(...result);
        }

        return vanTayData;
    }
    async getAllNhanVienDetail(): Promise<NhanVienDetailResponse[]> {
        const result = await this.nhanVienRepository.findAllDetail();
        return result.map(row => new NhanVienDetailResponse({
            maNhanVien: row.maNhanVien ?? 0,
            hoTen: row.hoTen ?? '',
            ngaySinh: dayjs(row.ngaySinh).format('YYYY-MM-DD'),
            soDienThoai: row.soDienThoai ?? '',
            cmnd: row.cmnd ?? '',
            diaChi: row.diaChi ?? '',
            ngayVaoLam: dayjs(row.ngayVaoLam).format('YYYY-MM-DD'),
            luongCoBan: row.luongCoBan ?? 0,
            trangThai: row.trangThai ?? '',
            maVaiTro: row.maVaiTro ?? 0,
            maPhongBan: row.maPhongBan ?? 0,
            maUuTien: row.maUuTien ?? 0,
            heSoTangCa: row.heSoTangCa ?? 0,
            tenPhongBan: row.tenPhongBan ?? '',
            tenVaiTro: row.tenVaiTro ?? '',
            tenUuTien: row.tenUuTien ?? '',
            email: row.email ?? ''
        }));
    }
    async getNhanVienVanTay(maNhanVien: number): Promise<INhanVienVanTayModel[]> {
        return await this.nhanVienRepository.findAllVanTay(maNhanVien);
    }
    async getNhanVienById(maNhanVien: number): Promise<NhanVienResponseDto | null> {
        const result = await this.nhanVienRepository.findById(maNhanVien);
        if (!result) {
            return null;
        }
        return new NhanVienResponseDto({
            maNhanVien: result.maNhanVien ?? 0,
            hoTen: result.hoTen ?? '',
            ngaySinh: dayjs(result.ngaySinh).format('YYYY-MM-DD'),
            soDienThoai: result.soDienThoai ?? '',
            cmnd: result.cmnd ?? '',
            diaChi: result.diaChi ?? '',
            ngayVaoLam: dayjs(result.ngayVaoLam).format('YYYY-MM-DD'),
            luongCoBan: result.luongCoBan ?? 0,
            trangThai: result.trangThai ?? '',
            maVaiTro: result.maVaiTro ?? 0,
            maPhongBan: result.maPhongBan ?? 0,
            maUuTien: result.maUuTien ?? 0,
            heSoTangCa: result.heSoTangCa ?? 0,
            email: result.email ?? ''

        });
    }

    async getNhanVienByCCCD(CMND: number): Promise<NhanVienGiayNghiPhepResponseDto | null> {
        const result = await this.nhanVienRepository.findByCCCD(CMND);
        if (!result) {
            return null;
        }
        return new NhanVienGiayNghiPhepResponseDto({
            maNhanVien: result.maNhanVien ?? 0,
            hoTen: result.hoTen ?? '',
            email: result.email ?? ''
        });
    }
    async createNhanVien(data: INhanVienModel): Promise<void> {
        await this.nhanVienRepository.create(data);
    }
    async updateNhanVien(maNhanVien: number, data: INhanVienModel): Promise<void> {
        await this.nhanVienRepository.update(maNhanVien, data);
    }

    async updateEmailNhanVien(maNhanVien: number, email: string): Promise<void> {
        await this.nhanVienRepository.updateEmail(maNhanVien, email);
    }

    async deleteNhanVien(maNhanVien: number): Promise<void> {
        await this.nhanVienRepository.delete(maNhanVien);
    }
    async reloadTrangThaiNhanVien(): Promise<void> {
        await this.nhanVienRepository.reloadTrangThaiNhanVien();
    }
}

export default NhanVienService
