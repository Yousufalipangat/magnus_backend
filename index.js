//import bodyParser from 'body-parser';
import express from 'express';
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import cors from 'cors';
const app = express();
import session from 'express-session';
//import cookieParser from 'cookie-parser';
app.use(express.json())
//app.use(cookieParser());
app.use('/record',records);

app.use(cors({origin:'https://magnus-backend-point.onrender.com',credentials:true}));
app.use(session(
  {
    secret:'boboo secrety',
    resave:false,
    saveUninitialized:false,
    cookie:{
      secure:true,
      maxAge:1000*60*5,
      sameSite:'none'  
    }
  }))

  app.set("trust proxy",1)
  

//,bodyParser.urlencoded({extended:false})

  app.post('/' , (req,res)=>{
    if('train@urself.com' == req.body.email && 'jobprogram' == req.body.pass){
        
         req.session.username = 'train@urself.com';
         
         console.log(req.session)
        
        res.send({login:true , username:req.session.username});
    }else{
        res.send({login:false})
    }
})

app.get("/auth",(req,res)=>{

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