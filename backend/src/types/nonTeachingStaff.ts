import { Document, ObjectId } from "mongoose";

export interface nonTeachingStaff extends Document{
    staffId: string;
    mobile:string;
    email:string;
    image:Blob;
    infrastructureDetails: ObjectId[];
    researchPublications: ObjectId[];
}