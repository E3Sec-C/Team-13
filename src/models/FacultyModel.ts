import mongoose, { model, Schema } from "mongoose";
import { faculty } from "../types/faculty";

const FacultySchema = new Schema<faculty>({
    ID:{
        type: String,
        required:true
    },        
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile:String,
    assignedClasses: [String],
    image:Buffer,
    education: String
});

export default model<faculty>("faculty",FacultySchema);