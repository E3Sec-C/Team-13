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
    section:string;
    year:string;
    sem:number;
    email:string;
    mobile:string;
    bloodGroup:string;
    address:string;
    image:Blob;
    courses:courses[];
    marks:Sem_Records[];
    attendance:number;
}