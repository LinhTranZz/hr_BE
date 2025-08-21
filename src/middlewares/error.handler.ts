import { Request, Response, NextFunction } from "express";
import BaseResponse from "../utils/base.response";
import logger from "../utils/logger";

/**
 * Handler for 404 errors - routes not found
 * This middleware should only run if no previous middleware responded
 */
const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
    // Only send a response if one hasn't been sent already
    if (!res.headersSent) {
        BaseResponse.sendNotFound(res, `Route not found: ${req.method} ${req.originalUrl}`);
    }
};

/**
 * Middleware for handling errors
 * This middleware is triggered when an error is passed to next()
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Only send a response if one hasn't been sent already
    if (!res.headersSent) {
        BaseResponse.sendError(res, err, err.message ?? 'Internal Server Error');
    } else {
        // If headers have already been sent, just log the error
        logger.error("Error occurred after response was sent:", err);
        next(err);
    }
};

export { notFoundHandler, errorHandler };
