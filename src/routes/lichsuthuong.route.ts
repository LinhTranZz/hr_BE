import express from 'express';
import { TYPES } from '../configs/types';
import LichSuThuongController from '../controllers/lichsuthuong.controller';
import {container} from "../configs/inversify.config";
import { validateMultipleParams } from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const controller = container.get<LichSuThuongController>(TYPES.LichSuThuongController);

    /**
     * @swagger
     * /lichsuthuong:
     *   get:
     *     summary: Lấy danh sách lịch sử tiền thưởng
     *     tags: [LichSuThuong]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Danh sách lịch sử tiền thưởng
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
     *                       maLoaiTienThuong:
     *                         type: integer
     *                         example: 1
     *                       maNhanVien:
     *                         type: integer
     *                         example: 1
     *                       soTienThuongKhac:
     *                         type: number
     *                         example: 250000
     *                       ngayTao:
     *                         type: string
     *                         format: date
     *                         example: "2025-06-01"
     *                       lyDo:
     *                         type: string
     *                         example: "Đạt thành tích xuất sắc"
     *                 message:
     *                   type: string
     *                   example: "Bonus history fetched successfully"
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_ASSIGNED_BONUS),
        controller.getAllLichSuThuong);

    /**
     * @swagger
     * /lichsuthuong:
     *   post:
     *     summary: Tạo mới lịch sử tiền thưởng
     *     tags: [LichSuThuong]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maLoaiTienThuong
     *               - maNhanVien
     *               - lyDo
     *             properties:
     *               maLoaiTienThuong:
     *                 type: number
     *                 description: Mã loại tiền thưởng
     *                 example: 1
     *               maNhanVien:
     *                 type: number
     *                 description: Mã nhân viên
     *                 example: 1
     *               soTienThuongKhac:
     *                 type: number
     *                 description: Số tiền thưởng khác
     *                 example: 500000
     *               lyDo:
     *                 type: string
     *                 description: Lý do thưởng
     *                 example: "Hoàn thành xuất sắc dự án ABC"
     *     responses:
     *       201:
     *         description: Đã tạo lịch sử tiền thưởng thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: null
     *                   nullable: true
     *                 message:
     *                   type: string
     *                   example: "Bonus history created successfully"
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.post('/',
        checkPermission(PermissionEnum.ASSIGN_BONUS),
        controller.createLichSuThuong);

    /**
     * @swagger
     * /lichsuthuong/{maNhanVien}/{maLoaiTienThuong}:
     *   put:
     *     summary: Cập nhật thông tin lịch sử tiền thưởng
     *     tags: [LichSuThuong]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID nhân viên
     *       - in: path
     *         name: maLoaiTienThuong
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID loại tiền thưởng
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - lyDo
     *             properties:
     *               soTienThuongKhac:
     *                 type: number
     *                 description: Số tiền thưởng khác
     *                 example: 300000
     *               lyDo:
     *                 type: string
     *                 description: Lý do thưởng
     *                 example: "Cập nhật: Đóng góp sáng kiến cải tiến quy trình"
     *     responses:
     *       200:
     *         description: Đã cập nhật lịch sử tiền thưởng thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: null
     *                   nullable: true
     *                 message:
     *                   type: string
     *                   example: "Bonus history updated successfully"
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       404:
     *         description: Không tìm thấy lịch sử tiền thưởng
     *       500:
     *         description: Lỗi server
     */
    router.put('/:maNhanVien/:maLoaiTienThuong',
        validateMultipleParams([
            { paramName: 'maNhanVien', type: 'positiveInteger' },
            { paramName: 'maLoaiTienThuong', type: 'positiveInteger' }
        ]),
        controller.updateLichSuThuong
    );

    /**
     * @swagger
     * /lichsuthuong/{maNhanVien}/{maLoaiTienThuong}:
     *   delete:
     *     summary: Xóa lịch sử tiền thưởng
     *     tags: [LichSuThuong]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID nhân viên
     *       - in: path
     *         name: maLoaiTienThuong
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID loại tiền thưởng
     *     responses:
     *       200:
     *         description: Đã xóa lịch sử tiền thưởng thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: null
     *                   nullable: true
     *                 message:
     *                   type: string
     *                   example: "Bonus history deleted successfully"
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.delete('/:maNhanVien/:maLoaiTienThuong',
        checkPermission(PermissionEnum.UNASSIGN_BONUS),
        validateMultipleParams([
            { paramName: 'maNhanVien', type: 'positiveInteger' },
            { paramName: 'maLoaiTienThuong', type: 'positiveInteger' }
        ]),
        controller.deleteLichSuThuong
    );

    return router;
}
