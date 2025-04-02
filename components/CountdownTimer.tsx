"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface CountdownTimerProps {
  targetTime: string
  label?: string
  className?: string
}

export default function CountdownTimer({ targetTime, label = "Countdown", className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("00:00:00")

  useEffect(() => {
    // This is a simplified example - in a real app, you'd parse the targetTime properly
    const calculateTimeLeft = () => {
      // For demo purposes, we'll just use a fixed time
      const hours = Math.floor(Math.random() * 2)
      const minutes = Math.floor(Math.random() * 60)
      const seconds = Math.floor(Math.random() * 60)

      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetTime])

  return (
    <Button
      size="lg"
      variant="outline"
      className={`flex items-center gap-2 border-foreground text-foreground ${className}`}
    >
      <p>
        {label}: <span className="font-mono">{timeLeft}</span>
      </p>
    </Button>
  )
}

