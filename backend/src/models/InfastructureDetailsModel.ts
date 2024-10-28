import mongoose, { Schema } from "mongoose";
import { infrastructureDetails } from "../types/infrastructureDetails";

const InfrastructureDetailsModelSchema:Schema<infrastructureDetails> = new mongoose.Schema({
    assetName:{type: String},
    count:{type:Number},
})

export default mongoose.model<infrastructureDetails>(
    "infrastructureDetails",
    InfrastructureDetailsModelSchema
);