'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AudioWaveformIcon as Waveform } from 'lucide-react'

interface FX {
  id: string
  name: string
  url: string
}

export default function PreGeneratedLibrary() {
  const [fxLibrary, setFxLibrary] = useState<FX[]>([])

  useEffect(() => {
    // TODO: Fetch pre-generated FX library from API
    // This is a placeholder
    setFxLibrary([
      { id: '1', name: 'Energetic Beat', url: '/placeholder.mp3' },
      { id: '2', name: 'Calm Atmosphere', url: '/placeholder.mp3' },
      { id: '3', name: 'Mysterious Pad', url: '/placeholder.mp3' },
    ])
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fxLibrary.map((fx) => (
        <Card key={fx.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{fx.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <audio controls src={fx.url} className="w-full" />
          </CardContent>
          <CardFooter>
            <Button onClick={() => {
              const link = document.createElement('a')
              link.href = fx.url
              link.download = `${fx.name}.mp3`
              link.click()
            }} className="w-full">
              <Waveform className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

