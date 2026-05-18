"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Star, Send } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function WriteReviewPage() {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 서버에 전송
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-24 text-center max-w-2xl">
            <div className="bg-card border rounded-2xl p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-4">후기가 등록되었습니다</h1>
              <p className="text-muted-foreground mb-8">
                소중한 후기 감사합니다. 검토 후 게시됩니다.
              </p>
              <Link href="/blog">
                <Button>블로그로 돌아가기</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로 돌아가기
          </Link>
          
          <div className="bg-card border rounded-2xl p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">이용 후기 작성</h1>
            <p className="text-muted-foreground mb-8">
              베이비출장마사지 이용 경험을 공유해주세요
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 별점 */}
              <div>
                <Label className="text-base font-semibold mb-3 block">만족도</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-muted-foreground self-center">
                    {rating}점
                  </span>
                </div>
              </div>
              
              {/* 지역 */}
              <div>
                <Label htmlFor="region" className="text-base font-semibold mb-3 block">
                  이용 지역
                </Label>
                <select 
                  id="region"
                  className="w-full h-10 px-3 rounded-md border bg-background text-foreground"
                  required
                >
                  <option value="">지역을 선택하세요</option>
                  <optgroup label="서울">
                    <option value="강남구">강남구</option>
                    <option value="강동구">강동구</option>
                    <option value="강북구">강북구</option>
                    <option value="강서구">강서구</option>
                    <option value="관악구">관악구</option>
                    <option value="광진구">광진구</option>
                    <option value="구로구">구로구</option>
                    <option value="금천구">금천구</option>
                    <option value="노원구">노원구</option>
                    <option value="도봉구">도봉구</option>
                    <option value="동대문구">동대문구</option>
                    <option value="동작구">동작구</option>
                    <option value="마포구">마포구</option>
                    <option value="서대문구">서대문구</option>
                    <option value="서초구">서초구</option>
                    <option value="성동구">성동구</option>
                    <option value="성북구">성북구</option>
                    <option value="송파구">송파구</option>
                    <option value="양천구">양천구</option>
                    <option value="영등포구">영등포구</option>
                    <option value="용산구">용산구</option>
                    <option value="은평구">은평구</option>
                    <option value="종로구">종로구</option>
                    <option value="중구">중구</option>
                    <option value="중랑구">중랑구</option>
                  </optgroup>
                  <optgroup label="경기">
                    <option value="수원시">수원시</option>
                    <option value="성남시">성남시</option>
                    <option value="고양시">고양시</option>
                    <option value="용인시">용인시</option>
                    <option value="부천시">부천시</option>
                    <option value="안산시">안산시</option>
                    <option value="안양시">안양시</option>
                    <option value="남양주시">남양주시</option>
                    <option value="화성시">화성시</option>
                    <option value="평택시">평택시</option>
                    <option value="의정부시">의정부시</option>
                    <option value="시흥시">시흥시</option>
                    <option value="파주시">파주시</option>
                    <option value="김포시">김포시</option>
                    <option value="광명시">광명시</option>
                    <option value="광주시">광주시</option>
                    <option value="군포시">군포시</option>
                    <option value="하남시">하남시</option>
                    <option value="오산시">오산시</option>
                    <option value="이천시">이천시</option>
                    <option value="안성시">안성시</option>
                    <option value="의왕시">의왕시</option>
                    <option value="양주시">양주시</option>
                    <option value="포천시">포천시</option>
                    <option value="여주시">여주시</option>
                    <option value="동두천시">동두천시</option>
                    <option value="구리시">구리시</option>
                    <option value="가평군">가평군</option>
                    <option value="연천군">연천군</option>
                  </optgroup>
                  <optgroup label="인천">
                    <option value="중구">중구</option>
                    <option value="동구">동구</option>
                    <option value="미추홀구">미추홀구</option>
                    <option value="연수구">연수구</option>
                    <option value="남동구">남동구</option>
                    <option value="부평구">부평구</option>
                    <option value="계양구">계양구</option>
                    <option value="서구">서구</option>
                    <option value="강화군">강화군</option>
                    <option value="옹진군">옹진군</option>
                  </optgroup>
                </select>
              </div>
              
              {/* 이용 코스 */}
              <div>
                <Label htmlFor="course" className="text-base font-semibold mb-3 block">
                  이용 코스
                </Label>
                <select 
                  id="course"
                  className="w-full h-10 px-3 rounded-md border bg-background text-foreground"
                  required
                >
                  <option value="">코스를 선택하세요</option>
                  <option value="건식 60분">건식 60분</option>
                  <option value="건식 90분">건식 90분</option>
                  <option value="건식 120분">건식 120분</option>
                  <option value="힐링 아로마 60분">힐링 아로마 60분</option>
                  <option value="힐링 아로마 90분">힐링 아로마 90분</option>
                  <option value="힐링 아로마 120분">힐링 아로마 120분</option>
                  <option value="믹스코스 60분">믹스코스 60분</option>
                  <option value="믹스코스 90분">믹스코스 90분</option>
                  <option value="믹스코스 120분">믹스코스 120분</option>
                  <option value="믹스코스 150분">믹스코스 150분</option>
                </select>
              </div>
              
              {/* 닉네임 */}
              <div>
                <Label htmlFor="nickname" className="text-base font-semibold mb-3 block">
                  닉네임
                </Label>
                <Input 
                  id="nickname"
                  placeholder="예: 김**"
                  required
                />
              </div>
              
              {/* 제목 */}
              <div>
                <Label htmlFor="title" className="text-base font-semibold mb-3 block">
                  제목
                </Label>
                <Input 
                  id="title"
                  placeholder="후기 제목을 입력하세요"
                  required
                />
              </div>
              
              {/* 내용 */}
              <div>
                <Label htmlFor="content" className="text-base font-semibold mb-3 block">
                  내용
                </Label>
                <Textarea 
                  id="content"
                  placeholder="이용 후기를 자유롭게 작성해주세요"
                  rows={6}
                  required
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full gap-2">
                <Send className="w-4 h-4" />
                후기 등록하기
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  )
}
