import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { audioData } = await request.json()

    // Simulate transcription processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockTranscriptions = [
      "I want to explore hidden gems in Tokyo that locals love",
      "Show me peaceful places in Paris where I can relax",
      "Find me the best street food in Bangkok",
      "I'm looking for adventure activities in New Zealand",
    ]

    const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)]

    return NextResponse.json({
      success: true,
      transcription: randomTranscription,
      confidence: 0.95,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Transcription failed" }, { status: 500 })
  }
}
