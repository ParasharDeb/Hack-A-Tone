import express from 'express'
import { mainrouter } from './mainrouter';
import cors from 'cors'
const app = express()

app.use(express.json());
app.use(cors())
const router = express.Router;
app.use("/api",mainrouter)
app.listen(3001)