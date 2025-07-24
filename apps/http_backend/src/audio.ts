import express,{Router} from "express"
import { authMiddleware } from "./middleware";
export const AudioRoutes:Router=express.Router();
AudioRoutes.post("/upload",(req,res)=>{
    //upload audio like we can do in whatsapp using multer and convert the audio to text
})
AudioRoutes.get("/currentmood",(req,res)=>{
    //read the text generated from the audio and determine the emotion of the user
})
AudioRoutes.get("/moods",authMiddleware,(req,res)=>{
    //get all the moods of the user
})