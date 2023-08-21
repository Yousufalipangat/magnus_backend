import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  console.log('get record /')
  try{

    console.log('request-----',req.session)

  if(req.session.username)
  {
    console.log('inside func')

let collection = await db.collection("employees");
  
let params1 = req.query.firstName;
let params2 = req.query.mobileNumber;

let employeeName = params1 == 'undefined' || params1 == '' ? undefined : params1;
let mobile = params2 == 'undefined' || params2 == '' ? undefined : params2;

let results = [];

if(employeeName && mobile)
{
  
    results = await collection.find({$and: [{$or:[{firstName: {$regex : employeeName, $options :'i'}},{lastName: {$regex : employeeName, $options :'i'}}]},{mobileNumber:{$regex : mobile}}]}).toArray();
}else if(employeeName && mobile == undefined){

  results = await collection.find({$or:[{firstName: {$regex : employeeName, $options :'i'}},{lastName: {$regex : employeeName, $options :'i'}}]}).toArray();
}else if(mobile && employeeName == undefined ){

  results = await collection.find({mobileNumber: {$regex : mobile}}).toArray();
}else{

   results =  await collection.find({}).toArray()
}

  res.send(results).status(200);
}else{

res.send('Your are not authorized, please login to account').status(300)
}
}catch(e){
  res.send(e).status(400)
  }
});


router.post("/", async (req, res) => {

  console.log('post record /')
try{
  if(req.session.username)
  {

  let newDocument = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        skills: req.body.skills
  };

  let collection = await db.collection("employees");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);

}else{

  res.send('Your are not authorized, please login to account')
  }
}catch(e){
res.send('Your are not authorized or error due to bad request')
}
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try{
    console.log('patch record /:id')
  if(req.session.username)
  {

  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      country: req.body.country,
      city: req.body.city,
    }
  };

  let collection = await db.collection("employees");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
}else{

  res.send('Your are not authorized, please login to account')
  }
}catch(e){
  res.send('Your are not authorized or error due to bad request')
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try{
    console.log('delete record /:id')
  if(req.session.username)
  {

 
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("employees");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
}else{

  res.send('Your are not authorized, please login to account')
  }
}catch(e){
  res.send('Your are not authorized or error due to bad request')
  }
});

export default router;