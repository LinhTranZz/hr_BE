import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import VaiTroService from "../services/vaitro.service";
import BaseResponse from "../utils/base.response";
import { Request, Response } from "express";
import { CreateVaiTroDto } from "../dto/request/vaitro/create.vaitro.dto";
import { IVaiTroModel } from "../interfaces/models/vaitro.model";
import { UpdateVaiTroDto } from "../dto/request/vaitro/update.vaitro.dto";
import { DeleteVaiTroDto } from "../dto/request/vaitro/delete.vaitro.dto";
import { PermissionEnum } from "../enums/permission.enum";
import { container } from "../configs/inversify.config";
import VaiTroRepository from "../repositories/vaitro.repository";
import { AuthenticatedRequest } from "../interfaces/auth.request";

@injectable()
class VaiTroController {
    constructor(@inject(TYPES.VaiTroService) private readonly vaiTroService: VaiTroService) { }

    getAllVaiTro = async (_req: Request, res: Response) => {
        try {
            const result = await this.vaiTroService.getAllVaiTro();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No VaiTro data found");
            }

            return BaseResponse.sendSuccess(res, result, "VaiTro data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error, "VaiTro data fetched error");
        }
    }

    createVaiTro = async (req: Request, res: Response) => {
        try {
            const vaiTroDto = new CreateVaiTroDto(req.body)
            await vaiTroDto.validate();

            const data: IVaiTroModel = {
                tenVaiTro: vaiTroDto.tenVaiTro,
                // maPhongBan: vaiTroDto.maPhongBan
            }

            await this.vaiTroService.createVaiTro(data);
            return BaseResponse.sendCreated(res, vaiTroDto, `${data.tenVaiTro} created successfully`);
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to create VaiTro");
        }
    }

    deleteVaiTro = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const vaiTroDto = new DeleteVaiTroDto(parseInt(req.params.maVaiTro));
            await vaiTroDto.validate();

            const currentUser = req.user;
            if (!currentUser) {
                return BaseResponse.sendUnauthorized(res, "Unauthorized");
            }

            await this.vaiTroService.deleteVaiTro(vaiTroDto.maVaiTro, currentUser);
            return BaseResponse.sendSuccess(res, vaiTroDto, `VaiTro with id:${vaiTroDto.maVaiTro} deleted successfully`);
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to delete VaiTro");
        }
    }

    updateVaiTro = async (req: Request, res: Response) => {
        try {
            const maVaiTro = parseInt(req.params.maVaiTro);
            const vaiTroDto = new UpdateVaiTroDto(maVaiTro, req.body);

            const data: IVaiTroModel = {
                maVaiTro: vaiTroDto.maVaiTro,
                tenVaiTro: vaiTroDto.tenVaiTro,
                // maPhongBan: vaiTroDto.maPhongBan
            }
            await this.vaiTroService.updateVaiTro(data);
            return BaseResponse.sendSuccess(res, vaiTroDto, `Update ${data.tenVaiTro} is Successfully`);
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to update VaiTro");
        }
    }

    addPermissionToVaiTro = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const maVaiTro = parseInt(req.params.maVaiTro);
            const maQuyenHan = req.params.maQuyenHan;

            if(!maVaiTro || !maQuyenHan) {
                return BaseResponse.sendBadRequest(res, "Invalid VaiTro or QuyenHan ID");
            }

            const currentUser = req.user;
            if (!currentUser) {
                return BaseResponse.sendUnauthorized(res, "Unauthorized");
            }

            await this.vaiTroService.addPermissionToVaiTro(maVaiTro, maQuyenHan, currentUser);
            return BaseResponse.sendSuccess(res, null, `Permission with ID ${maQuyenHan} added to VaiTro with ID ${maVaiTro}`);
        }catch (error) {
            return BaseResponse.sendError(res, error, "Failed to add permission to VaiTro");
        }
    }

    removePermissionFromVaiTro = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const maVaiTro = parseInt(req.params.maVaiTro);
            const maQuyenHan = req.params.maQuyenHan;
            const currentUser = req.user;

            if(!maVaiTro || !maQuyenHan) {
                return BaseResponse.sendBadRequest(res, "Invalid VaiTro or QuyenHan ID");
            }

            if (!currentUser) {
                return BaseResponse.sendUnauthorized(res, "User not authenticated");
            }

            const result = await this.vaiTroService.removePermissionFromVaiTro(maVaiTro, maQuyenHan, currentUser);

            if (!result) {
                return BaseResponse.sendNotFound(res, `Permission with ID ${maQuyenHan} not found for VaiTro with ID ${maVaiTro}`);
            }

            return BaseResponse.sendSuccess(res, null, `Permission with ID ${maQuyenHan} removed from VaiTro with ID ${maVaiTro}`);
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to remove permission from VaiTro");
        }
    }

    getAllPermissions = async (req: Request, res: Response) => {
        try {
            const result = await this.vaiTroService.getAllPermissions();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, `No permissions found`);
            }

            return BaseResponse.sendSuccess(res, result, `Permissions for VaiTro fetched successfully`);
        } catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch permissions for VaiTro");
        }
    }

    getPermissionByVaiTroId = async (req: Request, res: Response) => {
        try {
            const maVaiTro = parseInt(req.params.maVaiTro);

            if (!maVaiTro) {
                return BaseResponse.sendBadRequest(res, "Invalid VaiTro ID");
            }

            const result = await this.vaiTroService.getPermissionsByVaiTro(maVaiTro);

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, `No permissions found for VaiTro with ID ${maVaiTro}`);
            }

            const permissionCodes = result.map(permission => permission.maQuyenHan.toString());

            return BaseResponse.sendSuccess(res, permissionCodes, `Permissions for VaiTro with ID ${maVaiTro} fetched successfully`);
        }catch (error) {
            return BaseResponse.sendError(res, error, "Failed to fetch permissions for VaiTro");
        }
    }
}

export default VaiTroController
