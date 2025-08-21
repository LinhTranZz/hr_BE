import express from "express";
import {container} from "../configs/inversify.config";
import HeThongController from "../controllers/hethong.controller";
import {TYPES} from "../configs/types";
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const heThongController = container.get<HeThongController>(TYPES.HeThongController);

    /**
     * @swagger
     * /hethong:
     *   get:
     *     summary: Get system settings
     *     tags: [HeThong]
     *     description: Retrieve system settings from the database.
     *     responses:
     *       200:
     *         description: System settings retrieved successfully.
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
     *                     khoangCachGiuaCacLanChamCong:
     *                       type: string
     *                       format: time
     *                       example: "03:00:00"
     *                     congNgayChuNhat:
     *                       type: float
     *                       example: 1.5
     *                     nguongThoiGianPheDuyetNgayNghi:
     *                       type: integer
     *                       example: 3
     *                     soNgayPhepTrongNam:
     *                       type: integer
     *                       example: 12
     *
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_SYSTEM_SETTINGS),
        heThongController.getHeThong);

    /**
     * @swagger
     * /hethong:
     *   put:
     *     summary: Update system settings
     *     tags: [HeThong]
     *     description: Update system settings in the database.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               khoangCachGiuaCacLanChamCong:
     *                 type: string
     *                 format: time
     *                 example: "03:00:00"
     *               congNgayChuNhat:
     *                 type: float
     *                 example: 1.5
     *               nguongThoiGianPheDuyetNgayNghi:
     *                 type: integer
     *                 example: 3
     *               soNgayPhepTrongNam:
     *                 type: integer
     *                 example: 12
     *     responses:
     *       200:
     *         description: System settings updated successfully.
     */
    router.put("/",
        checkPermission(PermissionEnum.MANAGE_SYSTEM_SETTINGS),
        heThongController.updateHeThong);

    return router;
}