import express from "express";
import {container} from "../configs/inversify.config";
import DeviceController from "../controllers/device.controller";
import {TYPES} from "../configs/types";
import { validatePositiveIntegerParam, validateMultipleParams } from '../middlewares/validation.middleware';

export default () => {
    const router = express.Router();
    const deviceController = container.get<DeviceController>(TYPES.DeviceController);


    /**
     * @swagger
     * /device/employees:
     *   get:
     *     summary: Get all employees
     *     tags: [Devices]
     *     responses:
     *       200:
     *         description: Successfully retrieved all employees
     *       400:
     *         description: Bad request
     *       500:
     *         description: Server error
     */
    router.get("/employees", deviceController.getAllNhanVien);

    /**
     * @swagger
     * /device/employee/fingerprints:
     *   get:
     *     summary: Get all employee fingerprints
     *     tags: [Devices]
     *     responses:
     *       200:
     *         description: Successfully retrieved employee fingerprints
     *       400:
     *         description: Bad request
     *       500:
     *         description: Server error
     */
    router.get("/employee/fingerprints", deviceController.getAllNhanVienVanTay);

    /**
     * @swagger
     * /device/employee/fingerprints/{maNhanVien}:
     *   get:
     *     summary: Get fingerprints of a specific employee by ID
     *     tags: [Devices]
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the employee to retrieve fingerprints for
     *     responses:
     *       200:
     *         description: Successfully retrieved employee fingerprints
     *       400:
     *         description: Bad request
     */
    router.get("/employee/fingerprints/:maNhanVien", 
        validatePositiveIntegerParam('maNhanVien'),
        deviceController.getNhanVienVanTay
    );

    /**
     * @swagger
     * /device/connect:
     *   post:
     *     summary: Connect a device
     *     tags: [Devices]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - ipAddress
     *               - port
     *             properties:
     *               ipAddress:
     *                 type: string
     *                 description: IP address of the device
     *                 example: "192.168.2.202"
     *               port:
     *                 type: integer
     *                 description: Port number of the device
     *                 example: 4370
     *     responses:
     *       200:
     *         description: Device successfully connected
     *       400:
     *         description: Bad request
     */
    router.post("/connect", deviceController.connect);

    /**
     * @swagger
     * /device/disconnect:
     *   post:
     *     summary: Disconnect a device
     *     tags: [Devices]
     *     responses:
     *       200:
     *         description: Device time successfully synchronized
     *       400:
     *         description: Bad request
     */
    router.post("/disconnect", deviceController.disconnect);

    /**
     * @swagger
     * /device/sync/time:
     *   post:
     *     summary: Synchronize device time
     *     tags: [Devices]
     *     responses:
     *       200:
     *         description: Device time successfully synchronized
     *       400:
     *         description: Bad request
     */
    router.post("/sync/time", deviceController.syncDeviceTime);

    /**
     * @swagger
     * /device/sync/attendance-record:
     *   get:
     *     summary: Synchronize attendance records from device
     *     tags: [Devices]
     *     responses:
     *       200:
     *         description: Attendance records successfully synchronized
     *       400:
     *         description: Bad request
     */
    router.get("/sync/attendance-record", deviceController.syncAttendanceRecords);

    /**
     * @swagger
     * /device/upload/employees:
     *   post:
     *     summary: Upload a batch of employees' data to device
     *     tags: [Devices]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nhanViens:
     *                 type: array
     *                 description: List of employees to upload
     *                 items:
     *                   type: object
     *                   properties:
     *                     maNhanVien:
     *                       type: integer
     *                       description: Employee ID
     *                     hoTen:
     *                       type: string
     *                       description: Employee name
     *                     trangThai:
     *                       type: string
     *                       description: Employee status (e.g., "Đang làm", "Nghỉ việc")
     *     responses:
     *       200:
     *         description: Employees data successfully uploaded
     *       400:
     *         description: Bad request
     *       500:
     *         description: Server error
     */
    router.post("/upload/employees", deviceController.uploadBatchNhanVien)

    /**
     * @swagger
     * /device/upload/employee/{maNhanVien}:
     *   post:
     *     summary: Upload a single employee's data
     *     tags: [Devices]
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the employee to upload data for
     *     responses:
     *       200:
     *         description: Employee data successfully uploaded
     *       400:
     *         description: Bad request
     */
    router.post("/upload/employee/:maNhanVien", 
        validatePositiveIntegerParam('maNhanVien'),
        deviceController.uploadNhanVien
    );

    /**
     * @swagger
     * /device/upload/fingerprints:
     *   post:
     *     summary: Upload a batch of employees' fingerprints
     *     tags: [Devices]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nhanVienIds:
     *                 type: array
     *                 description: List of fingerprints to upload
     *                 items:
     *                   type: integer
     *     responses:
     *       200:
     *         description: Fingerprints successfully uploaded
     *       400:
     *         description: Bad request
     */
    router.post("/upload/fingerprints", deviceController.uploadBatchNhanVienVanTay);

    /**
     * @swagger
     * /device/upload/fingerprints/{maNhanVien}:
     *   post:
     *     summary: Upload a single employee's fingerprint
     *     tags: [Devices]
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the employee to upload fingerprint for
     *     responses:
     *       200:
     *         description: Fingerprint successfully uploaded for the employee
     *       400:
     *         description: Bad request
     */
    router.post("/upload/fingerprints/:maNhanVien", 
        validatePositiveIntegerParam('maNhanVien'),
        deviceController.uploadNhanVienVanTay
    );

    /**
     * @swagger
     * /device/employee/{maNhanVien}:
     *   delete:
     *     summary: Delete an employee by ID
     *     tags: [Devices]
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the employee to delete
     *     responses:
     *       200:
     *         description: Employee successfully deleted
     *       400:
     *         description: Bad request
     *       500:
     *         description: Server error
     */
    router.delete("/employee/:maNhanVien", 
        validatePositiveIntegerParam('maNhanVien'),
        deviceController.deleteNhanVien
    );

    /**
     * @swagger
     * /device/fingerprint/{maNhanVien}/{viTriNgonTay}:
     *   delete:
     *     summary: Delete a fingerprint of an employee by ID and finger index
     *     tags: [Devices]
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the employee
     *       - in: path
     *         name: viTriNgonTay
     *         schema:
     *           type: integer
     *         required: true
     *         description: Finger index to delete
     *     responses:
     *       200:
     *         description: Fingerprint deleted successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Server error
     */
    router.delete("/fingerprint/:maNhanVien/:viTriNgonTay", 
        validateMultipleParams([
            { paramName: 'maNhanVien', type: 'positiveInteger' },
            { paramName: 'viTriNgonTay', type: 'range', min: 1, max: 10 }
        ]),
        deviceController.deleteNhanVienVanTay
    );

    /**
     * @swagger
     * /device/admin/clear:
     *   delete:
     *     summary: Clear admin rights on the device
     *     tags: [Devices]
     *     responses:
     *       200:
     *         description: Admin rights successfully cleared
     *       400:
     *         description: Bad request
     *       500:
     *         description: Server error
     */
    router.delete("/admin/clear", deviceController.clearAdmin);

    /**
     * @swagger
     * /device/att-log/clear:
     *   delete:
     *     summary: Clear attendance logs on the device
     *     tags: [Devices]
     *     responses:
     *       200:
     *         description: Attendance logs successfully cleared
     *       400:
     *         description: Bad request
     *       500:
     *         description: Server error
     */
    router.delete("/att-log/clear", deviceController.clearGLog);

    return router;
}