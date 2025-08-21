export class HeThongResponseDto {
    congNgayChuNhat?: number;
    khoangCachGiuaCacLanChamCong?: string;
    nguongThoiGianPheDuyetNgayNghi?: number;
    soNgayPhepTrongNam?: number;

    constructor(data: {
        congNgayChuNhat?: number;
        khoangCachGiuaCacLanChamCong?: string;
        nguongThoiGianPheDuyetNgayNghi?: number;
        soNgayPhepTrongNam?: number;
    }) {
        this.congNgayChuNhat = data.congNgayChuNhat;
        this.khoangCachGiuaCacLanChamCong = data.khoangCachGiuaCacLanChamCong;
        this.nguongThoiGianPheDuyetNgayNghi = data.nguongThoiGianPheDuyetNgayNghi;
        this.soNgayPhepTrongNam = data.soNgayPhepTrongNam;
    }
}