import {INgayNghiModel} from "../interfaces/models/ngaynghi.model";
import transporter from '../configs/mailer';
import env from '../configs/env'
import { TemplateUtils } from '../utils/template.utils';
import {inject, injectable} from "inversify";
import {TYPES} from "../configs/types";
import NhanVienRepository from "../repositories/nhanvien.repository";
import logger from "../utils/logger";
import dayjs from "dayjs";

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html: string;
}

@injectable()
export class EmailService {
    constructor(@inject(TYPES.NhanVienRepository)private readonly nhanVienRepo: NhanVienRepository) {}
    
    async sendLeaveStatusEmail(maNghiPhep: number, data: INgayNghiModel, reason?: string): Promise<void> {
        const nhanVien = await this.nhanVienRepo.findById(data.maNhanVien);
        const isApproved = data.trangThaiPheDuyet === 'Đã duyệt';

        // Chuẩn bị dữ liệu cho template
        const templateData = {
            maNghiPhep: maNghiPhep.toString(),
            hoTenNhanVien: nhanVien?.hoTen || 'Nhân viên',
            ngayBatDau: data.ngayBatDau ? dayjs.utc(data.ngayBatDau).format("DD/MM/YYYY - HH:mm:ss") : 'N/A',
            ngayKetThuc: data.ngayKetThuc ? dayjs.utc(data.ngayKetThuc).format("DD/MM/YYYY - HH:mm:ss") : 'N/A',
            lyDo: data.liDo || 'N/A',
            status: isApproved ? 'ĐÃ DUYỆT' : 'TỪ CHỐI',
            statusColor: isApproved ? '#28a745' : '#dc3545',
            reason: reason || ''
        };

        // Chọn template dựa trên trạng thái
        const templateName = isApproved ? 'leave-approval' : 'leave-rejection';
        const htmlContent = TemplateUtils.renderTemplateFromFile(templateName, templateData);

        const mailOptions: MailOptions = {
            from: env.get("EMAIL_USER"),
            to: nhanVien?.email ?? "",
            subject: `Thông báo ${isApproved ? 'duyệt' : 'từ chối'} đơn xin nghỉ phép - Mã: ${maNghiPhep}`,
            html: htmlContent
        };

        // Gửi email
        const info = await transporter.sendMail(mailOptions);
        logger.info(`Email ${isApproved ? 'approval' : 'rejection'} sent successfully:`, info.messageId);
    }
}

export default EmailService;