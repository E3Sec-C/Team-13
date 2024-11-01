import mongoose, { Schema } from "mongoose";
import { student } from "../types/student";

const StudentModelSchema: Schema<student> = new mongoose.Schema({
  ID: { type: String },
  section: { type: String },
  year: { type: String },
  sem: { type: Number },
  email: { type: String },
  mobile: { type: String },
  bloodGroup: { type: String },
  address: { type: String },
  image: Blob,
  courses: {type:[Schema.Types.ObjectId]},
  marks: [
    {
      sem: { type: Number },
      sgpa: { type: Number },
      cgpa: { type: Number },
      subjects: [
        {
          subName: { type: String },
          grade: { type: String },
        },
      ],
    },
  ],
  attendance: { type: Number },
});

export default mongoose.model<student>(
    "student",
    StudentModelSchema
);