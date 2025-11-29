const mongoose = require("mongoose");

const noteapp = new mongoose.Schema({
title:{type:String,required:true , minlength:3, maxlength:50},      
content:{type:String,required:true ,minlength:3, maxlength:500}, 
date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Note", noteapp)