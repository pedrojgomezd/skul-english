"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

// Datos de ejemplo - en producción vendrían de Google Calendar API
const mockClasses = [
  {
    id: 1,
    title: "Conversación Básica",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "60 min",
    instructor: "Sarah Johnson",
    spots: 5,
    level: "Principiante",
  },
  {
    id: 2,
    title: "Business English",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "90 min",
    instructor: "Michael Chen",
    spots: 3,
    level: "Intermedio",
  },
  {
    id: 3,
    title: "Pronunciación Avanzada",
    date: "2024-01-16",
    time: "11:00 AM",
    duration: "45 min",
    instructor: "Emma Wilson",
    spots: 8,
    level: "Avanzado",
  },
  {
    id: 4,
    title: "Gramática Práctica",
    date: "2024-01-16",
    time: "4:00 PM",
    duration: "60 min",
    instructor: "David Rodriguez",
    spots: 6,
    level: "Intermedio",
  },
  {
    id: 5,
    title: "Conversación Libre",
    date: "2024-01-17",
    time: "9:00 AM",
    duration: "75 min",
    instructor: "Lisa Thompson",
    spots: 4,
    level: "Todos los niveles",
  },
  {
    id: 6,
    title: "IELTS Preparation",
    date: "2024-01-17",
    time: "3:00 PM",
    duration: "120 min",
    instructor: "James Parker",
    spots: 2,
    level: "Avanzado",
  },
]

export default function ClassCalendar() {
  const [currentWeek, setCurrentWeek] = useState(0)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-100 text-green-800"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "Avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <section id="calendar" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Clases Disponibles</h2>
          <p className="text-xl text-gray-600">Reserva tu lugar en nuestras clases grupales en vivo</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-blue-600" />
                Enero 2024
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {mockClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{classItem.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(classItem.level)}`}>
                        {classItem.level}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(classItem.date).toLocaleDateString("es-ES", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {classItem.time} ({classItem.duration})
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {classItem.spots} lugares disponibles
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Instructor: {classItem.instructor}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">Reservar Clase</Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="mr-4 bg-transparent">
                Ver Más Clases
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Crear Clase Personalizada</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
