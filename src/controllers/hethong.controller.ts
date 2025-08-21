import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import {IHeThongService} from "../interfaces/services/hethong.service";
import {Request, Response} from "express";
import BaseResponse from "../utils/base.response"
import {UpdateHeThongDto} from "../dto/request/hethong/update.hethong.dto";
import {IHeThongModel} from "../interfaces/models/hethong.model";
import dayjs from "dayjs";

@injectable()
class HeThongController {

    constructor(@inject(TYPES.HeThongService) private readonly heThongService: IHeThongService) {
    }

    getHeThong = async (_req: Request, res: Response) => {
        try {
            const result = await this.heThongService.getHeThong();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No system settings found");
            }

            return BaseResponse.sendSuccess(res, result, "System settings retrieved successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    updateHeThong = async (req: Request, res: Response) => {
        try {
            const heThongDto = new UpdateHeThongDto(req.body);
            await heThongDto.validate();

            const baseDate = new Date().toISOString().split('T')[0];

            const data: IHeThongModel = {
                soNgayPhepTrongNam: heThongDto.soNgayPhepTrongNam,
                nguongThoiGianPheDuyetNgayNghi: heThongDto.nguongThoiGianPheDuyetNgayNghi,
                congNgayChuNhat: heThongDto.congNgayChuNhat,
                khoangCachGiuaCacLanChamCong: heThongDto.khoangCachGiuaCacLanChamCong ?
                    dayjs.utc(`${baseDate}T${heThongDto.khoangCachGiuaCacLanChamCong}`).toDate() : undefined,
            }

            await this.heThongService.updateHeThong(data);
            return BaseResponse.sendSuccess(res, null, "System settings updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default HeThongController;