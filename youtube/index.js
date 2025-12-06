import { app } from "./app.js";
import dontenv from'dotenv'
import  connectDB  from "./db/db.js";

dontenv.config({
    path:[".env.local", ".env"],
    quiet:true
})

const Port = process.env.PORT || 2610
connectDB()
.then(()=>{
app.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`)
})
})

