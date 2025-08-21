export interface IVanTayModel{
    maQuetVanTay?: number;
    thoiGian: Date;
    loai?: string
    maNhanVien: number;
}

export interface INhanVienVanTayModel {
    maNhanVien: number;
    viTriNgonTay: number;
    duLieuNgonTay: string;
}