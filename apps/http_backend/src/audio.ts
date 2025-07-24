import express, { Router } from "express"
import { authMiddleware } from "./middleware";
import multer from "multer";
import { prismaclient } from "@repo/db/client";

export const AudioRoutes: Router = express.Router();
//exporting openai; req needed: npm install openai
//add to .env OPENAI_API_KEY=key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// audio to text using OpenAI Whisper
async function transcribeAudio(audioBuffer: Buffer, originalName: string): Promise<string> {
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const tempFilePath = path.join(tempDir, `temp_${Date.now()}_${originalName}`);
    fs.writeFileSync(tempFilePath, audioBuffer);

    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: "whisper-1",
    });

    fs.unlinkSync(tempFilePath);
    return transcription.text;
}

// Analyze mood using GPT
async function analyzeMood(text: string): Promise<string> {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `Analyze the emotional tone and respond with ONLY ONE word from: happy, sad, angry, anxious, excited, calm, frustrated, content, worried, neutral`
            },
            {
                role: "user",
                content: `Analyze mood: "${text}"`
            }
        ],
        max_tokens: 10,
        temperature: 0.3
    });

    const mood = completion.choices[0]?.message?.content?.trim().toLowerCase();
    const validMoods = ['happy', 'sad', 'angry', 'anxious', 'excited', 'calm', 'frustrated', 'content', 'worried', 'neutral'];
    return validMoods.includes(mood || '') ? mood! : 'neutral';
}

// POST /upload: Upload audio, convert to text, store mood (placeholder logic)
AudioRoutes.post("/upload", authMiddleware, upload.single("audio"), async (req, res) => {
    const userId = (req as any).userId;
    if (!req.file) {
        return res.status(400).json({ message: "No audio file uploaded" });
    }

    
    try {
        //to be on safe side - keeping this in try also
        const text = await transcribeAudio(req.file.buffer, req.file.originalname);
        const mood = await analyzeMood(text);
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
