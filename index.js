import bodyParser from 'body-parser';
import express from 'express';
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import cors from 'cors';
const app = express();


app.use(bodyParser.json())

var whitelist = ['https://magnus-full-stack-v1.netlify.app', 'http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
 

// const corsOptions ={
//     origin:['https://magnus-full-stack-v1.netlify.app','http://localhost:3000'], 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  }

app.use(cors(corsOptionsDelegate));
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