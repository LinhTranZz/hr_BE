import express from 'express';
import {TYPES} from '../configs/types';
import LichSuTruController from '../controllers/lichsutru.controller';
import {container} from "../configs/inversify.config";
import {validateMultipleParams} from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const controller = container.get<LichSuTruController>(TYPES.LichSuTruController);

    /**
     * @swagger
     * /lichsutru:
     *   get:
     *     summary: Lấy danh sách lịch sử tiền trừ
     *     tags: [LichSuTru]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Danh sách lịch sử tiền trừ
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
     *                       maLoaiTienTru:
     *                         type: integer
     *                         example: 3
     *                       maNhanVien:
     *                         type: integer
     *                         example: 5
     *                       soTienTruKhac:
     *                         type: number
     *                         example: 50000
     *                       ngayTao:
     *                         type: string
     *                         format: date
     *                         example: "2025-05-20"
     *                       lyDo:
     *                         type: string
     *                         example: "Đi trễ"
     *                 message:
     *                   type: string
     *                   example: "Deduction history fetched successfully"
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_ASSIGNED_PUNISHMENT),
        controller.getAllLichSuTru);

    /**
     * @swagger
     * /lichsutru:
     *   post:
     *     summary: Tạo mới lịch sử tiền trừ
     *     tags: [LichSuTru]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maLoaiTienTru
     *               - maNhanVien
     *               - lyDo
     *             properties:
     *               maLoaiTienTru:
     *                 type: number
     *                 description: Mã loại tiền trừ
     *                 example: 1
     *               maNhanVien:
     *                 type: number
     *                 description: Mã nhân viên
     *                 example: 1
     *               soTienTruKhac:
     *                 type: number
     *                 description: Số tiền trừ khác
     *                 example: 100000
     *               lyDo:
     *                 type: string
     *                 description: Lý do trừ tiền
     *                 example: "Nghỉ không phép"
     *     responses:
     *       201:
     *         description: Đã tạo lịch sử tiền trừ thành công
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
     *                   example: "Deduction history created successfully"
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.post('/',
        checkPermission(PermissionEnum.ASSIGN_PUNISHMENT),
        controller.createLichSuTru);

   /**
    * @swagger
    * /lichsutru/{maNhanVien}/{maLoaiTienTru}:
    *   put:
    *     summary: Cập nhật thông tin lịch sử tiền trừ
    *     tags: [LichSuTru]
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
    *         name: maLoaiTienTru
    *         schema:
    *           type: integer
    *         required: true
    *         description: Mã loại tiền trừ
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - maLoaiTienTru
    *               - maNhanVien
    *               - lyDo
    *             properties:
    *               soTienTruKhac:
    *                 type: number
    *                 description: Số tiền trừ khác
    *                 example: 75000
    *               lyDo:
    *                 type: string
    *                 description: Lý do trừ tiền
    *                 example: "Cập nhật: Vi phạm quy định công ty"
    *     responses:
    *       200:
    *         description: Đã cập nhật lịch sử tiền trừ thành công
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
    *                   example: "Deduction history updated successfully"
    *       400:
    *         description: Dữ liệu không hợp lệ
    *       401:
    *         description: Không có quyền truy cập
    *       404:
    *         description: Không tìm thấy lịch sử tiền trừ
    *       500:
    *         description: Lỗi server
    */
   router.put('/:maNhanVien/:maLoaiTienTru',
        validateMultipleParams([
            { paramName: 'maNhanVien', type: 'positiveInteger' },
            { paramName: 'maLoaiTienTru', type: 'positiveInteger' }
        ]),
        controller.updateLichSuTru
    );

    /**
     * @swagger
     * /lichsutru/{maNhanVien}/{maLoaiTienTru}:
     *   delete:
     *     summary: Xóa lịch sử tiền trừ
     *     tags: [LichSuTru]
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
     *         name: maLoaiTienTru
     *         schema:
     *           type: integer
     *         required: true
     *         description: Mã loại tiền trừ
     *     responses:
     *       200:
     *         description: Đã xóa lịch sử tiền trừ thành công
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
     *                   example: "Deduction history deleted successfully"
     *       401:
     *         description: Không có quyền truy cập
     *       500:
     *         description: Lỗi server
     */
    router.delete('/:maNhanVien/:maLoaiTienTru',
        checkPermission(PermissionEnum.UNASSIGN_PUNISHMENT),
        validateMultipleParams([
            { paramName: 'maNhanVien', type: 'positiveInteger' },
            { paramName: 'maLoaiTienTru', type: 'positiveInteger' }
        ]),
        controller.deleteLichSuTru
    );

    return router;
}
