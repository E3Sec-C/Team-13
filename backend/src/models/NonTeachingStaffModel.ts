import mongoose, { Schema } from "mongoose";
import { nonTeachingStaff } from "../types/nonTeachingStaff";

const NonTeachingStaffModelSchema:Schema<nonTeachingStaff> = new mongoose.Schema({
    ID: {type:String},
    mobile:{type:String},
    email:{type:String},
    image:{type:Blob},
    infrastructureDetails:{type:[Schema.Types.ObjectId]},
    researchPublications:{type:[Schema.Types.ObjectId]},
})

const NonTeachingStaffModel=mongoose.model<nonTeachingStaff>(
    "nonTeachingStaff",
    NonTeachingStaffModelSchema
);

export default NonTeachingStaffModel;