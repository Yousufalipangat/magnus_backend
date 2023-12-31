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
app.use(cors({origin:['https://magnus-full-stack-v1.netlify.app','https://mangnus-front.onrender.com'],credentials:true}));
app.options(cors({origin:['https://magnus-full-stack-v1.netlify.app','https://mangnus-front.onrender.com'],credentials:true}))


app.use(session(
  {
    secret:'boboo secrety',
    resave:false,
    saveUninitialized:false,
    cookie:{
      path:'/',
      secure:true,
      maxAge:1000*60*60,
      sameSite:'none'  
    }
  }))
  
  app.set("trust proxy",1)
  

  
//,bodyParser.urlencoded({extended:false})

  app.post('/' , (req,res)=>{

   console.log('reached post /');
    if('train@urself.com' == req.body.email && 'jobprogram' == req.body.pass){
        
         req.session.username = 'train@urself.com';
         
         console.log(req.session)
        
        res.send({login:true , username:req.session.username});
    }else{
        res.send({login:false})
    }
})

app.get("/auth",(req,res)=>{

  console.log('reached get /auth')

  console.log(req.session);

  if(req.session.username)
  {
    res.send({valid:true,username:req.session.username})
  }else{
    res.send({valid:false});
  }
})

app.use('/record',records);

app.listen(process.env.PORT || 8000 , ()=>{
   console.log("server running");
});