"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { VoiceInput } from "@/components/voice-input"
import { Recommendations } from "@/components/recommendations"
import { Storytelling } from "@/components/storytelling"
import { ChatSidebar } from "@/components/chat-sidebar"

export default function DashboardPage() {
  const [transcription, setTranscription] = useState("")
  const [mood, setMood] = useState("")
  const [currentSessionId, setCurrentSessionId] = useState<string>()

  const handleSessionSelect = (session: any) => {
    setCurrentSessionId(session.id)
    setTranscription(session.preview)
    setMood(session.mood)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ChatSidebar onSessionSelect={handleSessionSelect} currentSessionId={currentSessionId} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back, John! 👋</h1>
              <p className="text-lg text-muted-foreground">Ready to discover amazing places with your voice?</p>
            </motion.div>

            {/* Voice Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <VoiceInput onTranscription={setTranscription} onMoodDetected={setMood} />
            </motion.div>

            {/* Recommendations */}
            {mood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Recommendations mood={mood} transcription={transcription} />
              </motion.div>
            )}

            {/* Storytelling */}
            {mood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Storytelling mood={mood} recommendations={[]} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
