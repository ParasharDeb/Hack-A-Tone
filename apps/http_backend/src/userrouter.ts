import express from "express"
import { Router } from "express"
import { Signupschema } from "./types";
import {prismaclient} from "@repo/db/client"
import ca from "zod/v4/locales/ca.js";
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
    try{
        await prismaclient.users.create({
        data:{
            email:parseddata.data.email,
            username:parseddata.data.username,
            password:parseddata.data.password
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
