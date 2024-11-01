import { Document, ObjectId } from "mongoose";

export interface nonTeachingStaff extends Document{
    ID: string;
    mobile:string;
    email:string;
    image:Buffer;
    infrastructureDetails: ObjectId[];
    researchPublications: ObjectId[];
}