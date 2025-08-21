import {IVaiTroService} from "../interfaces/services/vaitro.service";
import VaiTroRepository from "../repositories/vaitro.repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../configs/types";
import {IVaiTroModel} from "../interfaces/models/vaitro.model";
import {VaiTroResponseDto} from "../dto/response/vaitro.response.dto";
import { PermissionEnum } from "../enums/permission.enum";

@injectable()
class VaiTroService implements IVaiTroService{
    constructor(@inject(TYPES.VaiTroRepository) private readonly vaiTroRepository: VaiTroRepository) {}

    async getAllVaiTro() {
        return await this.vaiTroRepository.findAll();
    }
    async createVaiTro(data:IVaiTroModel) {
        await this.vaiTroRepository.create(data);
    }

    async deleteVaiTro(maVaiTro: number, currentUser: any): Promise<void> {
        // Lấy quyền của người thực hiện
        const currentPermissions = await this.vaiTroRepository.findPermissionByVaiTroId(currentUser.maVaiTro);
        const isCurrentAdmin = currentPermissions.some(p => p.maQuyenHan === PermissionEnum.IS_ADMIN);
        if (!isCurrentAdmin) {
            throw new Error('Only Admin can delete roles');
        }
        await this.vaiTroRepository.delete(maVaiTro);
    }

    async updateVaiTro(data: IVaiTroModel) {
        await this.vaiTroRepository.update(data);
    }

    async addPermissionToVaiTro(maVaiTro: number, maQuyenHan: string, currentUser: any): Promise<void> {
        // Lấy quyền của vai trò target
        const targetPermissions = await this.vaiTroRepository.findPermissionByVaiTroId(maVaiTro);
        const isTargetAdmin = targetPermissions.some(p => p.maQuyenHan === PermissionEnum.IS_ADMIN);
        const isTargetFullAccess = targetPermissions.some(p => p.maQuyenHan === PermissionEnum.FULL_ACCESS);
        // Kiểm tra nếu quyền muốn gán là IS_ADMIN hoặc FULL_ACCESS
        const isGrantingAdmin = maQuyenHan === PermissionEnum.IS_ADMIN;
        const isGrantingFullAccess = maQuyenHan === PermissionEnum.FULL_ACCESS;
        // Lấy quyền của người thực hiện
        const currentPermissions = await this.vaiTroRepository.findPermissionByVaiTroId(currentUser.maVaiTro);
        const isCurrentAdmin = currentPermissions.some(p => p.maQuyenHan === PermissionEnum.IS_ADMIN);
        const isCurrentFullAccess = currentPermissions.some(p => p.maQuyenHan === PermissionEnum.FULL_ACCESS);

        if (isCurrentFullAccess) {
            if (isTargetAdmin || isTargetFullAccess) {
                throw new Error('You are not allowed to modify Admin or Full Access roles');
            }
            if (isGrantingAdmin || isGrantingFullAccess) {
                throw new Error('You are not allowed to assign Admin or Full Access permissions');
            }
        }
        if (!isCurrentAdmin && (isTargetAdmin || isGrantingAdmin)) {
            throw new Error('Only Admin can modify or assign Admin permission');
        }
        await this.vaiTroRepository.addPermission(maVaiTro, maQuyenHan);
    }
    async getAllPermissions(): Promise<VaiTroResponseDto[]> {
        return await this.vaiTroRepository.findAllPermissions();
    }

    async getPermissionsByVaiTro(maVaiTro: number): Promise<VaiTroResponseDto[]> {
        return await this.vaiTroRepository.findPermissionByVaiTroId(maVaiTro);
    }

    async removePermissionFromVaiTro(maVaiTro: number, maQuyenHan: string, currentUser: any): Promise<boolean> {
        // Lấy quyền của vai trò target
        const targetPermissions = await this.vaiTroRepository.findPermissionByVaiTroId(maVaiTro);
        const isTargetAdmin = targetPermissions.some(p => p.maQuyenHan === PermissionEnum.IS_ADMIN);
        const isTargetFullAccess = targetPermissions.some(p => p.maQuyenHan === PermissionEnum.FULL_ACCESS);

        // Kiểm tra nếu quyền muốn xóa là IS_ADMIN hoặc FULL_ACCESS
        const isRemovingAdmin = maQuyenHan === PermissionEnum.IS_ADMIN;
        const isRemovingFullAccess = maQuyenHan === PermissionEnum.FULL_ACCESS;

        // Lấy quyền của người thực hiện
        const currentPermissions = await this.vaiTroRepository.findPermissionByVaiTroId(currentUser.maVaiTro);
        const isCurrentAdmin = currentPermissions.some(p => p.maQuyenHan === PermissionEnum.IS_ADMIN);
        const isCurrentFullAccess = currentPermissions.some(p => p.maQuyenHan === PermissionEnum.FULL_ACCESS);

        if (isCurrentFullAccess) {
            if (isTargetAdmin || isTargetFullAccess) {
                throw new Error('You are not allowed to modify Admin or Full Access roles');
            }
            if (isRemovingAdmin || isRemovingFullAccess) {
                throw new Error('You are not allowed to remove Admin or Full Access permissions');
            }
        }

        if (!isCurrentAdmin && (isTargetAdmin || isRemovingAdmin)) {
            throw new Error('Only Admin can modify or remove Admin permission');
        }

        return await this.vaiTroRepository.deletePermission(maVaiTro, maQuyenHan);
    }
}

export default VaiTroService;
