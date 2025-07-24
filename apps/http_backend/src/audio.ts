import express, { Router } from "express"
import { authMiddleware } from "./middleware";
import multer from "multer";
import { prismaclient } from "@repo/db/client";

export const AudioRoutes: Router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /upload: Upload audio, convert to text, store mood (placeholder logic)
AudioRoutes.post("/upload", authMiddleware, upload.single("audio"), async (req, res) => {
    const userId = (req as any).userId;
    if (!req.file) {
        return res.status(400).json({ message: "No audio file uploaded" });
    }

    const text = "This is a placeholder for transcribed text.";   //himakshi idhar pe audio ko text mein convert kar diyo
    const mood = "happy"; //aur idhar pe text ko context rakh ke grok ko call karo aur determine karne ko bolo text padhke kya mood hain user ka
    try {
        const audioEntry = await prismaclient.audio.create({
            data: {
                text,
                mood,
                userId
            }
        });
        res.json({ message: "Audio uploaded and processed", audio: audioEntry });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// GET /currentmood: Get the latest mood for the user
AudioRoutes.get("/currentmood", authMiddleware, async (req, res) => {
    const userId = (req as any).userId;
    try {
        const latest = await prismaclient.audio.findFirst({
            where: { userId },
            orderBy: { timestamp: "desc" }
        });
        if (!latest) {
            return res.status(404).json({ message: "No mood entries found" });
        }
        res.json({ currentMood: latest.mood, timestamp: latest.timestamp });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// GET /moods: Get all moods for the user
AudioRoutes.get("/moods", authMiddleware, async (req, res) => {
    const userId = (req as any).userId;
    try {
        const moods = await prismaclient.audio.findMany({
            where: { userId },
            select: { id: true, mood: true, timestamp: true }
        });
        res.json({ moods });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});