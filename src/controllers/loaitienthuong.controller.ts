import { Request, Response } from 'express';
import BaseResponse from '../utils/base.response'
import LoaiTienThuongService from "../services/loaitienthuong.service";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import { CreateLoaiTienThuongDto } from "../dto/request/loaitienthuong/create.loaitienthuong.dto";
import { ILoaiTienThuongModel } from "../interfaces/models/loaitienthuong.model";
import { UpdateLoaiTienThuongDto } from "../dto/request/loaitienthuong/update.loaitienthuong.dto";
import { DeleteLoaiTienThuongDto } from "../dto/request/loaitienthuong/delete.loaitienthuong.dto";

@injectable()
class LoaiTienThuongController {

    constructor(@inject(TYPES.LoaiTienThuongService) private readonly loaiTienThuongService: LoaiTienThuongService) { }

    getAllLoaiTienThuong = async (_req: Request, res: Response) => {
        try {
            const result = await this.loaiTienThuongService.getAllLoaiTienThuong();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No LoaiTienThuong data found");
            }
            return BaseResponse.sendSuccess(res, result, "LoaiTienThuong data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch LoaiTienThuong data");
        }
    }

    createLoaiTienThuong = async (req: Request, res: Response) => {
        try {
            const loaiTienThuongDto = new CreateLoaiTienThuongDto(req.body);
            await loaiTienThuongDto.validate()

            const data: ILoaiTienThuongModel = {
                tenLoaiTienThuong: loaiTienThuongDto.tenLoaiTienThuong,
                soTienThuong: loaiTienThuongDto.soTienThuong,
                donVi: loaiTienThuongDto.donVi
            };

            await this.loaiTienThuongService.createLoaiTienThuong(data);
            return BaseResponse.sendCreated(res, loaiTienThuongDto, "LoaiTienThuong created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create LoaiTienThuong");
        }
    }

    updateLoaiTienThuong = async (req: Request, res: Response) => {
        try {
            const maLoaiTienThuong = parseInt(req.params.maLoaiTienThuong);
            const loaiTienThuongDto = new UpdateLoaiTienThuongDto(maLoaiTienThuong, req.body);
            await loaiTienThuongDto.validate();

            const data: ILoaiTienThuongModel = {
                tenLoaiTienThuong: loaiTienThuongDto.tenLoaiTienThuong,
                soTienThuong: loaiTienThuongDto.soTienThuong,
                donVi: loaiTienThuongDto.donVi
            };

            await this.loaiTienThuongService.updateLoaiTienThuong(maLoaiTienThuong, data);
            return BaseResponse.sendSuccess(res, loaiTienThuongDto, "LoaiTienThuong updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update LoaiTienThuong");
        }
    }

    deleteLoaiTienThuong = async (req: Request, res: Response) => {
        try {
            const loaiTienThuongDto = new DeleteLoaiTienThuongDto(parseInt(req.params.maLoaiTienThuong));
            await loaiTienThuongDto.validate();

            await this.loaiTienThuongService.deleteLoaiTienThuong(loaiTienThuongDto.maLoaiTienThuong);
            return BaseResponse.sendSuccess(res, null, "LoaiTienThuong deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete LoaiTienThuong");
        }
    }
}

export default LoaiTienThuongController;
