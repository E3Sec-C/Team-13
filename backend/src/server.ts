import express,{Application} from 'express';
import {PORT} from './config/ServerConfig';
import { connectDatabase } from './config/DatabaseConfig';
const app:Application=express()

app.get('/test',(req,res) => {
  res.status(201).json({message:"Working fine"});
});


app.listen(PORT, async() => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDatabase();
});
