import { Document } from "mongoose";

export interface infrastructureDetails extends Document{
    assetName:string;
    count:number;
}