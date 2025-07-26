"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MapPin, MessageCircle, Sparkles, ArrowRight } from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: Mic,
      title: "Voice-First Experience",
      description: "Simply speak or upload voice notes to get personalized recommendations",
    },
    {
      icon: MapPin,
      title: "Local Insights",
      description: "Discover hidden gems and explore cities like a true local",
    },
    {
      icon: MessageCircle,
      title: "Smart Conversations",
      description: "AI detects your mood and preferences from your voice",
    },
    {
      icon: Sparkles,
      title: "Immersive Stories",
      description: "Get rich storytelling with audio narration for each destination",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Hack-A-Tone
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Explore cities like a local using just your voice!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <Button size="lg" className="text-lg px-8 py-6 rounded-full group" asChild>
              <Link href="/dashboard">
                Start Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Demo Voice Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="relative inline-block">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 bg-transparent"
              >
                <Mic className="h-8 w-8 text-primary" />
              </Button>
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">Try saying: "Find me cozy cafes in Paris"</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to explore the world?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of travelers discovering authentic local experiences through voice.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 rounded-full" asChild>
            <Link href="/auth/signup">Get Started Free</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}
