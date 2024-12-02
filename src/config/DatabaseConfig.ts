import { MONGO_URI } from "./ServerConfig";
import mongoose from 'mongoose';


export const connectDatabase= async():Promise<void> => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Mongodb connected successfully");
    }
    catch(e){
        console.log("Error connecting the database");
    }
}