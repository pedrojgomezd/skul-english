import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid text' }, { status: 400 })
    }

    // Llama a la API de OpenAI TTS
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 })
    }

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text,
        voice: 'alloy', // Puedes cambiar la voz
        response_format: 'mp3',
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      return NextResponse.json({ error: error.error?.message || 'OpenAI API error' }, { status: 500 })
    }

    const audioBuffer = await response.arrayBuffer()
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="speech.mp3"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
} 