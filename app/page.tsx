import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, Users, Star } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import ConversationFrame from "@/components/conversation-frame"
import ClassCalendar from "@/components/class-calendar-google"
import TextToSpeech from "@/components/text-to-speech-openia"
import TextToSpeechHighlight from "@/components/text-to-speech-highlight"
import ElevenLabsEmbed from "@/components/elevenlabs-embed"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SKUL</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Características
              </Link>
              <Link href="#calendar" className="text-gray-600 hover:text-gray-900 transition-colors">
                Clases
              </Link>
              <Link href="#practice" className="text-gray-600 hover:text-gray-900 transition-colors">
                Práctica
              </Link>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Comenzar Gratis</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Aprende inglés con inteligencia artificial</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Una experiencia de aprendizaje personalizada que se adapta a tu ritmo y estilo
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Lecciones Personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Contenido adaptado a tu nivel y objetivos específicos de aprendizaje</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <Users className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle className="text-xl">Conversaciones Reales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Practica con IA avanzada que simula conversaciones naturales</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <Star className="h-12 w-12 text-yellow-600 mb-4" />
                  <CardTitle className="text-xl">Progreso Medible</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Seguimiento detallado de tu progreso y áreas de mejora</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conversation Frame */}
        <ConversationFrame />

        {/* Class Calendar */}
        <ClassCalendar />

        {/* Text to Speech Practice */}
        <TextToSpeech />

        {/* Text to Speech Highlight */}
        <TextToSpeechHighlight />

        {/* ElevenLabs Embed */}
        <ElevenLabsEmbed />

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">¿Listo para transformar tu inglés?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Únete a miles de estudiantes que ya están mejorando su inglés con SKUL
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Comenzar Prueba Gratuita
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Ver Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="text-xl font-bold">SKUL</span>
              </div>
              <p className="text-gray-400">
                Aprende inglés con inteligencia artificial de manera efectiva y personalizada.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Estado
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SKUL. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
