import { Document } from "mongoose";

export interface user extends Document{
    userId:string;
    password:string;
    role:string;
}