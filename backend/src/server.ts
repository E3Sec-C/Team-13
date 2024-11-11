import express,{Application, Request, Response, NextFunction} from 'express';
import {PORT} from './config/ServerConfig';
import { connectDatabase } from './config/DatabaseConfig';
import errorHandler from './middlewares/errorHandler';
import router from './routes';
const cors = require("cors");
const app:Application=express()

app.use(express.json());
app.use(cors({origin:"http://localhost:3000"}));

app.get('/test',(req,res) => {
  res.status(201).json({message:"Working fine"});
});

app.listen(PORT, async() => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDatabase();
});

app.use("/api",router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});
