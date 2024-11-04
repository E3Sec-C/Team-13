import mongoose, { Schema } from "mongoose";
import { researchPublications } from "../types/researchPublications";

const ResearchPublicationsModelSchema:Schema<researchPublications> = new mongoose.Schema({
<<<<<<< HEAD
=======
    ID:{type:String},
>>>>>>> 14af5bebb5be61a08cb222a236fb206a560cc5e4
    authorId:{type:String},
    authorName:{type:String},
    authorRole:{type:String},
    dateOfPublishing:{type:Date},
    description:{type:String},
    resource:{type:String},
})

export default mongoose.model<researchPublications>(
    "researchPublications",
    ResearchPublicationsModelSchema
);