import express from 'express';
import {container} from "../configs/inversify.config";
import {TYPES} from "../configs/types";
import CaLamController from '../controllers/calam.controller';
import CalamTrongtuanController from "../controllers/calam.trongtuan.controller";
import {validateIntegerParam, validateMultipleParams} from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const caLamController = container.get<CaLamController>(TYPES.CaLamController);
    const calamTrongTuanController = container.get<CalamTrongtuanController>(TYPES.CaLamTrongTuanController);

    /**
     * @swagger
     * tags:
     *   name: CaLam
     *   description: Endpoints related to CaLam management
     */

    /**
     * @swagger
     * /calam:
     *   get:
     *     summary: Get all CaLam
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all CaLam.
     *     responses:
     *       200:
     *         description: A list of CaLam.
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_SHIFT),
        caLamController.getAllCaLams
    );

    /**
     * @swagger
     * /calam:
     *   post:
     *     summary: Create a new CaLam
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     description: Creates a new CaLam.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tenCa:
     *                 type: string
     *                 example: "Giờ Hành Chính"
     *     responses:
     *       201:
     *         description: CaLam created successfully.
     */
    router.post('/',
        checkPermission(PermissionEnum.MANAGE_SHIFT),
        caLamController.createCaLam
    );

    /**
     * @swagger
     * /calam/{maCa}:
     *   put:
     *     summary: Update a CaLam
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     description: Updates a CaLam by its ID.
     *     parameters:
     *       - name: maCa
     *         in: path
     *         required: true
     *         description: The ID of the CaLam to update.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tenCa:
     *                 type: string
     *                 example: "Ca Chiều"
     *     responses:
     *       200:
     *         description: CaLam updated successfully.
     */
    router.put('/:maCa',
        checkPermission(PermissionEnum.MANAGE_SHIFT),
        validateIntegerParam('maCa'),
        caLamController.updateCaLam
    );

    /**
     * @swagger
     * /calam/{maCa}:
     *   delete:
     *     summary: Delete a CaLam
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes a CaLam by its ID.
     *     parameters:
     *       - name: maCa
     *         in: path
     *         required: true
     *         description: The ID of the CaLam to delete.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: CaLam deleted successfully.
     */
    router.delete('/:maCa',
        checkPermission(PermissionEnum.MANAGE_SHIFT),
        validateIntegerParam('maCa'),
        caLamController.deleteCaLam
    );

    /**
     * @swagger
     * /calam/trongtuan:
     *   get:
     *     summary: Get all Ca Lam Trong Tuan records
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all Ca Lam Trong Tuan records.
     *     responses:
     *       200:
     *         description: List of Ca Lam Trong Tuan records retrieved successfully.
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
     *                   example: Get all ca lam trong tuan successfully
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/CaLamTrongTuan'
     *       500:
     *         description: Internal server error.
     */
    router.get("/trongtuan/",
        checkPermission(PermissionEnum.VIEW_DETAILS_SHIFT),
        calamTrongTuanController.getAllCaLamTrongTuan
    );

    /**
     * @swagger
     * /calam/trongtuan/{maCa}:
     *   get:
     *     summary: Get Ca Lam for a specific week by maCa
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maCa
     *         required: true
     *         schema:
     *           type: integer
     *         description: The Ca Lam ID
     *     description: Returns details of Ca Lam Trong Tuan for a specific maCa.
     *     responses:
     *       200:
     *         description: Ca Lam Trong Tuan data retrieved successfully.
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
     *                   example: Get ca lam by id in week successfully
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/CaLamTrongTuan'
     *       404:
     *         description: No data found for the specified maCa.
     *       500:
     *         description: Internal server error.
     */
    router.get("/trongtuan/:maCa", 
        checkPermission(PermissionEnum.VIEW_DETAILS_SHIFT),
        validateIntegerParam('maCa'),
        calamTrongTuanController.getCaLamTrongTuan
    );

    /**
     * @swagger
     * /calam/trongtuan:
     *   post:
     *     summary: Create a new Ca Lam Trong Tuan
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CaLamTrongTuanInput'
     *     description: Creates a new Ca Lam Trong Tuan record.
     *     responses:
     *       200:
     *         description: Ca Lam Trong Tuan created successfully.
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
     *                   example: Create ca lam trong tuan successfully
     *       500:
     *         description: Internal server error.
     */
    router.post("/trongtuan/",
        checkPermission(PermissionEnum.MANAGE_DETAILS_SHIFT),
        calamTrongTuanController.createCaLamTrongTuan
    );

    /**
     * @swagger
     * /calam/trongtuan/{maCa}:
     *   put:
     *     summary: Update an existing Ca Lam Trong Tuan
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maCa
     *         required: true
     *         schema:
     *           type: integer
     *         description: The Ca Lam ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CaLamTrongTuanUpdate'
     *     description: Updates an existing Ca Lam Trong Tuan record.
     *     responses:
     *       200:
     *         description: Ca Lam Trong Tuan updated successfully.
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
     *                   example: Update ca lam trong tuan successfully
     *       500:
     *         description: Internal server error.
     */
    router.put("/trongtuan/:maCa",
        checkPermission(PermissionEnum.MANAGE_DETAILS_SHIFT),
        validateIntegerParam('maCa'),
        calamTrongTuanController.updateCaLamTrongTuan
    );

    /**
     * @swagger
     * /calam/trongtuan/{maCa}/{ngayTrongTuan}:
     *   delete:
     *     summary: Delete a Ca Lam Trong Tuan
     *     tags: [CaLam]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maCa
     *         required: true
     *         schema:
     *           type: integer
     *         description: The Ca Lam ID
     *       - in: path
     *         name: ngayTrongTuan
     *         required: true
     *         schema:
     *           type: integer
     *         description: The day number in the week (1-7)
     *     description: Deletes a Ca Lam Trong Tuan record.
     *     responses:
     *       200:
     *         description: Ca Lam Trong Tuan deleted successfully.
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
     *                   example: Delete ca lam trong tuan successfully
     *       500:
     *         description: Internal server error.
     */
    router.delete("/trongtuan/:maCa/:ngayTrongTuan",
        checkPermission(PermissionEnum.MANAGE_DETAILS_SHIFT),
        validateMultipleParams([
            { paramName: 'maCa', type: 'integer' },
            { paramName: 'ngayTrongTuan', type: 'range', min: 1, max: 7 }
        ]),
        calamTrongTuanController.deleteCaLamTrongTuan
    );

    return router;
};

