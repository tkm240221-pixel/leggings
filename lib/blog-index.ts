// 블로그 인덱스 - 영어/숫자 ID로 지역 매핑
import { regions } from "@/lib/locations"

export interface BlogIndexEntry {
  idx: number
  regionSlug: string
  districtSlug: string
  neighborhood: string
  regionName: string
  districtName: string
  seed: string
}

// 모든 지역을 인덱스로 매핑 (한 번만 생성)
function buildBlogIndex(): BlogIndexEntry[] {
  const entries: BlogIndexEntry[] = []
  let idx = 1
  
  regions.forEach((region) => {
    region.districts.forEach((district) => {
      if (district.isCityMain) return
      
      district.neighborhoods.forEach((neighborhood) => {
        entries.push({
          idx,
          regionSlug: region.slug,
          districtSlug: district.slug,
          neighborhood,
          regionName: region.name,
          districtName: district.name,
          seed: `${region.slug}/${district.slug}/${neighborhood}`
        })
        idx++
      })
    })
  })
  
  return entries
}

export const blogIndex = buildBlogIndex()

// 인덱스로 지역 찾기
export function getEntryByIdx(idx: number): BlogIndexEntry | undefined {
  return blogIndex.find(e => e.idx === idx)
}

// ID 생성 (영어/숫자만)
export function makeBlogId(idx: number): string {
  return `blog-${idx}`
}

export function makeReviewId(idx: number): string {
  return `review-${idx}`
}

// ID에서 인덱스 추출
export function parseId(id: string): { type: 'blog' | 'review', idx: number } | null {
  if (id.startsWith('blog-')) {
    const idx = parseInt(id.slice(5))
    if (!isNaN(idx)) return { type: 'blog', idx }
  } else if (id.startsWith('review-')) {
    const idx = parseInt(id.slice(7))
    if (!isNaN(idx)) return { type: 'review', idx }
  }
  return null
}
