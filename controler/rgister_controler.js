const express=require('express');
const Register = require( "../model/Register_model");    
const validateUser = require( "../model/Register_model");
const joi=require('joi');
const jwt=require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/custom-enviroment-variables.json');
const bcrypt=require('bcrypt');
const  Registration= async (req,res)=>{
    try {
    
    const { error } = validateUser.validate(req.body);

if (error) {
  console.log("❌ Validation failed:", error.details[0].message);
  return res.status(400).json({ message: error.details[0].message});
  


}
   hashedPassword= await bcrypt.hash(req.body.password,10);
   const User = new Register({
    
    name:req.body.email,
    email:req.body.email,
    password: hashedPassword,

    
})
        await User.save();
        userToken=User.generateAuthToken();
        const token=userToken;
res.header('x-auth-token',token).send({
    name:User.name,
    email:User.email,
    id:User.id,
    password:User.password,
    token:userToken
}


)

     } catch (error) { 
        res.status(500).json({message:error.message})     }
 
    }
    module.exports={Registration}