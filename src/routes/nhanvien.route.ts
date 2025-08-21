import express from "express";
import {container} from "../configs/inversify.config";
import {TYPES} from "../configs/types";
import NhanVienController from "../controllers/nhanvien.controller";
import PhongBanController from "../controllers/phongban.controller";
import LuongController from "../controllers/luong.controller";
import {validatePositiveIntegerParam} from '../middlewares/validation.middleware';
import {checkPermission} from "../middlewares/permission.middleware";
import {PermissionEnum} from "../enums/permission.enum";

export default () => {
    const router = express.Router();
    const nhanVienController = container.get<NhanVienController>(TYPES.NhanVienController);
    const phongBanController = container.get<PhongBanController>(TYPES.PhongBanController);
    const luongController = container.get<LuongController>(TYPES.LuongController);


    /**
     * @swagger
     * tags:
     *   name: NhanVien
     *   description: Endpoints related to employee management
     */

    /**
     * @swagger
     * /nhanvien:
     *   get:
     *     summary: Get all employees
     *     tags: [NhanVien]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all employees.
     *     responses:
     *       200:
     *         description: A list of employees.
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
     *                       maNhanVien:
     *                         type: integer
     *                         example: 1
     *                       hoTen:
     *                         type: string
     *                         example: "Nguyen Van A"
     *                       ngaySinh:
     *                         type: string
     *                         format: date
     *                         example: "01/01/1990"
     *                       soDienThoai:
     *                         type: string
     *                         example: "0123456789"
     *                       cmnd:
     *                         type: string
     *                         example: "123456789"
     *                       diaChi:
     *                         type: string
     *                         example: "Ho Chi Minh City"
     *                       ngayVaoLam:
     *                         type: string
     *                         format: date
     *                         example: "2020-01-01"
     *                       luongCoBan:
     *                         type: number
     *                         example: 10000000
     *                       trangThai:
     *                         type: string
     *                         example: "active"
     *                       maVaiTro:
     *                         type: integer
     *                         example: 1
     *                       maPhongBan:
     *                         type: integer
     *                         example: 1
     *                       maUuTien:
     *                         type: integer
     *                         example: 1
     *                 message:
     *                   type: string
     *                   example: "NhanVien data fetched successfully"
     */
    router.get('/',
        checkPermission(PermissionEnum.VIEW_EMPLOYEE),
        nhanVienController.getAllNhanVien);

    /**
     * @swagger
     * /nhanvien/chitiet:
     *   get:
     *     summary: Lấy danh sách nhân viên chi tiết
     *     tags: [NhanVien]
     *     security:
     *       - bearerAuth: []
     *     description: Trả về danh sách nhân viên với đầy đủ thông tin chi tiết như mã nhân viên, họ tên, ngày sinh, số điện thoại, CMND, địa chỉ, ngày vào làm, lương cơ bản, trạng thái, vai trò, phòng ban, ưu tiên và tên các trường liên quan.
     *     responses:
     *       200:
     *         description: Thành công, trả về danh sách nhân viên chi tiết
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   maNhanVien:
     *                     type: integer
     *                     example: 1
     *                   hoTen:
     *                     type: string
     *                     example: "Nguyen Van A"
     *                   ngaySinh:
     *                     type: string
     *                     format: date
     *                     example: "2000-01-15"
     *                   soDienThoai:
     *                     type: string
     *                     example: "0901234567"
     *                   cmnd:
     *                     type: string
     *                     example: "123456789012"
     *                   diaChi:
     *                     type: string
     *                     example: "123 Nguyen Van Linh, Q.7, TP HCM"
     *                   ngayVaoLam:
     *                     type: string
     *                     format: date
     *                     example: "2022-03-01"
     *                   luongCoBan:
     *                     type: number
     *                     example: 10000000
     *                   trangThai:
     *                     type: string
     *                     example: "Đang làm việc"
     *                   maVaiTro:
     *                     type: integer
     *                     example: 2
     *                   maPhongBan:
     *                     type: integer
     *                     example: 3
     *                   maUuTien:
     *                     type: integer
     *                     example: 1
     *                   tenPhongBan:
     *                     type: string
     *                     example: "Phòng Kỹ thuật"
     *                   tenVaiTro:
     *                     type: string
     *                     example: "Nhân viên"
     *                   tenUuTien:
     *                     type: string
     *                     example: "Ưu tiên cao"
     */
    router.get('/chitiet',
        checkPermission(PermissionEnum.VIEW_EMPLOYEE),
        nhanVienController.getAllNhanVienDetail)

    /**
     * @swagger
     * /nhanvien/vantay:
     *   get:
     *     summary: Get all employees' fingerprints
     *     tags: [NhanVien]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all employees with their fingerprint data.
     *     responses:
     *       200:
     *         description: A list of employees' fingerprints.
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
     *                       maNhanVien:
     *                         type: integer
     *                         example: 1
     *                       viTriNgonTay:
     *                         type: integer
     *                         example: 6
     *                 message:
     *                   type: string
     *                   example: "NhanVien fingerprint data fetched successfully"
     */
    router.get('/vantay',
        checkPermission(PermissionEnum.VIEW_EMPLOYEE),
        nhanVienController.getAllNhanVienVanTay)

    /**
     * @swagger
     * /nhanvien/reload:
     *   get:
     *     summary: Reload trạng thái nhân viên
     *     description: Gọi stored procedure để cập nhật lại trạng thái tất cả nhân viên.
     *     tags: [NhanVien]
     *     responses:
     *       200:
     *         description: Reload thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: "null"
     *                   nullable: true
     *                 message:
     *                   type: string
     *                   example: "NhanVien reloaded successfully"
     *       500:
     *         description: Lỗi khi reload
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
     *                   example: "Failed to reloaded NhanVien"
     */
    router.get('/reload', nhanVienController.reloadTrangThaiNhanVien);

    /**
     * @swagger
     * /nhanvien:
     *   post:
     *     summary: Create a new employee
     *     tags: [NhanVien]
     *     security:
     *       - bearerAuth: []
     *     description: Creates a new employee.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               hoTen:
     *                 type: string
     *                 example: "Nguyen Van A"
     *               ngaySinh:
     *                 type: string
     *                 format: date
     *                 example: "1990-01-01"
     *               soDienThoai:
     *                 type: string
     *                 example: "0123456789"
     *               cmnd:
     *                 type: string
     *                 example: "123456789"
     *               diaChi:
     *                 type: string
     *                 example: "Ho Chi Minh City"
     *               ngayVaoLam:
     *                 type: string
     *                 format: date
     *                 example: "2020-01-01"
     *               luongCoBan:
     *                 type: number
     *                 example: 10000000
     *               trangThai:
     *                 type: string
     *                 example: "Đang làm"
     *               maVaiTro:
     *                 type: integer
     *                 example: 1
     *               maPhongBan:
     *                 type: integer
     *                 example: 1
     *               maUuTien:
     *                 type: integer
     *                 example: 1
     *               heSoTangCa:
     *                 type: number
     *                 example: 1
     *     responses:
     *       201:
     *         description: Employee created successfully.
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
     *                 message:
     *                   type: string
     *                   example: "NhanVien created successfully"
     */
    router.post('/',
        checkPermission(PermissionEnum.MANAGE_EMPLOYEE),
        nhanVienController.createNhanVien);

    /**
     * @swagger
     * /nhanvien/{maNhanVien}:
     *   put:
     *     summary: Update an employee
     *     tags: [NhanVien]
     *     security:
     *       - bearerAuth: []
     *     description: Updates an employee by their ID.
     *     parameters:
     *       - name: maNhanVien
     *         in: path
     *         required: true
     *         description: The ID of the employee to update.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               hoTen:
     *                 type: string
     *                 example: "Nguyen Van A"
     *               ngaySinh:
     *                 type: string
     *                 format: date
     *                 example: "1990-01-01"
     *               soDienThoai:
     *                 type: string
     *                 example: "0123456789"
     *               cmnd:
     *                 type: string
     *                 example: "123456789"
     *               diaChi:
     *                 type: string
     *                 example: "Ho Chi Minh City"
     *               ngayVaoLam:
     *                 type: string
     *                 format: date
     *                 example: "2020-01-01"
     *               luongCoBan:
     *                 type: number
     *                 example: 10000000
     *               trangThai:
     *                 type: string
     *                 example: "Đang làm"
     *               maVaiTro:
     *                 type: integer
     *                 example: 1
     *               maPhongBan:
     *                 type: integer
     *                 example: 1
     *               maUuTien:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       200:
     *         description: Employee updated successfully.
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
     *                 message:
     *                   type: string
     *                   example: "NhanVien updated successfully"
     */
    router.put('/:maNhanVien',
        validatePositiveIntegerParam('maNhanVien'),
        checkPermission(PermissionEnum.MANAGE_EMPLOYEE),
        phongBanController.moveNhanVien,
        luongController.updateLuong, 
        nhanVienController.updateNhanVien
    );

    /**
     * @swagger
     * /nhanvien/{maNhanVien}:
     *   patch:
     *     summary: Update employee email
     *     tags: [NhanVien]
     *     security:
     *       - bearerAuth: []
     *     description: Updates the email address of an employee by their ID.
     *     parameters:
     *       - name: maNhanVien
     *         in: path
     *         required: true
     *         description: The ID of the employee to update email for.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 example: "employee@company.com"
     *     responses:
     *       200:
     *         description: Employee email updated successfully.
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
     *                 message:
     *                   type: string
     *                   example: "Employee email updated successfully"
     *       400:
     *         description: Invalid email format or missing email field.
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
     *                   example: "Invalid email format"
     *       404:
     *         description: Employee not found.
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
     *                   example: "Employee not found"
     */
    router.patch('/:maNhanVien',
        validatePositiveIntegerParam('maNhanVien'),
        nhanVienController.updateEmailNhanVien
    );

    /**
     * @swagger
     * /nhanvien/{maNhanVien}:
     *   delete:
     *     summary: Delete an employee
     *     tags: [NhanVien]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes an employee by their ID.
     *     parameters:
     *       - name: maNhanVien
     *         in: path
     *         required: true
     *         description: The ID of the employee to delete.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Employee deleted successfully.
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
     *                 message:
     *                   type: string
     *                   example: "NhanVien deleted successfully"
     */
    router.delete('/:maNhanVien',
        validatePositiveIntegerParam('maNhanVien'),
        checkPermission(PermissionEnum.MANAGE_EMPLOYEE),
        nhanVienController.deleteNhanVien
    );

    /**
     * @swagger
     * /nhanvien/chitiet:
     *   post:
     *     summary: Lấy chi tiết nhân viên theo CCCD
     *     tags: [NhanVien]
     *     security:
     *       - bearerAuth: []
     *     description: Trả về thông tin nhân viên dựa trên số CCCD cung cấp.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               cccd:
     *                 type: string
     *                 example: "123456789012"
     *     responses:
     *       200:
     *         description: Trả về thông tin chi tiết của nhân viên.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: object
     *                   properties:
     *                     maNhanVien:
     *                       type: integer
     *                       example: 1
     *                     hoTen:
     *                       type: string
     *                       example: "Nguyễn Văn A"
     *                     cccd:
     *                       type: string
     *                       example: "123456789012"
     *                 message:
     *                   type: string
     *                   example: "Lấy thông tin nhân viên thành công"
     *       404:
     *         description: Không tìm thấy nhân viên
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 data:
     *                   type: null
     *                 message:
     *                   type: string
     *                   example: "Không tìm thấy nhân viên với CCCD đã cung cấp"
     */
    router.post('/chitiet', nhanVienController.getNhanVienByCCCD)



    return router;
}
