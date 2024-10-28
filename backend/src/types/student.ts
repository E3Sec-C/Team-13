import { Document, ObjectId } from "mongoose";
import { courses } from "./courses";

export interface subject{
    subName:string;
    grade:string;
}

export interface Sem_Records{
    sem:number;
    sgpa:number;
    cgpa:number;
    subjects:subject[];
}

export interface student extends Document{
    studentId:string;
    courses:courses[];
    marks:Sem_Records[];
    attendance:number;
}