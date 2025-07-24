import express from "express"
import { Router } from "express"
import { userroutes } from "./userrouter"
import { storyroutes } from "./storyrouter"
import { dashboardroutes } from "./dashboard"
import { recommendationRouter } from "./recomendations"
export const mainrouter:Router=express.Router()
mainrouter.use("/user",userroutes)
mainrouter.use("/story",storyroutes)
mainrouter.use("/dashboard",dashboardroutes)
mainrouter.use("/recomendations",recommendationRouter)
