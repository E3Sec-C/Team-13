import mongoose,{mongo, Schema} from "mongoose"
import { course } from "../types/courses"

const CourseModelSchema:Schema<course>=new mongoose.Schema({
    courseId:{type:String},
    courseName:{type:String},
    startingDate:{type:Date},
    completionDate:{type:Date},
    registrations:{type:Number},
});

const CourseModel=mongoose.model<course>(
    "course",
    CourseModelSchema
)

export default CourseModel;
