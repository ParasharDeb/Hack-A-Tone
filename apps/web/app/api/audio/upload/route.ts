import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      message: "Audio uploaded successfully",
      transcription: "I'm looking for romantic restaurants in Paris with great ambiance",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 })
  }
}
