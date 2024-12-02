import mongoose, { Schema } from "mongoose";
import { nonTeachingStaff } from "../types/nonTeachingStaff";

const NonTeachingStaffModelSchema:Schema<nonTeachingStaff> = new mongoose.Schema({
    ID: {type:String},
    name:{type:String},
    mobile:{type:String},
    email:{type:String},
    image:{type:Buffer},
    infrastructureDetails:{type:[Schema.Types.ObjectId]},
    researchPublications:{type:[Schema.Types.ObjectId]},
})

const NonTeachingStaffModel=mongoose.model<nonTeachingStaff>(
    "nonTeachingStaff",
    NonTeachingStaffModelSchema
);

export default NonTeachingStaffModel;