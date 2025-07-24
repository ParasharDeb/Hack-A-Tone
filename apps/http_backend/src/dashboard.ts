import express, { Request, Router } from "express"
import { authMiddleware } from "./middleware";
import { prismaclient } from "@repo/db/client";
export const dashboardroutes: Router = express.Router();
interface Authrequest extends Request {
    userId: string
}
dashboardroutes.get("/visited", authMiddleware, async (req, res) => {
    const userId = (req as Authrequest).userId;
    try {
        const user = await prismaclient.users.findUnique({
            where: { id: userId },
            include: { places: true }
        })
        if (!user) {
            res.json({
                message: "user not found"
            })
            return
        }
        const place = user.places.map(place => ({
            id: place.id,
            city: place.city,
            country: place.country,
            placename: place.placename,
            location: place.location
        }))

    }
    catch (e) {
        res.status(500).json({ erorr: e })
    }
})
dashboardroutes.get("/moods", authMiddleware, async (req, res) => {
    const userId = (req as Authrequest).userId;
    if(!userId){
        res.json({
            message:"you are not singned in"
        })
        return
    }
    try {
        const moods = await prismaclient.audio.findMany({
            where: { userId },
            select: { id: true, mood: true, timestamp: true }
        });
        res.json({ moods });
    } catch (e) {
        res.status(500).json({ error: e });
    }
})
dashboardroutes.get("/recomendations", authMiddleware, async (req, res) => {
    const userId = (req as Authrequest).userId;
    try {
        // Get all place IDs the user has visited
        const user = await prismaclient.users.findUnique({
            where: { id: userId },
            include: { places: true }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const visitedPlaceIds = user.places.map(place => place.id);
        // Recommend places not visited by the user maybe using ai another todo for you himakshi
        const recommendations = await prismaclient.places.findMany({
            where: {
                id: { notIn: visitedPlaceIds.length > 0 ? visitedPlaceIds : [0] } // [0] to avoid empty array error
            },
            select: {
                id: true,
                city: true,
                country: true,
                placename: true,
                location: true
            }
        });
        res.json({ recommendations });
    } catch (e) {
        res.status(500).json({ error: e });
    }
})