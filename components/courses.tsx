"use client"

import { Button } from "@/components/ui/button"
import { Phone, Star, Sparkles, Crown } from "lucide-react"

export function Courses() {
  return (
    <section id="courses" className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E0E0E0] mb-4">
            레깅스마사지 <span className="text-[#8B0000]">출장 안마코스</span>
          </h2>
          <p className="text-lg text-[#A0A0A0]">
            합리적인 가격으로 최상의 힐링을 경험하세요
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {/* VIP 황제코스 - Deep Burgundy Accent */}
          <div className="relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
                <Crown className="w-4 h-4" />
                BEST
              </span>
            </div>
            <div className="bg-[#161616] rounded-2xl p-8 border border-[#8B0000]/50 shadow-lg shadow-[#8B0000]/10">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#E0E0E0]">
                <span className="text-[#8B0000]">VIP 황제코스</span> (타이+힐링+풋)
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { time: "60분", price: "100,000원" },
                  { time: "90분", price: "120,000원", best: true },
                  { time: "120분", price: "150,000원" },
                  { time: "150분", price: "180,000원" },
                ].map((course) => (
                  <div
                    key={course.time}
                    className={`relative bg-[#0A0A0A] rounded-xl p-5 md:p-7 text-center transition-all hover:scale-105 ${
                      course.best
                        ? "ring-2 ring-[#8B0000] shadow-xl shadow-[#8B0000]/20"
                        : "border border-[#2A2A2A] hover:border-[#8B0000]/50"
                    }`}
                  >
                    {course.best && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 bg-[#8B0000] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          인기
                        </span>
                      </div>
                    )}
                    <div className="text-2xl md:text-4xl font-bold text-[#8B0000] mb-2">
                      {course.time}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-[#E0E0E0]">
                      {course.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 힐링 스웨디시 - Deep Indigo Accent */}
          <div className="bg-[#161616] rounded-2xl p-8 border border-[#4B0082]/50">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#E0E0E0]">
              <span className="text-[#4B0082]">힐링 스웨디시</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { time: "60분", price: "80,000원" },
                { time: "90분", price: "100,000원" },
                { time: "120분", price: "120,000원" },
              ].map((course) => (
                <div
                  key={course.time}
                  className="bg-[#0A0A0A] rounded-xl p-5 md:p-7 text-center border border-[#2A2A2A] hover:border-[#4B0082]/50 transition-all hover:scale-105"
                >
                  <div className="text-2xl md:text-4xl font-bold text-[#4B0082] mb-2">
                    {course.time}
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-[#E0E0E0]">
                    {course.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 건식 마사지 - Dark Slate Accent */}
          <div className="bg-[#161616] rounded-2xl p-8 border border-[#2F4F4F]/50">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#E0E0E0]">
              <span className="text-[#2F4F4F]">건식 마사지</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { time: "60분", price: "70,000원" },
                { time: "90분", price: "90,000원" },
                { time: "120분", price: "110,000원" },
              ].map((course) => (
                <div
                  key={course.time}
                  className="bg-[#0A0A0A] rounded-xl p-5 md:p-7 text-center border border-[#2A2A2A] hover:border-[#2F4F4F]/50 transition-all hover:scale-105"
                >
                  <div className="text-2xl md:text-4xl font-bold text-[#5F9F9F] mb-2">
                    {course.time}
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-[#E0E0E0]">
                    {course.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="tel:010-2871-2457">
            <Button size="lg" className="gap-2 text-lg px-8 bg-[#8B0000] hover:bg-[#A52A2A] text-white">
              <Phone className="w-5 h-5" />
              지금 예약하기
            </Button>
          </a>
          <p className="mt-4 text-sm text-[#A0A0A0]">
            * 출장비 별도 / 지역에 따라 추가 요금이 발생할 수 있습니다
          </p>
        </div>
      </div>
    </section>
  )
}
