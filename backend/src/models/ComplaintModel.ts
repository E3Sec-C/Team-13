import mongoose, { model, Schema } from "mongoose"
import { complaint } from "../types/complaints"

const ComplaintSchema = new Schema<complaint>({
    userId:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

export default model<complaint>("complaints",ComplaintSchema);