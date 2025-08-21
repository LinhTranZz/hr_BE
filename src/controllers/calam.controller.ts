import { Request, Response } from 'express';
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import CaLamService from '../services/calam.service';
import { ICaLamModel } from '../interfaces/models/calam.model';
import BaseResponse from '../utils/base.response'
import { CreateCaLamDto } from '../dto/request/calam/create.calam.dto';
import {UpdateCaLamDto} from "../dto/request/calam/update.calam.dto";
import {DeleteCaLamDto} from "../dto/request/calam/delete.calam.dto";

@injectable()
class CaLamController {
    constructor(@inject(TYPES.CaLamService) private readonly caLamService: CaLamService) {}

    getAllCaLams = async (_req: Request, res: Response): Promise<void> => {
        try {
            const caLams = await this.caLamService.getAllCaLams();

            if(!caLams || caLams.length === 0) {
                return BaseResponse.sendNotFound(res, "No CaLam data found");
            }

            return BaseResponse.sendSuccess(res, caLams, "CaLam data fetched successfully;")
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch CaLam data");
        }
    }

    createCaLam = async (req: Request, res: Response): Promise<void> => {
        try {
            const caLamDto = new CreateCaLamDto(req.body);

            await caLamDto.validate();

            const caLamData: ICaLamModel = {
                tenCa: caLamDto.tenCa,
            };
            await this.caLamService.createCaLam(caLamData);
            return BaseResponse.sendCreated(res, caLamData, "CaLam created successfully");
        } catch (error: any) {
            return BaseResponse.sendError(res, error);
        }
    }

    updateCaLam = async (req: Request, res: Response): Promise<void> =>{
        try {
            const maCa = parseInt(req.params.maCa);
            const caLamDto = new UpdateCaLamDto(maCa, req.body);

            await caLamDto.validate();

            const caLamData: ICaLamModel = {
                maCa: caLamDto.maCa,
                tenCa: caLamDto.tenCa,
            };
            await this.caLamService.updateCaLam(maCa, caLamData);

            return BaseResponse.sendSuccess(res, caLamDto, "CaLam updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    deleteCaLam= async (req: Request, res: Response): Promise<void> => {
        try {
            const caLamDto = new DeleteCaLamDto(parseInt(req.params.maCa));
            await caLamDto.validate();
            const success = await this.caLamService.deleteCaLam(caLamDto.maCa);
            
            if (!success) {
                return BaseResponse.sendNotFound(res, "CaLam not found");
            }
            
            return BaseResponse.sendSuccess(res, success, "CaLam deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete CaLam");
        }
    }
}

export default CaLamController
