import {IHeThongModel} from "../models/hethong.model";
import {HeThongResponseDto} from "../../dto/response/hethong.response.dto";

export interface IHeThongService {
    getHeThong(): Promise<HeThongResponseDto[]>;
    updateHeThong(data: IHeThongModel): Promise<void>;
}