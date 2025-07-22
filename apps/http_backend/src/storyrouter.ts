import express,{ Request, Router } from "express"
import { api_key } from "./config";
import axios from "axios";
import { authMiddleware } from "./middleware";
import { prismaclient } from "@repo/db/client";
export const storyroutes:Router=express.Router()
storyroutes.post("/generate",authMiddleware,async(req,res)=>{
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
  const story = response.data.choices[0].message.content;
  interface Authrequest extends Request{
    userId:string
  }
  await prismaclient.story.create({
    data:{
        description:story,
        placename:userMessage,
        userId:(req as Authrequest).userId
    }
  })
  res.json({ reply:story });
})
storyroutes.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const stories = await prismaclient.story.findMany({
    where: {
      OR: [
        {
          placename: {
            contains: filter as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: filter as string,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  res.json({
    stories: stories.map((story) => ({
      id: story.id,
      placename: story.placename,
      description: story.description,
    })),
  });
});
