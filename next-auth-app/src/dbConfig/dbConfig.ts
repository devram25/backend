import mongoose from "mongoose"

export async function connect(){
     if (mongoose.connection.readyState >= 1) {
    return;
  }
    try {
        const MongoUrl = process.env.mongo_url
        mongoose.connect(MongoUrl!)
        const connection = mongoose.connection
         connection.on('connected',()=>{
            console.log("Connection successfull")
         })
    } catch (error) {
        console.log(error)
    }
}