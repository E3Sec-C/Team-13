import { Document, ObjectId } from "mongoose";

export interface faculty extends Document{
    userId: string,
    password: string,
    name: string,
    email: string,
    facultyId: string,
    assignedClasses: string[]
}