import { Document } from "mongoose";

export interface course extends Document{
    courseId:string;
    courseName:string;
    startingDate:Date;
    completionDate:Date;
    registrations:number;
}