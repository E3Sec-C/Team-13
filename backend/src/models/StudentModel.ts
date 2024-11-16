import mongoose, { Schema } from "mongoose";
import { student } from "../types/student";

const StudentModelSchema: Schema<student> = new mongoose.Schema({
  ID: { type: String, unique: true},
  name: { type: String },
  section: { type: String },
  year: { type: Number },
  sem: { type: Number },
  email: { type: String },
  mobile: { type: String },
  bloodGroup: { type: String },
  address: { type: String },
  courses: { type: [Schema.Types.ObjectId] },
  marks: [
    {
      year: { type: Number },
      semester: [
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
    },
  ],
  attendance: { type: Number },
});

export default mongoose.model<student>("student", StudentModelSchema);
