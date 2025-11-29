const express=require('express');
const router=express.Router();
const {Registration}=require("../controler/rgister_controler")


router.post("/register",Registration)

module.exports=router;