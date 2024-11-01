import { Document } from "mongoose";

export interface admin extends Document{
    userId: string,
    password: string,
    name: string,
    email: string,
    adminId: string,
    image: Blob|null
}