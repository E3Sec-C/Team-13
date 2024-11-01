import { Document, ObjectId } from "mongoose";

export interface faculty extends Document{
    ID: string,
    password: string,
    name: string,
    email: string,
    mobile: string
    facultyId: string,
    assignedClasses: string[],
    image:Blob,
    education: string
}