import express from 'express';
import { TYPES } from '../configs/types';
import LoaiTienTruController from '../controllers/loaitientru.controller';
import {container} from "../configs/inversify.config";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import { PermissionEnum } from '../enums/permission.enum';

export default () => {
    const router = express.Router();
    const controller = container.get<LoaiTienTruController>(TYPES.LoaiTienTruController);

    /**
     * @swagger
     * /loaitientru:
     *   get:
     *     summary: Lấy danh sách loại tiền trừ
     *     tags: [LoaiTienTru]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Danh sách loại tiền trừ
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_PUNISHMENT),
        controller.getAllLoaiTienTru);


    /**
     * @swagger
     * /loaitientru:
     *   post:
     *     summary: Tạo mới loại tiền trừ
     *     tags: [LoaiTienTru]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - tenLoaiTienTru
     *             properties:
     *               tenLoaiTienTru:
     *                 type: string
     *                 description: Tên của loại tiền trừ
     *               soTienTru:
     *                 type: number
     *                 description: Số tiền trừ
     *               donVi:
     *                 type: string
     *                 description: Đơn vị của tiền trừ (VND, %, etc.)
     *     responses:
     *       201:
     *         description: Đã tạo loại tiền trừ thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.post('/',
        checkPermission(PermissionEnum.MANAGE_PUNISHMENT),
        controller.createLoaiTienTru);

    /**
     * @swagger
     * /loaitientru/{maLoaiTienTru}:
     *   put:
     *     summary: Cập nhật thông tin loại tiền trừ
     *     tags: [LoaiTienTru]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maLoaiTienTru
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID của loại tiền trừ
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - tenLoaiTienTru
     *             properties:
     *               tenLoaiTienTru:
     *                 type: string
     *                 description: Tên của loại tiền trừ
     *               soTienTru:
     *                 type: number
     *                 description: Số tiền trừ
     *               donVi:
     *                 type: string
     *                 description: Đơn vị của tiền trừ (VND, %, etc.)
     *     responses:
     *       200:
     *         description: Đã cập nhật loại tiền trừ thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       404:
     *         description: Không tìm thấy loại tiền trừ
     *       500:
     *         description: Lỗi server
     */
    router.put('/:maLoaiTienTru',
        checkPermission(PermissionEnum.MANAGE_PUNISHMENT),
        validatePositiveIntegerParam('maLoaiTienTru'),
        controller.updateLoaiTienTru
    );

    /**
     * @swagger
     * /loaitientru/{maLoaiTienTru}:
     *   delete:
     *     summary: Xóa loại tiền trừ
     *     tags: [LoaiTienTru]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maLoaiTienTru
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID của loại tiền trừ
     *     responses:
     *       200:
     *         description: Đã xóa loại tiền trừ thành công
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.delete('/:maLoaiTienTru',
        checkPermission(PermissionEnum.MANAGE_PUNISHMENT),
        validatePositiveIntegerParam('maLoaiTienTru'),
        controller.deleteLoaiTienTru
    );

    return router;
}
