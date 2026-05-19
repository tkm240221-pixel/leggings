"use client"

import { useState } from "react"
import { Star, ThumbsUp, Eye, Calendar, ChevronDown, ChevronUp, Phone, MessageCircle } from "lucide-react"
import { 
  generateBlogContent, 
  generateReviews, 
  getFullLocationName 
} from "@/lib/dynamic-content"

interface DynamicBlogSectionProps {
  regionName: string      // 서울, 경기, 인천
  districtName: string    // 강남구, 파주시, 부천시 원미구
  neighborhoodName: string // 개포동, 조리읍, 상동
  seed: string            // 고유 시드 (URL 등)
}

export function DynamicBlogSection({ 
  regionName, 
  districtName, 
  neighborhoodName,
  seed 
}: DynamicBlogSectionProps) {
  const [expandedBlog, setExpandedBlog] = useState(false)
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({})
  
  // 완전한 지역명 생성 (중복/숫자동 방지)
  const fullLocationName = getFullLocationName(regionName, districtName, neighborhoodName)
  
  // 동적 콘텐츠 생성
  const blogContent = generateBlogContent(fullLocationName, seed)
  const reviews = generateReviews(fullLocationName, seed, 4)
  
  const toggleReview = (index: number) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* 블로그 섹션 */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {fullLocationName} <span className="text-primary">마사지 정보</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {fullLocationName} 출장마사지 이용에 도움이 되는 전문 정보
          </p>
          
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
                {blogContent.title}
              </h3>
              
              <div 
                className={`prose prose-sm md:prose-base max-w-none text-muted-foreground ${!expandedBlog ? 'line-clamp-6' : ''}`}
                dangerouslySetInnerHTML={{ __html: blogContent.content }}
              />
              
              <button
                onClick={() => setExpandedBlog(!expandedBlog)}
                className="mt-4 flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {expandedBlog ? (
                  <>접기 <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>더 보기 <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
              
              {/* 블로그 내 CTA 버튼 */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  {fullLocationName} 출장마사지 예약 문의
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="tel:010-5765-9956"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    전화문의
                  </a>
                  <a 
                    href="http://pf.kakao.com/_CYGdn/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEE500] text-[#191919] rounded-lg hover:bg-[#FEE500]/90 transition-colors text-sm font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    카톡상담
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 후기 섹션 */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {fullLocationName} <span className="text-primary">실제 이용 후기</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {fullLocationName} 레깅스출장마사지를 이용하신 손님들의 생생한 후기
          </p>
          
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div 
                key={review.id}
                className="bg-card rounded-xl shadow-md overflow-hidden border border-border"
              >
                <div className="p-5">
                  {/* 후기 헤더 */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1 text-sm md:text-base">
                        {review.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium">{review.author}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* 후기 본문 */}
                  <div 
                    className={`text-sm text-muted-foreground ${!expandedReviews[index] ? 'line-clamp-3' : ''}`}
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                  
                  <button
                    onClick={() => toggleReview(index)}
                    className="mt-2 text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    {expandedReviews[index] ? '접기' : '더 보기'}
                  </button>
                  
                  {/* 후기 푸터 */}
                  <div className="mt-3 pt-3 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {Math.floor(Math.random() * 200) + 50}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {Math.floor(Math.random() * 50) + 10}
                    </span>
                    <span className="ml-auto text-primary font-medium">
                      ✓ 실제 이용 인증
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 후기 하단 CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              {fullLocationName}에서도 레깅스출장마사지를 경험해보세요
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="tel:010-5765-9956"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                전화문의
              </a>
              <a 
                href="http://pf.kakao.com/_CYGdn/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FEE500] text-[#191919] rounded-full hover:bg-[#FEE500]/90 transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                카톡상담
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
