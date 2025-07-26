"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, Star, Clock, DollarSign } from "lucide-react"

interface Recommendation {
  id: string
  name: string
  description: string
  image: string
  rating: number
  priceLevel: number
  openHours: string
  category: string
  mapsLink: string
  mood: string
}

interface RecommendationsProps {
  mood: string
  transcription: string
}

export function Recommendations({ mood, transcription }: RecommendationsProps) {
  // Mock recommendations based on mood
  const getRecommendations = (mood: string): Recommendation[] => {
    const recommendations = {
      adventurous: [
        {
          id: "1",
          name: "Shibuya Sky Observatory",
          description:
            "Experience Tokyo from 230 meters above ground with breathtaking 360-degree views of the city skyline.",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.8,
          priceLevel: 3,
          openHours: "10:00 AM - 10:30 PM",
          category: "Observation Deck",
          mapsLink: "https://maps.google.com/?q=Shibuya+Sky+Tokyo",
          mood: "adventurous",
        },
        {
          id: "2",
          name: "Robot Restaurant",
          description:
            "A wild, neon-lit dinner show featuring robots, lasers, and high-energy performances in Shinjuku.",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.2,
          priceLevel: 4,
          openHours: "5:30 PM - 10:00 PM",
          category: "Entertainment",
          mapsLink: "https://maps.google.com/?q=Robot+Restaurant+Shinjuku",
          mood: "adventurous",
        },
      ],
      peaceful: [
        {
          id: "3",
          name: "Luxembourg Gardens",
          description:
            "A tranquil oasis in the heart of Paris with beautiful gardens, quiet reading spots, and peaceful walking paths.",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.7,
          priceLevel: 1,
          openHours: "7:30 AM - 8:00 PM",
          category: "Park",
          mapsLink: "https://maps.google.com/?q=Luxembourg+Gardens+Paris",
          mood: "peaceful",
        },
        {
          id: "4",
          name: "Shakespeare and Company",
          description:
            "Historic English-language bookstore with cozy reading nooks and a peaceful atmosphere for book lovers.",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.5,
          priceLevel: 2,
          openHours: "10:00 AM - 10:00 PM",
          category: "Bookstore",
          mapsLink: "https://maps.google.com/?q=Shakespeare+and+Company+Paris",
          mood: "peaceful",
        },
      ],
      romantic: [
        {
          id: "5",
          name: "Trattoria Monti",
          description: "Intimate family-run restaurant serving authentic Roman cuisine in a cozy, romantic setting.",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.9,
          priceLevel: 3,
          openHours: "7:00 PM - 11:00 PM",
          category: "Restaurant",
          mapsLink: "https://maps.google.com/?q=Trattoria+Monti+Rome",
          mood: "romantic",
        },
        {
          id: "6",
          name: "Villa Borghese Gardens",
          description: "Romantic gardens perfect for evening strolls with beautiful views and intimate pathways.",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.6,
          priceLevel: 1,
          openHours: "6:00 AM - 8:00 PM",
          category: "Park",
          mapsLink: "https://maps.google.com/?q=Villa+Borghese+Rome",
          mood: "romantic",
        },
      ],
    }

    return recommendations[mood as keyof typeof recommendations] || []
  }

  const recommendations = getRecommendations(mood)

  if (!mood || recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Use voice input to get personalized recommendations based on your mood!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Personalized Recommendations</h2>
        <Badge variant="secondary" className="capitalize">
          {mood} mood detected
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img src={rec.image || "/placeholder.svg"} alt={rec.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2">{rec.category}</Badge>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{rec.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{rec.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">{rec.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{rec.openHours}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{"$".repeat(rec.priceLevel)}</span>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => window.open(rec.mapsLink, "_blank")}>
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Google Maps
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
