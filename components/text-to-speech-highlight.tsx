"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2 } from "lucide-react"

export default function TextToSpeechHighlight() {
  const [text, setText] = useState(
    "Hello! Welcome to SKUL. This is an example of our text-to-speech feature. You can type any text here and listen to how it sounds with perfect pronunciation."
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null)
  const wordsAndSpaces = Array.from(text.matchAll(/\S+|\s+/g)).map(m => m[0])
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
      return
    }
    const startIdx = currentWordIndex !== null ? currentWordIndex : findNextWordIndex(-1) ?? 0
    playFromIndex(startIdx)
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setCurrentWordIndex(null)
  }

  // Función para reproducir desde un índice específico
  const playFromIndex = (startIndex: number) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      // Unir las palabras desde el índice dado
      const textToSpeak = wordsAndSpaces.slice(startIndex).join("")
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = "en-US"
      utterance.onend = () => {
        setIsPlaying(false)
        setCurrentWordIndex(null)
      }
      utterance.onboundary = (event: any) => {
        if (event.name === "word") {
          const charIndex = event.charIndex
          let acc = 0
          for (let i = startIndex; i < wordsAndSpaces.length; i++) {
            acc += wordsAndSpaces[i].length
            if (charIndex < acc) {
              setCurrentWordIndex(i)
              break
            }
          }
        }
      }
      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
      setCurrentWordIndex(startIndex)
    }
  }

  // Función para encontrar el siguiente índice de palabra (no espacio)
  const findNextWordIndex = (from: number) => {
    for (let i = from + 1; i < wordsAndSpaces.length; i++) {
      if (wordsAndSpaces[i].trim() !== "") return i
    }
    return null
  }

  // Función para encontrar el índice de palabra anterior (no espacio)
  const findPrevWordIndex = (from: number) => {
    for (let i = from - 1; i >= 0; i--) {
      if (wordsAndSpaces[i].trim() !== "") return i
    }
    return null
  }

  // Función para adelantar palabra
  const handleNextWord = () => {
    if (currentWordIndex === null) return
    const nextWordIndex = findNextWordIndex(currentWordIndex)
    if (nextWordIndex !== null) {
      playFromIndex(nextWordIndex)
    }
  }

  // Función para retroceder palabra
  const handlePrevWord = () => {
    if (currentWordIndex === null) return
    const prevWordIndex = findPrevWordIndex(currentWordIndex)
    if (prevWordIndex !== null) {
      playFromIndex(prevWordIndex)
    }
  }

  return (
    <section id="practice-highlight" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Práctica de Pronunciación</h2>
          <p className="text-xl text-gray-600">Escribe cualquier texto y escucha la pronunciación con resaltado de palabras</p>
        </div>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-6 w-6 text-blue-600" />
              Text-to-Speech Highlight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="text-input-highlight" className="block text-sm font-medium text-gray-700 mb-2">
                Escribe tu texto aquí:
              </label>
              <textarea
                id="text-input-highlight"
                className="w-full border rounded p-2 mb-4 min-h-[120px] resize-none"
                value={text}
                onChange={e => setText(e.target.value)}
                disabled={isPlaying}
              />
            </div>
            {/* Audio Controls */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Button onClick={handlePlay} className={isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}>
                    {isPlaying ? "Pausar" : "Reproducir"}
                  </Button>
                  <Button onClick={handleStop} variant="outline">Detener</Button>
                  <Button onClick={handlePrevWord} variant="outline" disabled={currentWordIndex === null || findPrevWordIndex(currentWordIndex) === null}>
                    ◀ Palabra anterior
                  </Button>
                  <Button onClick={handleNextWord} variant="outline" disabled={currentWordIndex === null || findNextWordIndex(currentWordIndex) === null}>
                    Palabra siguiente ▶
                  </Button>
                </div>
              </div>
              <div className="text-lg leading-relaxed whitespace-pre-wrap">
                {wordsAndSpaces.map((word, i) => (
                  <span
                    key={i}
                    className={
                      currentWordIndex === i && word.trim() !== ""
                        ? "bg-yellow-200 rounded px-1 transition-colors duration-150"
                        : ""
                    }
                    style={{ display: "inline" }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 