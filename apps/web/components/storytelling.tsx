"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2 } from "lucide-react"

interface StorytellingProps {
  mood: string
  recommendations: any[]
}

export function Storytelling({ mood, recommendations }: StorytellingProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // 3 minutes mock duration
  const audioRef = useRef<HTMLAudioElement>(null)

  const getStoryContent = (mood: string) => {
    const stories = {
      adventurous: {
        title: "Tokyo's Electric Nights",
        content:
          "Picture yourself standing atop Shibuya Sky, the neon-lit metropolis sprawling endlessly beneath your feet. The city pulses with electric energy, each light telling a story of adventure waiting to unfold. As night falls, the Robot Restaurant comes alive with mechanical dancers and laser shows that transport you to a cyberpunk dreamscape...",
        audioUrl: "/placeholder-audio.mp3", // Mock audio URL
      },
      peaceful: {
        title: "Parisian Serenity",
        content:
          "Imagine walking through the quiet paths of Luxembourg Gardens as morning mist dances between ancient trees. The gentle rustle of pages from Shakespeare and Company bookstore mingles with distant church bells, creating a symphony of tranquility that soothes the soul...",
        audioUrl: "/placeholder-audio.mp3",
      },
      romantic: {
        title: "Roman Romance",
        content:
          "As twilight paints the Roman sky in shades of gold and crimson, you find yourself in the intimate embrace of Trattoria Monti. Candlelight flickers across weathered stone walls while the aroma of fresh pasta and aged wine creates an atmosphere of timeless romance...",
        audioUrl: "/placeholder-audio.mp3",
      },
    }

    return stories[mood as keyof typeof stories] || null
  }

  const story = getStoryContent(mood)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control actual audio playback
    if (!isPlaying) {
      // Start mock playback timer
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            clearInterval(interval)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!story || recommendations.length === 0) {
    return null
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Immersive Story</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">{story.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{story.content}</p>
            </div>

            {/* Audio Player */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePlayback}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? "Pause" : "Play"} Story</span>
                </Button>

                <div className="text-sm text-muted-foreground">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentTime / duration) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
