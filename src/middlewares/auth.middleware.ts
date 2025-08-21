import { Response, NextFunction } from 'express';
import JwtUtils from '../utils/jwt.utils';
import BaseResponse from '../utils/base.response';
import { AuthenticatedRequest } from '../interfaces/auth.request';

interface SkipAuthRoute {
    path: string;
    method: string;
    pattern?: RegExp;
}

// Configuration for paths that skip authentication
const SKIP_AUTH_PATHS: SkipAuthRoute[] = [
    { path: '/taikhoan/login', method: 'POST' },
    { path: '/chamcong/vantay', method: 'POST' },
    { path: '/nhanvien/chitiet', method: 'POST' },
    { path: '/nhanvien', method: 'PATCH', pattern: /^\/nhanvien\/\d+$/ }, // Match /nhanvien/{id}
    { path: '/ngayphep', method: 'GET' },
    { path: '/ngaynghi', method: 'POST' },
];

/**
 * Check if the current request should skip authentication
 */
const shouldSkipAuthentication = (req: AuthenticatedRequest): boolean => {
    const currentPath = req.path;
    const pathWithoutApi = currentPath.replace(/^\/api/, '');

    return SKIP_AUTH_PATHS.some(route => {
        if (route.method !== req.method) return false;

        // If route has a pattern, use it for matching
        if (route.pattern) {
            return route.pattern.test(currentPath) || route.pattern.test(pathWithoutApi);
        }

        // Otherwise use exact path matching
        return route.path === currentPath || route.path === pathWithoutApi;
    });
};

/**
 * Validate and extract token from authorization header
 */
const extractTokenFromHeader = (authHeader: string | undefined, req: AuthenticatedRequest, res: Response): string | null => {
    if (!authHeader) {
        console.log(`[Auth Error] Missing Authorization header, path: ${req.path}, method: ${req.method}`);
        BaseResponse.sendUnauthorized(res, 'Unauthorized: Missing authentication token');
        return null;
    }

    if (!authHeader.startsWith('Bearer ')) {
        console.log(`[Auth Error] Invalid token format (should be 'Bearer token'), path: ${req.path}, method: ${req.method}`);
        BaseResponse.sendUnauthorized(res, 'Unauthorized: Invalid token format');
        return null;
    }

    return authHeader.split(' ')[1];
};

/**
 * Verify JWT token and extract user information
 */
    const verifyToken = (token: string, req: AuthenticatedRequest, res: Response): { maNhanVien: number; tenDangNhap: string; maVaiTro: number } | null => {
    const decodedUser = JwtUtils.extractUserFromToken(token);

    if (!decodedUser) {
        console.log(`[Auth Error] Invalid or expired token, path: ${req.path}, method: ${req.method}`);
        BaseResponse.sendUnauthorized(res, 'Unauthorized: Token invalid or expired');
        return null;
    }

    return decodedUser;
};

/**
 * Main authentication middleware
 */
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Check if authentication should be skipped
    if (shouldSkipAuthentication(req)) {
        return next();
    }

    // Extract token from authorization header
    const token = extractTokenFromHeader(req.headers.authorization, req, res);
    if (!token) return; // Response already sent in extractTokenFromHeader

    // Verify token and extract user
    const decodedUser = verifyToken(token, req, res);
    if (!decodedUser) return; // Response already sent in verifyToken

    // Authentication successful, set user on request object
    req.user = decodedUser;
    next();
};

export default authenticate;
