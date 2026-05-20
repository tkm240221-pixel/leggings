"use client"

import { Button } from "@/components/ui/button"
import { Phone, Send, Shield, Clock, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            내상 없는 20대 출장안마 · 100% 후불제
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            <span className="text-primary">레깅스</span>출장마사지
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            서울 전지역 24시간 프리미엄 출장안마 서비스<br />
            검증된 전문 테라피스트가 최상의 힐링을 선사합니다
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Clock className="w-5 h-5 text-primary" />
              <span>30분 이내 출장</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Shield className="w-5 h-5 text-primary" />
              <span>100% 후불제</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Star className="w-5 h-5 text-primary" />
              <span>검증된 관리사</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:010-2871-2457">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                <Phone className="w-5 h-5" />
                전화 문의하기
              </Button>
            </a>
            <a href="https://t.me/cc_9911" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                <Send className="w-5 h-5" />
                텔레그램 상담
              </Button>
            </a>
          </div>

          {/* Notice */}
          <p className="mt-8 text-sm text-muted-foreground">
            ※ 예약금 등의 명목으로 선입금을 일절 요구하지 않습니다
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
