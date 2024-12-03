import { Date, Document, ObjectId } from "mongoose";

export interface researchPublications extends Document{
    title:string;
    authorName:string;
    dateOfPublishing:Date;
    resource:string;
}