import { Document } from "mongoose";

export interface complaint extends Document{
    ID: string,
    description: string,
    date: Date
}