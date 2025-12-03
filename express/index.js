import express from 'express'
import 'dotenv/config'
const app = express()
import logger from "./logger.js";
import morgan from "morgan";

const port = process.env.PORT || 3000
app.use(express.json())

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let teaData = []
let nextId =1

app.post("/teas", (req,res)=>{
   const  {name,price} = req.body
   const newTea = {id:nextId++, name, price}
   teaData.push(newTea)
   res.status(201).send(newTea)
})

app.get("/teas",(req,res)=>{
    res.status(200).send(teaData)
})

app.get("/tea/:id",(req,res)=>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})

app.put("/tea/:id", (req,res)=>{
     const tea = teaData.find(t=> t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("Tea not found")
    }

    const {name,price} = req.body;
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

app.delete("/tea/:id",(req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("Not found")
    }

    teaData.splice(index, 1)
    console.log("Delete")
    return res.status(204).send("Deleted")
}) 

app.listen(port,()=>{
    console.log(`Server is running at port http://localhost:${port}`)
})