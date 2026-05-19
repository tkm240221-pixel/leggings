import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, BadgeCheck, ArrowLeft, Phone, MessageCircle, BookOpen, MessageSquare } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { Button } from "@/components/ui/button"
import { generateBlogContent, generateReviews, getFullLocationName } from "@/lib/dynamic-content"
import { blogIndex, parseId, getEntryByIdx } from "@/lib/blog-index"

export const dynamicParams = true

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

function getPostContent(id: string) {
  const parsed = parseId(id)
  if (!parsed) return null
  
  const entry = getEntryByIdx(parsed.idx)
  if (!entry) return null
  
  const fullLocationName = getFullLocationName(entry.regionName, entry.districtName, entry.neighborhood)
  
  if (parsed.type === 'blog') {
    const blogContent = generateBlogContent(fullLocationName, entry.seed)
    return {
      id,
      type: 'blog' as const,
      title: blogContent.title,
      content: blogContent.content,
      region: [entry.regionName, entry.districtName, entry.neighborhood],
      author: "레깅스 에디터",
      createdAt: `2024-${String((hashString(entry.seed) % 12) + 1).padStart(2, '0')}-${String((hashString(entry.seed) % 28) + 1).padStart(2, '0')}`,
      category: "블로그" as const,
      fullLocationName
    }
  } else {
    const reviews = generateReviews(fullLocationName, entry.seed, 1)
    if (!reviews[0]) return null
    
    return {
      id,
      type: 'review' as const,
      title: reviews[0].title,
      content: reviews[0].content,
      region: [entry.regionName, entry.districtName, entry.neighborhood],
      author: reviews[0].author,
      createdAt: reviews[0].date,
      category: "후기" as const,
      fullLocationName,
      rating: reviews[0].rating
    }
  }
}

export async function generateStaticParams() {
  const paths: { id: string }[] = []
  
  blogIndex.forEach((entry) => {
    paths.push({ id: `blog-${entry.idx}` })
    paths.push({ id: `review-${entry.idx}` })
  })
  
  return paths
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = getPostContent(id)
  
  if (!post) {
    return { title: "페이지를 찾을 수 없습니다" }
  }
  
  return {
    title: `${post.title} | 레깅스출장마사지`,
    description: post.content.replace(/<[^>]*>/g, '').slice(0, 160),
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getPostContent(id)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 뒤로가기 */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            블로그 목록으로
          </Link>
          
          {/* 헤더 */}
          <article className="bg-card rounded-2xl border border-border p-8 md:p-12">
            {/* 카테고리 */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                post.type === 'blog' 
                  ? "bg-blue-100 text-blue-700" 
                  : "bg-pink-100 text-pink-700"
              }`}>
                {post.type === 'blog' ? (
                  <><BookOpen className="w-4 h-4" /> 정보 블로그</>
                ) : (
                  <><MessageSquare className="w-4 h-4" /> 이용후기</>
                )}
              </span>
              {post.type === 'review' && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <BadgeCheck className="w-4 h-4" />
                  인증된 후기
                </span>
              )}
            </div>
            
            {/* 제목 */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* 별점 (후기만) */}
            {post.type === 'review' && 'rating' in post && (
              <div className="flex items-center gap-3 mb-6">
                <StarRating rating={post.rating} />
                <span className="text-lg font-medium text-foreground">{post.rating}/5</span>
              </div>
            )}
            
            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span>작성자: {post.author}</span>
              <span>|</span>
              <span>{post.createdAt}</span>
              <span>|</span>
              <div className="flex gap-2">
                {post.region.map((r, i) => (
                  <span key={i} className="text-primary">#{r}</span>
                ))}
              </div>
            </div>
            
            {/* 본문 */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="bg-primary/5 rounded-xl p-6 text-center">
                <p className="text-lg font-medium text-foreground mb-2">
                  {post.fullLocationName} 출장마사지 예약
                </p>
                <p className="text-muted-foreground mb-6">
                  레깅스출장마사지 | 24시간 운영 | 100% 후불제
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:010-5765-9956">
                    <Button className="gap-2">
                      <Phone className="w-4 h-4" />
                      전화문의
                    </Button>
                  </a>
                  <a href="http://pf.kakao.com/_CYGdn/chat" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2 bg-[#FEE500] text-[#191919] border-[#FEE500] hover:bg-[#FEE500]/90">
                      <MessageCircle className="w-4 h-4" />
                      카톡상담
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  )
}
