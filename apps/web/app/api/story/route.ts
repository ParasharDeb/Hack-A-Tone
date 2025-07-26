import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mood = searchParams.get("mood")

  await new Promise((resolve) => setTimeout(resolve, 800))

  const stories = {
    adventurous: {
      title: "The Thrill Seeker's Paradise",
      content: "Imagine standing at the edge of adventure, your heart racing with anticipation...",
    },
    peaceful: {
      title: "Serenity Found",
      content: "In the quiet corners of the world, where time moves slowly and peace reigns...",
    },
    romantic: {
      title: "Love in Every Corner",
      content: "As the golden hour paints the sky, romance blooms in the most unexpected places...",
    },
  }

  return NextResponse.json({
    success: true,
    story: stories[mood as keyof typeof stories] || stories.peaceful,
  })
}
