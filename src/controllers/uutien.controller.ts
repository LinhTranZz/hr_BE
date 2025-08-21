import {Request, Response} from "express";
import BaseResponse from "../utils/base.response";
import {IUuTienModel} from "../interfaces/models/uutien.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import {CreateUuTienDto} from "../dto/request/uutien/create.uutien.dto";
import dayjs from "dayjs";
import UutTienService from "../services/uutien.service";
import {UpdateUuTienDto} from "../dto/request/uutien/update.uutien.dto";
import {DeleteUuTienDto} from "../dto/request/uutien/delete.uutien.dto";

@injectable()
class UuTienController {
    constructor(@inject(TYPES.UuTienService) private readonly uuTienService: UutTienService) {}

    getUuTien = async (_req: Request, res:Response) => {
        try {
            const uuTiens = await this.uuTienService.getAllUuTien()

            if (!uuTiens || uuTiens.length === 0) {
                return BaseResponse.sendNotFound(res, "No UuTien data found");
            }

            return BaseResponse.sendSuccess(res, uuTiens, "UuTien data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch UuTien data");
        }
    }

    createUuTien = async (req: Request, res: Response) => {
        try {
            const uuTienDto = new CreateUuTienDto(req.body)
            await uuTienDto.validate();

            const baseDate = new Date().toISOString().split('T')[0];

            const uuTienData: IUuTienModel = {
                tenUuTien: uuTienDto.tenUuTien,
                thoiGianBatDauCa: dayjs.utc(`${baseDate}T${uuTienDto.thoiGianBatDauCa}`).toDate(),
                thoiGianKetThucCa: dayjs.utc(`${baseDate}T${uuTienDto.thoiGianKetThucCa}`).toDate(),
                thoiGianHieuLuc: uuTienDto.thoiGianHieuLuc,
            };

            await this.uuTienService.createUuTien(uuTienData);
            return BaseResponse.sendCreated(res, uuTienDto, `UuTien created successfully`);
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create UuTien");
        }
    }

    updateUuTien = async (req: Request, res: Response) => {
        try {
            const maUuTien = parseInt(req.params.maUuTien);
            const uuTienDto = new UpdateUuTienDto(maUuTien, req.body);
            await uuTienDto.validate();

            const baseDate = new Date().toISOString().split('T')[0];

            const uuTienData: IUuTienModel = {
                maUuTien: uuTienDto.maUuTien,
                tenUuTien: uuTienDto.tenUuTien,
                thoiGianBatDauCa: dayjs.utc(`${baseDate}T${uuTienDto.thoiGianBatDauCa}`).toDate(),
                thoiGianKetThucCa: dayjs.utc(`${baseDate}T${uuTienDto.thoiGianKetThucCa}`).toDate(),
                thoiGianHieuLuc: uuTienDto.thoiGianHieuLuc,
            }
            await this.uuTienService.updateUuTien(uuTienData);
            return BaseResponse.sendSuccess(res, uuTienDto, `Update UuTien with id:${maUuTien} successfully`);
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update UuTien");
        }
    }

    deleteUuTien = async (req: Request, res: Response) => {
        try {
            const uuTienDto = new DeleteUuTienDto(parseInt(req.params.maUuTien));
            await uuTienDto.validate();

            await this.uuTienService.deleteUuTien(uuTienDto.maUuTien);
            return BaseResponse.sendSuccess(res, uuTienDto, `UuTien with id:${uuTienDto.maUuTien} deleted successfully`);
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete UuTien");
        }
    }
}

export default UuTienController
