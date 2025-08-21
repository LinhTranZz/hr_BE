export class VaiTroResponseDto {
    maVaiTro: number;
    maQuyenHan: string;
    tenVaiTro: string;
    tenQuyenHan: string;
    moTa: string;

    constructor(maVaiTro: number, maQuyenHan:string, tenVaiTro: string, tenQuyenHan: string, moTa: string) {
        this.maVaiTro = maVaiTro;
        this.maQuyenHan = maQuyenHan;
        this.tenVaiTro = tenVaiTro;
        this.tenQuyenHan = tenQuyenHan;
        this.moTa = moTa;
    }
}