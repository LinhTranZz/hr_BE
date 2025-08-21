import { Request, Response } from "express";
import BaseResponse from "../utils/base.response";
import {CreateVanTayDto} from "../dto/request/vantay/create.vantay.dto";
import {IVanTayModel} from "../interfaces/models/vantay.model";
import dayjs from "dayjs";
import {inject, injectable} from "inversify";
import VanTayService from "../services/vantay.service";
import {TYPES} from "../configs/types";
@injectable()
class VanTayController{

    constructor(@inject(TYPES.VanTayService) private readonly vanTayService: VanTayService) {}

    createVanTayData = async (req: Request, res: Response) => {
        try{
            const vanTayDto = new CreateVanTayDto(req.body);
            await vanTayDto.validate();

            const vanTayData: IVanTayModel = {
                thoiGian: dayjs.utc(vanTayDto.thoiGian).toDate(),
                maNhanVien: vanTayDto.maNhanVien
            };

            await this.vanTayService.createVanTayData(vanTayData);

            return BaseResponse.sendCreated(res, vanTayDto, "VanTay data created successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default VanTayController;