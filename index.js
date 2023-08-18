import bodyParser from 'body-parser';
import express from 'express';
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import cors from 'cors';
const app = express();
import session from 'express-session';
import cookieParser from 'cookie-parser';

var whitelist = ['https://magnus-full-stack-v1.netlify.app', 'http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true , credentials:true} // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}



//app.use(cookieParser());
app.use(bodyParser.json())
app.use(session(
  {
    secret:'boboo secrety',
    resave:false,
    saveUninitialized:true,
    cookie:{
      secure:true,
      maxAge:1000*60*5,
      sameSite:'none',
      
    }
  }))
  
  app.set('trust proxy',1)
  app.use(cors(corsOptionsDelegate));
  app.use('/record',records);

app.post('/' ,bodyParser.urlencoded({extended:false}), (req,res)=>{
    if('train@urself.com' == req.body.email && 'jobprogram' == req.body.pass){
        
         req.session.username = 'train@urself.com';
         
        
        res.send({login:true , username:req.session.username});
    }else{
        res.send({login:false})
    }
})

app.get("/",bodyParser.urlencoded({extended:false}),(req,res)=>{

  console.log(req.session);

  if(req.session.username)
  {
    res.send({valid:true,username:req.session.username})
  }else{
    res.send({valid:false});
  }
})


app.listen(process.env.PORT || 8000 , ()=>{
   console.log("server running");
});