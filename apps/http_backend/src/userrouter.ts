import express from "express"
import { Router } from "express"
import { Signupschema,Signinschema} from "./types";
import {prismaclient} from "@repo/db/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

export const userroutes:Router=express.Router();
userroutes.post("/singup",async(req,res)=>{
    const parseddata=Signupschema.safeParse(req.body);

    if(!parseddata || !parseddata.success){
        res.json({
            message:"Invalid input"
        })
        return
    }
    const user = await prismaclient.users.findFirst({
        where:{
        email:parseddata.data.email
        }
    })
    if(!user){
        res.json({
            message:"email already exists"
        })
        return
    }
    const hashedpassword=await bcrypt.hash(parseddata.data?.password,10)
    try{
        await prismaclient.users.create({
        data:{
            email:parseddata.data.email,
            username:parseddata.data.username,
            password:hashedpassword
        }
    })
    }
    catch(e){
        console.log(e)
        res.json({
            message:"sorry database is down.Try again later"
        })
    }
    res.json({
        message:"you are signed up"
    })
})
userroutes.post("/signin",async(req,res)=>{
    const parseddata= Signinschema.safeParse(req.body)
    if(!parseddata || !parseddata.success){
        res.json({
            message:"invalid input"
        })
        return
    }
    const useremail = await prismaclient.users.findFirst({
        where:{
            email:parseddata.data.email
        }
    })
    if(!useremail){
        res.json({
            message:"Email not found"
        })
        return
    }
    const passsword = await bcrypt.hash(parseddata.data.password,10)
    const user = await prismaclient.users.findFirst({
        where:{
            password:passsword
        }
    })
    if(!user){
        res.json({
            message:"incorrect password"
        })
        return
    }
    const token = jwt.sign({
        userId:user.id
    },JWT_SECRET)
    res.json({
        token:token
    })
})
