import {inject, injectable} from "inversify";
import {IPhuCapService} from "../interfaces/services/phucap.service";
import {TYPES} from "../configs/types";
import {Request, Response} from "express";
import BaseResponse from "../utils/base.response";
import {CreatePhuCapDto} from "../dto/request/phucap/create.phucap.dto";
import {IPhuCapModel} from "../interfaces/models/phucap.model";
import {UpdatePhuCapDto} from "../dto/request/phucap/update.phucap.dto";
import {DeletePhuCapDto} from "../dto/request/phucap/delete.phucap.dto";
@injectable()
class PhuCapController {
    constructor(@inject(TYPES.PhuCapService) private readonly phuCapService: IPhuCapService) {
    }

    getAllPhuCaps = async (_req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.phuCapService.getAllPhuCaps();
            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No PhuCap data found");
            }

            return BaseResponse.sendSuccess(res, result, "PhuCap data fetched successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch PhuCap data");
        }
    }

    createPhuCap = async (req: Request, res: Response): Promise<void> => {
        try {
            const phuCapDto = new CreatePhuCapDto(req.body);
            await phuCapDto.validate();

            const data : IPhuCapModel = {
                maVaiTro: phuCapDto.maVaiTro,
                tenPhuCap: phuCapDto.tenPhuCap,
                soTienPhuCap: phuCapDto.soTienPhuCap,
            }

            await this.phuCapService.createPhuCap(data);

            return BaseResponse.sendCreated(res, phuCapDto, "PhuCap created successfully");
        }catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create PhuCap");
        }
    }

    updatePhuCap = async (req: Request, res: Response): Promise<void> => {
        try {
            const maPhuCap = parseInt(req.params.maPhuCap);
            const phuCapDto = new UpdatePhuCapDto(maPhuCap, req.body);
            await phuCapDto.validate();

            const data: IPhuCapModel = {
                maPhuCap: phuCapDto.maPhuCap,
                maVaiTro: phuCapDto.maVaiTro,
                tenPhuCap: phuCapDto.tenPhuCap,
                soTienPhuCap: phuCapDto.soTienPhuCap,
            }

            await this.phuCapService.updatePhuCap(data);

            return BaseResponse.sendSuccess(res, null, "PhuCap updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update PhuCap");
        }
    }

    deletePhuCap = async (req: Request, res: Response): Promise<void> => {
        try {
            const maPhuCap = parseInt(req.params.maPhuCap);
            const maVaiTro = parseInt(req.params.maVaiTro);

            const phuCapDto = new DeletePhuCapDto(maPhuCap, maVaiTro);
            await phuCapDto.validate();

            await this.phuCapService.deletePhuCap(phuCapDto.maPhuCap, phuCapDto.maVaiTro);

            return BaseResponse.sendSuccess(res, null, "PhuCap deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete PhuCap");
        }
    }
}

export default PhuCapController;