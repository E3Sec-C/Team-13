import { Document } from "mongoose";

export interface complaint extends Document{
    ID: string,
    role: string,
    description: string,
    date: Date,
    status:string,
}