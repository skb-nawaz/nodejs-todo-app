import jwt from "jsonwebtoken"
import  {User}  from "../models/user.js"

export const Authuntication =async(req,res,next)=>{
    const {token} =req.cookies
    if(token===undefined){
        res.status(404).json({
            success:false,
            message:"Login First"
        })
    }else{
        const decodedData=jwt.verify(token,process.env.Secret_Code)
        const id=decodedData._id
        req.user =await User.findById(id)
           
    }
    next()
}