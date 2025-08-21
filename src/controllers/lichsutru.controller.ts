import { Request, Response } from 'express';
import BaseResponse from '../utils/base.response'
import LichSuTruService from "../services/lichsutru.service";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import { CreateLichSuTruDto } from "../dto/request/lichsutru/create.lichsutru.dto";
import { ILichSuTruModel } from "../interfaces/models/lichsutru.model";
import { DeleteLichSuTruDto } from "../dto/request/lichsutru/delete.lichsutru.dto";

@injectable()
class LichSuTruController {

    constructor(@inject(TYPES.LichSuTruService) private readonly lichSuTruService: LichSuTruService) { }

    getAllLichSuTru = async (_req: Request, res: Response) => {
        try {
            const result = await this.lichSuTruService.getAllLichSuTru();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No deduction history found");
            }
            return BaseResponse.sendSuccess(res, result, "Deduction history fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch deduction history");
        }
    }

    createLichSuTru = async (req: Request, res: Response) => {
        try {
            const lichSuTruDto = new CreateLichSuTruDto(req.body);
            await lichSuTruDto.validate();

            const data: ILichSuTruModel = {
                maLoaiTienTru: lichSuTruDto.maLoaiTienTru,
                maNhanVien: lichSuTruDto.maNhanVien,
                soTienTruKhac: lichSuTruDto.soTienTruKhac,
                liDo: lichSuTruDto.liDo
            };

            await this.lichSuTruService.createLichSuTru(data);
            return BaseResponse.sendCreated(res, lichSuTruDto, "Deduction history created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create deduction history");
        }
    }

    updateLichSuTru = async (req: Request, res: Response) => {
        try {
            const maLoaiTienTru = parseInt(req.params.maLoaiTienTru);
            const maNhanVien = parseInt(req.params.maNhanVien);
            const lichSuTruDto = new CreateLichSuTruDto({ maLoaiTienTru, maNhanVien, ...req.body });
            await lichSuTruDto.validate();

            const data: ILichSuTruModel = {
                maLoaiTienTru: lichSuTruDto.maLoaiTienTru,
                maNhanVien: lichSuTruDto.maNhanVien,
                soTienTruKhac: lichSuTruDto.soTienTruKhac,
                liDo: lichSuTruDto.liDo
            };

            await this.lichSuTruService.updateLichSuTru(data);
            return BaseResponse.sendSuccess(res, lichSuTruDto, "Deduction history updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update deduction history");
        }
    }

    deleteLichSuTru = async (req: Request, res: Response) => {
        try {
            const maLoaiTienTru = parseInt(req.params.maLoaiTienTru);
            const maNhanVien = parseInt(req.params.maNhanVien);

            const lichSuTruDto = new DeleteLichSuTruDto(maLoaiTienTru, maNhanVien);
            await lichSuTruDto.validate();

            await this.lichSuTruService.deleteLichSuTru(lichSuTruDto.maLoaiTienTru, lichSuTruDto.maNhanVien);
            return BaseResponse.sendSuccess(res, null, "Deduction history deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete deduction history");
        }
    }
}

export default LichSuTruController;
