import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <span>🚀 Nuevo: Conversaciones con IA mejorada</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Aprende inglés con
            <span className="text-blue-600 block">inteligencia artificial</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Domina el inglés a través de conversaciones naturales, lecciones personalizadas y práctica constante con
            nuestra IA avanzada. Tu profesor personal disponible 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              Comenzar Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Sin tarjeta de crédito
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Prueba de 7 días gratis
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Cancela cuando quieras
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
