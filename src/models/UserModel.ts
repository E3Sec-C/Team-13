import { user } from "../types/user";
import mongoose,{Schema} from "mongoose";

const UserSchema:Schema<user> = new mongoose.Schema({
    userId:{type:String},
    password:{type:String},
    role:{type:String},
})

export default mongoose.model<user>(
    'users',
    UserSchema,
)