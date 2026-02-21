import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try {
        await connect()
        const reqBody = await request.json()
        const {username, email, password} = reqBody;
        
        const exist = await User.findOne({email})
        if(exist){
            return  NextResponse.json({message:"User Already Exist"},{status:400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password:hashPassword
        })

        const savedUser = await newUser.save()

        return NextResponse.json({message:"User Created Successfully", success:true, savedUser})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}