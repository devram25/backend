import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type:'auto',
                folder:"youtube"
            },
        )
    //  console.log("file uploaded on cloudinary")
     response.url;
     fs.unlinkSync(localFilePath)
     return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}


const deleteFromCloudinary = async(publicId)=>{
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        console.log("Deleted from clodinary. public id", publicId)
    } catch (error) {
        console.log(error, "Error deleting from cloudinary")
    }
}

export { uploadOnCloudinary, deleteFromCloudinary}