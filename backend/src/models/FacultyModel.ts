import mongoose, { model, Schema } from "mongoose";
import { faculty } from "../types/faculty";

const FacultySchema = new Schema<faculty>({
    userId:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required: true
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
    facultyId:{
        type: String,
        required: true
    },
    assignedClasses: [String],
    image:Blob,
    education: String
});

export default model<faculty>("faculty",FacultySchema);