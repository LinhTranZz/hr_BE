import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import NgayNghiService from "../services/ngaynghi.service";
import EmailService from "../services/email.service";
import { Request, Response } from "express";
import BaseResponse from "../utils/base.response";
import {CreateNgayNghiDto} from "../dto/request/ngaynghi/create.ngaynghi.dto";
import {INgayNghiModel} from "../interfaces/models/ngaynghi.model";
import dayjs from "dayjs";
import {UpdateNgayNghiDto} from "../dto/request/ngaynghi/update.ngaynghi.dto";
import {DeleteNgayNghiDto} from "../dto/request/ngaynghi/delete.ngaynghi.dto";
import { emailQueue } from '../utils/email.queue';

@injectable()
class NgayNghiController{
    constructor(@inject(TYPES.NgayNghiService) private readonly ngayNghiService: NgayNghiService,
                @inject(TYPES.EmailService) private readonly emailService: EmailService,) {
    }

    getNgayNghi = async (_req: Request, res:Response) => {
        try {
            const result = await this.ngayNghiService.getNgayNghi();
            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No NgayNghi data found");
            }

            return BaseResponse.sendSuccess(res, result, "NgayNghi data fetched successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    createNgayNghi = async (req: Request, res: Response) => {
        try {
            const ngayNghiDto = new CreateNgayNghiDto(req.body);
            await ngayNghiDto.validate();

            const data: INgayNghiModel = {
                maNhanVien: ngayNghiDto.maNhanVien,
                ngayBatDau: dayjs.utc(ngayNghiDto.ngayBatDau).toDate(),
                ngayKetThuc: dayjs.utc(ngayNghiDto.ngayKetThuc).toDate(),
                liDo: ngayNghiDto.liDo,
                trangThaiPheDuyet: ngayNghiDto.trangThaiPheDuyet,
                tinhLuong: ngayNghiDto.tinhLuong,
                tinhPhep: ngayNghiDto.tinhPhep
            }

            await this.ngayNghiService.createNgayNghi(data);

            return BaseResponse.sendCreated(res, ngayNghiDto, "NgayNghi created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    updateNgayNghi = async (req: Request, res: Response) => {
        try {
            const maNghiPhep = parseInt(req.params.maNghiPhep);
            const ngayNghiDto = new UpdateNgayNghiDto(maNghiPhep, req.body);
            await ngayNghiDto.validate();

            const data: INgayNghiModel = {
                maNghiPhep: ngayNghiDto.maNghiPhep,
                maNhanVien: ngayNghiDto.maNhanVien,
                ngayBatDau: dayjs.utc(ngayNghiDto.ngayBatDau).toDate(),
                ngayKetThuc: dayjs.utc(ngayNghiDto.ngayKetThuc).toDate(),
                liDo: ngayNghiDto.liDo,
                trangThaiPheDuyet: ngayNghiDto.trangThaiPheDuyet,
                tinhLuong: ngayNghiDto.tinhLuong,
                tinhPhep: ngayNghiDto.tinhPhep
            }

            await this.ngayNghiService.updateNgayNghi(maNghiPhep, data);

            // Add email job to background queue instead of sending immediately
            emailQueue.addJob('leave-status', {
                maNghiPhep: maNghiPhep,
                ngayNghiData: data
            });

            return BaseResponse.sendSuccess(res, null, "NgayNghi updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);

        }
    }

    deleteNgayNghi = async (req: Request, res: Response) => {
        try {
            const ngayNghiDto = new DeleteNgayNghiDto(parseInt(req.params.maNghiPhep));
            await ngayNghiDto.validate();
            await this.ngayNghiService.deleteNgayNghi(ngayNghiDto.maNghiPhep);
            return BaseResponse.sendSuccess(res, null, "NgayNghi deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default NgayNghiController;