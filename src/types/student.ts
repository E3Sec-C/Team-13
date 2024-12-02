import { Document, ObjectId } from "mongoose";

export interface subject{
    subName:string;
    grade:string;
}

export interface semRecord{
    sem:number;
    sgpa:number;
    cgpa:number;
    subjects:subject[];
}
export interface yearRecord{
    year:number;
    semester:semRecord[];
}

export interface student extends Document{
    ID: string;
    name:string;
    section:string;
    year:number;
    sem:number;
    email:string;
    mobile:string;
    bloodGroup:string;
    address:string;
    courses:ObjectId[];
    marks:yearRecord[];
    attendance:number;
}