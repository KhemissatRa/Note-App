const mongoose=require('mongoose');
const joi=require('joi');
const jwt=require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/custom-enviroment-variables.json');
const RegisterShema = new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:50},
    email:{type:String,required:true,minlength:3,maxlength:50,unique:true},
    password:{type:String,required:true,minlength:5,maxlength:1024},
    isAdmin:{type:Boolean,default:false}
})
 RegisterShema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},jwtPrivateKey,{expiresIn:'1h'});  
    return token;
}

    module.exports=mongoose.model("Register",RegisterShema)

    module.exports.validateUser=(data)=>{
        const schema=joi.object({
            name:joi.string().min(3).max(50).required(),

            email:joi.string().min(3).max(50).required().email(),

            password:joi.string().min(5).max(1024).required(),
        });
        return schema.validate(data)
    }   