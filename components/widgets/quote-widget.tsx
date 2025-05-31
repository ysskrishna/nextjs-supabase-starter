"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote, Loader2 } from "lucide-react"

interface QuoteData {
  content: string
  author: string
  tags: string[]
}

export default function QuoteWidget() {
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random")
        if (!response.ok) {
          throw new Error("Failed to fetch quote")
        }
        const data = await response.json()
        setQuote(data)
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
            <blockquote className="italic text-lg">"{quote.content}"</blockquote>
            <div className="text-right font-medium">— {quote.author}</div>
            {quote.tags && quote.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {quote.tags.map((tag) => (
                  <span key={tag} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
