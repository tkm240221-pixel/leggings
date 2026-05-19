import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { regions, getRegionBySlug, getDistrictBySlug, getDistrictDisplayName, getNearbyNeighborhoods } from "@/lib/locations"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { DynamicBlogSection } from "@/components/dynamic-blog-section"
import { InlineBenefitsBanner } from "@/components/benefits-banner"
import { Button } from "@/components/ui/button"
import { Phone, Send, MapPin, Clock, Shield, Star, ChevronRight } from "lucide-react"

interface PageProps {
  params: Promise<{
    region: string
    district: string
    neighborhood: string
  }>
}

// 동적 라우트 활성화 - 모든 동 페이지를 동적으로 생성
export const dynamicParams = true

export async function generateStaticParams() {
  const params: { region: string; district: string; neighborhood: string }[] = []
  
  regions.forEach((region) => {
    region.districts.forEach((district) => {
      district.neighborhoods.forEach((neighborhood) => {
        params.push({
          region: region.slug,
          district: district.slug,
          neighborhood: neighborhood, // 인코딩 없이 원본 사용
        })
      })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: regionSlug, district: districtSlug, neighborhood: neighborhoodParam } = await params
  const region = getRegionBySlug(regionSlug)
  const district = getDistrictBySlug(regionSlug, districtSlug)
  // URL에서 온 파라미터를 안전하게 디코딩
  const neighborhood = decodeURIComponent(neighborhoodParam)
  
  if (!region || !district || !district.neighborhoods.includes(neighborhood)) {
    return { title: "페이지를 찾을 수 없습니다" }
  }
  
  // 경기도 7대 도시 구 여부 확인
  const hasGu = district.parentCity && district.name.includes("구")
  const guName = hasGu ? district.name.split(" ")[1] : null // "부천 원미구" -> "원미구"
  const isGyeonggi = region.slug === "gyeonggi"
  const districtName = getDistrictDisplayName(district.name)
  
  // 경기도 [동/읍 단위] 페이지 메타태그 공식
  // {{구}} {{동읍면}}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지
  // {{시}} {{동읍면}}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지
  if (isGyeonggi) {
    if (hasGu && guName) {
      // 7대 도시 구가 있는 동: 원미구 상동출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지
      const guDongKeyword = `${guName} ${neighborhood}`
      const canonicalUrl = `https://babyoutcallmassage.com/${region.slug}/${district.slug}/${encodeURIComponent(neighborhood)}`
      return {
        title: `${guDongKeyword}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
        description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${guDongKeyword}출장마사지 전문 브랜드, 레깅스출장마사지입니다. 30분 이내 빠른 출장, 100% 후불제.`,
        keywords: `${guDongKeyword}출장마사지, ${guDongKeyword}출장안마, ${guDongKeyword}홈타이, ${neighborhood}스웨디시, ${guName}출장마사지`,
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: `${guDongKeyword}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
          description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${guDongKeyword}출장마사지 전문 브랜드, 레깅스출장마사지입니다.`,
          url: canonicalUrl,
          images: [{ url: 'https://babyoutcallmassage.com/og-image.jpg', width: 1200, height: 630, alt: `${guDongKeyword} 출장마사지` }],
        },
      }
    } else {
      // 일반 시의 동: 파주시 조리읍출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지
      const siDongKeyword = `${districtName} ${neighborhood}`
      const canonicalUrl = `https://babyoutcallmassage.com/${region.slug}/${district.slug}/${encodeURIComponent(neighborhood)}`
      return {
        title: `${siDongKeyword}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
        description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${siDongKeyword}출장마사지 전문 브랜드, 레깅스출장마사지입니다. 30분 이내 빠른 출장, 100% 후불제.`,
        keywords: `${siDongKeyword}출장마사지, ${siDongKeyword}출장안마, ${siDongKeyword}홈타이, ${neighborhood}스웨디시, ${districtName}출장마사지`,
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: `${siDongKeyword}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
          description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${siDongKeyword}출장마사지 전문 브랜드, 레깅스출장마사지입니다.`,
          url: canonicalUrl,
          images: [{ url: 'https://babyoutcallmassage.com/og-image.jpg', width: 1200, height: 630, alt: `${siDongKeyword} 출장마사지` }],
        },
      }
    }
  }
  
  // 서울/인천 페이지: 용산구 이태원동출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지
  const fullLocationKeyword = `${district.name} ${neighborhood}`
  const canonicalUrl = `https://babyoutcallmassage.com/${region.slug}/${district.slug}/${encodeURIComponent(neighborhood)}`
  return {
    title: `${fullLocationKeyword}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
    description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${fullLocationKeyword}출장마사지 전문 브랜드, 레깅스출장마사지입니다. 30분 이내 빠른 출장, 100% 후불제.`,
    keywords: `${fullLocationKeyword}출장마사지, ${neighborhood}출장안마, ${neighborhood}스웨디시, ${neighborhood}홈타이, ${districtName}출장마사지`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${fullLocationKeyword}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
      description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${fullLocationKeyword}출장마사지 전문 브랜드, 레깅스출장마사지입니다.`,
      url: canonicalUrl,
      images: [{ url: 'https://babyoutcallmassage.com/og-image.jpg', width: 1200, height: 630, alt: `${fullLocationKeyword} 출장마사지` }],
    },
  }
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { region: regionSlug, district: districtSlug, neighborhood: neighborhoodParam } = await params
  const region = getRegionBySlug(regionSlug)
  const district = getDistrictBySlug(regionSlug, districtSlug)
  // URL에서 온 파라미터를 안전하게 디코딩
  const neighborhood = decodeURIComponent(neighborhoodParam)
  
  if (!region || !district || !district.neighborhoods.includes(neighborhood)) {
    notFound()
  }
  
  const districtName = getDistrictDisplayName(district.name)
  const nearbyAreas = getNearbyNeighborhoods(regionSlug, districtSlug, neighborhood, 15)
  
  // 7대 도시 구 명칭 처리
  const hasGu = district.parentCity && district.name.includes("구")
  const guName = hasGu ? district.name.split(" ")[1] : null // "부천 원미구" -> "원미구"
  const cityName = district.parentCity || ""
  
  // 화면 표시용 전체 지역명
  const fullLocationDisplay = hasGu 
    ? `${cityName} ${guName} ${neighborhood}` // 부천시 원미구 상동
    : `${district.name} ${neighborhood}` // 파주시 야당동
  
  // 간단 지역명 (구+동 또는 동만)
  const shortLocationDisplay = hasGu
    ? `${guName} ${neighborhood}` // 원미구 상동
    : neighborhood
  
  // 타이틀용 지역 키워드 (메타 타이틀 맨 앞과 100% 일치)
  const targetLocationKeyword = hasGu 
    ? `${guName} ${neighborhood}` // 원미구 상동
    : `${districtName} ${neighborhood}` // 파주시 조리읍

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      {/* Breadcrumb */}
      <div className="pt-20 bg-secondary/50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">홈</Link>
            <ChevronRight className="w-4 h-4" />
            {hasGu && district.parentCity && (
              <>
                <Link href={`/${region.slug}/${districtSlug.split("-")[0]}`} className="hover:text-primary">{cityName}출장마사지</Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <Link href={`/${region.slug}/${district.slug}`} className="hover:text-primary">{hasGu ? `${guName}출장마사지` : `${districtName}출장마사지`}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{neighborhood}출장마사지</span>
          </nav>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {hasGu ? `${region.name} ${cityName} ${guName} ${neighborhood}` : `${region.name} ${district.name} ${neighborhood}`}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              <span className="text-primary">{targetLocationKeyword}</span>출장마사지
            </h1>
            
            {/* 구글 로봇 매칭용 본문 첫 줄 - 타이틀 맨 앞 키워드와 100% 일치 */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 <strong>{targetLocationKeyword}출장마사지</strong> 전문 브랜드, 레깅스출장마사지입니다.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">30분 이내 출장</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">100% 후불제</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">검증된 관리사</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:010-2871-2457">
                <Button size="lg" className="gap-2 text-lg px-8 py-6">
                  <Phone className="w-5 h-5" />
                  전화 문의하기
                </Button>
              </a>
              <a href="https://t.me/cc_9911" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                  <Send className="w-5 h-5" />
                  텔레그램 상담
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
{/* About Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              {fullLocationDisplay}출장마사지 <span className="text-primary">레깅스마사지</span> 소개
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                안녕하세요, {hasGu ? `${region.name} ${cityName} ${guName} ${neighborhood}` : `${region.name} ${district.name} ${neighborhood}`} 지역 출장마사지 전문 레깅스출장마사지입니다.
              </p>
              <p className="mb-4">
                저희 레깅스출장마사지는 {fullLocationDisplay} 및 {hasGu ? `${cityName} ${guName}` : district.name} 전지역을 대상으로 24시간 프리미엄 출장안마 서비스를 제공하고 있습니다. 
                철저하게 검증된 전문 테라피스트들이 고객님의 피로와 스트레스를 해소해 드립니다.
              </p>
              <p className="mb-4">
                {fullLocationDisplay}에서 출장마사지를 찾고 계신다면 레깅스출장마사지를 선택해 주세요.
                100% 후불제로 운영되며, 전화 한 통이면 30분 이내 {shortLocationDisplay} 어디든 방문해 드립니다.
              </p>
              <p>
                선입금은 절대 받지 않으니 안심하고 이용해 주세요. 최고의 서비스로 보답하겠습니다.
              </p>
            </div>
            
            {/* 핵심 장점 배너 */}
            <InlineBenefitsBanner />
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-background p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">24시간 운영</h3>
                <p className="text-sm text-muted-foreground">언제든 연락주세요</p>
              </div>
              <div className="bg-background p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">100% 후불제</h3>
                <p className="text-sm text-muted-foreground">선입금 절대 없음</p>
              </div>
              <div className="bg-background p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">30분 이내</h3>
                <p className="text-sm text-muted-foreground">빠른 출장 서비스</p>
              </div>
              <div className="bg-background p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">검증된 관리사</h3>
                <p className="text-sm text-muted-foreground">전문 테라피스트</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {fullLocationDisplay}출장마사지 <span className="text-primary">코스 안내</span>
          </h2>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* 믹스 코스 */}
            <div>
              <h3 className="text-xl font-bold text-center mb-4">건식+힐링+풋 (믹스코스)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { time: "60분", price: "100,000원" },
                  { time: "90분", price: "120,000원", popular: true },
                  { time: "120분", price: "150,000원" },
                  { time: "150분", price: "180,000원" },
                ].map((course) => (
                  <div
                    key={course.time}
                    className={`relative p-4 rounded-xl text-center ${
                      course.popular
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border"
                    }`}
                  >
                    {course.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium">
                        인기
                      </span>
                    )}
                    <p className="text-xl font-bold mb-1">{course.time}</p>
                    <p className={course.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {course.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 힐링 아로마 코스 */}
            <div>
              <h3 className="text-xl font-bold text-center mb-4">힐링 아로마</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { time: "60분", price: "80,000원" },
                  { time: "90분", price: "100,000원" },
                  { time: "120분", price: "120,000원" },
                ].map((course) => (
                  <div key={course.time} className="p-4 rounded-xl text-center bg-card border">
                    <p className="text-xl font-bold mb-1">{course.time}</p>
                    <p className="text-muted-foreground">{course.price}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 건식 코스 */}
            <div>
              <h3 className="text-xl font-bold text-center mb-4">건식</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { time: "60분", price: "70,000원" },
                  { time: "90분", price: "90,000원" },
                  { time: "120분", price: "110,000원" },
                ].map((course) => (
                  <div key={course.time} className="p-4 rounded-xl text-center bg-card border">
                    <p className="text-xl font-bold mb-1">{course.time}</p>
                    <p className="text-muted-foreground">{course.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other Neighborhoods Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {hasGu ? `${cityName} ${guName}` : district.name} <span className="text-primary">다른 동네</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {hasGu ? `${cityName} ${guName}` : district.name} 내 모든 동네에 빠르게 출장 가능합니다
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {district.neighborhoods
              .filter((n) => n !== neighborhood)
              .map((n) => (
                <Link
                  key={n}
                  href={`/${region.slug}/${district.slug}/${encodeURIComponent(n)}`}
                  className="text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  {n}출장마사지
                </Link>
              ))}
          </div>
        </div>
      </section>
      
      {/* Other Districts in Region */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {region.name} <span className="text-primary">다른 지역</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {region.name} 전지역 출장마사지 서비스
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {region.districts
              .filter((d) => d.slug !== district.slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/${region.slug}/${d.slug}`}
                  className="bg-card hover:bg-secondary border rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors"
                >
                  {getDistrictDisplayName(d.name)}출장마사지
                </Link>
              ))}
          </div>
        </div>
      </section>
      
      {/* 인근 지역 바로가기 */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
            인근 지역 <span className="text-primary">바로가기</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {nearbyAreas.map((area) => (
              <Link
                key={area.url}
                href={area.url}
                className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors px-2 py-1"
              >
                {area.neighborhood}출장마사지
              </Link>
            ))}
          </div>
        </div>
      </section>
      
            {/* Blog Section - 동적 콘텐츠 생성 (2000자 이상 블로그 + 디시 말투 후기) */}
      <DynamicBlogSection 
        regionName={region.name}
        districtName={district.name}
        neighborhoodName={neighborhood}
        seed={`${region.slug}/${district.slug}/${neighborhood}`}
      />
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            지금 바로 예약하세요
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            {fullLocationDisplay} 30분 이내 출장
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:010-2871-2457">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                <Phone className="w-5 h-5" />
                전화 문의하기
              </Button>
            </a>
            <a href="https://t.me/cc_9911" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Send className="w-5 h-5" />
                텔레그램 상담
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingCTA />
    </div>
  )
}
