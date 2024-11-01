import { Document } from "mongoose";

export interface admin extends Document{
    ID: string,
    password: string,
    name: string,
    email: string,
    adminId: string,
    image: Blob|null
}