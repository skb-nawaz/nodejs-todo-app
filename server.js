import app from './index.js'
import  {connection}  from "./database/todo.js"

connection
app.listen(process.env.PORT,()=>{console.log(`server is connected to ${process.env.PORT} in ${process.env.NODE_ENV} mode`)})


