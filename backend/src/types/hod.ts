import { Document, ObjectId } from "mongoose";

export interface hod extends Document{
    ID: string,
    password: string,
    name: string,
    email: string,
    hodId: string,
    funds: ObjectId[],
    complaints: ObjectId[],
    image: Blob,
    education: string
}