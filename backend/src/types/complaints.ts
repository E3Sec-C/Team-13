import { Document } from "mongoose";

export interface complaint extends Document{
    userId: string,
    description: string,
    date: Date
}