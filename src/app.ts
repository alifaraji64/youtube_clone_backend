import  express,{Application, Request,Response}  from "express";
import { router } from "./routes/routes";
const app:Application=express();

app.use(express.json());
app.use('/',router);

const port = 5000;
app.listen(port,():void=>{
    console.log('app is running');
})
