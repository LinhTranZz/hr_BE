import express from 'express';
import { TYPES } from '../configs/types';
import LoaiTienThuongController from '../controllers/loaitienthuong.controller';
import {container} from "../configs/inversify.config";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import { PermissionEnum } from '../enums/permission.enum';
import {checkPermission} from "../middlewares/permission.middleware";

export default () => {
    const router = express.Router();
    const controller = container.get<LoaiTienThuongController>(TYPES.LoaiTienThuongController);

    /**
     * @swagger
     * /loaitienthuong:
     *   get:
     *     summary: Lấy danh sách loại tiền thưởng
     *     tags: [LoaiTienThuong]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Danh sách loại tiền thưởng
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_BONUS),
        controller.getAllLoaiTienThuong);

    /**
     * @swagger
     * /loaitienthuong:
     *   post:
     *     summary: Tạo mới loại tiền thưởng
     *     tags: [LoaiTienThuong]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - tenLoaiTienThuong
     *               - donVi
     *             properties:
     *               tenLoaiTienThuong:
     *                 type: string
     *                 description: Tên của loại tiền thưởng
     *               soTienThuong:
     *                 type: number
     *                 description: Số tiền thưởng
     *               donVi:
     *                 type: string
     *                 description: Đơn vị của tiền thưởng (VND, %, etc.)
     *     responses:
     *       201:
     *         description: Đã tạo loại tiền thưởng thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.post('/',
        checkPermission(PermissionEnum.MANAGE_BONUS),
        controller.createLoaiTienThuong);

    /**
     * @swagger
     * /loaitienthuong/{maLoaiTienThuong}:
     *   put:
     *     summary: Cập nhật thông tin loại tiền thưởng
     *     tags: [LoaiTienThuong]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maLoaiTienThuong
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID của loại tiền thưởng
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - tenLoaiTienThuong
     *               - donVi
     *             properties:
     *               tenLoaiTienThuong:
     *                 type: string
     *                 description: Tên của loại tiền thưởng
     *               soTienThuong:
     *                 type: number
     *                 description: Số tiền thưởng
     *               donVi:
     *                 type: string
     *                 description: Đơn vị của tiền thưởng (VND, %, etc.)
     *     responses:
     *       200:
     *         description: Đã cập nhật loại tiền thưởng thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       404:
     *         description: Không tìm thấy loại tiền thưởng
     *       500:
     *         description: Lỗi server
     */
    router.put('/:maLoaiTienThuong',
        checkPermission(PermissionEnum.MANAGE_BONUS),
        validatePositiveIntegerParam('maLoaiTienThuong'),
        controller.updateLoaiTienThuong
    );

    /**
     * @swagger
     * /loaitienthuong/{maLoaiTienThuong}:
     *   delete:
     *     summary: Xóa loại tiền thưởng
     *     tags: [LoaiTienThuong]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maLoaiTienThuong
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID của loại tiền thưởng
     *     responses:
     *       200:
     *         description: Đã xóa loại tiền thưởng thành công
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.delete('/:maLoaiTienThuong',
        checkPermission(PermissionEnum.MANAGE_BONUS),
        validatePositiveIntegerParam('maLoaiTienThuong'),
        controller.deleteLoaiTienThuong
    );

    return router;
}
