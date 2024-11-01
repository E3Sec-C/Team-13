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

export interface student extends Document{
    ID:string;
    section:string;
    year:string;
    sem:number;
    email:string;
    mobile:string;
    bloodGroup:string;
    address:string;
    image:Blob;
    courses:ObjectId[];
    marks:semRecord[];
    attendance:number;
}