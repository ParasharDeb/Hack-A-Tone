import dotenv from 'dotenv'
dotenv.config({path:'./.env'})
export const JWT_SECRET = process.env.JWT_SECRET!;
export const api_key = process.env.API_KEY;
