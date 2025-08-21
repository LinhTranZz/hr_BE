import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import {IThemPhuCapService} from "../interfaces/services/themphucap.service";
import {Request, Response} from "express";
import BaseResponse from "../utils/base.response";
import {CreateThemPhuCapDto} from "../dto/request/phucap/create.phucap.dto";
import {IThemPhuCapModel} from "../interfaces/models/themphucap.model";
import {DeleteAllThemPhuCapDto, DeleteThemPhuCapDto} from "../dto/request/phucap/delete.phucap.dto";

@injectable()
class ThemPhuCapController {
    constructor(@inject(TYPES.ThemPhuCapService) private readonly themPhuCapService: IThemPhuCapService) {
    }

    getThemPhuCap = async (_req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.themPhuCapService.getThemPhuCaps();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No Them Phu Cap data found");
            }

            return BaseResponse.sendSuccess(res, result, "Them Phu Cap data fetched successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    createThemPhuCap = async (req: Request, res: Response): Promise<void> => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien);
            const maPhuCap = parseInt(req.params.maPhuCap);
            const themPhuCapDto = new CreateThemPhuCapDto(maPhuCap, maNhanVien);
            await themPhuCapDto.validate();

            const data : IThemPhuCapModel = {
                maPhuCap: themPhuCapDto.maPhuCap,
                maNhanVien: themPhuCapDto.maNhanVien,
            }

            await this.themPhuCapService.createThemPhuCap(data);

            return BaseResponse.sendCreated(res, themPhuCapDto, "Them Phu Cap created successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    deleteThemPhuCap = async (req: Request, res: Response): Promise<void> => {
        try {
            const maPhuCap = parseInt(req.params.maPhuCap);
            const maNhanVien = parseInt(req.params.maNhanVien);

            const themPhuCapDto = new DeleteThemPhuCapDto(maPhuCap, maNhanVien,);
            await themPhuCapDto.validate();

            const data: IThemPhuCapModel = {
                maPhuCap: themPhuCapDto.maPhuCap,
                maNhanVien: themPhuCapDto.maNhanVien,
            }

            const result = await this.themPhuCapService.deleteThemPhuCap(data);

            if (!result) {
                return BaseResponse.sendNotFound(res, "Them Phu Cap not found");
            }

            return BaseResponse.sendSuccess(res, null, "Them Phu Cap deleted successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    deleteAllThemPhuCap = async (req: Request, res: Response): Promise<void> => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien);
            const themPhuCapDto = new DeleteAllThemPhuCapDto(maNhanVien);
            await themPhuCapDto.validate()

            const result = await this.themPhuCapService.deleteAllThemPhuCap(themPhuCapDto.maNhanVien);

            if (!result) {
                return BaseResponse.sendNotFound(res, "No Them Phu Cap found for this Nhan Vien");
            }

            return BaseResponse.sendSuccess(res, null, "All Them Phu Cap deleted successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default ThemPhuCapController;