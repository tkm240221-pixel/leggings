"use client"

import { useEffect, useState } from "react"
import { MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LocationBanner() {
  const [location, setLocation] = useState<string | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // 쿠키에서 감지된 위치 읽기
    const cookies = document.cookie.split(';')
    const locationCookie = cookies.find(c => c.trim().startsWith('detected-location='))
    if (locationCookie) {
      const detectedLocation = decodeURIComponent(locationCookie.split('=')[1])
      setLocation(detectedLocation)
    }
    
    // 이미 닫았는지 확인
    const dismissedCookie = cookies.find(c => c.trim().startsWith('location-banner-dismissed='))
    if (dismissedCookie) {
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    document.cookie = 'location-banner-dismissed=true; max-age=86400; path=/'
  }

  if (!location || dismissed) return null

  return (
    <div className="bg-primary text-primary-foreground py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="text-center">
          현재 <strong>{location}</strong> 주변에 계신가요? 30분 내 방문 가능합니다!
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 p-1 h-auto"
          onClick={handleDismiss}
          aria-label="배너 닫기"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
