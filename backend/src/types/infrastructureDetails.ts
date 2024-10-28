import { Document, ObjectId } from "mongoose";

export interface infrastructureDetails extends Document{
    assetName:string;
    count:number;
}