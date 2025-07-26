"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mic, Clock, ChevronRight } from "lucide-react"

interface ChatSession {
  id: string
  title: string
  mood: string
  timestamp: string
  preview: string
  type: "voice" | "text"
}

interface ChatSidebarProps {
  onSessionSelect: (session: ChatSession) => void
  currentSessionId?: string
}

export function ChatSidebar({ onSessionSelect, currentSessionId }: ChatSidebarProps) {
  const [sessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Tokyo Adventure",
      mood: "adventurous",
      timestamp: "2 hours ago",
      preview: "I'm feeling adventurous today! Show me some exciting places...",
      type: "voice",
    },
    {
      id: "2",
      title: "Peaceful Paris",
      mood: "peaceful",
      timestamp: "1 day ago",
      preview: "I want to find peaceful, quiet places in Paris...",
      type: "voice",
    },
    {
      id: "3",
      title: "Romantic Rome",
      mood: "romantic",
      timestamp: "3 days ago",
      preview: "Looking for romantic spots in Rome for a date night...",
      type: "voice",
    },
    {
      id: "4",
      title: "Barcelona Chat",
      mood: "curious",
      timestamp: "1 week ago",
      preview: "Tell me about the best tapas bars in Barcelona",
      type: "text",
    },
  ])

  const getMoodColor = (mood: string) => {
    const colors = {
      adventurous: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      peaceful: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      romantic: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      curious: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    }
    return colors[mood as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat History
          </h2>

          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {sessions.map((session) => (
                <motion.div key={session.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant={currentSessionId === session.id ? "secondary" : "ghost"}
                    className="w-full p-3 h-auto justify-start text-left"
                    onClick={() => onSessionSelect(session)}
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {session.type === "voice" ? (
                            <Mic className="h-4 w-4 text-primary" />
                          ) : (
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-medium text-sm">{session.title}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={`text-xs ${getMoodColor(session.mood)}`}>
                          {session.mood}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.timestamp}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2">{session.preview}</p>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
