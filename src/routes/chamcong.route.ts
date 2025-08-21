import express from "express";
import {container} from "../configs/inversify.config";
import {TYPES} from "../configs/types";
import VanTayController from "../controllers/vantay.controller";
import ChamCongController from "../controllers/chamcong.controller";
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const vanTayController = container.get<VanTayController>(TYPES.VanTayController);
    const chamCongController = container.get<ChamCongController>(TYPES.ChamCongController);
    /**
     * @swagger
     * tags:
     *   name: ChamCong
     *   description: Endpoints related to ChamCong and VanTay management
     */

    /**
     * @swagger
     * /chamcong/vantay:
     *  post:
     *    summary: Create new VanTay data
     *    tags: [ChamCong]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            required:
     *              - thoiGian
     *              - maNhanVien
     *            properties:
     *              thoiGian:
     *                type: string
     *                format: date
     *                example: "2024-07-20"
     *              maNhanVien:
     *                type: number
     *                example: 1
     *    responses:
     *      '201':
     *        description: Successfully created VanTay data.
     *      '400':
     *        description: Invalid request body.
     *      '500':
     *        description: Internal server error.
     */
    router.post("/vantay",
        vanTayController.createVanTayData
    );

    /**
     * @swagger
     * /chamcong:
     *   get:
     *     summary: Retrieve ChamCong data
     *     tags: [ChamCong]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '200':
     *         description: Successfully retrieved ChamCong data.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ChamCongResponse'
     *       '500':
     *         description: Internal server error.
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_ATTENDANCE),
        chamCongController.getChamCong
    );

    /**
     * @swagger
     * /chamcong/chitiet:
     *   get:
     *     summary: Retrieve detailed ChamCong data
     *     tags: [ChamCong]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '200':
     *         description: Successfully retrieved detailed ChamCong data.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ChamCongChiTietResponse'
     *       '500':
     *         description: Internal server error.
     */
    router.get("/chitiet",
        checkPermission(PermissionEnum.VIEW_DETAILS_ATTENDANCE),
        chamCongController.getChamCongDetail
    );

    return router;
}

