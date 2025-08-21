// filepath: C:\Users\Administrator\Documents\workspace\PMChamCong-BE\src\routes\ngayle.route.ts
import express from 'express';
import { TYPES } from '../configs/types';
import NgayLeController from '../controllers/ngayle.controller';
import {container} from "../configs/inversify.config";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const controller = container.get<NgayLeController>(TYPES.NgayLeController);

    /**
     * @swagger
     * /ngayle:
     *   get:
     *     summary: Lấy danh sách ngày lễ
     *     tags: [NgayLe]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Danh sách ngày lễ
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
     *                     type: object
     *                     properties:
     *                       maNgayLe:
     *                         type: integer
     *                         example: 1
     *                       tenNgayLe:
     *                         type: string
     *                         example: "Tết Nguyên Đán"
     *                       ngayBatDau:
     *                         type: string
     *                         format: date
     *                         example: "2025-01-29"
     *                       ngayKetThuc:
     *                         type: string
     *                         format: date
     *                         example: "2025-02-05"
     *                       soNgayNghi:
     *                         type: number
     *                         example: 7
     *                 message:
     *                   type: string
     *                   example: "Holidays fetched successfully"
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_HOLIDAY),
        controller.getAllNgayLe);

    /**
     * @swagger
     * /ngayle:
     *   post:
     *     summary: Tạo mới ngày lễ
     *     tags: [NgayLe]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - tenNgayLe
     *               - ngayBatDau
     *               - ngayKetThuc
     *               - soNgayNghi
     *             properties:
     *               tenNgayLe:
     *                 type: string
     *                 description: Tên của ngày lễ
     *                 example: "Quốc Khánh"
     *               ngayBatDau:
     *                 type: string
     *                 format: date
     *                 description: Ngày bắt đầu
     *                 example: "2025-09-02"
     *               ngayKetThuc:
     *                 type: string
     *                 format: date
     *                 description: Ngày kết thúc
     *                 example: "2025-09-02"
     *     responses:
     *       201:
     *         description: Đã tạo ngày lễ thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.post('/',
        checkPermission(PermissionEnum.MANAGE_HOLIDAY),
        controller.createNgayLe);

    /**
     * @swagger
     * /ngayle/{maNgayLe}:
     *   put:
     *     summary: Cập nhật thông tin ngày lễ
     *     tags: [NgayLe]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maNgayLe
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID của ngày lễ
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - tenNgayLe
     *               - ngayBatDau
     *               - ngayKetThuc
     *               - soNgayNghi
     *             properties:
     *               tenNgayLe:
     *                 type: string
     *                 description: Tên của ngày lễ
     *                 example: "Lễ Giáng Sinh"
     *               ngayBatDau:
     *                 type: string
     *                 format: date
     *                 description: Ngày bắt đầu
     *                 example: "2025-12-24"
     *               ngayKetThuc:
     *                 type: string
     *                 format: date
     *                 description: Ngày kết thúc
     *                 example: "2025-12-25"
     *     responses:
     *       200:
     *         description: Đã cập nhật ngày lễ thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       404:
     *         description: Không tìm thấy ngày lễ
     *       500:
     *         description: Lỗi server
     */
    router.put('/:maNgayLe',
        checkPermission(PermissionEnum.MANAGE_HOLIDAY),
        validatePositiveIntegerParam('maNgayLe'),
        controller.updateNgayLe
    );

    /**
     * @swagger
     * /ngayle/{maNgayLe}:
     *   delete:
     *     summary: Xóa ngày lễ
     *     tags: [NgayLe]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maNgayLe
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID của ngày lễ
     *     responses:
     *       200:
     *         description: Đã xóa ngày lễ thành công
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.delete('/:maNgayLe',
        checkPermission(PermissionEnum.MANAGE_HOLIDAY),
        validatePositiveIntegerParam('maNgayLe'),
        controller.deleteNgayLe
    );

    return router;
}
