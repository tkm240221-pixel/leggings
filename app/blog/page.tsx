"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Star, BadgeCheck, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { Button } from "@/components/ui/button"
import { generateBlogContent, generateReviews, getFullLocationName } from "@/lib/dynamic-content"
import { blogIndex, makeBlogId, makeReviewId } from "@/lib/blog-index"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

// 모든 블로그/후기 생성 (영어/숫자 ID 사용)
function generateAllBlogs() {
  const blogs: Array<{
    id: string
    title: string
    excerpt: string
    category: "블로그" | "후기"
    region: string[]
    author: string
    createdAt: string
    rating?: number
    verified?: boolean
    fullLocationName: string
  }> = []

  blogIndex.forEach((entry) => {
    const fullLocationName = getFullLocationName(entry.regionName, entry.districtName, entry.neighborhood)
    const blogContent = generateBlogContent(fullLocationName, entry.seed)
    const reviews = generateReviews(fullLocationName, entry.seed, 1)
    
    // 블로그 (영어/숫자 ID)
    blogs.push({
      id: makeBlogId(entry.idx),
      title: blogContent.title,
      excerpt: blogContent.content.replace(/<[^>]*>/g, '').slice(0, 150) + "...",
      category: "블로그",
      region: [entry.regionName, entry.districtName, entry.neighborhood],
      author: "베이비 에디터",
      createdAt: `2024-${String((hashString(entry.seed) % 12) + 1).padStart(2, '0')}-${String((hashString(entry.seed) % 28) + 1).padStart(2, '0')}`,
      fullLocationName
    })
    
    // 후기 (영어/숫자 ID)
    if (reviews[0]) {
      blogs.push({
        id: makeReviewId(entry.idx),
        title: reviews[0].title,
        excerpt: reviews[0].content.replace(/<[^>]*>/g, '').slice(0, 150) + "...",
        category: "후기",
        region: [entry.regionName, entry.districtName, entry.neighborhood],
        author: reviews[0].author,
        createdAt: reviews[0].date,
        rating: reviews[0].rating,
        verified: hashString(entry.seed + "verified") % 3 === 0,
        fullLocationName
      })
    }
  })
  
  return blogs
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<"전체" | "블로그" | "후기">("전체")
  const [selectedRegion, setSelectedRegion] = useState<string>("전체")
  
  const allBlogs = useMemo(() => generateAllBlogs(), [])
  
  const filteredBlogs = useMemo(() => {
    return allBlogs.filter(blog => {
      const categoryMatch = selectedCategory === "전체" || 
        (selectedCategory === "블로그" && blog.category === "블로그") ||
        (selectedCategory === "후기" && blog.category === "후기")
      
      const regionMatch = selectedRegion === "전체" || blog.region[0] === selectedRegion
      
      return categoryMatch && regionMatch
    })
  }, [allBlogs, selectedCategory, selectedRegion])

  const blogCount = allBlogs.filter(b => b.category === "블로그").length
  const reviewCount = allBlogs.filter(b => b.category === "후기").length

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              베이비출장마사지 블로그
            </h1>
            <p className="text-muted-foreground">
              마사지 정보와 실제 이용 후기를 확인하세요
            </p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <span className="text-primary font-medium">정보 블로그: {blogCount}개</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-primary font-medium">이용후기: {reviewCount}개</span>
            </div>
          </div>
          
          {/* 필터 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex gap-2">
              {["전체", "블로그", "후기"].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat as typeof selectedCategory)}
                >
                  {cat === "블로그" ? "정보 블로그" : cat === "후기" ? "이용후기" : cat}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              {["전체", "서울", "경기", "인천"].map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region === "전체" ? "전체" : region)}
                >
                  {region === "전체" ? "전체지역" : region}
                </Button>
              ))}
            </div>
          </div>
          
          {/* 블로그 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.slice(0, 30).map((blog) => (
              <Link 
                key={blog.id} 
                href={`/blog/${blog.id}`}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* 카테고리 배지 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      blog.category === "블로그" 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-pink-100 text-pink-700"
                    }`}>
                      {blog.category === "블로그" ? "정보 블로그" : "이용후기"}
                    </span>
                    {blog.verified && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <BadgeCheck className="w-3 h-3" />
                        인증됨
                      </span>
                    )}
                  </div>
                  
                  {/* 제목 */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  
                  {/* 별점 (후기만) */}
                  {blog.rating && (
                    <div className="mb-2">
                      <StarRating rating={blog.rating} />
                    </div>
                  )}
                  
                  {/* 요약 */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{blog.region.join(' ')}</span>
                    </div>
                    <span>{blog.createdAt}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* 더보기 안내 */}
          {filteredBlogs.length > 30 && (
            <div className="text-center mt-8">
              <p className="text-muted-foreground text-sm">
                총 {filteredBlogs.length}개 중 30개 표시 중
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  )
}
