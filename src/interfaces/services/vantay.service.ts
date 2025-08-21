import {IVanTayModel} from "../models/vantay.model";

export interface IVanTayService{
    createVanTayData(data: IVanTayModel): Promise<void>;
}