import { Document } from "mongoose";

export interface infrastructure extends Document{
    assetName:string;
    lastUpdatedBy:string;
    count:number;
}