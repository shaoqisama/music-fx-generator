if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY is not set in the environment variables')
}

interface GenerateFXParams {
  mood: string
  tempo: number
  genre: string
}

async function query(data: { inputs: string }) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/musicgen-small",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

export async function generateFX({ mood, tempo, genre }: GenerateFXParams): Promise<string> {
  try {
    console.log('Generating FX with params:', { mood, tempo, genre })

    // Construct a prompt for the facebook/musicgen-small model
    const prompt = `${mood} ${genre} music at ${tempo} BPM, atmospheric synths, airy sounds`

    console.log('Using prompt:', prompt)

    const audioBlob = await query({ inputs: prompt })

    console.log('Received audio blob from Hugging Face API')

    // Convert the blob to a base64 string
    const arrayBuffer = await audioBlob.arrayBuffer()
    const base64Audio = Buffer.from(arrayBuffer).toString('base64')

    console.log('Converted audio to base64')

    // Return a data URL that can be used as the source for an audio element
    return `data:audio/wav;base64,${base64Audio}`
  } catch (error) {
    console.error('Error in generateFX:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to generate FX: ${error.message}`)
    } else {
      throw new Error('An unexpected error occurred while generating FX')
    }
  }
}

