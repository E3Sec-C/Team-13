import { Document } from "mongoose";

export interface courses extends Document{
    courseId:string;
    courseName:string;
    startingDate:Date;
    completionDate:Date;
    registrations:number;
}