const mongoose = require("mongoose");
const express = require('express')
const dbURI =  process.env.MONGO_URL// Replace with your MongoDB connection string

const ConnectDB = async ()=>{
try{
    await mongoose.connect(dbURI)
    console.log("MongoDB connected")
}catch(error){
    console.log(error)
}}
module.exports = ConnectDB