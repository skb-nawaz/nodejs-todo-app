import express from "express"
import { Authuntication } from "../middlewares/auth.js"
import { Login,Register,runningStatus,getAllUsers,myProfile, Logout} from "../controllers/user.js"


const router=express.Router()

router.get('/',runningStatus)

router.get('/all',getAllUsers)

router.post('/login',Login)

router.post('/register',Register)

router.get('/myprofile',Authuntication,myProfile) 

router.get('/logout', Logout)

export default router