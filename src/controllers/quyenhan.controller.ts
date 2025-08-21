import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import {IQuyenHanService} from "../interfaces/services/quyenhan.service";
import {Request, Response} from "express";
import BaseResponse from "../utils/base.response";

@injectable()
class QuyenHanController {
    constructor(@inject(TYPES.QuyenHanService) private readonly quyenHanService: IQuyenHanService) {
    }

    getQuyenHans = async (req: Request, res: Response) => {
        try {
            const result = await this.quyenHanService.getQuyenHans();

            if (result.length === 0) {
                return BaseResponse.sendNotFound(res, "No Quyen Han data found");
            }

            return BaseResponse.sendSuccess(res, result, "Quyen Han data fetched successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    getQuyenHanById = async (req: Request, res: Response) => {
        try {
            const maQuyenHan = req.params.maQuyenHan;
            const result = await this.quyenHanService.getQuyenHanById(maQuyenHan);

            if (!result) {
                return BaseResponse.sendNotFound(res, `Quyen Han with ID ${maQuyenHan} not found`);
            }

            return BaseResponse.sendSuccess(res, result, "Quyen Han data fetched successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default QuyenHanController
