'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AudioWaveformIcon as Waveform, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function FXGenerator() {
  const [mood, setMood] = useState('')
  const [tempo, setTempo] = useState(120)
  const [genre, setGenre] = useState('')
  const [generatedFX, setGeneratedFX] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setProgress(0)
    setGeneratedFX(null)

    if (!mood || !genre) {
      setError('Please fill in all required fields.')
      setIsLoading(false)
      return
    }

    try {
      // Simulate progress during generation
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 1000)

      console.log('Sending request to generate FX:', { mood, tempo, genre })
      const response = await fetch('/api/generate-fx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, tempo, genre }),
      })

      clearInterval(progressInterval)

      console.log('Received response:', response.status, response.statusText)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.url) {
        throw new Error('No audio data received from the server')
      }

      setGeneratedFX(data.url)
      setProgress(100)
    } catch (err) {
      console.error('Error in handleSubmit:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while generating the FX. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (generatedFX && audioRef.current && canvasRef.current) {
      const audio = audioRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (!ctx) return

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaElementSource(audio)
      source.connect(analyser)
      analyser.connect(audioContext.destination)

      analyser.fftSize = 256
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const draw = () => {
        requestAnimationFrame(draw)
        analyser.getByteFrequencyData(dataArray)

        ctx.fillStyle = 'rgb(200, 200, 200)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const barWidth = (canvas.width / bufferLength) * 2.5
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2

          ctx.fillStyle = `hsl(${(i * 360) / bufferLength}, 70%, 50%)`
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

          x += barWidth + 1
        }
      }

      audio.onplay = () => {
        audioContext.resume().then(() => draw())
      }
    }
  }, [generatedFX])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Generate FX</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mood">Mood</Label>
            <Input
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g., Energetic, Calm, Mysterious"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tempo">Tempo (BPM)</Label>
            <Slider
              id="tempo"
              min={60}
              max={200}
              step={1}
              value={[tempo]}
              onValueChange={(value) => setTempo(value[0])}
              disabled={isLoading}
            />
            <span className="text-sm text-gray-500">{tempo} BPM</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="e.g., Rock, Electronic, Jazz"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate FX'
            )}
          </Button>
          {isLoading && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-gray-500 text-center">
                Generating your custom sound effect...
              </p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {generatedFX && (
          <div className="w-full space-y-4">
            <h3 className="text-lg font-semibold">Generated FX:</h3>
            <audio ref={audioRef} controls src={generatedFX} className="w-full" />
            <canvas ref={canvasRef} width="640" height="100" className="w-full" />
            <Button 
              onClick={() => {
                const link = document.createElement('a')
                link.href = generatedFX
                link.download = `${mood}-${genre}-${tempo}bpm.wav`
                link.click()
              }} 
              className="w-full"
            >
              <Waveform className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

