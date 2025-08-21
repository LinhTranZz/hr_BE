export class NhanVienVangByPhongBanResponseDto {
    tenPhongBan: string;
    nhanVienVang: Array<any>;

    constructor(data: {
        tenPhongBan: string;
        nhanVienVang?: Array<any>;
    }) {
        this.tenPhongBan = data.tenPhongBan;
        this.nhanVienVang = data.nhanVienVang ?? [];
    }
}