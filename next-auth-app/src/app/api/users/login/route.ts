import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request:NextRequest){
    try {
        await connect()
        const reqBody = await request.json()
        const {email, password} = reqBody;
        const user = await User.findOne({email})
        if(!user){
           return NextResponse.json({message:"User Not Found", success:false}, {status:400})
        }

        const validPassword = await bcrypt.compare(password, user.password)


        if(!validPassword){
            return NextResponse.json({message:"Invalid Password", success:false}, {status:400})
        }

        const TokenData = {
            id:user.id,
            email:user.email,
            username:user.username
        }
        // create token
        const token  = await jwt.sign(TokenData, process.env.TOKEN_SECRET!, {expiresIn:'1h'})

        const response = await NextResponse.json({
            message:"Login Successfull",
            success:true
        })

        response.cookies.set("token", token, {httpOnly:true, path:"/"})

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}