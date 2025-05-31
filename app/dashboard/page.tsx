import { Button } from "@/components/ui/button"
import Link from "next/link"
import WeatherWidget from "@/components/widgets/weather-widget"
import QuoteWidget from "@/components/widgets/quote-widget"
import HolidayWidget from "@/components/widgets/holiday-widget"
import HistoryWidget from "@/components/widgets/history-widget"

export default function Dashboard() {
  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild variant="outline">
          <Link href="/">Logout</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherWidget />
        <QuoteWidget />
        <HolidayWidget />
        <HistoryWidget />
      </div>
    </div>
  )
}
