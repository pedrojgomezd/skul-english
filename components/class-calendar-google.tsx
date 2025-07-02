"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const CALENDAR_ID = "c_030d39dcf2e19822511e95d74c2a7428f5c7aae82346bb20004aeafd4ef2c417@group.calendar.google.com"
const API_KEY = "AIzaSyD4_7RTXIL-uF1atv0xtxKEuFHs3haq5xY"

function getWeekRange(weekOffset = 0) {
  const now = new Date()
  // Set to start of week (Sunday)
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay() + weekOffset * 7)
  start.setHours(0, 0, 0, 0)
  // End of week (next Sunday)
  const end = new Date(start)
  end.setDate(start.getDate() + 7)
  end.setHours(0, 0, 0, 0)
  return {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    label: start.toLocaleDateString("es-ES", { month: "long", year: "numeric" }),
  }
}

// Tipos para los eventos
interface GoogleCalendarEvent {
  id: string
  summary: string
  start: { dateTime: string; timeZone?: string }
  end: { dateTime: string; timeZone?: string }
  htmlLink: string
  hangoutLink?: string
  creator?: { email?: string }
}

interface ClassEvent {
  id: string
  title: string
  date: string
  time: string
  duration: string
  instructor: string
  spots: number
  level: string
  htmlLink: string
  hangoutLink?: string
}

const mapGoogleEventToClass = (event: GoogleCalendarEvent): ClassEvent => {
  const startDate = new Date(event.start.dateTime)
  const endDate = new Date(event.end.dateTime)
  const durationMinutes = Math.round((endDate.getTime() - startDate.getTime()) / 60000)
  const time = startDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
  const date = startDate.toISOString().split("T")[0]
  // Datos fake para compatibilidad visual
  return {
    id: event.id,
    title: event.summary,
    date,
    time,
    duration: `${durationMinutes} min`,
    instructor: event.creator?.email || "-",
    spots: 10, // fake
    level: "Todos los niveles", // fake
    htmlLink: event.htmlLink,
    hangoutLink: event.hangoutLink,
  }
}

export default function ClassCalendar() {
  const [currentWeek, setCurrentWeek] = useState<number>(0)
  const [classEvents, setClassEvents] = useState<ClassEvent[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

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

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError("")
      const { timeMin, timeMax } = getWeekRange(currentWeek)
      const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&maxResults=9999`
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error("Error al consultar el calendario")
        const data = await res.json()
        const events: GoogleCalendarEvent[] = (data.items || []).filter((e: any) => e.start?.dateTime && e.end?.dateTime)
        setClassEvents(events.map(mapGoogleEventToClass))
      } catch (err) {
        setError("No se pudieron cargar los eventos del calendario.")
        setClassEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [currentWeek])

  const { label } = getWeekRange(currentWeek)

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
                {label.charAt(0).toUpperCase() + label.slice(1)}
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
            {loading ? (
              <div className="text-center py-8 text-gray-500">Cargando eventos...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : classEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No hay clases programadas para esta semana.</div>
            ) : (
              <div className="grid gap-4">
                {classEvents.map((classItem) => (
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
                      <div className="flex gap-2 mt-2">
                        {/* Solo mostrar el enlace Meet si existe */}
                        {classItem.hangoutLink && (
                          <a href={classItem.hangoutLink} target="_blank" rel="noopener noreferrer" className="text-green-600 underline text-xs">Enlace Meet</a>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <a href={classItem.htmlLink} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">Reservar Clase</Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
