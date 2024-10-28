import { Document } from "mongoose";

export interface fund extends Document{
    amount: number,
    organization: string,
    issuedDate: Date
}