import { Document, ObjectId } from "mongoose";

export interface faculty extends Document{
    ID: string,
    name: string,
    email: string,
    mobile: string,
    assignedClasses: string[],
    image:Buffer,
    education: string
}