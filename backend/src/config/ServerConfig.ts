import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path:path.join(__dirname,'../../.env')
});

export const PORT:string = process.env.PORT || '6000';

export const MONGO_URI:string=process.env.MONGO_URI || 'mongodb://localhost:27017/UDIS';
