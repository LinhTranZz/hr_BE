import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import ChamCongService from "../services/chamcong.service";
import BaseResponse from "../utils/base.response";
@injectable()
class ChamCongController {

    constructor(@inject(TYPES.ChamCongService) private readonly chamCongService: ChamCongService) {
    }

    getChamCong = async (_req: Request, res: Response) => {
        try {
            const result = await this.chamCongService.getChamCong();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No ChamCong data found");
            }

            return BaseResponse.sendSuccess(res, result, "ChamCong data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    getChamCongDetail = async (_req: Request, res: Response) => {
        try {
            const result = await this.chamCongService.getChamCongDetail();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No ChamCongDetail data found");
            }

            return BaseResponse.sendSuccess(res, result, "ChamCong data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    
}

export default ChamCongController;