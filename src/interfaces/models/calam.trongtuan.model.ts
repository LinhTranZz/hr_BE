export interface ICaLamTrongTuanModel {
    maCa: number;
    ngayTrongTuan: number;
    coLamViec: number;
    gioBatDau: Date | null;
    gioKetThuc: Date | null;
    gioNghiTruaBatDau: Date | null;
    gioNghiTruaKetThuc: Date | null;
    soGioLamViec?: number;
}
