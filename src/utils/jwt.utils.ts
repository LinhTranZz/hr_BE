import jwt, { SignOptions, Secret, JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';
import env from '../configs/env';
import logger from './logger';

class JwtUtils {
    private static readonly SECRET_KEY: Secret = env.getJwtSecret();
    private static readonly TOKEN_EXPIRY: string = env.getJwtExpiry();

    static generateToken(user: { maNhanVien: number; tenDangNhap: string ; maVaiTro: number}): string {
        const payload = {
            id: user.maNhanVien,
            username: user.tenDangNhap,
            role: user.maVaiTro
        };

        // Correctly type the options object
        const options: SignOptions = {
            expiresIn: parseInt(JwtUtils.TOKEN_EXPIRY)
        };

        return jwt.sign(payload, JwtUtils.SECRET_KEY, options);
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, JwtUtils.SECRET_KEY);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                logger.warn(`Token expired: ${error.message}`);
            } else if (error instanceof JsonWebTokenError) {
                logger.warn(`JWT error: ${error.message}`);
            } else if (error instanceof NotBeforeError) {
                logger.warn(`Token not yet valid: ${error.message}`);
            } else {
                logger.error(`Unexpected token verification error: ${error}`);
            }
            return null;
        }
    }

    static extractUserFromToken(token: string): { maNhanVien: number; tenDangNhap: string ; maVaiTro: number} | null {
        const decoded = this.verifyToken(token);
        if (!decoded) return null;

        return {
            maNhanVien: decoded.id,
            tenDangNhap: decoded.username,
            maVaiTro: decoded.role,
        };
    }
}

export default JwtUtils;
