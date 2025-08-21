import { Response, NextFunction } from 'express';
import BaseResponse from '../utils/base.response';
import JwtUtils from '../utils/jwt.utils';
import { PermissionEnum } from '../enums/permission.enum';
import { AuthenticatedRequest} from '../interfaces/auth.request';
import {container} from "../configs/inversify.config";
import VaiTroRepository from "../repositories/vaitro.repository";
import {TYPES} from "../configs/types";

/**
 * Xử lý việc kiểm tra quyền hạn của người dùng
 * @param req Request
 * @param res Response
 * @param permission Quyền cần kiểm tra
 * @returns
 *   - true nếu xử lý thành công và người dùng có quyền
 *   - false nếu xử lý đã trả về lỗi
 */
const processPermissionCheck = async (
    req: AuthenticatedRequest,
    res: Response,
    permission: PermissionEnum
): Promise<boolean> => {
    const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
        BaseResponse.sendUnauthorized(res, 'Access token not provided');
        return false;
    }

    const token = authHeader.split(' ')[1];

    const user = JwtUtils.extractUserFromToken(token);

    if (!user) {
        BaseResponse.sendUnauthorized(res, 'Invalid token');
        return false;
    }

    const vaiTroRepository = container.get<VaiTroRepository>(TYPES.VaiTroRepository);

    const permissions = await vaiTroRepository.findPermissionByVaiTroId(user.maVaiTro);

    const permissionCodes = permissions.map(permission => permission.maQuyenHan.toString());

    if (permissionCodes.includes(PermissionEnum.IS_ADMIN) || permissionCodes.includes(PermissionEnum.FULL_ACCESS)) {
        req.user = user;
        return true;
    }

    if (!permissionCodes.includes(permission)) {
        BaseResponse.sendForbidden(res, `Permission ${permission} required to access this resource`);
        return false;
    }

    req.user = user;
    return true;
};

/**
 * Middleware kiểm tra người dùng có quyền cụ thể được yêu cầu
 * @param permission Quyền cần kiểm tra từ PermissionEnum
 * @returns Middleware function
 */
export const checkPermission =  (permission: PermissionEnum) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const permissionGranted = await processPermissionCheck(req, res, permission);

            if (permissionGranted) {
                next();
            }
        } catch (error) {
            return BaseResponse.sendError(res, error, 'Error checking permission');
        }
    };
};
