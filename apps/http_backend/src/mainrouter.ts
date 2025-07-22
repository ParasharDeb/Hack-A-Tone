import express from "express"
import { Router } from "express"
import { userroutes } from "./userrouter"
import { storyroutes } from "./storyrouter"
export const mainrouter:Router=express.Router()
mainrouter.use("/user",userroutes)
mainrouter.use("/story",storyroutes)