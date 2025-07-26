"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Upload, Loader2 } from "lucide-react"

interface VoiceInputProps {
  onTranscription: (text: string) => void
  onMoodDetected: (mood: string) => void
}

export function VoiceInput({ onTranscription, onMoodDetected }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcription, setTranscription] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startRecording = async () => {
    setIsRecording(true)

    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      setIsProcessing(true)

      // Simulate processing
      setTimeout(() => {
        const mockTranscription =
          "I'm feeling adventurous today! Show me some exciting places to visit in Tokyo with great food and nightlife."
        const mockMood = "adventurous"

        setTranscription(mockTranscription)
        onTranscription(mockTranscription)
        onMoodDetected(mockMood)
        setIsProcessing(false)
      }, 2000)
    }, 3000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsProcessing(true)

    setTimeout(() => {
      const mockTranscription = "I want to find peaceful, quiet places in Paris where I can relax and read a book."
      const mockMood = "peaceful"

      setTranscription(mockTranscription)
      onTranscription(mockTranscription)
      onMoodDetected(mockMood)
      setIsProcessing(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsProcessing(true)

      setTimeout(() => {
        const mockTranscription =
          "I'm looking for romantic spots in Rome for a date night. Something with great ambiance and delicious Italian food."
        const mockMood = "romantic"

        setTranscription(mockTranscription)
        onTranscription(mockTranscription)
        onMoodDetected(mockMood)
        setIsProcessing(false)
      }, 3000)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold">Voice Input</h2>

          {/* Recording Button */}
          <div className="relative">
            <motion.div
              animate={isRecording ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ repeat: isRecording ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
            >
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                className="rounded-full p-8 relative overflow-hidden"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : isRecording ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </motion.div>

            {/* Animated rings while recording */}
            <AnimatePresence>
              {isRecording && (
                <>
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="absolute inset-0 rounded-full border-2 border-destructive"
                  />
                  <motion.div
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0.3 }}
                    className="absolute inset-0 rounded-full border-2 border-destructive"
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          <p className="text-sm text-muted-foreground">
            {isRecording
              ? "Recording... Click to stop"
              : isProcessing
                ? "Processing your voice..."
                : "Click to start recording or upload a file"}
          </p>

          {/* File Upload */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isRecording || isProcessing}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Audio File
            </Button>
            <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
          </div>

          {/* Transcription */}
          {transcription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-muted rounded-lg"
            >
              <h3 className="font-medium mb-2">Transcription:</h3>
              <p className="text-sm">{transcription}</p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
