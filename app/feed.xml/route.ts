import { blogPosts } from "@/lib/blog"

const SITE_URL = "https://babyoutcallmassage.com"
const SITE_TITLE = "베이비 출장마사지"
const SITE_DESCRIPTION = "전문 관리사가 선사하는 힐링 케어. 서울 전 지역 30분 내 도착. 베이비 출장마사지에서 차별화된 스웨디시와 타이 마사지를 경험하세요."

function escapeXml(text: string): string {
  if (!text) return ""
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  try {
    const posts = [...blogPosts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 50)

    const rssItems = posts
      .map((post) => {
        const pubDate = new Date(post.createdAt).toUTCString()
        const link = `${SITE_URL}/blog/${post.id}`
        const regionCategories = post.region
          .map((r) => `      <category>${escapeXml(r)}</category>`)
          .join("\n")
        
        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
${regionCategories}
      <author>${escapeXml(post.author)}</author>
    </item>`
      })
      .join("")

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${rssItems}
  </channel>
</rss>`

    return new Response(rss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch (error) {
    console.error("RSS feed generation error:", error)
    return new Response("RSS feed generation failed", { status: 500 })
  }
}
