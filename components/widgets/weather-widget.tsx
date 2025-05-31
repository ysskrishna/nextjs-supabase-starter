"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, CloudSun, Sun, Loader2 } from "lucide-react"

interface WeatherData {
  current_weather: {
    temperature: number
    weathercode: number
    windspeed: number
    winddirection: number
    is_day: number
    time: string
  }
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }
        const data = await response.json()
        setWeather(data)
      } catch (err) {
        setError("Could not load weather data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (code: number, isDay: number) => {
    // Simplified weather code mapping
    if (code <= 1)
      return isDay ? <Sun className="h-8 w-8 text-yellow-500" /> : <Sun className="h-8 w-8 text-gray-400" />
    if (code <= 3) return <CloudSun className="h-8 w-8 text-gray-500" />
    if (code <= 49) return <Cloud className="h-8 w-8 text-gray-500" />
    return <CloudRain className="h-8 w-8 text-blue-500" />
  }

  const getWeatherDescription = (code: number) => {
    // Simplified weather code description
    if (code <= 0) return "Clear sky"
    if (code <= 3) return "Partly cloudy"
    if (code <= 49) return "Cloudy"
    if (code <= 69) return "Rainy"
    if (code <= 79) return "Snowy"
    return "Thunderstorm"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudSun className="h-5 w-5" />
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground h-32 flex items-center justify-center">{error}</div>
        ) : weather ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather.current_weather.weathercode, weather.current_weather.is_day)}
              <div className="text-4xl font-bold">{Math.round(weather.current_weather.temperature)}°C</div>
            </div>
            <div className="text-center">
              <p className="text-lg">{getWeatherDescription(weather.current_weather.weathercode)}</p>
              <p className="text-sm text-muted-foreground">Wind: {weather.current_weather.windspeed} km/h</p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
