import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path:path.join(__dirname,'../../.env')
});

export const PORT:string = process.env.PORT || '5000';

export const MONGODB_URI:string='mongodb://localhost:27017/UDIS';
// 'mongodb+srv://nexus_bytes:nexus_bytes@nexusbytes.ahfyt.mongodb.net/?retryWrites=true&w=majority&appName=nexusBytes'