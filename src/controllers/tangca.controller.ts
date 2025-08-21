import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import TangCaService from "../services/tangca.service";
import { Request, Response } from "express";
import BaseResponse from "../utils/base.response";
import { CreateTangCaDto } from "../dto/request/tangca/create.tangca.dto";
import { ITangCaModel } from "../interfaces/models/tangca.model";
import dayjs from "dayjs";
import { DeleteTangCaDto } from "../dto/request/tangca/delete.tangca.dto";

@injectable()
class TangCaController {
    constructor(@inject(TYPES.TangCaService) private readonly tangCaService: TangCaService) {
    }

    getTangCa = async (_req: Request, res: Response) => {
        try {
            const tangCaList = await this.tangCaService.getTangCa();

            if (!tangCaList || tangCaList.length === 0) {
                return BaseResponse.sendNotFound(res, "No Tang Ca data found");
            }

            return BaseResponse.sendSuccess(res, tangCaList, "Tang Ca data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    createTangCa = async (req: Request, res: Response) => {
        try {
            const tangCaDto = new CreateTangCaDto(req.body);
            await tangCaDto.validate()

            const baseDate = new Date().toISOString().split('T')[0];

            const data: ITangCaModel = {
                ngayChamCongTangCa: dayjs.utc(tangCaDto.ngayChamCongTangCa).toDate(),
                gioTangCaBatDau: dayjs.utc(`${baseDate}T${tangCaDto.gioTangCaBatDau}`).toDate(),
                gioTangCaKetThuc: dayjs.utc(`${baseDate}T${tangCaDto.gioTangCaKetThuc}`).toDate(),
                maPhongBan: tangCaDto.maPhongBan
            }

            await this.tangCaService.createTangCa(data);

            return BaseResponse.sendCreated(res, tangCaDto, "Tang Ca created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    updateTangCa = async (req: Request, res: Response) => {
        try {
            const maPhongBan = parseInt(req.params.maPhongBan);
            const tangCaDto = new CreateTangCaDto({ maPhongBan, ...req.body });
            await tangCaDto.validate()

            const baseDate = new Date().toISOString().split('T')[0];

            const data: ITangCaModel = {
                maPhongBan: tangCaDto.maPhongBan,
                ngayChamCongTangCa: dayjs.utc(tangCaDto.ngayChamCongTangCa).toDate(),
                gioTangCaBatDau: dayjs.utc(`${baseDate}T${tangCaDto.gioTangCaBatDau}`).toDate(),
                gioTangCaKetThuc: dayjs.utc(`${baseDate}T${tangCaDto.gioTangCaKetThuc}`).toDate()
            }

            await this.tangCaService.updateTangCa(data);

            return BaseResponse.sendSuccess(res, tangCaDto, "Tang Ca updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    deleteTangCa = async (req: Request, res: Response) => {
        try {
            const maPhongBan = parseInt(req.params.maPhongBan);
            const ngayChamCongTangCa = req.params.ngayChamCongTangCa;
            const tangCaDto = new DeleteTangCaDto({ maPhongBan, ngayChamCongTangCa });
            await tangCaDto.validate();

            await this.tangCaService.deleteTangCa(tangCaDto.maPhongBan, dayjs.utc(tangCaDto.ngayChamCongTangCa).toDate());
            return BaseResponse.sendSuccess(res, maPhongBan, `Tang Ca with id:${maPhongBan} deleted successfully`);
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default TangCaController;