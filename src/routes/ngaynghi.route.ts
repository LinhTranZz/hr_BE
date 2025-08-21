import express from "express";
import {container} from "../configs/inversify.config";
import NgayNghiController from "../controllers/ngaynghi.controller";
import {TYPES} from "../configs/types";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const ngayNghiController = container.get<NgayNghiController>(TYPES.NgayNghiController);

    /**
     * @swagger
     * /ngaynghi:
     *   get:
     *     summary: Get all leave records
     *     description: Retrieve all leave records from the system
     *     tags: [NgayNghi]
     *     responses:
     *       200:
     *         description: List of leave records
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
     *                     $ref: '#/components/schemas/NgayNghiResponseDto'
     *                 message:
     *                   type: string
     *                   example: NgayNghi data fetched successfully
     *       404:
     *         description: No leave records found
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
     *                   example: No NgayNghi data found
     *       500:
     *         description: Server error
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_LEAVE_REQUEST),
        ngayNghiController.getNgayNghi);

    /**
     * @swagger
     * /ngaynghi:
     *   post:
     *     summary: Create a new leave record
     *     description: Create a new employee leave record in the system
     *     tags: [NgayNghi]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateNgayNghiDto'
     *     responses:
     *       201:
     *         description: Leave record created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   $ref: '#/components/schemas/CreateNgayNghiDto'
     *                 message:
     *                   type: string
     *                   example: NgayNghi created successfully
     *       400:
     *         description: Bad request, validation error
     *       500:
     *         description: Server error
     */
    router.post("/",
        ngayNghiController.createNgayNghi);

    /**
     * @swagger
     * /ngaynghi/{maNghiPhep}:
     *   put:
     *     summary: Update a leave record
     *     description: Update an existing leave record by its ID
     *     tags: [NgayNghi]
     *     parameters:
     *       - in: path
     *         name: maNghiPhep
     *         required: true
     *         schema:
     *           type: integer
     *         description: Leave record ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateNgayNghiDto'
     *     responses:
     *       200:
     *         description: Leave record updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: NgayNghi updated successfully
     *       400:
     *         description: Bad request, validation error
     *       404:
     *         description: Leave record not found
     *       500:
     *         description: Server error
     */
    router.put("/:maNghiPhep",
        checkPermission(PermissionEnum.UPDATE_LEAVE_REQUEST),
        validatePositiveIntegerParam('maNghiPhep'),
        ngayNghiController.updateNgayNghi
    );

    /**
     * @swagger
     * /ngaynghi/{maNghiPhep}:
     *   delete:
     *     summary: Delete a leave record
     *     description: Remove a leave record from the system by its ID
     *     tags: [NgayNghi]
     *     parameters:
     *       - in: path
     *         name: maNghiPhep
     *         required: true
     *         schema:
     *           type: integer
     *         description: Leave record ID to delete
     *     responses:
     *       200:
     *         description: Leave record deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: NgayNghi deleted successfully
     *       400:
     *         description: Bad request, validation error
     *       404:
     *         description: Leave record not found
     *       500:
     *         description: Server error
     */
    router.delete("/:maNghiPhep",
        checkPermission(PermissionEnum.DELETE_LEAVE_REQUEST),
        validatePositiveIntegerParam('maNghiPhep'),
        ngayNghiController.deleteNgayNghi
    );

    return router;
}

