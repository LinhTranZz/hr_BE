import express from "express";
import { container } from "../configs/inversify.config";
import { TYPES } from "../configs/types";
import UuTienController from "../controllers/uutien.controller";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import { checkPermission } from '../middlewares/permission.middleware';
import { PermissionEnum } from '../enums/permission.enum';

export default () => {
    const router = express.Router();
    const uuTienController = container.get<UuTienController>(TYPES.UuTienController);

    /**
     * @swagger
     * tags:
     *   name: UuTien
     *   description: Endpoints related to UuTien management
     */

    /**
     * @swagger
     * /uutien:
     *   get:
     *     summary: Get all UuTien
     *     tags: [UuTien]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all UuTien.
     *     responses:
     *       200:
     *         description: UuTien data fetched successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: "success"
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       maUuTien:
     *                         type: integer
     *                         example: 1
     *                       tenUuTien:
     *                         type: string
     *                         example: "Ưu tiên 1"
     *                       thoiGianBatDauCa:
     *                         type: string
     *                         format: date-time
     *                         example: "08:00:00"
     *                       thoiGianKetThucCa:
     *                         type: string
     *                         format: date-time
     *                         example: "17:00:00"
     *                       thoiGianHieuLuc:
     *                         type: integer
     *                         example: 60
     *                       maPhongBan:
     *                         type: integer
     *                         example: 1
     *                 message:
     *                   type: string
     *                   example: "UuTien data fetched successfully"
     *       404:
     *         description: No UuTien data found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: "error"
     *                 message:
     *                   type: string
     *                   example: "No UuTien data found"
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_PRIORITY),
        uuTienController.getUuTien);

    /**
     * @swagger
     * /uutien:
     *   post:
     *     summary: Create a new UuTien
     *     tags: [UuTien]
     *     security:
     *       - bearerAuth: []
     *     description: Creates a new UuTien.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tenUuTien:
     *                 type: string
     *                 example: "Ưu tiên 1"
     *               thoiGianBatDauCa:
     *                 type: string
     *                 example: "08:00"
     *               thoiGianKetThucCa:
     *                 type: string
     *                 example: "17:00"
     *               thoiGianHieuLuc:
     *                 type: integer
     *                 example: 60
     *               maPhongBan:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       201:
     *         description: UuTien created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: "success"
     *                 data:
     *                   type: object
     *                   properties:
     *                     tenUuTien:
     *                       type: string
     *                       example: "Ưu tiên 1"
     *                     thoiGianBatDauCa:
     *                       type: string
     *                       example: "08:00"
     *                     thoiGianKetThucCa:
     *                       type: string
     *                       example: "17:00"
     *                     thoiGianHieuLuc:
     *                       type: integer
     *                       example: 60
     *                     maPhongBan:
     *                       type: integer
     *                       example: 1
     *                 message:
     *                   type: string
     *                   example: "UuTien created successfully"
     */
    router.post("/",
        checkPermission(PermissionEnum.MANAGE_PRIORITY),
        uuTienController.createUuTien);

    /**
     * @swagger
     * /uutien/{maUuTien}:
     *   put:
     *     summary: Update a UuTien
     *     tags: [UuTien]
     *     security:
     *       - bearerAuth: []
     *     description: Updates a UuTien by its ID.
     *     parameters:
     *       - in: path
     *         name: maUuTien
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the UuTien to update.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tenUuTien:
     *                 type: string
     *                 example: "Ưu tiên 2"
     *               thoiGianBatDauCa:
     *                 type: string
     *                 example: "08:30"
     *               thoiGianKetThucCa:
     *                 type: string
     *                 example: "17:30"
     *               thoiGianHieuLuc:
     *                 type: integer
     *                 example: 60
     *               maPhongBan:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       200:
     *         description: UuTien updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: "success"
     *                 data:
     *                   type: object
     *                   properties:
     *                     maUuTien:
     *                       type: integer
     *                       example: 1
     *                     tenUuTien:
     *                       type: string
     *                       example: "Ưu tiên 2"
     *                     thoiGianBatDauCa:
     *                       type: string
     *                       example: "08:30"
     *                     thoiGianKetThucCa:
     *                       type: string
     *                       example: "17:30"
     *                     thoiGianHieuLuc:
     *                       type: integer
     *                       example: 60
     *                     maPhongBan:
     *                       type: integer
     *                       example: 1
     *                 message:
     *                   type: string
     *                   example: "Update UuTien with id:1 successfully"
     */
    router.put("/:maUuTien", 
        validatePositiveIntegerParam('maUuTien'),
        checkPermission(PermissionEnum.MANAGE_PRIORITY),
        uuTienController.updateUuTien
    );

    /**
     * @swagger
     * /uutien/{maUuTien}:
     *   delete:
     *     summary: Delete a UuTien
     *     tags: [UuTien]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes a UuTien by its ID.
     *     parameters:
     *       - in: path
     *         name: maUuTien
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the UuTien to delete.
     *     responses:
     *       200:
     *         description: UuTien deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: "success"
     *                 data:
     *                   type: object
     *                   properties:
     *                     maUuTien:
     *                       type: integer
     *                       example: 1
     *                 message:
     *                   type: string
     *                   example: "UuTien with id:1 deleted successfully"
     */
    router.delete("/:maUuTien", 
        validatePositiveIntegerParam('maUuTien'),
        checkPermission(PermissionEnum.MANAGE_PRIORITY),
        uuTienController.deleteUuTien
    );

    return router;
}
