const express=require('express');
const router=express.Router();
const {UserAuth}=require("../controler/auth_controler")


router.post("/Auth",UserAuth)

module.exports=router;