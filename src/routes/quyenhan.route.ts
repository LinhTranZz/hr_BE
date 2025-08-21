import express from "express";
import {TYPES} from "../configs/types";
import QuyenHanController from "../controllers/quyenhan.controller";
import { container } from "../configs/inversify.config";
import {validatePositiveIntegerParam} from "../middlewares/validation.middleware";

export default () => {
    const route = express.Router();
    const quyenHanController = container.get<QuyenHanController>(TYPES.QuyenHanController);

    /**
     * @swagger
     * /quyenhan:
     *   get:
     *     summary: Get all quyen han (permissions)
     *     tags: [QuyenHan]
     *     responses:
     *       200:
     *         description: List of quyen han retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/QuyenHanModel'
     *                 message:
     *                   type: string
     *                   example: Quyen Han data fetched successfully
     *       404:
     *         description: No quyen han found
     *       500:
     *         description: Server error
     */
    route.get("/", quyenHanController.getQuyenHans);

    /**
     * @swagger
     * /quyenhan/{maQuyenHan}:
     *   get:
     *     summary: Get a quyen han by ID
     *     tags: [QuyenHan]
     *     parameters:
     *       - in: path
     *         name: maQuyenHan
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID of the quyen han to retrieve
     *     responses:
     *       200:
     *         description: Quyen han retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   $ref: '#/components/schemas/QuyenHanModel'
     *                 message:
     *                   type: string
     *                   example: Quyen Han data fetched successfully
     *       404:
     *         description: Quyen han not found
     *       500:
     *         description: Server error
     */
    route.get("/:maQuyenHan", validatePositiveIntegerParam('maQuyenHan'), quyenHanController.getQuyenHanById);

    return route;
}