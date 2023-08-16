import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {

  console.log('get - here')

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
  res.redirect
});

//This section will help you to get all listed records with sorted
// router.get("/sort/:sort-:desc", async (req, res) => {
 

//   let collection = await db.collection("employees");
//   let sort= {[req.params.sort]: req.params.desc == 'true'? -1:1 }
//   let results = await collection.find({}).sort(sort).toArray();
 
//   res.send(results).status(200);
// });


// This section will help you create a new record.
router.post("/", async (req, res) => {
 
  console.log('post - here',req.body,req.params)
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
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {

  console.log('patch - here')
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
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {

 
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("employees");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;