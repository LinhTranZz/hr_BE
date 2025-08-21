import { Request, Response } from 'express';
import BaseResponse from '../utils/base.response'
import LichSuThuongService from "../services/lichsuthuong.service";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import { CreateLichSuThuongDto } from "../dto/request/lichsuthuong/create.lichsuthuong.dto";
import { ILichSuThuongModel } from "../interfaces/models/lichsuthuong.model";
import { DeleteLichSuThuongDto } from "../dto/request/lichsuthuong/delete.lichsuthuong.dto";

@injectable()
class LichSuThuongController {

    constructor(@inject(TYPES.LichSuThuongService) private readonly lichSuThuongService: LichSuThuongService) { }

    getAllLichSuThuong = async (_req: Request, res: Response) => {
        try {
            const result = await this.lichSuThuongService.getAllLichSuThuong();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No bonus history found");
            }
            return BaseResponse.sendSuccess(res, result, "Bonus history fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch bonus history");
        }
    }

    createLichSuThuong = async (req: Request, res: Response) => {
        try {
            const lichSuThuongDto = new CreateLichSuThuongDto(req.body);
            await lichSuThuongDto.validate();

            const data: ILichSuThuongModel = {
                maLoaiTienThuong: lichSuThuongDto.maLoaiTienThuong,
                maNhanVien: lichSuThuongDto.maNhanVien,
                soTienThuongKhac: lichSuThuongDto.soTienThuongKhac,
                lyDo: lichSuThuongDto.lyDo
            };

            await this.lichSuThuongService.createLichSuThuong(data);
            return BaseResponse.sendCreated(res, lichSuThuongDto, "Bonus history created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create bonus history");
        }
    }

    updateLichSuThuong = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien);
            const maLoaiTienThuong = parseInt(req.params.maLoaiTienThuong);

            const lichSuThuongDto = new CreateLichSuThuongDto({maLoaiTienThuong, maNhanVien, ...req.body});
            await lichSuThuongDto.validate();

            const data: ILichSuThuongModel = {
                maLoaiTienThuong: lichSuThuongDto.maLoaiTienThuong,
                maNhanVien: lichSuThuongDto.maNhanVien,
                soTienThuongKhac: lichSuThuongDto.soTienThuongKhac,
                lyDo: lichSuThuongDto.lyDo
            };

            await this.lichSuThuongService.updateLichSuThuong(data);
            return BaseResponse.sendSuccess(res, lichSuThuongDto, "Bonus history updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update bonus history");
        }
    }

    deleteLichSuThuong = async (req: Request, res: Response) => {
        try {
            const maLoaiTienThuong = parseInt(req.params.maLoaiTienThuong);
            const maNhanVien = parseInt(req.params.maNhanVien);

            const lichSuThuongDto = new DeleteLichSuThuongDto(maLoaiTienThuong, maNhanVien);
            await lichSuThuongDto.validate();

            await this.lichSuThuongService.deleteLichSuThuong(lichSuThuongDto.maLoaiTienThuong, lichSuThuongDto.maNhanVien);
            return BaseResponse.sendSuccess(res, null, "Bonus history deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete bonus history");
        }
    }
}

export default LichSuThuongController;
