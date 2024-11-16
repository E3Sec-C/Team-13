import mongoose, { Schema } from "mongoose";
import { infrastructure } from "../types/infrastructure";

const InfrastructureModelSchema:Schema<infrastructure> = new mongoose.Schema({
    assetName:{type: String,unique:true},
    lastUpdatedBy: {type: String},
    count:{type:Number},
})

export default mongoose.model<infrastructure>(
    "infrastructureDetails",
    InfrastructureModelSchema
);