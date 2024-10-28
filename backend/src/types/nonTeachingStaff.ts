import { Document, ObjectId } from "mongoose";

export interface nonTeachingStaff extends Document{
    staffId: string;
    infrastructureDetails: ObjectId[];
    researchPublications: ObjectId[];
}