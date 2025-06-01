"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote, Loader2 } from "lucide-react"

interface QuoteData {
  q: string
  a?: string
}

export default function QuoteWidget() {
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://zenquotes.io/api/random")
        if (!response.ok) {
          throw new Error("Failed to fetch quote")
        }
        const data = await response.json()
        setQuote(data[0])
      } catch (err) {
        setError("Could not load quote")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuote()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Quote of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground h-32 flex items-center justify-center">{error}</div>
        ) : quote ? (
          <div className="space-y-4">
            <blockquote className="italic text-lg">"{quote.q}"</blockquote>
            {quote.a && <div className="text-right font-medium">— {quote.a}</div>}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
