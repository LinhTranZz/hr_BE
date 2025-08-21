import {TYPES} from "../configs/types";
import ThemPhuCapController from "../controllers/themphucap.controller";
import {container} from "../configs/inversify.config";
import express from "express";
import { validatePositiveIntegerParam } from "../middlewares/validation.middleware";
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const themPhuCapController = container.get<ThemPhuCapController>(TYPES.ThemPhuCapController);

    /**
     * @swagger
     * tags:
     *   name: ThemPhuCap
     *   description: Endpoints related to allowance management
     */

    /**
     * @swagger
     * /themphucap:
     *   get:
     *     summary: Get all allowance records
     *     tags: [ThemPhuCap]
     *     security:
     *       - bearerAuth: []
     *     description: Retrieves all allowance records for employees
     *     responses:
     *       200:
     *         description: Successfully retrieved allowance records
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Server error
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_ASSIGNED_ALLOWANCE),
        themPhuCapController.getThemPhuCap)

    /**
     * @swagger
     * /themphucap/all/{maNhanVien}:
     *   delete:
     *     summary: Delete all allowance records for an employee
     *     tags: [ThemPhuCap]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes all allowance records for a specific employee.
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         required: true
     *         schema:
     *           type: number
     *         description: Employee ID
     *     responses:
     *       200:
     *         description: All allowances deleted successfully
     *       404:
     *         description: Employee not found or no allowances to delete
     *       500:
     *         description: Server error
     */
    router.delete('/all/:maNhanVien',
        checkPermission(PermissionEnum.UNASSIGN_ALLOWANCE),
        validatePositiveIntegerParam('maNhanVien'),
        themPhuCapController.deleteAllThemPhuCap)

    /**
     * @swagger
     * /themphucap/{maNhanVien}/{maPhuCap}:
     *   post:
     *     summary: Create a new allowance record for an employee
     *     tags: [ThemPhuCap]
     *     security:
     *       - bearerAuth: []
     *     description: Creates a new allowance record for a specific employee.
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         required: true
     *         schema:
     *           type: number
     *         description: Employee ID
     *       - in:  path
     *         name: maPhuCap
     *         required: true
     *         schema:
     *           type: number
     *         description: Allowance ID
     *     responses:
     *       201:
     *         description: Allowance created successfully
     *       400:
     *         description: Invalid input
     *       404:
     *         description: Employee not found
     *       500:
     *         description: Server error
     */
    router.post('/:maNhanVien/:maPhuCap',
        checkPermission(PermissionEnum.ASSIGN_ALLOWANCE),
        validatePositiveIntegerParam('maNhanVien'),
        validatePositiveIntegerParam('maPhuCap'),
        themPhuCapController.createThemPhuCap)

    /**
     * @swagger
     * /themphucap/{maNhanVien}/{maPhuCap}:
     *   delete:
     *     summary: Delete an allowance record for an employee
     *     tags: [ThemPhuCap]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes an allowance record for a specific employee.
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         required: true
     *         schema:
     *           type: number
     *         description: Employee ID
     *       - in: path
     *         name: maPhuCap
     *         required: true
     *         schema:
     *           type: number
     *         description: Allowance ID
     *     responses:
     *       200:
     *         description: Allowance deleted successfully
     *       404:
     *         description: Allowance or employee not found
     *       500:
     *         description: Server error
     */
    router.delete('/:maNhanVien/:maPhuCap',
        checkPermission(PermissionEnum.UNASSIGN_ALLOWANCE),
        validatePositiveIntegerParam('maNhanVien'),
        validatePositiveIntegerParam('maPhuCap'),
        themPhuCapController.deleteThemPhuCap)

    return router;
}