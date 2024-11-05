import mongoose, { Schema } from "mongoose";
import { researchPublications } from "../types/researchPublications";

const ResearchPublicationsModelSchema:Schema<researchPublications> = new mongoose.Schema({
    ID:{type:String},
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