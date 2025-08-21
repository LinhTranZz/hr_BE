import express from "express";
import {container} from "../configs/inversify.config";
import NgayPhepController from "../controllers/ngayphep.controller";
import {TYPES} from "../configs/types";
import { validateMultipleParams, validatePositiveIntegerParam } from '../middlewares/validation.middleware';

export default () => {
    const router = express.Router();
    const ngayPhepController = container.get<NgayPhepController>(TYPES.NgayPhepController);

    /**
     * @swagger
     * /ngayphep:
     *   get:
     *     summary: Get all NgayPhep
     *     tags: [NgayPhep]
     *     security:
     *       - bearerAuth: []
     *     description: Retrieves all NgayPhep records.
     *     responses:
     *       200:
     *         description: A list of NgayPhep records.
     */
    router.get("/",
        ngayPhepController.getAllNgayPhep);

    /**
     * @swagger
     * /ngayphep/quydoi/{maNhanVien}:
     *   post:
     *     summary: Convert NgayPhep to money
     *     tags: [NgayPhep]
     *     security:
     *       - bearerAuth: []
     *     description: Converts remaining annual leave days to money equivalent for a specific employee.
     *     parameters:
     *       - name: maNhanVien
     *         in: path
     *         required: true
     *         description: The ID of the employee to convert leave days to money.
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 123
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
     *                 type: integer
     *                 minimum: 1
     *                 maximum: 12
     *                 description: Month to convert leave days for
     *                 example: 7
     *               nam:
     *                 type: integer
     *                 minimum: 1900
     *                 maximum: 2100
     *                 description: Year to convert leave days for
     *                 example: 2025
     *     responses:
     *       200:
     *         description: Leave days successfully converted to money.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: object
     *                   properties:
     *                     maNhanVien:
     *                       type: integer
     *                       example: 123
     *                     hoTenNhanVien:
     *                       type: string
     *                       example: "Nguyễn Văn A"
     *                     soNgayPhepConLai:
     *                       type: number
     *                       example: 5
     *                     luongNgay:
     *                       type: number
     *                       example: 500000
     *                     tienQuyDoi:
     *                       type: number
     *                       example: 2500000
     *                     thang:
     *                       type: integer
     *                       example: 7
     *                     nam:
     *                       type: integer
     *                       example: 2025
     *                 message:
     *                   type: string
     *                   example: "Convert NgayPhep to money successful"
     *       400:
     *         description: Invalid employee ID format or invalid month/year.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Invalid employee ID or invalid month/year"
     *       404:
     *         description: Employee not found or no leave days available.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "No NgayPhep data found for conversion"
     */
    router.post("/quydoi/:maNhanVien",
        validatePositiveIntegerParam('maNhanVien'),
        ngayPhepController.convertNgayPhepToMoney
    );

    /**
     * @swagger
     * /ngayphep/{nam}/{thang}:
     *   put:
     *     summary: Update NgayPhep by month
     *     tags: [NgayPhep]
     *     security:
     *       - bearerAuth: []
     *     description: Updates NgayPhep for a specific year and month.
     *     parameters:
     *       - name: nam
     *         in: path
     *         required: true
     *         description: The year to update NgayPhep.
     *       - name: thang
     *         in: path
     *         required: true
     *         description: The month to update NgayPhep.
     *     responses:
     *       200:
     *         description: NgayPhep updated successfully.
     */
    router.put("/:nam/:thang", 
        validateMultipleParams([
            { paramName: 'nam', type: 'range', min: 1900, max: 2100 },
            { paramName: 'thang', type: 'range', min: 1, max: 12 }
        ]),
        ngayPhepController.updateNgayPhepByMonth
    );

    /**
     * @swagger
     * /ngayphep/all/{nam}/{thang}:
     *   put:
     *     summary: Update NgayPhep by year
     *     tags: [NgayPhep]
     *     security:
     *       - bearerAuth: []
     *     description: Updates NgayPhep for all employees for a specific year and month.
     *     parameters:
     *       - name: nam
     *         in: path
     *         required: true
     *         description: The year to update NgayPhep.
     *       - name: thang
     *         in: path
     *         required: false
     *         description: The month to update NgayPhep.
     *     responses:
     *       200:
     *         description: NgayPhep updated successfully.
     */
    router.put("/all/:nam/:thang",
        validatePositiveIntegerParam('nam'),
        ngayPhepController.updateNgayPhepByYear
    );

    return router
}