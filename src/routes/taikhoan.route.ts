import express from "express";
import {container} from "../configs/inversify.config";
import TaiKhoanController from "../controllers/taikhoan.controller";
import {TYPES} from "../configs/types";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import { checkPermission } from '../middlewares/permission.middleware';
import { PermissionEnum } from '../enums/permission.enum';

export default () => {
    const router = express.Router()
    const taiKhoanController = container.get<TaiKhoanController>(TYPES.TaiKhoanController);

    /**
     * @swagger
     * tags:
     *   name: TaiKhoan
     *   description: Endpoints related to TaiKhoan management
     */

    /**
     * @swagger
     * /taikhoan:
     *   get:
     *     summary: Get all user accounts
     *     tags: [TaiKhoan]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Success - Returns list of user accounts
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       maNhanVien:
     *                         type: number
     *                       tenDangNhap:
     *                         type: string
     *                       matKhau:
     *                         type: string
     *       404:
     *         description: No TaiKhoan data found
     *       500:
     *         description: Server error
     */
    router.get("/",
        checkPermission(PermissionEnum.VIEW_ACCOUNT),
        taiKhoanController.getTaiKhoan);

    /**
     * @swagger
     * /taikhoan:
     *   post:
     *     summary: Create a new user account
     *     tags: [TaiKhoan]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maNhanVien
     *               - tenDangNhap
     *               - matKhau
     *             properties:
     *               maNhanVien:
     *                 type: number
     *                 description: Employee ID
     *                 example: 1
     *               tenDangNhap:
     *                 type: string
     *                 description: Username
     *                 example: "admin"
     *               matKhau:
     *                 type: string
     *                 description: Password
     *                 example: "Admin@123"
     *     responses:
     *       201:
     *         description: Tài khoản created successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.post("/",
        checkPermission(PermissionEnum.MANAGE_ACCOUNT),
        taiKhoanController.createTaiKhoan);

    /**
     * @swagger
     * /taikhoan/{maNhanVien}:
     *   put:
     *     summary: Update a user account
     *     tags: [TaiKhoan]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         required: true
     *         schema:
     *           type: integer
     *         description: Employee ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - maNhanVien
     *               - tenDangNhap
     *               - matKhau
     *             properties:
     *               tenDangNhap:
     *                 type: string
     *                 description: Username
     *                 example: "admin"
     *               matKhau:
     *                 type: string
     *                 description: Password
     *                 example: "Admin123@"
     *     responses:
     *       200:
     *         description: Tài khoản updated successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.put("/:maNhanVien",
        validatePositiveIntegerParam('maNhanVien'),
        checkPermission(PermissionEnum.MANAGE_ACCOUNT),
        taiKhoanController.updateTaiKhoan
    );

    /**
     * @swagger
     * /taikhoan/{maNhanVien}:
     *   delete:
     *     summary: Delete a user account
     *     tags: [TaiKhoan]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: maNhanVien
     *         required: true
     *         schema:
     *           type: integer
     *         description: Employee ID
     *     responses:
     *       200:
     *         description: Tài khoản deleted successfully
     *       400:
     *         description: Invalid MaNhanVien
     *       500:
     *         description: Server error
     */
    router.delete("/:maNhanVien", 
        validatePositiveIntegerParam('maNhanVien'),
        checkPermission(PermissionEnum.MANAGE_ACCOUNT),
        taiKhoanController.deleteTaiKhoan
    );


    /**
     * @swagger
     * /taikhoan/login:
     *   post:
     *     summary: Login user account
     *     tags: [TaiKhoan]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - tenDangNhap
     *               - matKhau
     *             properties:
     *               tenDangNhap:
     *                 type: string
     *                 description: Username
     *                 example: "admin"
     *               matKhau:
     *                 type: string
     *                 description: Password
     *                 example: "Admin@123"
     *     responses:
     *       200:
     *         description: Login successful - Returns JWT token
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       401:
     *         description: Invalid username or password
     */
    router.post('/login', taiKhoanController.login);

    return router;
}

