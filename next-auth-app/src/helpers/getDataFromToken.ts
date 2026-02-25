import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export  const getDataFromToken =(request:NextRequest)=>{
     try {
        const Token  = request.cookies.get("token")?.value || ""
        const decotedToken:any = jwt.verify(Token, process.env.TOKEN_SECRET!)
        return decotedToken.id
     } catch (error) {
        return NextResponse.json({error})
     }
}