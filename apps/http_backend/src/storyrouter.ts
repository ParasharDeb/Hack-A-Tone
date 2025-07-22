import express, { Router } from "express"
import { api_key } from "@repo/backend-common/config";
import axios from "axios";
export const storyroutes:Router=express.Router()
storyroutes.get("/generate",async(req,res)=>{
    const userMessage = req.body.message;
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "you are a travel guide. the user will give you a place and you need to tell the user an interesting story about the palce and its history" },
        { role: "user", content: userMessage },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
    }
  );

  res.json({ reply: response.data.choices[0].message.content });
})