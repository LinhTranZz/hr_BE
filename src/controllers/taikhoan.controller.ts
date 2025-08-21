import { inject, injectable } from "inversify";
import { TYPES } from "../configs/types";
import TaiKhoanService from "../services/taikhoan.service";
import { CreateTaiKhoanDto } from "../dto/request/taikhoan/create.taikhoan.dto";
import { UpdateTaiKhoanDto } from "../dto/request/taikhoan/update.taikhoan.dto";
import BaseResponse from "../utils/base.response";
import {Request, Response} from "express";
import {LoginTaiKhoanDto} from "../dto/request/taikhoan/login.taikhoan.dto";
import {ITaiKhoanModel} from "../interfaces/models/taikhoan.model";
import {TaiKhoanResponseDto} from "../dto/response/taikhoan.response.dto";
import {DeleteTaiKhoanDto} from "../dto/request/taikhoan/delete.taikhoan.dto";

@injectable()
class TaiKhoanController {

    constructor(@inject(TYPES.TaiKhoanService) private readonly taiKhoanService: TaiKhoanService) {
    }

    getTaiKhoan = async (_req: Request, res: Response) => {
        try {
            const result = await this.taiKhoanService.getTaiKhoan();

            if (!result || result.length === 0) {
                return BaseResponse.sendNotFound(res, "No TaiKhoan data found");
            }

            const response = result.map(taiKhoan => new TaiKhoanResponseDto(taiKhoan));

            return BaseResponse.sendSuccess(res, response, "TaiKhoan data fetched successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    createTaiKhoan = async (req: Request, res: Response) => {
        try {
            const taiKhoanDto = new CreateTaiKhoanDto(req.body);
            await taiKhoanDto.validate()

            await this.taiKhoanService.createTaiKhoan(taiKhoanDto)
            return BaseResponse.sendCreated(res, taiKhoanDto, "Tài khoản created successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    updateTaiKhoan = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien);
            const data: ITaiKhoanModel = {
                maNhanVien: maNhanVien,
                tenDangNhap: req.body.tenDangNhap,
                matKhau: req.body.matKhau
            }

            const taiKhoanDto = new UpdateTaiKhoanDto(data);
            await taiKhoanDto.validate()

            await this.taiKhoanService.updateTaiKhoan(taiKhoanDto)
            return BaseResponse.sendSuccess(res, taiKhoanDto, "Tài khoản updated successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    deleteTaiKhoan = async (req: Request, res: Response) => {
        try {
            const taiKhoanDto = new DeleteTaiKhoanDto(parseInt(req.params.maNhanVien));
            await taiKhoanDto.validate();
            await this.taiKhoanService.deleteTaiKhoan(taiKhoanDto.maNhanVien);
            return BaseResponse.sendSuccess(res, null, "Tài khoản deleted successfully");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const loginDto = new LoginTaiKhoanDto(req.body);
            await loginDto.validate();

            const result = await this.taiKhoanService.login(loginDto.tenDangNhap, loginDto.matKhau);

            if (!result) {
                return BaseResponse.sendUnauthorized(res, "Invalid username or password");
            }

            return BaseResponse.sendSuccess(res, result, "Login successful");
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default TaiKhoanController;