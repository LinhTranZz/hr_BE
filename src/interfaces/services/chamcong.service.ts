import {ChamCongResponseDto} from "../../dto/response/chamcong.response.dto";

export interface IChamCongService{
    getChamCong(): Promise<ChamCongResponseDto[]>;
    getChamCongDetail(): Promise<ChamCongResponseDto[]>;
}