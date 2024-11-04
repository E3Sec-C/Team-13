import { Date, Document, ObjectId } from "mongoose";

export interface researchPublications extends Document{
<<<<<<< HEAD
=======
    ID:string;
>>>>>>> 14af5bebb5be61a08cb222a236fb206a560cc5e4
    authorId:string;
    authorName:string;
    authorRole:string;
    dateOfPublishing:Date;
    description:string;
    resource:string;
}