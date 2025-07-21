import { JWT_SECRET } from "./config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
interface Authrequest extends Request{
    userId:string
}
export function middleware(req:Authrequest,res:Response,next:NextFunction){
    const token=req.headers["authorization"]??" ";
    const decoded=jwt.verify(token,JWT_SECRET)as {userId : string}
    if (decoded){
        req.userId=decoded.userId  
        next()
    }
    else{
        res.status(403).json({
            message:"user unauthorized"
        })
    }
}