import bodyParser from 'body-parser';
import express from 'express';
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import cors from 'cors';
const app = express();


app.use(bodyParser.json())
const corsOptions ={
    origin:'https://magnus-full-stack-v1.netlify.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));
app.use("/record",records);

app.post('/' ,bodyParser.urlencoded({extended:false}), (req,res)=>{
   
    if('train@urself.com' == req.body.email && 'jobprogram' == req.body.pass){
        res.send(true);
    }else{
        res.send(false)
    }
})


app.listen(process.env.PORT || 8000 , ()=>{
   console.log("server running");
});