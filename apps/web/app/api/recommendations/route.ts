import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mood = searchParams.get("mood")
  const location = searchParams.get("location")

  // Simulate API processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const recommendations = {
    adventurous: [
      {
        id: "1",
        name: "Skydiving Center",
        description: "Experience the ultimate adrenaline rush with tandem skydiving",
        rating: 4.9,
        mapsLink: "https://maps.google.com/?q=skydiving+center",
      },
    ],
    peaceful: [
      {
        id: "2",
        name: "Zen Garden",
        description: "Tranquil Japanese garden perfect for meditation",
        rating: 4.7,
        mapsLink: "https://maps.google.com/?q=zen+garden",
      },
    ],
  }

  return NextResponse.json({
    success: true,
    recommendations: recommendations[mood as keyof typeof recommendations] || [],
    mood,
    location,
  })
}
