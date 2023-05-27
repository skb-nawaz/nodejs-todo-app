
import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import { sendCookie } from '../utilities/features.js'
import { errorHandler } from "../middlewares/error.js"

export const runningStatus=(req,res)=>{
    try{
res.json({
    success:true,
    message:"Working"
})
    }catch(e){
        return next(new errorHandler("Not Working Internal server issue",400)) 
    }
    
}

export const getAllUsers=async(req,res)=>{
    try{
        const result=await User.find()
    res.json({
        status:201,
        message:"success",
        result
    })
    }catch(e){
        return next(new errorHandler(e.message,400))

    }
}

export const Login =async(req,res,next)=>{
    try{
        const {email,password}=req.body
    const user=await User.findOne({email}).select("+password")
    if(user===null){
        res.status(404).json({
            success:false,
            message:"Invalid Email or password"
        })
    }else{
        const passwordCompare=await bcrypt.compare(password,user.password)
        sendCookie(res,user,201,"Login Successful")
    }
    }catch(e){
        return next(new errorHandler(e.message,400))
    }
}

export const Register=async(req,res)=>{
    try{
        const {name,email,password}=req.body
    const findUser =await User.findOne({email})
    if(findUser!==null){
        return res.status(404).json({
            success:false,
            message:"user already exist"
        })  
    }else{
        try{
        const hashPassword=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashPassword})
        sendCookie(res,user,201,"registered Successfully")
        }catch(e){
            res.json({
                status:400,
                message:e.message
            })
        }
    }
    }catch(e){
        return next(new errorHandler(e.message,400))
    }

}

export const myProfile=(req,res)=>{
      try{
        res.status(200).json({
            success:true,
            userDetails:req.user,
        })
      }catch(e){
        return next(new errorHandler(e.message,400))
      }
    }



export const Logout=async(req,res)=>{
     try{
        const {token}=req.cookies
        res.cookie("token","",{expires:new Date(Date.now()),sameSite:process.env.NODE_ENV==="Development" ?"lax":"none",
        secure:process.env.NODE_ENV==="Development" ?false:true}).json({
           success:true
       })
     }catch(e){
        return next(new errorHandler(e.message,400))
     }

    
}