import { inject, injectable } from "inversify";
import LuongService from "../services/luong.service";
import { TYPES } from "../configs/types";
import {NextFunction, Request, Response} from "express";
import BaseResponse from "../utils/base.response";
import { CreateLuongDto } from "../dto/request/luong/create.luong.dto";
import { UpdateTienThuongDto } from "../dto/request/luong/update.tienthuong.dto";
import { DeleteLuongDto } from "../dto/request/luong/delete.luong.dto";
import { CreateEmployeeLuongDto } from "../dto/request/luong/create_employee.luong.dto";
import { AuthenticatedRequest } from "../interfaces/auth.request";
import { UpdateLuongDto } from "../dto/request/luong/update.luong.dto";
import {DeleteLuongHistoryDto} from "../dto/request/luong/delete.luong.history.dto";

@injectable()
class LuongController {
    constructor(@inject(TYPES.LuongService) private readonly luongService: LuongService) { }

    getLuong = async (_req: Request, res: Response) => {
        try {
            const result = await this.luongService.getLuong();

            if(result.length === 0){
                return BaseResponse.sendNotFound(res, "No Luong data found");
            }

            return BaseResponse.sendSuccess(res, result || []);
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    getLuongHistory = async (_req: Request, res: Response) => {
        try {
            const result = await this.luongService.getLuongHistory();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No Luong history data found");
            }

            return BaseResponse.sendSuccess(res, result, "Luong history data fetched successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    createLuong = async (req: Request, res: Response) => {
        try {
            const luongDto = new CreateLuongDto(req.body)
            await luongDto.validate();
            await this.luongService.createLuong(luongDto.nam, luongDto.thang);
            return BaseResponse.sendCreated(res, luongDto, "Luong created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    createEmployeeSalary = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien);
            const luongDto = new CreateEmployeeLuongDto(req.body, maNhanVien)
            await luongDto.validate();

            await this.luongService.createEmployeeSalary(luongDto.maNhanVien, luongDto.nam, luongDto.thang);

            return BaseResponse.sendCreated(res, luongDto, "Employee salary created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    updateLuongTienThuong = async (req: Request, res: Response) => {
        try {
            const luongDto = new UpdateTienThuongDto(req.body)
            await luongDto.validate();
            await this.luongService.updateLuongTienThuong(luongDto.maNhanVien, luongDto.nam, luongDto.thang, luongDto.tienThuong);
            return BaseResponse.sendSuccess(res, luongDto, "Luong updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    updateLuong = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return BaseResponse.sendUnauthorized(res, "Authentication required");
            }
            const maNguoiChinh = req.user.maNhanVien;
            const maNhanVien = parseInt(req.params.maNhanVien);
            const luongDto = new UpdateLuongDto(maNguoiChinh, maNhanVien, req.body);
            await luongDto.validate();
            await this.luongService.updateLuong(maNguoiChinh, luongDto.maNhanVien, luongDto.luongCoBan);
            next();
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    deleteLuong = async (req: Request, res: Response) => {
        try {
            const luongDto = new DeleteLuongDto(req.body)
            await luongDto.validate();
            await this.luongService.deleteLuong(luongDto.maNhanVien, luongDto.thang, luongDto.nam);
            return BaseResponse.sendSuccess(res, luongDto, "Luong deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    deleteLuongHistory = async (req: Request, res: Response) => {
        try {
            const data = new DeleteLuongHistoryDto(req.body);
            await data.validate();

            await this.luongService.deleteLuongHistory(data.maNguoiChinh, data.maNguoiDuocChinh, new Date(data.thoiGianThayDoi));

            return BaseResponse.sendSuccess(res, data, "Luong history deleted successfully");

        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}
export default LuongController;
