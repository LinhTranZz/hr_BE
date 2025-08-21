import { Response } from "express";
import logger from "./logger";

class BaseResponse {
    private static instance: BaseResponse;

    private constructor() {}

    public static getInstance(): BaseResponse {
        if (!BaseResponse.instance) {
            BaseResponse.instance = new BaseResponse();
        }
        return BaseResponse.instance;
    }

    /**
     * Formats data for logging to make it more readable
     * @param data The data to format
     * @returns A formatted string representation of the data
     */
    private formatDataForLog(data: any): string {
        if (!data || typeof data !== 'object') {
            return String(data);
        }
        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (_key: string, value: any) => {
                if (typeof value === 'object' && value !== null) {
                    if (seen.has(value)) {
                        return '[Circular Reference]';
                    }
                    seen.add(value);
                }
                return value;
            };
        };

        return '\n' + JSON.stringify(data, getCircularReplacer(), 2);
    }

    sendSuccess(response: Response, data: any, message: string = "Success") {
        logger.info(`Success: ${message}, Data: ${this.formatDataForLog(data)}`);
        const responseBody: any = {
            status: "success",
            message,
        };
        if (data !== null) {
            responseBody.data = data;
        }
        response.status(200).json(responseBody);
    }

   sendError(response: Response, error: any, message: string = "Error") {
       const errorInfo = {
           message: error.message ?? message
       };

       logger.error(`Error: ${errorInfo.message}, Details: ${this.formatDataForLog(error)}`);

       response.status(500).json({
           message: errorInfo.message,
           detail: error.code ?? error
       });
   }

    sendNotFound(response: Response, message: string = "Not Found") {
        logger.warn(`Not Found: ${message}`);
        response.status(404).json({
            status: "fail",
            message,
        });
    }

    sendBadRequest(response: Response, message: string = "Bad Request") {
        logger.warn(`Bad Request: ${message}`);
        response.status(400).json({
            status: "fail",
            message,
        });
    }

    sendUnauthorized(response: Response, message: string = "Unauthorized") {
        logger.warn(`Unauthorized: ${message}`);
        response.status(401).json({
            status: "fail",
            message,
        });
    }

    sendForbidden(response: Response, message: string = "Access denied") {
        logger.warn(`Forbidden: ${message}`);
        response.status(403).json({
            status: "error",
            message
        });
    }

    sendConflict(response: Response, message: string = "Conflict") {
        logger.warn(`Conflict: ${message}`);
        response.status(409).json({
            status: "fail",
            message,
        });
    }

    sendCreated(response: Response, data: any, message: string = "Resource Created") {
        logger.info(`Resource Created: ${message}, Data: ${this.formatDataForLog(data)}`);
        response.status(201).json({
            status: "success",
            message,
            data,
        });
    }

    sendNoContent(response: Response, message: string = "No Content") {
        logger.info(`No Content: ${message}`);
        response.status(204).json({
            status: "success",
            message,
        });
    }
}

export default BaseResponse.getInstance();
