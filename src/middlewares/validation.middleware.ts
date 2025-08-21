import { Request, Response, NextFunction } from 'express';
import BaseResponse from '../utils/base.response';

/**
 * Middleware để validate integer parameter
 */
export const validateIntegerParam = (paramName: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = req.params[paramName];
        if (!value || isNaN(parseInt(value))) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be a valid integer`);
        }
        next();
    };
};

/**
 * Middleware để validate positive integer parameter
 */
export const validatePositiveIntegerParam = (paramName: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = parseInt(req.params[paramName]);
        if (isNaN(value) || value <= 0) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be a positive integer`);
        }
        next();
    };
};

/**
 * Middleware để validate range cho parameter (min <= value <= max)
 */
export const validateRangeParam = (paramName: string, min: number, max: number) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = parseInt(req.params[paramName]);
        if (isNaN(value) || value < min || value > max) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be a valid integer between ${min} and ${max}`);
        }
        next();
    };
};

/**
 * Middleware để validate required parameters
 */
export const validateRequiredParams = (paramNames: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        for (const paramName of paramNames) {
            if (!req.params[paramName]) {
                return BaseResponse.sendBadRequest(res, `${paramName} is required`);
            }
        }
        next();
    };
};

/**
 * Middleware để validate ngayTrongTuan (1-7) - specific cho CaLamTrongTuan
 */
export const validateNgayTrongTuan = (req: Request, res: Response, next: NextFunction): void => {
    const ngayTrongTuan = parseInt(req.params.ngayTrongTuan);
    if (isNaN(ngayTrongTuan) || ngayTrongTuan < 1 || ngayTrongTuan > 7) {
        return BaseResponse.sendBadRequest(res, 'ngayTrongTuan must be a valid integer between 1 and 7');
    }
    next();
};

/**
 * Validate integer parameter
 */
const validateIntegerType = (req: Request, paramName: string): string | null => {
    if (!req.params[paramName] || isNaN(parseInt(req.params[paramName]))) {
        return `${paramName} must be a valid integer`;
    }
    return null;
};

/**
 * Validate positive integer parameter
 */
const validatePositiveIntegerType = (req: Request, paramName: string): string | null => {
    const intValue = parseInt(req.params[paramName]);
    if (isNaN(intValue) || intValue <= 0) {
        return `${paramName} must be a positive integer`;
    }
    return null;
};

/**
 * Validate range parameter
 */
const validateRangeType = (req: Request, paramName: string, min?: number, max?: number): string | null => {
    if (min !== undefined && max !== undefined) {
        const rangeValue = parseInt(req.params[paramName]);
        if (isNaN(rangeValue) || rangeValue < min || rangeValue > max) {
            return `${paramName} must be a valid integer between ${min} and ${max}`;
        }
    }
    return null;
};

/**
 * Validate required parameter
 */
const validateRequiredType = (req: Request, paramName: string): string | null => {
    if (!req.params[paramName]) {
        return `${paramName} is required`;
    }
    return null;
};

/**
 * Validate single parameter based on type
 */
const validateSingleParam = (req: Request, validation: {
    paramName: string;
    type: 'integer' | 'positiveInteger' | 'range' | 'required';
    min?: number;
    max?: number;
}): string | null => {
    const { paramName, type, min, max } = validation;

    switch (type) {
        case 'integer': {
            return validateIntegerType(req, paramName);
        }
        case 'positiveInteger': {
            return validatePositiveIntegerType(req, paramName);
        }
        case 'range': {
            return validateRangeType(req, paramName, min, max);
        }
        case 'required': {
            return validateRequiredType(req, paramName);
        }
        default: {
            return null;
        }
    }
};

/**
 * Middleware để validate multiple parameters cùng lúc
 */
export const validateMultipleParams = (validations: Array<{
    paramName: string;
    type: 'integer' | 'positiveInteger' | 'range' | 'required';
    min?: number;
    max?: number;
}>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        for (const validation of validations) {
            const errorMessage = validateSingleParam(req, validation);
            if (errorMessage) {
                return BaseResponse.sendBadRequest(res, errorMessage);
            }
        }
        next();
    };
};

/**
 * Middleware để validate UUID format
 */
export const validateUUID = (paramName: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = req.params[paramName];
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!value || !uuidRegex.test(value)) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be a valid UUID`);
        }
        next();
    };
};

/**
 * Middleware để validate email format
 */
export const validateEmail = (paramName: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = req.params[paramName];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be a valid email address`);
        }
        next();
    };
};

/**
 * Middleware để validate date format (YYYY-MM-DD)
 */
export const validateDate = (paramName: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = req.params[paramName];
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!value || !dateRegex.test(value)) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be a valid date in YYYY-MM-DD format`);
        }
        
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be a valid date`);
        }
        next();
    };
};

/**
 * Middleware để validate time format (HH:mm:ss)
 */
export const validateTime = (paramName: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = req.params[paramName];
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        if (!value || !timeRegex.test(value)) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be a valid time in HH:mm:ss format`);
        }
        next();
    };
};

/**
 * Middleware để validate enum values
 */
export const validateEnum = (paramName: string, allowedValues: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = req.params[paramName];
        if (!value || !allowedValues.includes(value)) {
            return BaseResponse.sendBadRequest(res, `${paramName} must be one of: ${allowedValues.join(', ')}`);
        }
        next();
    };
};
