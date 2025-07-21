import express from "express"
import { Router } from "express"
import { userroutes } from "./userrouter"
export const mainrouter:Router=express.Router()
mainrouter.use("/user",userroutes)
