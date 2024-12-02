import { Document } from "mongoose";

export interface course extends Document{
    ID:string;
    courseName:string;
    startingDate:Date;
    completionDate:Date;
    registrations:number;
}