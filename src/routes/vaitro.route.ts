import express from "express";
import { container } from "../configs/inversify.config";
import { TYPES } from "../configs/types";
import VaiTroController from "../controllers/vaitro.controller";
import { validatePositiveIntegerParam } from '../middlewares/validation.middleware';
import { checkPermission } from '../middlewares/permission.middleware';
import { PermissionEnum } from '../enums/permission.enum';

export default () => {
    const router = express.Router();
    const vaiTroController = container.get<VaiTroController>(TYPES.VaiTroController);

    /**
     * @swagger
     * tags:
     *   name: VaiTro
     *   description: Endpoints related to VaiTro management
     */

    /**
     * @swagger
     * /vaitro:
     *   get:
     *     summary: Get all VaiTro
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all VaiTro.
     *     responses:
     *       200:
     *         description: A list of VaiTro.
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
     *                   example: VaiTro data fetched successfully
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/VaiTro'
     */
    router.get("/", checkPermission(PermissionEnum.VIEW_ROLE), vaiTroController.getAllVaiTro);


    /**
     * @swagger
     * /vaitro/{maPhongBan}:
     *   get:
     *     summary: Lấy danh sách vai trò theo mã phòng ban
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Trả về danh sách các vai trò thuộc một phòng ban cụ thể
     *     parameters:
     *       - in: path
     *         name: maPhongBan
     *         required: true
     *         schema:
     *           type: integer
     *         description: Mã phòng ban cần lấy danh sách vai trò
     *     responses:
     *       200:
     *         description: Lấy dữ liệu vai trò thành công
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
     *                   example: VaiTro data fetched successfully
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/VaiTro'
     *       404:
     *         description: Không tìm thấy dữ liệu vai trò
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
     *                   example: No VaiTro data found
     *       500:
     *         description: Lỗi máy chủ khi lấy vai trò
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
     *                   example: VaiTro data fetched error
     */
    // router.get("/:maPhongBan", vaiTroController.getAllVaiTroByIdPhongBan)

    /**
     * @swagger
     * /vaitro:
     *   post:
     *     summary: Create a new VaiTro
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Creates a new VaiTro.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tenVaiTro:
     *                 type: string
     *                 example: "Quản lý"
     *               maPhongBan:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       200:
     *         description: VaiTro created successfully.
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
     *                   example: VaiTro created successfully
     *                 data:
     *                   $ref: '#/components/schemas/VaiTro'
     *       400:
     *         description: Invalid input data
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
     *                   example: Invalid input
     *       500:
     *         description: Server error
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
     *                   example: Internal server error
     */
    router.post("/",
        checkPermission(PermissionEnum.MANAGE_ROLE),
        vaiTroController.createVaiTro);

    /**
     * @swagger
     * /vaitro/{maVaiTro}:
     *   put:
     *     summary: Update a VaiTro
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Updates a VaiTro by its ID.
     *     parameters:
     *       - name: maVaiTro
     *         in: path
     *         required: true
     *         description: The ID of the VaiTro to update.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tenVaiTro:
     *                 type: string
     *                 example: "Quản lý"
     *               maPhongBan:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       200:
     *         description: VaiTro updated successfully.
     */
    router.put("/:maVaiTro", 
        validatePositiveIntegerParam('maVaiTro'),
        checkPermission(PermissionEnum.MANAGE_ROLE),
        vaiTroController.updateVaiTro
    );

    /**
     * @swagger
     * /vaitro/{maVaiTro}:
     *   delete:
     *     summary: Delete a VaiTro by ID
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Deletes a VaiTro by its ID.
     *     parameters:
     *       - name: maVaiTro
     *         in: path
     *         required: true
     *         description: The ID of the VaiTro to delete.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: VaiTro deleted successfully.
     */
    router.delete("/:maVaiTro", 
        validatePositiveIntegerParam('maVaiTro'),
        checkPermission(PermissionEnum.MANAGE_ROLE),
        vaiTroController.deleteVaiTro
    );

    /**
     * @swagger
     * /vaitro/quyenhan:
     *   get:
     *     summary: Get all permissions
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Returns a list of all permissions that can be assigned to roles.
     *     responses:
     *       200:
     *         description: A list of permissions retrieved successfully
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
     *                   example: Permissions for VaiTro fetched successfully
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/QuyenHanModel'
     *       404:
     *         description: No permissions found
     *       500:
     *         description: Server error
     */
    router.get("/quyenhan",
        vaiTroController.getAllPermissions);

    /**
     * @swagger
     * /vaitro/quyenhan/{maVaiTro}:
     *   get:
     *     summary: Get permissions by VaiTro ID
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Returns all permissions assigned to a specific VaiTro.
     *     parameters:
     *       - in: path
     *         name: maVaiTro
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the VaiTro
     *     responses:
     *       200:
     *         description: Permissions fetched successfully
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
     *                   example: Permissions for VaiTro fetched successfully
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/QuyenHanModel'
     *       404:
     *         description: VaiTro not found or no permissions assigned
     *       500:
     *         description: Server error
     */
    router.get("/quyenhan/:maVaiTro",
        validatePositiveIntegerParam('maVaiTro'),
        vaiTroController.getPermissionByVaiTroId);

    /**
     * @swagger
     * /vaitro/quyenhan/{maVaiTro}/{maQuyenHan}:
     *   post:
     *     summary: Assign a permission to a role
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Assigns a specific permission to a role.
     *     parameters:
     *       - in: path
     *         name: maVaiTro
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the role
     *       - in: path
     *         name: maQuyenHan
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the permission to assign
     *     responses:
     *       200:
     *         description: Permission assigned to role successfully
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
     *                   example: Permission with ID 1 added to VaiTro with ID 2
     *                 data:
     *                   type: object
     *                   properties:
     *                     maVaiTro:
     *                       type: integer
     *                       example: 2
     *                     maQuyenHan:
     *                       type: string
     *                       example: "1"
     *       400:
     *         description: Invalid input or permission already assigned
     *       404:
     *         description: Role or permission not found
     *       500:
     *         description: Server error
     */
    router.post('/quyenhan/:maVaiTro/:maQuyenHan',
        checkPermission(PermissionEnum.MANAGE_ROLE_PERMISSIONS),
        vaiTroController.addPermissionToVaiTro)

    /**
     * @swagger
     * /vaitro/quyenhan/{maVaiTro}/{maQuyenHan}:
     *   delete:
     *     summary: Remove a permission from a role
     *     tags: [VaiTro]
     *     security:
     *       - bearerAuth: []
     *     description: Removes a specific permission from a role.
     *     parameters:
     *       - in: path
     *         name: maVaiTro
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the role
     *       - in: path
     *         name: maQuyenHan
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the permission to remove
     *     responses:
     *       200:
     *         description: Permission removed from role successfully
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
     *                   example: Permission with ID 1 removed from VaiTro with ID 2
     *                 data:
     *                   type: null
     *       404:
     *         description: Role, permission, or assignment not found
     *       500:
     *         description: Server error
     */
    router.delete('/quyenhan/:maVaiTro/:maQuyenHan',
        checkPermission(PermissionEnum.MANAGE_ROLE_PERMISSIONS),
        vaiTroController.removePermissionFromVaiTro);

    return router;
}
