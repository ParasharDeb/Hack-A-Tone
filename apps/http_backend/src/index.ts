import express from 'express'
import { mainrouter } from './mainrouter';
//cors 
const app = express()
app.use(express.json());
const router = express.Router;
app.use("/api/v1/router",mainrouter)
app.listen(3000)