import {IThemPhuCapModel} from "../models/themphucap.model";

export interface IThemPhuCapService {
    getThemPhuCaps(): Promise<IThemPhuCapModel[]>;
    createThemPhuCap(themPhuCap: IThemPhuCapModel): Promise<void>;
    deleteThemPhuCap(themPhuCap: IThemPhuCapModel): Promise<boolean>;
    deleteAllThemPhuCap(maNhanVien: number): Promise<boolean>;
}