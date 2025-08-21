import { Request, Response } from 'express';
import BaseResponse from '../utils/base.response'
import NhanVienService from "../services/nhanvien.service";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import { CreateNhanVienDto } from "../dto/request/nhanvien/create.nhanvien.dto";
import { INhanVienDetailModel, INhanVienModel } from "../interfaces/models/nhanvien.model";
import dayjs from "dayjs";
import { UpdateNhanVienDto } from "../dto/request/nhanvien/update.nhanvien.dto";
import { DeleteNhanVienDto } from "../dto/request/nhanvien/delete.nhanvien.dto";
import { VanTayResponseDto } from "../dto/response/vantay.response.dto";

@injectable()
class NhanVienController {

    constructor(@inject(TYPES.NhanVienService) private readonly nhanVienService: NhanVienService) { }

    getAllNhanVien = async (_req: Request, res: Response) => {
        try {
            const result = await this.nhanVienService.getAllNhanVien();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No NhanVien data found");
            }
            return BaseResponse.sendSuccess(res, result, "NhanVien data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch NhanVien data");
        }
    }

    getAllNhanVienVanTay = async (_req: Request, res: Response) => {
        try {
            const nhanViens = await this.nhanVienService.getAllNhanVien();

            if (!nhanViens || nhanViens.length === 0) {
                return BaseResponse.sendNotFound(res, "No employees found to get fingerprints");
            }

            const nhanVienIds = nhanViens.map(nv => nv.maNhanVien);

            const result = await this.nhanVienService.getAllNhanVienVanTay(nhanVienIds);

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No NhanVienVanTay data found");
            }

            // Map result to VanTayResponseDto
            const mapped = result.map((item: any) => new VanTayResponseDto(item.maNhanVien, item.viTriNgonTay));

            return BaseResponse.sendSuccess(res, mapped, "NhanVienVanTay data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch NhanVienVanTay data");
        }
    }

    getAllNhanVienDetail = async (_req: Request, res: Response) => {
        try {
            const result = await this.nhanVienService.getAllNhanVienDetail();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No NhanVienDetail data found");
            }

            return BaseResponse.sendSuccess(res, result, "NhanVienDetail data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch NhanVienDetail data");
        }
    }

    getNhanVienByCCCD = async (_req: Request, res: Response) => {
        try {
            const { cccd } = _req.body
            const result = await this.nhanVienService.getNhanVienByCCCD(cccd);

            if (!result) {
                return BaseResponse.sendNotFound(res, "No NhanVienDetail data found");
            }

            return BaseResponse.sendSuccess(res, result, "NhanVienDetail data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch NhanVienDetail data");
        }
    }

    createNhanVien = async (req: Request, res: Response) => {
        try {
            const nhanVienDto = new CreateNhanVienDto(req.body);
            await nhanVienDto.validate();

            const data: INhanVienModel = {
                hoTen: nhanVienDto.hoTen,
                ngaySinh: nhanVienDto.ngaySinh ? dayjs.utc(nhanVienDto.ngaySinh).toDate() : null,
                soDienThoai: nhanVienDto.soDienThoai,
                cmnd: nhanVienDto.cmnd,
                diaChi: nhanVienDto.diaChi,
                ngayVaoLam: dayjs.utc(nhanVienDto.ngayVaoLam).toDate(),
                luongCoBan: nhanVienDto.luongCoBan,
                trangThai: nhanVienDto.trangThai,
                maVaiTro: nhanVienDto.maVaiTro,
                maPhongBan: nhanVienDto.maPhongBan,
                maUuTien: nhanVienDto.maUuTien,
                heSoTangCa: nhanVienDto.heSoTangCa,
                email: nhanVienDto.email
            };
            await this.nhanVienService.createNhanVien(data);
            return BaseResponse.sendCreated(res, nhanVienDto, "NhanVien created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create NhanVien");
        }
    }

    updateNhanVien = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien);

            const nhanVienDto = new UpdateNhanVienDto(maNhanVien, req.body);

            await nhanVienDto.validate();

            const data: INhanVienDetailModel = {
                maNhanVien: nhanVienDto.maNhanVien,
                hoTen: nhanVienDto.hoTen,
                ngaySinh: dayjs.utc(nhanVienDto.ngaySinh).toDate(),
                soDienThoai: nhanVienDto.soDienThoai,
                cmnd: nhanVienDto.cmnd,
                diaChi: nhanVienDto.diaChi,
                ngayVaoLam: dayjs.utc(nhanVienDto.ngayVaoLam).toDate(),
                luongCoBan: nhanVienDto.luongCoBan,
                trangThai: nhanVienDto.trangThai,
                maVaiTro: nhanVienDto.maVaiTro,
                maPhongBan: nhanVienDto.maPhongBan,
                maUuTien: nhanVienDto.maUuTien,
                heSoTangCa: nhanVienDto.heSoTangCa,
                email: nhanVienDto.email
            };

            await this.nhanVienService.updateNhanVien(maNhanVien, data);
            return BaseResponse.sendSuccess(res, nhanVienDto, "NhanVien updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update NhanVien");
        }

    }

    updateEmailNhanVien = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien);
            const { email } = req.body;

            if (!email) {
                return BaseResponse.sendBadRequest(res, "Email is required");
            }

            await this.nhanVienService.updateEmailNhanVien(maNhanVien, email);

            return BaseResponse.sendSuccess(res, null, "Email updated successfully for NhanVien");
        }catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update email for NhanVien");
        }
    }
    deleteNhanVien = async (req: Request, res: Response) => {
        try {
            const nhanVienDto = new DeleteNhanVienDto(parseInt(req.params.maNhanVien));
            await nhanVienDto.validate();
            await this.nhanVienService.deleteNhanVien(nhanVienDto.maNhanVien);
            return BaseResponse.sendSuccess(res, nhanVienDto, "NhanVien deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete NhanVien");
        }
    }

    reloadTrangThaiNhanVien = async (_req: Request, res: Response) => {
        try {
            await this.nhanVienService.reloadTrangThaiNhanVien();
            return BaseResponse.sendSuccess(res, null, "NhanVien reloaded successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to reloaded NhanVien");
        }
    }
}

export default NhanVienController
