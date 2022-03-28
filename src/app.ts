import  express,{Application, Request,Response}  from "express";
import { router } from "./routes/routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app:Application=express();
app.use(cors())
app.use(express.json());
app.use('/',router);
const PORT = 8080;
app.listen(PORT, ():void=>{
    console.log(process.env.JWT_SECRET);

    console.log('app is running');
})
