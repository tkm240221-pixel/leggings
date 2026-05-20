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
import { getPostById, blogPosts } from "@/lib/blog"

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

// lib/blog.ts에서 가져온 포스트 처리
function getPostFromBlogTs(id: string) {
  const post = getPostById(id)
  if (!post) return null
  
  return {
    id: post.id,
    type: post.category === "후기" ? 'review' as const : 'blog' as const,
    title: post.title,
    content: post.content,
    region: post.region,
    author: post.author,
    createdAt: new Date(post.createdAt).toISOString().split('T')[0],
    category: post.category,
    fullLocationName: post.region.slice(0, 2).join(' '),
    rating: post.rating
  }
}

// blog-index.ts 기반 동적 생성 포스트 처리
function getPostFromBlogIndex(id: string) {
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

// 통합 포스트 가져오기 함수
function getPostContent(id: string) {
  // 먼저 blog.ts에서 찾기 (blog-seoul-*, review-gyeonggi-* 등)
  const blogTsPost = getPostFromBlogTs(id)
  if (blogTsPost) return blogTsPost
  
  // 없으면 blog-index.ts에서 동적 생성 (blog-1, review-1 등)
  return getPostFromBlogIndex(id)
}

export async function generateStaticParams() {
  const paths: { id: string }[] = []
  
  // blog.ts의 포스트들 (blog-seoul-*, review-gyeonggi-* 등)
  blogPosts.forEach((post) => {
    paths.push({ id: post.id })
  })
  
  // blog-index.ts의 동적 포스트들 (blog-1, review-1 등)
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
              : "fill-[#3A3A3A] text-[#3A3A3A]"
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
    <div className="min-h-screen bg-[#0A0A0A] pb-20 md:pb-0">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 뒤로가기 */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-[#8B0000] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            블로그 목록으로
          </Link>
          
          {/* 헤더 */}
          <article className="bg-[#161616] rounded-2xl border border-[#2A2A2A] p-8 md:p-12">
            {/* 카테고리 */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                post.type === 'blog' 
                  ? "bg-[#4B0082]/30 text-[#9370DB]" 
                  : "bg-[#8B0000]/30 text-[#CD5C5C]"
              }`}>
                {post.type === 'blog' ? (
                  <><BookOpen className="w-4 h-4" /> 정보 블로그</>
                ) : (
                  <><MessageSquare className="w-4 h-4" /> 이용후기</>
                )}
              </span>
              {post.type === 'review' && (
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <BadgeCheck className="w-4 h-4" />
                  인증된 후기
                </span>
              )}
            </div>
            
            {/* 제목 */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#E0E0E0] mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* 별점 (후기만) */}
            {post.type === 'review' && 'rating' in post && (
              <div className="flex items-center gap-3 mb-6">
                <StarRating rating={post.rating} />
                <span className="text-lg font-medium text-[#E0E0E0]">{post.rating}/5</span>
              </div>
            )}
            
            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#A0A0A0] mb-8 pb-8 border-b border-[#2A2A2A]">
              <span>작성자: {post.author}</span>
              <span>|</span>
              <span>{post.createdAt}</span>
              <span>|</span>
              <div className="flex gap-2">
                {post.region.map((r, i) => (
                  <span key={i} className="text-[#8B0000]">#{r}</span>
                ))}
              </div>
            </div>
            
            {/* 본문 */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-[#E0E0E0] prose-p:text-[#A0A0A0] prose-strong:text-[#E0E0E0] prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-[#2A2A2A]">
              <div className="bg-[#8B0000]/10 rounded-xl p-6 text-center border border-[#8B0000]/30">
                <p className="text-lg font-medium text-[#E0E0E0] mb-2">
                  {post.fullLocationName} 출장마사지 예약
                </p>
                <p className="text-[#A0A0A0] mb-6">
                  레깅스출장마사지 | 24시간 운영 | 100% 후불제
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:010-2871-2457">
                    <Button className="gap-2 bg-[#8B0000] hover:bg-[#A52A2A] text-white">
                      <Phone className="w-4 h-4" />
                      전화문의
                    </Button>
                  </a>
                  <a href="https://t.me/cc_9911" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2 bg-[#0088cc] text-white border-[#0088cc] hover:bg-[#0077b5]">
                      <MessageCircle className="w-4 h-4" />
                      텔레그램
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
