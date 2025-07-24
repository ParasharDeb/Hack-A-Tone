import express, { Request,Router } from "express"
import { authMiddleware } from "./middleware";
import { prismaclient } from "@repo/db/client";
export const dashboardroutes:Router=express.Router();
interface Authrequest extends Request {
        userId:string
    }
dashboardroutes.get("/visited",authMiddleware,async(req,res)=>{
    const userId=(req as Authrequest).userId;
    try{
        const user =await  prismaclient.users.findUnique({
            where:{id:userId},
            include:{places:true}
        })
        if(!user){
            res.json({
                message:"user not found"
            })
            return
        }
        const place = user.places.map(place=>({
            id:place.id,
            city:place.city,
            country:place.country,
            placename:place.placename,
            location:place.location
        }))

    }
    catch(e){
        res.status(500).json({erorr:e})
    }
})
dashboardroutes.get("/history",(req,res)=>{

})