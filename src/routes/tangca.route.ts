import express from "express";
import {container} from "../configs/inversify.config";
import TangCaController from "../controllers/tangca.controller";
import {TYPES} from "../configs/types";
import { validatePositiveIntegerParam, validateMultipleParams } from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const tangCaController = container.get<TangCaController>(TYPES.TangCaController);

    /**
     * @swagger
     * tags:
     *   name: TangCa
     *   description: Endpoints related to overtime management
     */

    /**
     * @swagger
     * /tangca:
     *   get:
     *     summary: Get all overtime records
     *     tags: [TangCa]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all overtime records.
     *     responses:
     *       200:
     *         description: A list of overtime records retrieved successfully
     *       404:
     *         description: No overtime records found
     *       500:
     *         description: Server error
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_OVERTIME),
        tangCaController.getTangCa);

    /**
     * @swagger
     * /tangca:
     *   post:
     *     summary: Create a new overtime record
     *     tags: [TangCa]
     *     security:
     *       - bearerAuth: []
     *     description: Creates a new overtime record.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maPhongBan
     *               - ngayChamCongTangCa
     *               - gioTangCaBatDau
     *               - gioTangCaKetThuc
     *             properties:
     *               maPhongBan:
     *                 type: integer
     *                 description: ID of the department
     *                 example: 1
     *               ngayChamCongTangCa:
     *                 type: string
     *                 format: date
     *                 description: Date of the overtime
     *                 example: "2025-06-03"
     *               gioTangCaBatDau:
     *                 type: string
     *                 format: time
     *                 description: Start time of overtime
     *                 example: "17:30:00"
     *               gioTangCaKetThuc:
     *                 type: string
     *                 format: time
     *                 description: End time of overtime
     *                 example: "19:30:00"
     *     responses:
     *       201:
     *         description: Overtime record created successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.post("/",
        checkPermission(PermissionEnum.MANAGE_OVERTIME),
        tangCaController.createTangCa);

    /**
     * @swagger
     * /tangca/{maPhongBan}:
     *   put:
     *     summary: Update an overtime record
     *     tags: [TangCa]
     *     security:
     *       - bearerAuth: []
     *     description: Updates an overtime record by department ID.
     *     parameters:
     *       - name: maPhongBan
     *         in: path
     *         required: true
     *         description: ID of the department
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - ngayChamCongTangCa
     *             properties:
     *               ngayChamCongTangCa:
     *                 type: string
     *                 format: date
     *                 description: Date of the overtime
     *                 example: "2025-06-03"
     *               gioTangCaBatDau:
     *                 type: string
     *                 format: time
     *                 description: Start time of overtime
     *                 example: "18:00:00"
     *               gioTangCaKetThuc:
     *                 type: string
     *                 format: time
     *                 description: End time of overtime
     *                 example: "20:00:00"
     *     responses:
     *       200:
     *         description: Overtime record updated successfully
     *       400:
     *         description: Invalid input data
     *       404:
     *         description: Overtime record not found
     *       500:
     *         description: Server error
     */
    router.put("/:maPhongBan",
        checkPermission(PermissionEnum.MANAGE_OVERTIME),
        validatePositiveIntegerParam('maPhongBan'),
        tangCaController.updateTangCa
    );

    /**
     * @swagger
     * /tangca/{maPhongBan}/{ngayChamCongTangCa}:
     *   delete:
     *     summary: Delete an overtime record
     *     tags: [TangCa]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes an overtime record by department ID and date.
     *     parameters:
     *       - name: maPhongBan
     *         in: path
     *         required: true
     *         description: ID of the department
     *         schema:
     *           type: integer
     *       - name: ngayChamCongTangCa
     *         in: path
     *         required: true
     *         description: Date of the overtime (YYYY-MM-DD)
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Overtime record deleted successfully
     *       404:
     *         description: Overtime record not found
     *       500:
     *         description: Server error
     */
    router.delete("/:maPhongBan/:ngayChamCongTangCa",
        checkPermission(PermissionEnum.MANAGE_OVERTIME),
        validateMultipleParams([
            { paramName: 'maPhongBan', type: 'positiveInteger' },
            { paramName: 'ngayChamCongTangCa', type: 'required' }
        ]),
        tangCaController.deleteTangCa
    );

    return router;
}

