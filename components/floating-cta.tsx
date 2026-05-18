"use client"

import { Phone, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingCTA() {
  return (
    <>
      {/* Desktop: 우측 하단 플로팅 버튼 */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-3">
        <a href="tel:010-2871-2457" aria-label="전화 문의하기">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 p-0 shadow-lg hover:scale-110 transition-transform"
          >
            <Phone className="w-6 h-6" />
            <span className="sr-only">전화 문의하기</span>
          </Button>
        </a>
        <a href="https://open.kakao.com/o/shgq1hhi" target="_blank" rel="noopener noreferrer" aria-label="카카오톡 상담">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-14 h-14 p-0 shadow-lg hover:scale-110 transition-transform bg-yellow-400 border-yellow-400 text-black hover:bg-yellow-500 hover:border-yellow-500"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="sr-only">카카오톡 상담</span>
          </Button>
        </a>
        <a href="https://t.me/babyoutcallmassage" target="_blank" rel="noopener noreferrer" aria-label="텔레그램 상담">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-14 h-14 p-0 shadow-lg hover:scale-110 transition-transform bg-sky-500 border-sky-500 text-white hover:bg-sky-600 hover:border-sky-600"
          >
            <Send className="w-6 h-6" />
            <span className="sr-only">텔레그램 상담</span>
          </Button>
        </a>
      </div>

      {/* Mobile: 하단 고정 바 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-2 safe-area-inset-bottom">
        <div className="flex gap-2">
          <a href="tel:010-2871-2457" className="flex-1" aria-label="전화 걸기">
            <Button size="lg" className="w-full gap-1 py-5 text-sm">
              <Phone className="w-4 h-4" />
              전화 문의하기
            </Button>
          </a>
          <a href="https://open.kakao.com/o/shgq1hhi" target="_blank" rel="noopener noreferrer" className="flex-1" aria-label="카카오톡 상담">
            <Button 
              size="lg" 
              className="w-full gap-1 py-5 text-sm bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              <MessageCircle className="w-4 h-4" />
              카톡 상담
            </Button>
          </a>
          <a href="https://t.me/babyoutcallmassage" target="_blank" rel="noopener noreferrer" className="flex-1" aria-label="텔레그램 상담">
            <Button 
              size="lg" 
              className="w-full gap-1 py-5 text-sm bg-sky-500 hover:bg-sky-600 text-white"
            >
              <Send className="w-4 h-4" />
              텔레그램 상담
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}
