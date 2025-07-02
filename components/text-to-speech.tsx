"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play, Pause, RotateCcw, Volume2, Download, Copy } from "lucide-react"
import { useState, useRef } from "react"

export default function TextToSpeech() {
  const [text, setText] = useState(
    "Hello! Welcome to SKUL. This is an example of our text-to-speech feature. You can type any text here and listen to how it sounds with perfect pronunciation.",
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlay = () => {
    if ("speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.pause()
        setIsPlaying(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = playbackRate
        utterance.lang = "en-US"
        utterance.onend = () => setIsPlaying(false)
        window.speechSynthesis.speak(utterance)
        setIsPlaying(true)
      }
    }
  }

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  const handleSpeedChange = () => {
    const speeds = [0.5, 1, 1.5, 2]
    const currentIndex = speeds.indexOf(playbackRate)
    const nextIndex = (currentIndex + 1) % speeds.length
    setPlaybackRate(speeds[nextIndex])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section id="practice" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Práctica de Pronunciación</h2>
          <p className="text-xl text-gray-600">Escribe cualquier texto y escucha la pronunciación perfecta</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-6 w-6 text-blue-600" />
              Text-to-Speech
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
                Escribe tu texto aquí:
              </label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe el texto que quieres escuchar..."
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Audio Controls */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handlePlay}
                    className={`${isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? "Pausar" : "Reproducir"}
                  </Button>

                  <Button onClick={handleStop} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reiniciar
                  </Button>

                  <Button onClick={handleSpeedChange} variant="outline">
                    {playbackRate}x
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? "45%" : "0%" }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0:00</span>
                <span>0:15</span>
              </div>
            </div>

            {/* Voice Settings */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Configuración de Voz</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Velocidad: {playbackRate}x</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={playbackRate}
                      onChange={(e) => setPlaybackRate(Number.parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Acento</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                      <option>Americano (US)</option>
                      <option>Británico (UK)</option>
                      <option>Australiano (AU)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Palabras:</span>
                    <span className="font-medium">{text.split(" ").length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Caracteres:</span>
                    <span className="font-medium">{text.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiempo estimado:</span>
                    <span className="font-medium">~{Math.ceil(text.split(" ").length / 150)}min</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Examples */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Ejemplos rápidos:</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  "Hello, how are you today?",
                  "I would like to order a coffee, please.",
                  "Could you help me with directions?",
                  "Thank you very much for your assistance.",
                ].map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setText(example)}
                    className="text-left justify-start h-auto p-3 text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
