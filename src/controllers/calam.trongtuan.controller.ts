import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import CaLamTrongTuanService from "../services/calam.trongtuan.service";
import { Request, Response } from "express";
import BaseResponse from "../utils/base.response"
import { CaLamTrongTuanDto } from "../dto/request/calam/calam.trongtuan.dto";
import { ICaLamTrongTuanModel } from "../interfaces/models/calam.trongtuan.model";
import dayjs from "dayjs";
@injectable()
class CaLamTrongTuanController {
    constructor(@inject(TYPES.CaLamTrongTuanService) private readonly caLamTrongTuanService: CaLamTrongTuanService) {
    }

    getAllCaLamTrongTuan = async (req: Request, res: Response) => {
        try {
            const result = await this.caLamTrongTuanService.getAllCaLamTrongTuan();

            if (result.length === 0) {
                return BaseResponse.sendNotFound(res, "Not found any data");
            }

            return BaseResponse.sendSuccess(res, result, "Get all ca lam trong tuan successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Get all ca lam trong tuan failed");
        }
    }
    getCaLamTrongTuan = async (req: Request, res: Response) => {
        try {
            const maCa = parseInt(req.params.maCa);
            const result = await this.caLamTrongTuanService.getCaLamTrongTuan(maCa);

            if (result.length === 0) {
                return BaseResponse.sendNotFound(res, "Not found any data for this maCa");
            }

            return BaseResponse.sendSuccess(res, result, "Get ca lam by id in week successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Get ca lam by id in week failed");
        }
    }
    createCaLamTrongTuan = async (req: Request, res: Response) => {
        try {
            const caLamDto = new CaLamTrongTuanDto(req.body);
            await caLamDto.validate();

            const baseDate = new Date().toISOString().split('T')[0];

            const data: ICaLamTrongTuanModel = {
                maCa: caLamDto.maCa,
                ngayTrongTuan: caLamDto.ngayTrongTuan,
                coLamViec: caLamDto.coLamViec ? 1 : 0,
                gioBatDau: dayjs.utc(`${baseDate}T${caLamDto.gioBatDau}`).toDate(),
                gioKetThuc: dayjs.utc(`${baseDate}T${caLamDto.gioKetThuc}`).toDate(),
                gioNghiTruaBatDau: dayjs.utc(`${baseDate}T${caLamDto.gioNghiTruaBatDau}`).toDate(),
                gioNghiTruaKetThuc: dayjs.utc(`${baseDate}T${caLamDto.gioNghiTruaKetThuc}`).toDate(),
            }

            await this.caLamTrongTuanService.createCaLamTrongTuan(data);
            return BaseResponse.sendSuccess(res, null, "Create ca lam trong tuan successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Create ca lam trong tuan failed");
        }
    }
    updateCaLamTrongTuan = async (req: Request, res: Response) => {
        try {
            const maCa = parseInt(req.params.maCa);
            const caLamDto = new CaLamTrongTuanDto({ maCa, ...req.body });

            const baseDate = new Date().toISOString().split('T')[0];

            const data: ICaLamTrongTuanModel = {
                maCa: caLamDto.maCa,
                ngayTrongTuan: caLamDto.ngayTrongTuan,
                coLamViec: caLamDto.coLamViec,
                gioBatDau: caLamDto.gioBatDau ? dayjs.utc(`${baseDate}T${caLamDto.gioBatDau}`).toDate() : null,
                gioKetThuc: caLamDto.gioKetThuc ? dayjs.utc(`${baseDate}T${caLamDto.gioKetThuc}`).toDate() : null,
                gioNghiTruaBatDau: caLamDto.gioNghiTruaBatDau ? dayjs.utc(`${baseDate}T${caLamDto.gioNghiTruaBatDau}`).toDate() : null,
                gioNghiTruaKetThuc: caLamDto.gioNghiTruaBatDau ? dayjs.utc(`${baseDate}T${caLamDto.gioNghiTruaKetThuc}`).toDate() : null,
            }

            await this.caLamTrongTuanService.updateCaLamTrongTuan(data);

            return BaseResponse.sendSuccess(res, null, "Update ca lam trong tuan successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Update ca lam trong tuan failed");
        }
    }
    deleteCaLamTrongTuan = async (req: Request, res: Response) => {
        try {
            const maCa = parseInt(req.params.maCa);
            const ngayTrongTuan = parseInt(req.params.ngayTrongTuan);

            const success = await this.caLamTrongTuanService.deleteCaLamTrongTuan(maCa, ngayTrongTuan);

            if (!success) {
                return BaseResponse.sendNotFound(res, "CaLamTrongTuan not found");
            }

            return BaseResponse.sendSuccess(res, null, "Delete ca lam trong tuan successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Delete ca lam trong tuan failed");
        }
    }
}

export default CaLamTrongTuanController;