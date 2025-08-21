import express from "express";
import {container} from "../configs/inversify.config";
import PhuCapController from "../controllers/phucap.controller";
import { TYPES } from "../configs/types";
import { validatePositiveIntegerParam } from "../middlewares/validation.middleware";
import { checkPermission } from '../middlewares/permission.middleware';
import { PermissionEnum } from '../enums/permission.enum';

export default () => {
    const router = express.Router();
    const phuCapController = container.get<PhuCapController>(TYPES.PhuCapController);

    /**
     * @swagger
     * /phucap:
     *   get:
     *     summary: Get all allowances (phụ cấp)
     *     tags: [PhuCap]
     *     description: Retrieve a list of all allowances in the system
     *     responses:
     *       200:
     *         description: A list of allowances retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/PhuCap'
     *                 message:
     *                   type: string
     *                   example: PhuCap data fetched successfully
     *       404:
     *         description: No allowances found
     *       500:
     *         description: Server error
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_ALLOWANCE),
        phuCapController.getAllPhuCaps);

    /**
     * @swagger
     * /phucap:
     *   post:
     *     summary: Create a new allowance
     *     tags: [PhuCap]
     *     description: Create a new allowance in the system
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreatePhuCapRequest'
     *     responses:
     *       201:
     *         description: Allowance created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 data:
     *                   $ref: '#/components/schemas/CreatePhuCapRequest'
     *                 message:
     *                   type: string
     *                   example: PhuCap created successfully
     *       400:
     *         description: Invalid input
     *       500:
     *         description: Server error
     */
    router.post("/",
        checkPermission(PermissionEnum.MANAGE_ALLOWANCE),
        phuCapController.createPhuCap);

    /**
     * @swagger
     * /phucap/{maPhuCap}:
     *   put:
     *     summary: Update an allowance
     *     tags: [PhuCap]
     *     description: Update an existing allowance by its ID
     *     parameters:
     *       - in: path
     *         name: maPhuCap
     *         required: true
     *         description: ID of the allowance to update
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdatePhuCapRequest'
     *     responses:
     *       200:
     *         description: Allowance updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 data:
     *                   type: null
     *                 message:
     *                   type: string
     *                   example: PhuCap updated successfully
     *       400:
     *         description: Invalid input or ID
     *       404:
     *         description: Allowance not found
     *       500:
     *         description: Server error
     */
    router.put("/:maPhuCap",
        validatePositiveIntegerParam('maPhuCap'),
        checkPermission(PermissionEnum.MANAGE_ALLOWANCE),
        phuCapController.updatePhuCap);

    /**
     * @swagger
     * /phucap/{maPhuCap}/{maVaiTro}:
     *   delete:
     *     summary: Delete an allowance
     *     tags: [PhuCap]
     *     description: Delete an allowance by its ID and role ID
     *     parameters:
     *       - in: path
     *         name: maPhuCap
     *         required: true
     *         description: ID of the allowance to delete
     *         schema:
     *           type: integer
     *       - in: path
     *         name: maVaiTro
     *         required: true
     *         description: Role ID associated with the allowance
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Allowance deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 data:
     *                   type: null
     *                 message:
     *                   type: string
     *                   example: PhuCap deleted successfully
     *       400:
     *         description: Invalid IDs
     *       404:
     *         description: Allowance not found
     *       500:
     *         description: Server error
     */
    router.delete("/:maPhuCap/:maVaiTro",
        validatePositiveIntegerParam('maPhuCap'),
        validatePositiveIntegerParam('maVaiTro'),
        checkPermission(PermissionEnum.MANAGE_ALLOWANCE),
        phuCapController.deletePhuCap);

    return router;
}