"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Loader2 } from "lucide-react"

interface HistoryEvent {
  year: string
  description: string
}

interface HistoryData {
  date: string
  events: HistoryEvent[]
}

export default function HistoryWidget() {
  const [historyData, setHistoryData] = useState<HistoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // Get current date
        const today = new Date()
        const month = today.getMonth() + 1
        const day = today.getDate()

        const response = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
        if (!response.ok) {
          throw new Error("Failed to fetch history data")
        }
        const data = await response.json()
        setHistoryData(data)
      } catch (err) {
        setError("Could not load history data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHistoryData()
  }, [])

  // Get a random event or the first one
  const getRandomEvent = () => {
    if (!historyData || !historyData.events || historyData.events.length === 0) {
      return null
    }

    // Get a random event or the first one if there's only one
    const randomIndex = Math.floor(Math.random() * historyData.events.length)
    return historyData.events[randomIndex]
  }

  const randomEvent = getRandomEvent()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          This Day in History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground h-32 flex items-center justify-center">{error}</div>
        ) : randomEvent ? (
          <div className="space-y-2">
            <div className="text-2xl font-bold">{randomEvent.year}</div>
            <p>{randomEvent.description}</p>
            {historyData && <p className="text-xs text-muted-foreground mt-4">Source: {historyData.date}</p>}
          </div>
        ) : (
          <div className="text-center text-muted-foreground h-32 flex items-center justify-center">
            No historical events found for today
          </div>
        )}
      </CardContent>
    </Card>
  )
}
