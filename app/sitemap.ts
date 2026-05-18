import { MetadataRoute } from 'next'
import { regions } from '@/lib/locations'
import { blogIndex } from '@/lib/blog-index'

const BASE_URL = 'https://babyoutcallmassage.com'

// 7대 도시 구 슬러그 (최우선 순위)
const MAJOR_CITY_GU_SLUGS = [
  // 수원시
  'suwon-jangan', 'suwon-gwonseon', 'suwon-paldal', 'suwon-yeongtong',
  // 성남시
  'seongnam-sujeong', 'seongnam-jungwon', 'seongnam-bundang',
  // 고양시
  'goyang-deokyang', 'goyang-ilsandong', 'goyang-ilsanseo',
  // 용인시
  'yongin-cheoin', 'yongin-giheung', 'yongin-suji',
  // 안산시
  'ansan-sangnok', 'ansan-danwon',
  // 안양시
  'anyang-manan', 'anyang-dongan',
  // 부천시
  'bucheon-wonmi', 'bucheon-sosa', 'bucheon-ojeong',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  
  // 메인 페이지
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/review/write`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/feed.xml`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.3,
    },
  ]
  
  // 7대 도시 구 페이지 (최우선 순위 0.95)
  const majorCityGuPages: MetadataRoute.Sitemap = []
  
  // 일반 지역(구/시) 페이지 (우선순위 0.9)
  const districtPages: MetadataRoute.Sitemap = []
  
  // 동 페이지 (우선순위 0.8)
  const neighborhoodPages: MetadataRoute.Sitemap = []
  
  regions.forEach((region) => {
    region.districts.forEach((district) => {
      const isMajorCityGu = MAJOR_CITY_GU_SLUGS.includes(district.slug)
      
      // 구/시 페이지 추가 - 7대 도시 구는 최우선
      const districtEntry = {
        url: `${BASE_URL}/${region.slug}/${district.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: isMajorCityGu ? 0.95 : 0.9,
      }
      
      if (isMajorCityGu) {
        majorCityGuPages.push(districtEntry)
      } else {
        districtPages.push(districtEntry)
      }
      
      // 동 페이지 추가 (한글 URL 퍼센트 인코딩)
      district.neighborhoods.forEach((neighborhood) => {
        neighborhoodPages.push({
          url: `${BASE_URL}/${region.slug}/${district.slug}/${encodeURIComponent(neighborhood)}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      })
    })
  })
  
  // 블로그 페이지 (새로운 영어/숫자 ID 형식)
  const blogPages: MetadataRoute.Sitemap = []
  
  blogIndex.forEach((entry) => {
    // 각 지역마다 블로그 1개 + 후기 1개
    blogPages.push({
      url: `${BASE_URL}/blog/blog-${entry.idx}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
    blogPages.push({
      url: `${BASE_URL}/blog/review-${entry.idx}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  })
  
  // 7대 도시 구 페이지가 최상단에 오도록 순서 배치
  return [
    ...mainPages,
    ...majorCityGuPages,  // 7대 도시 구 페이지 최우선
    ...districtPages,
    ...neighborhoodPages,
    ...blogPages
  ]
}
