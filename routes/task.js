import express from "express"
import {createTask, updateTask ,getMyTask,deleteTask} from "../controllers/task.js"
import { Authuntication } from "../middlewares/auth.js"

const router=express.Router()

router.get("/my", Authuntication ,getMyTask)
router.post("/new", Authuntication ,createTask)
router.route("/:id").put(Authuntication, updateTask).delete(Authuntication, deleteTask)

export default router