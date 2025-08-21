import express from "express";
import {container} from "../configs/inversify.config";
import {TYPES} from "../configs/types";
import LuongController from "../controllers/luong.controller";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import {PermissionEnum} from "../enums/permission.enum";
import { checkPermission } from "../middlewares/permission.middleware";

export default () => {
    const router = express.Router();
    const luongController = container.get<LuongController>(TYPES.LuongController);

    /**
     * @swagger
     * /luong:
     *   get:
     *     summary: Get all salary records
     *     tags: [Luong]
     *     responses:
     *       200:
     *         description: Success - Returns list of salary records
     *       404:
     *         description: Luong data not found
     *       500:
     *         description: Server error
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_SALARY),
        luongController.getLuong);

    /**
     * @swagger
     * /luong/dieuchinh:
     *   get:
     *     summary: Get salary history records
     *     tags: [Luong]
     *     responses:
     *       200:
     *         description: Success - Returns list of salary history records
     *       404:
     *         description: Luong history data not found
     *       500:
     *         description: Server error
     */
    router.get("/dieuchinh",
        checkPermission(PermissionEnum.VIEW_SALARY_HISTORY),
        luongController.getLuongHistory);

    /**
     * @swagger
     * /luong:
     *   post:
     *     summary: Create a new salary record
     *     tags: [Luong]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - thang
     *               - nam
     *             properties:
     *               thang:
     *                 type: number
     *                 description: Month of salary record
     *                 example: 5
     *               nam:
     *                 type: number
     *                 description: Year of salary record
     *                 example: 2025
     *     responses:
     *       201:
     *         description: Luong created successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.post("/",
        checkPermission(PermissionEnum.MANAGE_SALARY),
        luongController.createLuong);

    /**
     * @swagger
     * /luong/{maNhanVien}:
     *   post:
     *     summary: Create a salary record for a specific employee
     *     tags: [Luong]
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         required: true
     *         schema:
     *           type: integer
     *         description: Employee ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - thang
     *               - nam
     *             properties:
     *               thang:
     *                 type: number
     *                 description: Month of salary record (1-12)
     *               nam:
     *                 type: number
     *                 description: Year of salary record (4-digit year)
     *     responses:
     *       201:
     *         description: Employee salary created successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.post("/:maNhanVien",
        checkPermission(PermissionEnum.MANAGE_SALARY),
        validatePositiveIntegerParam('maNhanVien'),
        luongController.createEmployeeSalary
    );

    /**
     * @swagger
     * /luong/tienthuong:
     *   put:
     *     summary: Update a salary record
     *     tags: [Luong]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maNhanVien
     *               - nam
     *               - thang
     *               - tienThuong
     *             properties:
     *               maNhanVien:
     *                 type: number
     *                 description: Employee ID
     *               thang:
     *                 type: number
     *                 description: Month of salary record
     *               nam:
     *                 type: number
     *                 description: Year of salary record
     *               tienThuong:
     *                 type: number
     *                 description: Bonus amount
     *     responses:
     *       200:
     *         description: Luong updated successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.put("/tienthuong",
        checkPermission(PermissionEnum.MANAGE_SALARY),
        luongController.updateLuongTienThuong);

    /**
     * @swagger
     * /luong:
     *   delete:
     *     summary: Delete a salary record
     *     tags: [Luong]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maNhanVien
     *               - thang
     *               - nam
     *             properties:
     *               maNhanVien:
     *                 type: number
     *                 description: Employee ID
     *               thang:
     *                 type: number
     *                 description: Month of salary record
     *               nam:
     *                 type: number
     *                 description: Year of salary record
     *     responses:
     *       200:
     *         description: Luong deleted successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.delete("/",
        checkPermission(PermissionEnum.MANAGE_SALARY),
        luongController.deleteLuong);

    /**
     * @swagger
     * /luong/dieuchinh:
     *   delete:
     *     summary: Delete a salary history record
     *     tags: [Luong]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maNguoiChinh
     *               - maNguoiDuocChinh
     *               - thoiGianThayDoi
     *             properties:
     *               maNguoiChinh:
     *                 type: number
     *                 description: ID of the person making the change
     *               maNguoiDuocChinh:
     *                 type: number
     *                 description: ID of the person whose salary is being changed
     *               thoiGianThayDoi:
     *                 type: string
     *                 format: date-time
     *                 description: Timestamp of the change
     *     responses:
     *       200:
     *         description: Salary history record deleted successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.delete("/dieuchinh",
        checkPermission(PermissionEnum.DELETE_SALARY_HISTORY),
        luongController.deleteLuongHistory);

    return router;
}

