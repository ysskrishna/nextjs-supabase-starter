"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Loader2 } from "lucide-react"

interface Holiday {
  date: string
  localName: string
  name: string
  countryCode: string
}

export default function HolidayWidget() {
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch("https://date.nager.at/api/v3/PublicHolidays/2025/US")
        if (!response.ok) {
          throw new Error("Failed to fetch holidays")
        }
        const data = await response.json()
        setHolidays(data)
      } catch (err) {
        setError("Could not load holiday data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHolidays()
  }, [])

  // Get upcoming holidays (next 3)
  const upcomingHolidays = holidays
    .filter((holiday) => new Date(holiday.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming US Holidays
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground h-32 flex items-center justify-center">{error}</div>
        ) : upcomingHolidays.length > 0 ? (
          <ul className="space-y-4">
            {upcomingHolidays.map((holiday) => (
              <li key={holiday.date} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{holiday.localName}</p>
                  <p className="text-sm text-muted-foreground">{holiday.name}</p>
                </div>
                <div className="text-right">
                  <span className="bg-muted px-2 py-1 rounded-md text-sm">{formatDate(holiday.date)}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground h-32 flex items-center justify-center">
            No upcoming holidays found
          </div>
        )}
      </CardContent>
    </Card>
  )
}
