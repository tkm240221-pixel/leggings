"use client"

import { Button } from "@/components/ui/button"
import { Phone, Star, Sparkles } from "lucide-react"

export function Courses() {
  return (
    <section id="courses" className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            베이비마사지 <span className="text-primary">출장 안마코스</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            합리적인 가격으로 최상의 힐링을 경험하세요
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {/* 믹스 코스 - 핑크 테마 (베스트) */}
          <div className="relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
                <Sparkles className="w-4 h-4" />
                강력추천
              </span>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-300 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-pink-700">
                건식+힐링+풋 (믹스코스)
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { time: "60분", price: "100,000원" },
                  { time: "90분", price: "120,000원", best: true },
                  { time: "120분", price: "150,000원" },
                  { time: "150분", price: "180,000원" },
                ].map((course) => (
                  <div
                    key={course.time}
                    className={`relative bg-white rounded-xl p-4 md:p-6 text-center transition-all hover:scale-105 ${
                      course.best
                        ? "ring-2 ring-pink-500 shadow-xl"
                        : "border border-pink-200 hover:border-pink-400"
                    }`}
                  >
                    {course.best && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 bg-pink-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          인기
                        </span>
                      </div>
                    )}
                    <div className="text-2xl md:text-4xl font-bold text-pink-600 mb-1">
                      {course.time}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-foreground">
                      {course.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 힐링 아로마 코스 - 블루/라벤더 테마 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-blue-700">
              힐링 아로마
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[
                { time: "60분", price: "80,000원" },
                { time: "90분", price: "100,000원" },
                { time: "120분", price: "120,000원" },
              ].map((course) => (
                <div
                  key={course.time}
                  className="bg-white rounded-xl p-4 md:p-6 text-center border border-blue-200 hover:border-blue-400 transition-all hover:scale-105"
                >
                  <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1">
                    {course.time}
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-foreground">
                    {course.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 건식 코스 - 그레이/베이지 테마 */}
          <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl p-6 border-2 border-stone-200">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-stone-700">
              건식
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[
                { time: "60분", price: "70,000원" },
                { time: "90분", price: "90,000원" },
                { time: "120분", price: "110,000원" },
              ].map((course) => (
                <div
                  key={course.time}
                  className="bg-white rounded-xl p-4 md:p-6 text-center border border-stone-200 hover:border-stone-400 transition-all hover:scale-105"
                >
                  <div className="text-2xl md:text-4xl font-bold text-stone-600 mb-1">
                    {course.time}
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-foreground">
                    {course.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="tel:010-2871-2457">
            <Button size="lg" className="gap-2 text-lg px-8">
              <Phone className="w-5 h-5" />
              지금 예약하기
            </Button>
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            * 출장비 별도 / 지역에 따라 추가 요금이 발생할 수 있습니다
          </p>
        </div>
      </div>
    </section>
  )
}
