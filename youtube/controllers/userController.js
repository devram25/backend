import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import User from "../models/userModels.js"
import{ uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    const {fullname, email, username, password } = req.body;
    try {
     if([fullname,username,email,password].some((field)=> field?.trim() ==="")){
        throw new ApiError(400, "All fields are required")
     }
    
    const existedUser  = await User.User.findOne({
        $or:[{username},{email}]
     })

     if(existedUser){
        throw new ApiError(400, "User with email or username already exist")
     }
     console.warn(req.files)
     const avatarLocalPath = req.files?.avatar?.[0]?.path
     const coverLocalPath = req.files?.coverImage?.[0]?.path

     if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is missing")
     }

    //  const avatar = await uploadOnCloudinary(avatarLocalPath)

    var avatar;
     try {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("Upload avatar", avatar)
     } catch (error) {
        console.log("Error uploading avatar", error)
        throw new ApiError(500, "Failed to upload avatar")
     }

     var coverImage;
     try {
        coverImage = await uploadOnCloudinary(coverLocalPath)
        console.log("Upload coverimage", coverImage)
     } catch (error) {
        console.log("Error uploading cover image", error)
        throw new ApiError(500, "Failed to upload cover image")
     }
    //  if(coverLocalPath){
    //     coverImage = await uploadOnCloudinary(coverLocalPath)
    //  }

     const user = await User.User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage.url,
        email,
        password,
        username:username.toLowerCase()
     })

    const createdUser =  await User.User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json( new ApiResponse(201,createdUser,"User registered successfully") )
     
    } catch (error) {
        console.log(error)
        if(avatar){
            await deleteFromCloudinary(avatar._id)
        }
        if(coverImage){
            await deleteFromCloudinary(coverImage._id)
        }
      throw new ApiError(500, "Failed to upload image and deleted")
    }     
})


export{
    registerUser
}