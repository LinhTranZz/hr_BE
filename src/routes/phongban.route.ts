import express from "express";
import { container } from "../configs/inversify.config";
import { TYPES } from "../configs/types";
import PhongBanController from "../controllers/phongban.controller";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import { checkPermission } from '../middlewares/permission.middleware';
import { PermissionEnum } from '../enums/permission.enum';

export default () => {
    const router = express.Router();
    const phongBanController = container.get<PhongBanController>(TYPES.PhongBanController);

    /**
     * @swagger
     * tags:
     *   name: PhongBan
     *   description: Endpoints related to PhongBan management
     */

    /**
     * @swagger
     * /phongban:
     *   get:
     *     summary: Get all PhongBan
     *     tags: [PhongBan]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all PhongBan.
     *     responses:
     *       200:
     *         description: A list of PhongBan.
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_DEPARTMENT),
        phongBanController.getPhongBan);

    /**
     * @swagger
     * /phongban/dieuchinh:
     *   get:
     *     summary: Get all DieuChinhNhanVien
     *     tags: [PhongBan]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all DieuChinhNhanVien.
     *     responses:
     *       200:
     *         description: A list of DieuChinhNhanVien.
     */
    router.get("/dieuchinh",
        checkPermission(PermissionEnum.VIEW_DEPARTMENT_HISTORY),
        phongBanController.getDieuChinhNhanVien);

    /**
     * @swagger
     * /phongban/nhanvien/vang/{ngayHomNay}:
     *   get:
     *     summary: Get NhanVienVang by PhongBan
     *     tags: [PhongBan]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of NhanVienVang by PhongBan for a specific date.
     *     parameters:
     *       - name: ngayHomNay
     *         in: path
     *         required: true
     *         description: The date to filter NhanVienVang.
     *         schema:
     *           type: string
     *           format: date
     *           example: "2023-10-01"
     *     responses:
     *       200:
     *         description: A list of NhanVienVang by PhongBan.
     */
    router.get("/nhanvien/vang/:ngayHomNay", phongBanController.getNhanVienVangByPhongBan);

    /**
     * @swagger
     * /phongban:
     *   post:
     *     summary: Create a new PhongBan
     *     tags: [PhongBan]
     *     security:
     *       - bearerAuth: []
     *     description: Creates a new PhongBan.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tenPhongBan:
     *                 type: string
     *                 example: "Phong Ban Kế Toán"
     *               maCa:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       201:
     *         description: PhongBan created successfully.
     */
    router.post("/",
        checkPermission(PermissionEnum.MANAGE_DEPARTMENT),
        phongBanController.createPhongBan);

    /**
     * @swagger
     * /phongban/{maPhongBan}:
     *   put:
     *     summary: Update a PhongBan
     *     tags: [PhongBan]
     *     security:
     *       - bearerAuth: []
     *     description: Updates a PhongBan by its ID.
     *     parameters:
     *       - name: maPhongBan
     *         in: path
     *         required: true
     *         description: The ID of the PhongBan to update.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tenPhongBan:
     *                 type: string
     *                 example: "Phong Ban Nhân Sự"
     *               maCa:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       200:
     *         description: PhongBan updated successfully.
     */
    router.put("/:maPhongBan", 
        validatePositiveIntegerParam('maPhongBan'),
        checkPermission(PermissionEnum.MANAGE_DEPARTMENT),
        phongBanController.updatePhongBan
    );

    /**
     * @swagger
     * /phongban/dieuchinh:
     *   delete:
     *     summary: Delete a DieuChinhNhanVien
     *     tags: [PhongBan]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes a DieuChinhNhanVien.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               maNguoiChinh:
     *                 type: integer
     *                 example: 1
     *               maNguoiDuocChinh:
     *                 type: integer
     *                 example: 2
     *               thoiGianThayDoi:
     *                 type: string
     *                 format: date-time
     *                 example: "2023-10-01T12:00:00Z"
     *       responses:
     *       200:
     *          description: DieuChinhNhanVien deleted successfully.
     */
    router.delete("/dieuchinh",
        checkPermission(PermissionEnum.DELETE_DEPARTMENT_HISTORY),
        phongBanController.deleteDieuChinhNhanVien);

    /**
     * @swagger
     * /phongban/{maPhongBan}:
     *   delete:
     *     summary: Delete a PhongBan
     *     tags: [PhongBan]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes a PhongBan by its ID.
     *     parameters:
     *       - name: maPhongBan
     *         in: path
     *         required: true
     *         description: The ID of the PhongBan to delete.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: PhongBan deleted successfully.
     */
    router.delete("/:maPhongBan", 
        validatePositiveIntegerParam('maPhongBan'),
        checkPermission(PermissionEnum.MANAGE_DEPARTMENT),
        phongBanController.deletePhongBan
    );

    return router;
};

