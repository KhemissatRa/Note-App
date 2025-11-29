const app= require("../index")
const Note = require("../model/model")  
const createNote= async(req,res)=>{
    try{
        const note = await Note.create(req.body)
        res.status(200).json(note)
    }catch(error){
        res.status(500).json({message:error.message})
    }
} 

const getAllNotes = async(req,res)=>{
    try{
        const notes =await Note.find({})
        res.status(200).json(notes)

    }catch(error){
        res.status(500).json({message:error.message})



}}

const getNote =async(req,res)=>{
    try{
        const {id}= req.params
        const upNote = await Note.findById(id)
        res.status(200).json(upNote)
    }catch(error){
        res.status(500).json({message:error.message})   


    
    }
}
const updateNote = async(req,res)=>{
    try{
        const {id}= req.params
        const Upnote = await Note.findByIdAndUpdate(id,req.body,{new:true})
        if(!Upnote){
            return
        res.status(404).json({message:`cannot find any Note with ID ${id}`})    
        
        }
        res.status(200).json(Upnote)
    }catch(error){

        res.status(500).json({message:error.message})
        }}
        
const deletedNote = async(req,res)=>{
    try{
        const {id}=req.params
        const upNote = await Note.findByIdAndDelete(id)     
        if(!upNote){

            return res.status(404).json({message:`cannot find any Note with ID ${id}`}) 
    }   
    res.status(200).json("Note Deleted Successfully")
}catch(error){
    res.status(500).json({message:error.message})           }
}

module.exports={createNote,getAllNotes,getNote,updateNote,deletedNote}