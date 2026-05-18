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
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="bg-card border rounded-xl p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              post.category === "review"
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {post.category === "review" ? "이용후기" : "블로그"}
          </span>
          {post.verified && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <BadgeCheck className="w-4 h-4" />
              인증됨
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
        
        {post.rating && (
          <div className="mb-2">
            <StarRating rating={post.rating} />
          </div>
        )}
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.author}</span>
          <span>{post.createdAt}</span>
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
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
                <Button variant="outline" className="gap-2">
                  더 많은 글 보기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <div>
                <Link href="/review/write">
                  <Button className="gap-2">
                    나도 후기 남기기
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              아직 등록된 글이 없습니다.
            </p>
            <Link href="/review/write">
              <Button>첫 번째 후기 남기기</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
