import mongoose, { Schema } from "mongoose";
import { researchPublications } from "../types/researchPublications";

const ResearchPublicationsModelSchema:Schema<researchPublications> = new mongoose.Schema({
    title:{type:String,unique:true},
    authorName:{type:String},
    dateOfPublishing:{type:Date},
    resource:{type:String},
})

export default mongoose.model<researchPublications>(
    "researchPublications",
    ResearchPublicationsModelSchema
);