import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import {INgayPhepService} from "../interfaces/services/ngayphep.service";
import {Request, Response} from "express";
import BaseResponse from "../utils/base.response";
import {UpdateNgayPhepByMonthDto, UpdateNgayPhepByYearDto} from "../dto/request/ngayphep/update.ngayphep.dto";

@injectable()
class NgayPhepController{
    constructor(@inject(TYPES.NgayPhepService) private readonly ngayPhepService: INgayPhepService) {}

    getAllNgayPhep = async (_req: Request, res: Response) => {
        try {
            const ngayPhepList = await this.ngayPhepService.getAllNgayPhep();

            if (!ngayPhepList || ngayPhepList.length === 0) {
                return BaseResponse.sendNotFound(res, "No NgayPhep found");
            }

            return BaseResponse.sendSuccess(res, ngayPhepList, "Get all NgayPhep successful");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    updateNgayPhepByMonth = async (req: Request, res: Response) => {
        try {
            const {thang, nam} = req.params;
            const ngayPhepDto = new UpdateNgayPhepByMonthDto(parseInt(nam), parseInt(thang));

            await ngayPhepDto.validate();

            await this.ngayPhepService.updateNgayPhepByMonth(ngayPhepDto.nam, ngayPhepDto.thang);

            return BaseResponse.sendSuccess(res, null, "Update NgayPhep by month successful");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    updateNgayPhepByYear = async (req: Request, res: Response) => {
        try {
            const {nam, thang} = req.params;
            const ngayPhepDto = new UpdateNgayPhepByYearDto(parseInt(nam), parseInt(thang));

            await ngayPhepDto.validate();

            await this.ngayPhepService.updateNgayPhepByYear(ngayPhepDto.nam, ngayPhepDto.thang);

            return BaseResponse.sendSuccess(res, null, "Update NgayPhep by year successful");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    convertNgayPhepToMoney = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien);
            const {thang, nam} = req.body;

            const result = await this.ngayPhepService.convertNgayPhepToMoney(maNhanVien, nam, thang);

            if (!result) {
                return BaseResponse.sendNotFound(res, "No NgayPhep data found for conversion");
            }

            return BaseResponse.sendSuccess(res, result, "Convert NgayPhep to money successful");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default NgayPhepController;