"use client"

import { Button } from "@/components/ui/button"
import { Phone, Send, MapPin, Clock, Shield, Star } from "lucide-react"

interface DetailHeroProps {
  locationBadge: string
  targetKeyword: string
  description: string
}

export function DetailHero({ locationBadge, targetKeyword, description }: DetailHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#0A0A0A] pt-20">
      {/* Background Image - Left Side with Mask Gradient */}
      <div 
        className="absolute inset-0 md:w-[55%] w-full h-full"
        style={{
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)"
        }}
      >
        <img 
          src="https://i.ibb.co/Cp48CVYd/leggings-4-last.png"
          alt="레깅스출장마사지"
          className="w-full h-full object-cover object-top"
        />
      </div>
      
      {/* Mobile: Top gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/70 to-[#0A0A0A] md:hidden" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center md:text-right md:ml-auto md:max-w-xl max-w-3xl mx-auto">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-[#8B0000]/20 text-[#E0E0E0] border border-[#8B0000]/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 text-[#8B0000]" />
            {locationBadge}
          </div>
          
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#E0E0E0] mb-6 text-balance">
            <span className="text-[#8B0000]">{targetKeyword}</span>출장마사지
          </h1>
          
          {/* Description */}
          <p className="text-lg text-[#A0A0A0] mb-8 leading-relaxed">
            {description}
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-8">
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-[#8B0000]" />
              <span className="text-sm font-medium text-[#E0E0E0]">30분 이내 출장</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-[#8B0000]" />
              <span className="text-sm font-medium text-[#E0E0E0]">100% 후불제</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-[#8B0000]" />
              <span className="text-sm font-medium text-[#E0E0E0]">검증된 관리사</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
            <a href="tel:010-2871-2457">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-[#8B0000] hover:bg-[#A52A2A] text-white">
                <Phone className="w-5 h-5" />
                전화 문의하기
              </Button>
            </a>
            <a href="https://t.me/cc_9911" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-[#8B0000] text-[#E0E0E0] hover:bg-[#8B0000]/20">
                <Send className="w-5 h-5" />
                텔레그램 상담
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
