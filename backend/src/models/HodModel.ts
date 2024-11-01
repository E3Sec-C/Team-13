import mongoose,{Schema,model} from "mongoose";
import { hod } from "../types/hod";
import FundsModel from "./FundsModel";
import { fund } from "../types/funds";

const HODSchema = new Schema<hod>({
    ID:{
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
    hodId:{
        type: String,
        required: true
    },
    funds: [Schema.Types.ObjectId],
    complaints: [Schema.Types.ObjectId],
    image: Blob,
    education: String
});

export default model<hod>("hod",HODSchema);