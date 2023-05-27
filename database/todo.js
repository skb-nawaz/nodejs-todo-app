import mongoose from "mongoose"


export const connection =mongoose.connect(process.env.MONGODB_URI,{dbName:"TODO"})
.then((c)=>{console.log(`Database is connected to ${c.connection.host} `)})
.catch(()=>{"mongoose is not connected"})