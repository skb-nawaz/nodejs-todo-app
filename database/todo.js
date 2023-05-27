import mongoose from "mongoose"


export const connection =mongoose.connect(process.env.MONGODB_URI,{dbName:"TODO"})
.then(()=>{console.log('mongoose is connected')})
.catch(()=>{"mongoose is not connected"})