import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import PhongBanService from "../services/phongban.service";
import BaseResponse from "../utils/base.response";
import {NextFunction, Request, Response} from "express";
import {CreatePhongBanDto} from "../dto/request/phongban/create.phongban.dto";
import {IPhongBanModel} from "../interfaces/models/phongban.model";
import {UpdatePhongBanDto} from "../dto/request/phongban/update.phongban.dto";
import {DeletePhongBanDto} from "../dto/request/phongban/delete.phongban.dto";
import {AuthenticatedRequest} from "../interfaces/auth.request";
import {MoveNhanVienDto} from "../dto/request/phongban/move.nhanvien.dto";
import {DeletePhongBanHistoryDto} from "../dto/request/phongban/delete.history.phongban.dto";
import {GetNhanVienVangDto} from "../dto/request/phongban/get.nhanvienvang.dto";

@injectable()
class PhongBanController {
    constructor(@inject(TYPES.PhongBanService) private readonly phongBanService: PhongBanService) {}

    getPhongBan = async (_req: Request, res: Response) => {
        try {
            const phongBans = await this.phongBanService.getAll();

            if (!phongBans || phongBans.length === 0) {
                return BaseResponse.sendNotFound(res, "No PhongBan data found");
            }

            return BaseResponse.sendSuccess(res, phongBans, "PhongBan data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch PhongBan data");
        }
    };

    getDieuChinhNhanVien = async (_req: Request, res: Response) => {
        try {
            const result = await this.phongBanService.getMoveHistory();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No NhanVien data found for move history");
            }

            return BaseResponse.sendSuccess(res, result, "NhanVien data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch NhanVien data");
        }
    }

    getNhanVienVangByPhongBan = async (req: Request, res: Response) => {
        try {
            const phongBanDto = new GetNhanVienVangDto(req.params.ngayHomNay);
            await phongBanDto.validate();

            const result = await this.phongBanService.getNhanVienVangByPhongBan(new Date(phongBanDto.ngayHomNay));

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No NhanVien data found for the specified PhongBan");
            }

            return BaseResponse.sendSuccess(res, result, "NhanVien data by PhongBan fetched successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch NhanVien data by PhongBan");
        }
    }

    createPhongBan = async (req: Request, res: Response) => {
        try {
            const phongBanDto = new CreatePhongBanDto(req.body);
            await phongBanDto.validate();

            const data: IPhongBanModel = {
                tenPhongBan: phongBanDto.tenPhongBan,
                maCa: phongBanDto.maCa
            }

            await this.phongBanService.createPhongBan(data);
            return BaseResponse.sendCreated(res, data, `${data.tenPhongBan} created successfully`);
        } catch (error) {
            BaseResponse.sendError(res, error, "Failed to create PhongBan");
        }
    }

    deletePhongBan = async(req: Request, res: Response) => {
        try{
            const phongBanDto = new DeletePhongBanDto(parseInt(req.params.maPhongBan))
            await phongBanDto.validate()

            await this.phongBanService.deletePhongBan(phongBanDto.maPhongBan);
            BaseResponse.sendSuccess(res,phongBanDto.maPhongBan,`PhongBan with id:${phongBanDto.maPhongBan} deleted successfully`)
        }catch (error){
            BaseResponse.sendError(res, error, "Failed to delete PhongBan");

        }
    }

    deleteDieuChinhNhanVien = async (req: Request, res: Response) => {
        try {
            const data = new DeletePhongBanHistoryDto(req.body);
            await data.validate();

            await this.phongBanService.deleteMoveHistory(data.maNguoiChinh, data.maNguoiDuocChinh, new Date(data.thoiGianThayDoi));

            BaseResponse.sendSuccess(res, data, "Move history deleted successfully");
        } catch (error) {
            BaseResponse.sendError(res, error, "Failed to delete move history");
        }
    }

    updatePhongBan = async(req: Request, res: Response) => {
        try{
            const maPhongBan = parseInt(req.params.maPhongBan)
            const phongBanDto = new UpdatePhongBanDto(maPhongBan, req.body)
            await phongBanDto.validate();

            const data : IPhongBanModel = {
                maPhongBan: phongBanDto.maPhongBan,
                tenPhongBan: phongBanDto.tenPhongBan,
                maCa: phongBanDto.maCa
            }
            await this.phongBanService.updatePhongBan(data)
            BaseResponse.sendSuccess(res,data,`Update ${data.tenPhongBan} is Successfully`)

        }catch (error){
            BaseResponse.sendError(res,error,"Failed to update PhongBan")
        }
    }

    moveNhanVien = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return BaseResponse.sendUnauthorized(res, "Authentication required");
            }
            const maNhanVien  = parseInt(req.params.maNhanVien);
            const maNguoiChinh = req.user.maNhanVien;
            const moveDto = new MoveNhanVienDto(maNguoiChinh, maNhanVien, req.body);
            await moveDto.validate();

            await this.phongBanService.moveNhanVien(maNguoiChinh, moveDto.maPhongBan, moveDto.maNhanVien);
            next();
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

}

export default PhongBanController
