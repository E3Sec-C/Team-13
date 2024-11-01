import { Date, Document, ObjectId } from "mongoose";

export interface researchPublications extends Document{
    authorId:string;
    authorName:string;
    authorRole:string;
    dateOfPublishing:Date;
    description:string;
    resource:string;
}