import express from "express"
import router from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser"
import {errorMiddleWare} from "./middlewares/error.js"
import cors from "cors"
const app=express()
import {config} from 'dotenv'



config()
//using middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true,
    
}))
app.use("/user/",router)
app.use("/task/",taskRouter)
app.use(errorMiddleWare)




export default app





