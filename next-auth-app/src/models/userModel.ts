import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
       username:{
        type:String,
        require:true
       },
       email:{
        type:String,
        require:true,
        unique:true
       },
       password:{
        type:String,
        require:[true,"Please Enter a valid password"]
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

const UserModel = mongoose.model('user', UserSchema)

export default UserModel