import FXGenerator from '@/components/FXGenerator'
import PreGeneratedLibrary from '@/components/PreGeneratedLibrary'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome to AI Music FX Generator</CardTitle>
          <CardDescription>
            Create custom sound effects for your music production or choose from our pre-generated library.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Our AI-powered tool allows you to generate unique sound effects by specifying mood, tempo, and genre.
            You can also upload a reference audio file to influence the generated FX.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="generator">FX Generator</TabsTrigger>
          <TabsTrigger value="library">Pre-generated Library</TabsTrigger>
        </TabsList>
        <TabsContent value="generator">
          <FXGenerator />
        </TabsContent>
        <TabsContent value="library">
          <PreGeneratedLibrary />
        </TabsContent>
      </Tabs>
    </div>
  )
}

