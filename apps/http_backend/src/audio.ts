import express, { Router } from "express"
import { authMiddleware } from "./middleware";
import multer from "multer";
import { prismaclient } from "@repo/db/client";
import axios from "axios"; // Added axios import
import path from "path"; // Added path import
import fs from "fs"; // Added fs import

export const AudioRoutes: Router = express.Router();
//exporting openai; req needed: npm install openai
//add to .env OPENAI_API_KEY=key

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /upload: Upload audio, convert to text, store mood (now inlined like storyroutes)
AudioRoutes.post("/upload", authMiddleware, upload.single("audio"), async (req, res) => {
    const userId = (req as any).userId;
    if (!req.file) {
        return res.status(400).json({ message: "No audio file uploaded" });
    }
    try {
        // --- Transcribe Audio (inlined, using axios) ---
        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        const tempFilePath = path.join(tempDir, `temp_${Date.now()}_${req.file.originalname}`);
        fs.writeFileSync(tempFilePath, req.file.buffer);
        // Use axios to call OpenAI Whisper endpoint (example, adjust as needed)
        const whisperResponse = await axios.post(
            "https://api.openai.com/v1/audio/transcriptions",
            {
                file: fs.createReadStream(tempFilePath),
                model: "whisper-1"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        fs.unlinkSync(tempFilePath);
        const text = whisperResponse.data.text;

        // --- Analyze Mood (inlined, using axios) ---
        const moodResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `Analyze the emotional tone and respond with ONLY ONE word from: happy, sad, angry, anxious, excited, calm, frustrated, content, worried, neutral`
                    },
                    {
                        role: "user",
                        content: `Analyze mood: \"${text}\"`
                    }
                ],
                max_tokens: 10,
                temperature: 0.3
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        let mood = moodResponse.data.choices[0]?.message?.content?.trim().toLowerCase();
        const validMoods = ['happy', 'sad', 'angry', 'anxious', 'excited', 'calm', 'frustrated', 'content', 'worried', 'neutral'];
        if (!validMoods.includes(mood)) mood = 'neutral';

        // --- Store in DB ---
        const audioEntry = await prismaclient.audio.create({
            data: {
                text,
                mood,
                userId
            }
        });
        res.json({ message: "Audio uploaded and processed", audio: audioEntry });
    } catch (e: any) {
        res.status(500).json({ error: e?.response?.data || e.message || e });
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
