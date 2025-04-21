import { NextResponse } from 'next/server'
import { generateFX } from '@/lib/ai'

export const runtime = 'edge' // Use edge runtime for serverless execution

export async function POST(req: Request) {
  try {
    console.log('Received request to generate FX')
    const { mood, tempo, genre } = await req.json()
    
    console.log('Request parameters:', { mood, tempo, genre })

    if (!mood || !tempo || !genre) {
      console.error('Missing required parameters')
      return NextResponse.json(
        { error: 'Missing required parameters' }, 
        { status: 400 }
      )
    }

    // Validate tempo range
    if (tempo < 60 || tempo > 200) {
      console.error('Invalid tempo:', tempo)
      return NextResponse.json(
        { error: 'Tempo must be between 60 and 200 BPM' },
        { status: 400 }
      )
    }

    console.log('Calling generateFX function')
    const generatedFX = await generateFX({ mood, tempo, genre })
    
    console.log('FX generated successfully')
    return NextResponse.json({ url: generatedFX })
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

