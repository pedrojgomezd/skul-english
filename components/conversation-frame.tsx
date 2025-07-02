import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, MessageCircle } from "lucide-react"
import HeygenAvatar from "./heygen-avatart-componet"

export default function ConversationFrame() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Conversa conmigo</h2>
          <p className="text-xl text-gray-600">Practica conversaciones reales con nuestra IA avanzada</p>
        </div>

        <Card className="max-w-4xl mx-auto border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              Asistente de Conversación IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              {/* Video placeholder - aquí iría el iframe de HeyGen */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-12 w-12 ml-1" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">¡Hola! Soy tu profesora de inglés</h3>
                  <p className="text-blue-100 mb-6">Haz clic para comenzar una conversación</p>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    <Play className="mr-2 h-4 w-4" />
                    Iniciar Conversación
                  </Button>
                </div>
              </div>

              <HeygenAvatar />
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Conversación Natural</h4>
                <p className="text-sm text-gray-600">Habla como lo harías con un amigo</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Corrección Inmediata</h4>
                <p className="text-sm text-gray-600">Recibe feedback en tiempo real</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Temas Variados</h4>
                <p className="text-sm text-gray-600">Desde casual hasta profesional</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
