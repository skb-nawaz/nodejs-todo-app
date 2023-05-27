import {Task} from "../models/task.js"
import { errorHandler } from "../middlewares/error.js"

export const createTask=async (req,res,next)=>{
    try{
        const {title,discription} = req.body
    await Task.create({title,discription,user:req.user,})
    res.status(201).json({
        success:true,
        Message:"Task is created"
    })
    }catch(e){
        return next(new errorHandler(e.message,400))

    }
}

export const updateTask=async(req,res,next)=>{
    
    try{
        const {id}=req.params
    let task=await Task.findById(id)
    task.isCompleted= !task.isCompleted
    task.save()
    res.status(200).json({
        success:true,
        updated:"successfully updated"
    })
    }
    catch(e){
        return next(new errorHandler(e.message,404))
    }
    
}

export const getMyTask=async(req,res,next)=>{
    try{
        const userId=req.user._id
    const results=await Task.find({user:userId})
    
    res.json({
        working:true,
        task:results
    })
    }catch(e){
        return next(new errorHandler(e.message,404))
    }
}

export const deleteTask=async(req,res,next)=>{
    try{
        const {id}=req.params
    const results=await Task.findByIdAndRemove(id)   
    res.status(200).json({
        working:true,
        message:"deleted successfully"
    })
    }catch(e){
        return next(new errorHandler(e.message,300))
    }
}