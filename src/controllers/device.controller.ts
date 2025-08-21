import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import EmployeeServiceClient from "../rpc/employee.client";
import DeviceConnectorClient from "../rpc/device.client";
import {Request, Response} from "express";
import BaseResponse from "../utils/base.response";
import NhanVienService from "../services/nhanvien.service";

@injectable()
class DeviceController {
    constructor(@inject(TYPES.EmployeeServiceClient) private readonly employeeService: EmployeeServiceClient,
                @inject(TYPES.DeviceConnectorClient) private readonly deviceConnectorClient: DeviceConnectorClient,
                @inject(TYPES.NhanVienService) private readonly nhanVienService: NhanVienService) {
    }
    connect = async (req: Request, res: Response) => {
        try {
            const {ipAddress, port} = req.body;

            if (!ipAddress || !port) {
                return BaseResponse.sendBadRequest(res, "IP address and port are required");
            }

            // Lấy JWT từ header Authorization
            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const connectionResult = await this.deviceConnectorClient.connect(ipAddress, port, jwt);
            if (connectionResult.success) {
                return BaseResponse.sendSuccess(res, null, "Device connected successfully");
            }else {
                return BaseResponse.sendError(res, new Error(connectionResult.message || "Failed to connect to device"));
            }
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    disconnect = async (req: Request, res: Response) => {
        try {
            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.deviceConnectorClient.disconnect(jwt);

            if (result.success) {
                return BaseResponse.sendSuccess(res, null, "Device disconnected successfully");
            } else {
                return BaseResponse.sendError(res, new Error(result.message || "Failed to disconnect device"));
            }
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    syncDeviceTime = async (req: Request, res: Response) => {
        try {
            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.deviceConnectorClient.syncDeviceTime(jwt);

            if (result.success) {
                return BaseResponse.sendSuccess(res, null, result.message || "Device time synchronized successfully");
            } else {
                return BaseResponse.sendError(res, new Error(result.message || "Failed to synchronize device time"));
            }
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    syncAttendanceRecords = async (req: Request, res: Response) => {
        try {
            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.employeeService.syncAttendanceData(jwt);

            if (result.success) {
                return BaseResponse.sendSuccess(res, null, result.message || "Attendance records synchronized successfully");
            } else {
                return BaseResponse.sendError(res, new Error(result.message || "Failed to synchronize attendance records"));
            }
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    uploadBatchNhanVien = async (req: Request, res: Response) => {
        try {
            const {nhanViens} = req.body;

            if (!nhanViens || nhanViens.length === 0) {
                return BaseResponse.sendNotFound(res, "No employees found to upload");
            }

            const employeesData = nhanViens.map((nv: { maNhanVien: number; hoTen: string; trangThai: string; }) => ({
                employeeId: nv.maNhanVien,
                name: nv.hoTen,
                password: "",
                privilege: 0,
                enable: nv.trangThai === "Đang làm"
            }));

            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const batchResult = await this.employeeService.batchUploadEmployeeData(employeesData, jwt);

            const uploadResults = batchResult.results.map(result => ({
                maNhanVien: result.employee_id,
                success: result.success,
                message: result.message
            }));

            return BaseResponse.sendSuccess(res, {
                successCount: batchResult.success_count,
                failedCount: batchResult.failure_count,
                details: uploadResults
            }, batchResult.message || "Employee data uploaded successfully");

        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    uploadNhanVien = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien, 10);

            if (!maNhanVien) {
                return BaseResponse.sendBadRequest(res, "Employee ID is required");
            }

            const nhanVien = await this.nhanVienService.getNhanVienById(maNhanVien);

            if (!nhanVien) {
                return BaseResponse.sendNotFound(res, "Employee not found");
            }

            const employeeData = {
                employeeId: nhanVien.maNhanVien,
                name: nhanVien.hoTen,
                password: "",
                privilege: 0,
                enable: nhanVien.trangThai === "Đang làm"
            }

            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.employeeService.uploadEmployeeData(employeeData, jwt);

            return BaseResponse.sendSuccess(res, result);
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    uploadBatchNhanVienVanTay = async (req: Request, res: Response) => {
        try {
            const {nhanVienIds} = req.body;

            if (!nhanVienIds || nhanVienIds.length === 0) {
                return BaseResponse.sendNotFound(res, "No employee IDs provided for fingerprint upload");
            }

            const fingerprints = await this.nhanVienService.getAllNhanVienVanTay(nhanVienIds);

            if (!fingerprints || fingerprints.length === 0) {
                return BaseResponse.sendNotFound(res, "No fingerprints found for the provided employee IDs");
            }

            const fingerprintList = fingerprints.map(fp => ({
                employeeId: fp.maNhanVien,
                fingerIndex: fp.viTriNgonTay,
                fingerData: fp.duLieuNgonTay,
            }));

            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const batchResult = await this.employeeService.batchUploadFingerprints(fingerprintList, jwt);

            return BaseResponse.sendSuccess(res, {
                successCount: batchResult.success_count,
                failedCount: batchResult.failure_count,
                message: batchResult.message || "Fingerprint data uploaded successfully"
            });
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    uploadNhanVienVanTay = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien, 10);

            if (!maNhanVien) {
                return BaseResponse.sendBadRequest(res, "Employee ID is required");
            }

            const fingerprint = await this.nhanVienService.getNhanVienVanTay(maNhanVien);

            if (!fingerprint || fingerprint.length === 0) {
                return BaseResponse.sendNotFound(res, "Fingerprint not found for this employee");
            }

            const fingerprintList = fingerprint.map(fp => ({
                employeeId: fp.maNhanVien,
                fingerIndex: fp.viTriNgonTay,
                fingerData: fp.duLieuNgonTay,
            }));

            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.employeeService.batchUploadFingerprints(fingerprintList, jwt);

            return BaseResponse.sendSuccess(res, {
                successCount: result.success_count,
                failedCount: result.failure_count,
                message: result.message || "Fingerprint data uploaded successfully"
            });

        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    getAllNhanVien = async (req: Request, res: Response) => {
        try {
            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.employeeService.getAllEmployees(jwt);

            if (!result || result.employees.length === 0) {
                return BaseResponse.sendNotFound(res, "No employees found");
            }

            return BaseResponse.sendSuccess(
                res,
                result,
            );
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    getAllNhanVienVanTay = async (req: Request, res: Response) => {
        try {
            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.employeeService.getAllFingerprints(jwt);

            return BaseResponse.sendSuccess(
                res,
                {
                    success: result.success_count,
                },
                result.message || "Fingerprint data fetched successfully"
            );
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    getNhanVienVanTay = async (req: Request, res: Response) => {
        try {
            const maNhanVien = parseInt(req.params.maNhanVien, 10);

            if (!maNhanVien) {
                return BaseResponse.sendBadRequest(res, "Employee ID is required");
            }

            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.employeeService.getFingerprintData(maNhanVien, jwt)

            return BaseResponse.sendSuccess(res, result);
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    deleteNhanVien = async (req: Request, res: Response) => {
        try {
            const { maNhanVien } = req.params;

            if (!maNhanVien) {
                return BaseResponse.sendBadRequest(res, "Employee ID is required");
            }

            const employeeId = parseInt(maNhanVien, 10);
            if (isNaN(employeeId)) {
                return BaseResponse.sendBadRequest(res, "Employee ID must be a number");
            }

            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.employeeService.deleteEmployeeData(employeeId, jwt);

            if (result.success) {
                return BaseResponse.sendSuccess(res, null, result.message || "Employee deleted from device successfully");
            } else {
                return BaseResponse.sendBadRequest(res, result.message || "Failed to delete employee from device");
            }
        }catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    deleteNhanVienVanTay = async (req: Request, res: Response) => {
        try {
            const result = await this.processDeleteFingerprint(req);

            if (result.success) {
                return BaseResponse.sendSuccess(res, null, result.message);
            } else {
                return BaseResponse.sendBadRequest(res, result.message);
            }
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    private readonly processDeleteFingerprint = async (req: Request) => {
        // Extract parameters
        const { maNhanVien, viTriNgonTay } = req.params;

        // Validate required parameters
        if (!maNhanVien || !viTriNgonTay) {
            return { success: false, message: "Employee ID and finger index are required" };
        }

        // Parse and validate numeric values
        const employeeId = parseInt(maNhanVien, 10);
        const fingerIndex = parseInt(viTriNgonTay, 10);

        if (isNaN(employeeId) || isNaN(fingerIndex)) {
            return { success: false, message: "Employee ID and finger index must be numbers" };
        }

        // Extract JWT token
        const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;

        // Call service to delete fingerprint
        const result = await this.employeeService.deleteFingerprint(employeeId, fingerIndex, jwt);

        return {
            success: result.success,
            message: result.message || (result.success ? "Fingerprint deleted successfully" : "Failed to delete fingerprint")
        };
    }
    clearAdmin = async (req: Request, res: Response) => {
        try {
            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.deviceConnectorClient.clearAdmin(jwt);

            if (result.success) {
                return BaseResponse.sendSuccess(res, null, result.message || "Admin rights cleared successfully");
            } else {
                return BaseResponse.sendBadRequest(res, result.message || "Failed to clear admin rights");
            }
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
    clearGLog = async (req: Request, res: Response) => {
        try {
            const jwt = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
            const result = await this.deviceConnectorClient.clearGLog(jwt);

            if (result.success) {
                return BaseResponse.sendSuccess(res, null, result.message || "GLog cleared successfully");
            } else {
                return BaseResponse.sendBadRequest(res, result.message || "Failed to clear GLog");
            }
        } catch (error) {
            return BaseResponse.sendError(res, error);
        }
    }
}

export default DeviceController;