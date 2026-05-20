"use client"

import Link from "next/link"
import { Star, BadgeCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogPost, getRecentPosts, getPostsByRegionWithFallback } from "@/lib/blog"

interface BlogSectionProps {
  regionFilter?: string
  title?: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-[#3A3A3A] text-[#3A3A3A]"
          }`}
        />
      ))}
    </div>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 h-full hover:shadow-lg hover:border-[#8B0000]/50 transition-all cursor-pointer">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              post.category === "후기"
                ? "bg-[#8B0000]/20 text-[#8B0000]"
                : "bg-[#2A2A2A] text-[#A0A0A0]"
            }`}
          >
            {post.category === "후기" ? "이용후기" : "블로그"}
          </span>
          {post.verified && (
            <span className="flex items-center gap-1 text-xs text-green-500">
              <BadgeCheck className="w-4 h-4" />
              인증됨
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-[#E0E0E0]">{post.title}</h3>
        
        {post.rating && (
          <div className="mb-2">
            <StarRating rating={post.rating} />
          </div>
        )}
        
        <p className="text-[#A0A0A0] text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-[#707070]">
          <span>{post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
        </div>
      </article>
    </Link>
  )
}

export function BlogSection({ regionFilter, title }: BlogSectionProps) {
  const posts = regionFilter 
    ? getPostsByRegionWithFallback(regionFilter, 6)
    : getRecentPosts(6)
  
  const sectionTitle = title || (regionFilter 
    ? `${regionFilter} 지역 블로그 & 후기`
    : "블로그 & 이용후기")

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E0E0E0]">
            {sectionTitle.includes("블로그") ? (
              <>블로그 & <span className="text-[#8B0000]">이용후기</span></>
            ) : (
              sectionTitle
            )}
          </h2>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto">
            실제 고객님들의 생생한 후기와 유용한 정보를 확인해보세요
          </p>
        </div>
        
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            <div className="text-center space-y-4">
              <Link href="/blog">
                <Button variant="outline" className="gap-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white">
                  더 많은 글 보기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <div>
                <Link href="/review/write">
                  <Button className="gap-2 bg-[#8B0000] hover:bg-[#A52A2A] text-white">
                    나도 후기 남기기
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#A0A0A0] mb-4">
              아직 등록된 글이 없습니다.
            </p>
            <Link href="/review/write">
              <Button className="bg-[#8B0000] hover:bg-[#A52A2A] text-white">첫 번째 후기 남기기</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
