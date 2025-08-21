import express from 'express';
import { TYPES } from '../configs/types';
import LichSuUuTienController from '../controllers/lichsuuutien.controller';
import {container} from "../configs/inversify.config";
import { validateMultipleParams } from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const controller = container.get<LichSuUuTienController>(TYPES.LichSuUuTienController);

    /**
     * @swagger
     * /lichsuuutien:
     *   get:
     *     summary: Lấy danh sách lịch sử ưu tiên
     *     tags: [LichSuUuTien]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Danh sách lịch sử ưu tiên
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_ASSIGNED_PRIORITY),
        controller.getAllLichSuUuTien);


    /**
     * @swagger
     * /lichsuuutien:
     *   post:
     *     summary: Tạo mới lịch sử ưu tiên
     *     tags: [LichSuUuTien]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maUuTien
     *               - maNhanVien
     *               - thoiGianHieuLucBatDau
     *             properties:
     *               maUuTien:
     *                 type: number
     *                 description: Mã ưu tiên
     *               maNhanVien:
     *                 type: number
     *                 description: Mã nhân viên
     *               thoiGianHieuLucBatDau:
     *                 type: string
     *                 format: date
     *                 description: Thời gian hiệu lực bắt đầu
     *     responses:
     *       201:
     *         description: Đã tạo lịch sử ưu tiên thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.post('/',
        checkPermission(PermissionEnum.ASSIGN_PRIORITY),
        controller.createLichSuUuTien);

    /**
     * @swagger
     * /lichsuuutien/{maNhanVien}/{maUuTien}:
     *   put:
     *     summary: Cập nhật thông tin lịch sử ưu tiên
     *     tags: [LichSuUuTien]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: Mã nhân viên
     *       - in: path
     *         name: maUuTien
     *         schema:
     *           type: integer
     *         required: true
     *         description: Mã ưu tiên
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - thoiGianHieuLucBatDau
     *             properties:
     *               thoiGianHieuLucBatDau:
     *                 type: string
     *                 format: date
     *                 description: Thời gian hiệu lực bắt đầu
     *     responses:
     *       200:
     *         description: Đã cập nhật lịch sử ưu tiên thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       404:
     *         description: Không tìm thấy lịch sử ưu tiên
     *       500:
     *         description: Lỗi server
     */
    router.put('/:maNhanVien/:maUuTien',
        validateMultipleParams([
            { paramName: 'maNhanVien', type: 'positiveInteger' },
            { paramName: 'maUuTien', type: 'positiveInteger' }
        ]),
        controller.updateLichSuUuTien
    );

    /**
     * @swagger
     * /lichsuuutien/{maNhanVien}/{maUuTien}:
     *   delete:
     *     summary: Xóa lịch sử ưu tiên
     *     tags: [LichSuUuTien]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: Mã nhân viên
     *       - in: path
     *         name: maUuTien
     *         schema:
     *           type: integer
     *         required: true
     *         description: Mã ưu tiên
     *     responses:
     *       200:
     *         description: Đã xóa lịch sử ưu tiên thành công
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.delete('/:maNhanVien/:maUuTien',
        checkPermission(PermissionEnum.UNASSIGN_PRIORITY),
        validateMultipleParams([
            { paramName: 'maNhanVien', type: 'positiveInteger' },
            { paramName: 'maUuTien', type: 'positiveInteger' }
        ]),
        controller.deleteLichSuUuTien
    );

    return router;
}
