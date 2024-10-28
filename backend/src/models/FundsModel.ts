import mongoose, { model, Schema } from "mongoose"
import { fund } from "../types/funds"

const FundSchema = new Schema<fund>({
    amount:{
        type: Number,
        required: true
    },
    organization:{
        type: String,
        required: true
    },
    issuedDate:{
        type: Date,
        required: true
    }
})

export default model<fund>("funds",FundSchema);