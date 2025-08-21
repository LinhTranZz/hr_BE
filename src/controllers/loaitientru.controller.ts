import { Request, Response } from 'express';
import BaseResponse from '../utils/base.response'
import LoaiTienTruService from "../services/loaitientru.service";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import { CreateLoaiTienTruDto } from "../dto/request/loaitientru/create.loaitientru.dto";
import { ILoaiTienTruModel } from "../interfaces/models/loaitientru.model";
import { UpdateLoaiTienTruDto } from "../dto/request/loaitientru/update.loaitientru.dto";
import { DeleteLoaiTienTruDto } from "../dto/request/loaitientru/delete.loaitientru.dto";

@injectable()
class LoaiTienTruController {

    constructor(@inject(TYPES.LoaiTienTruService) private readonly loaiTienTruService: LoaiTienTruService) { }

    getAllLoaiTienTru = async (_req: Request, res: Response) => {
        try {
            const result = await this.loaiTienTruService.getAllLoaiTienTru();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No LoaiTienTru data found");
            }
            return BaseResponse.sendSuccess(res, result, "LoaiTienTru data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch LoaiTienTru data");
        }
    }

    createLoaiTienTru = async (req: Request, res: Response) => {
        try {
            const loaiTienTruDto = new CreateLoaiTienTruDto(req.body);
            await loaiTienTruDto.validate()

            const data: ILoaiTienTruModel = {
                tenLoaiTienTru: loaiTienTruDto.tenLoaiTienTru,
                soTienTru: loaiTienTruDto.soTienTru,
                donVi: loaiTienTruDto.donVi
            };

            await this.loaiTienTruService.createLoaiTienTru(data);
            return BaseResponse.sendCreated(res, loaiTienTruDto, "LoaiTienTru created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create LoaiTienTru");
        }
    }

    updateLoaiTienTru = async (req: Request, res: Response) => {
        try {
            const maLoaiTienTru = parseInt(req.params.maLoaiTienTru);

            const loaiTienTruDto = new UpdateLoaiTienTruDto(maLoaiTienTru, req.body);
            await loaiTienTruDto.validate();

            const data: ILoaiTienTruModel = {
                tenLoaiTienTru: loaiTienTruDto.tenLoaiTienTru,
                soTienTru: loaiTienTruDto.soTienTru,
                donVi: loaiTienTruDto.donVi
            };

            await this.loaiTienTruService.updateLoaiTienTru(maLoaiTienTru, data);
            return BaseResponse.sendSuccess(res, loaiTienTruDto, "LoaiTienTru updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update LoaiTienTru");
        }
    }

    deleteLoaiTienTru = async (req: Request, res: Response) => {
        try {
            const loaiTienTruDto = new DeleteLoaiTienTruDto(parseInt(req.params.maLoaiTienTru));
            await loaiTienTruDto.validate();
            await this.loaiTienTruService.deleteLoaiTienTru(loaiTienTruDto.maLoaiTienTru);
            return BaseResponse.sendSuccess(res, null, "LoaiTienTru deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete LoaiTienTru");
        }
    }
}

export default LoaiTienTruController;
