import jwt from 'jsonwebtoken'

export const sendCookie=(res,user,statusCode=200,message)=>{
    try{
        const token=jwt.sign({_id:user._id},process.env.Secret_Code)

        res.status(statusCode).cookie("token",token,{
            httpOnly:true,
            maxAge:60*60*1000,
            sameSite:process.env.NODE_ENV==="Development" ?"lax":"none",
            secure:process.env.NODE_ENV==="Development" ?false:true
        }).json({
            success:true,
            message
        })
    }catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
}