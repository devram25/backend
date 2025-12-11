import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
      subscriber:{
        type:Schema.Types.ObjectId, //one who is SUBSCRIBING
        ref:"User"
      },
      channel:{
         type:Schema.Types.ObjectId, // one to whom `subcriber ` IS SUBSCRIBING
        ref:"User"
      },
},{timestamps:true})


const Subscription = mongoose.model("subscription", subscriptionSchema)

export {Subscription}