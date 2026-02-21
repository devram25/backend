import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
       username:{
        type:String,
        required:true
       },
       email:{
        type:String,
        required:true,
        unique:true
       },
       password:{
        type:String,
        required:[true,"Please Enter a valid password"]
       },
       isVerfied:{
           type:Boolean,
           default:false
       },
       isAdmin:{
         type:Boolean,
         default:false
       },
       forgotPasswordToken:String,
       forgotPasswordTokenExpiry:Date,
       verifyToken:String,
       verifyTokenExpiry:Date
})

const User = mongoose.models.user ||  mongoose.model('user', UserSchema)

export default User