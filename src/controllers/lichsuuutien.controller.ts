// filepath: C:\Users\Administrator\Documents\workspace\PMChamCong-BE\src\controllers\lichsuuutien.controller.ts
import { Request, Response } from 'express';
import BaseResponse from '../utils/base.response'
import LichSuUuTienService from "../services/lichsuuutien.service";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import { CreateLichSuUuTienDto } from "../dto/request/lichsuuutien/create.lichsuuutien.dto";
import { ILichSuUuTienModel } from "../interfaces/models/lichsuuutien.model";
import { DeleteLichSuUuTienDto } from "../dto/request/lichsuuutien/delete.lichsuuutien.dto";
import dayjs from "dayjs";

@injectable()
class LichSuUuTienController {

    constructor(@inject(TYPES.LichSuUuTienService) private readonly lichSuUuTienService: LichSuUuTienService) { }

    getAllLichSuUuTien = async (_req: Request, res: Response) => {
        try {
            const result = await this.lichSuUuTienService.getAllLichSuUuTien();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No priority history found");
            }
            return BaseResponse.sendSuccess(res, result, "Priority history fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch priority history");
        }
    }

    createLichSuUuTien = async (req: Request, res: Response) => {
        try {
            const lichSuUuTienDto = new CreateLichSuUuTienDto(req.body);
            await lichSuUuTienDto.validate();

            const data: ILichSuUuTienModel = {
                maUuTien: lichSuUuTienDto.maUuTien,
                maNhanVien: lichSuUuTienDto.maNhanVien,
                thoiGianHieuLucBatDau: dayjs.utc(lichSuUuTienDto.thoiGianHieuLucBatDau).toDate(),
            };

            await this.lichSuUuTienService.createLichSuUuTien(data);
            return BaseResponse.sendCreated(res, lichSuUuTienDto, "Priority history created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create priority history");
        }
    }

    updateLichSuUuTien = async (req: Request, res: Response) => {
        try {
            const maUuTien = parseInt(req.params.maUuTien);
            const maNhanVien = parseInt(req.params.maNhanVien);

            const lichSuUuTienDto = new CreateLichSuUuTienDto({maUuTien, maNhanVien, ...req.body});
            await lichSuUuTienDto.validate();

            const data: ILichSuUuTienModel = {
                maUuTien: lichSuUuTienDto.maUuTien,
                maNhanVien: lichSuUuTienDto.maNhanVien,
                thoiGianHieuLucBatDau: dayjs.utc(lichSuUuTienDto.thoiGianHieuLucBatDau).toDate()
            };

            await this.lichSuUuTienService.updateLichSuUuTien(data);
            return BaseResponse.sendSuccess(res, lichSuUuTienDto, "Priority history updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update priority history");
        }
    }

    deleteLichSuUuTien = async (req: Request, res: Response) => {
        try {
            const maUuTien = parseInt(req.params.maUuTien);
            const maNhanVien = parseInt(req.params.maNhanVien);

            const lichSuUuTienDto = new DeleteLichSuUuTienDto(maUuTien, maNhanVien);
            await lichSuUuTienDto.validate();

            await this.lichSuUuTienService.deleteLichSuUuTien(lichSuUuTienDto.maUuTien, lichSuUuTienDto.maNhanVien);
            return BaseResponse.sendSuccess(res, null, "Priority history deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete priority history");
        }
    }
}

export default LichSuUuTienController;
