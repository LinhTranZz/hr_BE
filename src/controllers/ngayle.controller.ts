import { Request, Response } from 'express';
import BaseResponse from '../utils/base.response'
import NgayLeService from "../services/ngayle.service";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import { CreateNgayLeDto } from "../dto/request/ngayle/create.ngayle.dto";
import { INgayLeModel } from "../interfaces/models/ngayle.model";
import { UpdateNgayLeDto } from "../dto/request/ngayle/update.ngayle.dto";
import { DeleteNgayLeDto } from "../dto/request/ngayle/delete.ngayle.dto";
import dayjs from "dayjs";

@injectable()
class NgayLeController {

    constructor(@inject(TYPES.NgayLeService) private readonly ngayLeService: NgayLeService) { }

    getAllNgayLe = async (_req: Request, res: Response) => {
        try {
            const result = await this.ngayLeService.getAllNgayLe();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No holidays found");
            }
            return BaseResponse.sendSuccess(res, result, "Holidays fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch holidays");
        }
    }

    createNgayLe = async (req: Request, res: Response) => {
        try {
            const ngayLeDto = new CreateNgayLeDto(req.body);
            await ngayLeDto.validate();

            const data: INgayLeModel = {
                tenNgayLe: ngayLeDto.tenNgayLe,
                ngayBatDau: dayjs.utc(ngayLeDto.ngayBatDau).toDate(),
                ngayKetThuc: dayjs.utc(ngayLeDto.ngayKetThuc).toDate(),
            };

            await this.ngayLeService.createNgayLe(data);
            return BaseResponse.sendCreated(res, null, "Holiday created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create holiday");
        }
    }

    updateNgayLe = async (req: Request, res: Response) => {
        try {
            const maNgayLe = parseInt(req.params.maNgayLe);

            const ngayLeDto = new UpdateNgayLeDto(maNgayLe, req.body);
            await ngayLeDto.validate();

            const data: INgayLeModel = {
                tenNgayLe: ngayLeDto.tenNgayLe,
                ngayBatDau: dayjs.utc(ngayLeDto.ngayBatDau).toDate(),
                ngayKetThuc: dayjs.utc(ngayLeDto.ngayKetThuc).toDate(),
            };

            await this.ngayLeService.updateNgayLe(maNgayLe, data);
            return BaseResponse.sendSuccess(res, null, "Holiday updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update holiday");
        }
    }

    deleteNgayLe = async (req: Request, res: Response) => {
        try {
            const maNgayLe = parseInt(req.params.maNgayLe);
            const ngayLeDto = new DeleteNgayLeDto(maNgayLe);
            await ngayLeDto.validate();

            await this.ngayLeService.deleteNgayLe(maNgayLe);
            return BaseResponse.sendSuccess(res, null, "Holiday deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete holiday");
        }
    }
}

export default NgayLeController;
