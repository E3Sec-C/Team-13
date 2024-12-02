import { Document } from "mongoose";

export interface admin extends Document{
    ID: string,
    name: string,
    email: string,
    image: Blob|null
}