import { Date, Document, ObjectId } from "mongoose";

export interface researchPublications extends Document{
    ID:string;
    authorId:string;
    authorName:string;
    authorRole:string;
    dateOfPublishing:Date;
    description:string;
    resource:string;
}