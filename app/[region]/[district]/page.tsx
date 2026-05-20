import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { regions, getRegionBySlug, getDistrictBySlug, getDistrictDisplayName, getSameCityDistricts, getChildDistricts, isCityMainPage } from "@/lib/locations"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { DynamicBlogSection } from "@/components/dynamic-blog-section"
import { InlineBenefitsBanner } from "@/components/benefits-banner"
import { Button } from "@/components/ui/button"
import { Phone, Send, MapPin, Clock, Shield, Star } from "lucide-react"

interface PageProps {
  params: Promise<{
    region: string
    district: string
  }>
}

// 동적 라우트 활성화
export const dynamicParams = true

export async function generateStaticParams() {
  const params: { region: string; district: string }[] = []
  
  regions.forEach((region) => {
    region.districts.forEach((district) => {
      params.push({
        region: region.slug,
        district: district.slug,
      })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: regionSlug, district: districtSlug } = await params
  const region = getRegionBySlug(regionSlug)
  const district = getDistrictBySlug(regionSlug, districtSlug)
  
  if (!region || !district) {
    return { title: "페이지를 찾을 수 없습니다" }
  }
  
  const districtName = getDistrictDisplayName(district.name)
  
  // 경기도 7대 도시 구 여부 확인
  const hasGu = district.parentCity && district.name.includes("구")
  const guName = hasGu ? district.name.split(" ")[1] : null // "부천 원미구" -> "원미구"
  const isGyeonggi = region.slug === "gyeonggi"
  
  // 경기도 메타태그 공식: {{지역}}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지
  if (isGyeonggi) {
    if (hasGu && guName) {
      // [구 단위] 페이지
      return {
        title: `${guName}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
        description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${guName}출장마사지 전문 브랜드, 레깅스출장마사지입니다. 30분 이내 빠른 출장, 100% 후불제.`,
        keywords: `${guName}출장마사지, ${guName}출장안마, ${guName}홈타이, ${guName}스웨디시, ${district.parentCity}출장마사지`,
        alternates: {
          canonical: `https://babyoutcallmassage.com/${region.slug}/${district.slug}`,
        },
        openGraph: {
          title: `${guName}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
          description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${guName}출장마사지 전문 브랜드, 레깅스출장마사지입니다.`,
          url: `https://babyoutcallmassage.com/${region.slug}/${district.slug}`,
        },
      }
    } else {
      // [시 단위] 페이지
      return {
        title: `${districtName}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
        description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${districtName}출장마사지 전문 브랜드, 레깅스출장마사지입니다. 30분 이내 빠른 출장, 100% 후불제.`,
        keywords: `${districtName}출장마사지, ${districtName}출장안마, ${districtName}홈타이, ${districtName}스웨디시`,
        alternates: {
          canonical: `https://babyoutcallmassage.com/${region.slug}/${district.slug}`,
        },
        openGraph: {
          title: `${districtName}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
          description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${districtName}출장마사지 전문 브랜드, 레깅스출장마사지입니다.`,
          url: `https://babyoutcallmassage.com/${region.slug}/${district.slug}`,
        },
      }
    }
  }
  
  // 서울/인천 페이지
  return {
    title: `${districtName}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
    description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${districtName}출장마사지 전문 브랜드, 레깅스출장마사지입니다. 30분 이내 빠른 출장, 100% 후불제.`,
    keywords: `${districtName}출장마사지, ${districtName}출장안마, ${districtName}스웨디시, ${districtName}홈타이`,
    alternates: {
      canonical: `https://babyoutcallmassage.com/${region.slug}/${district.slug}`,
    },
    openGraph: {
      title: `${districtName}출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지`,
      description: `서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${districtName}출장마사지 전문 브랜드, 레깅스출장마사지입니다.`,
      url: `https://babyoutcallmassage.com/${region.slug}/${district.slug}`,
    },
  }
}

export default async function DistrictPage({ params }: PageProps) {
  const { region: regionSlug, district: districtSlug } = await params
  const region = getRegionBySlug(regionSlug)
  const district = getDistrictBySlug(regionSlug, districtSlug)
  
  if (!region || !district) {
    notFound()
  }
  
  const districtName = getDistrictDisplayName(district.name)
  const sameCityDistricts = getSameCityDistricts(regionSlug, districtSlug)
  const isCityMain = isCityMainPage(regionSlug, districtSlug)
  const childDistricts = isCityMain ? getChildDistricts(regionSlug, districtSlug) : []
  
  // 7대 도시 구 명칭 처리
  const hasGu = district.parentCity && district.name.includes("구")
  const guName = hasGu ? district.name.split(" ")[1] : null // "부천 원미구" -> "원미구"
  const cityName = district.parentCity || ""
  
  // 화면 표시용 전체 지역명
  const fullLocationDisplay = hasGu 
    ? `${cityName} ${guName}` // 부천시 원미구
    : districtName // 파주시
  
  // 타이틀용 지역 키워드 (메타 타이틀 맨 앞과 100% 일치)
  const targetLocationKeyword = hasGu ? guName : districtName

  // 페이지별 이미지 필터 변화 (밝기/대비를 slug 기반으로 미세 조정)
  const getImageFilter = (slug: string) => {
    const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const brightness = 0.9 + (hash % 20) / 100 // 0.90 ~ 1.09
    const contrast = 0.95 + (hash % 15) / 100 // 0.95 ~ 1.09
    return `brightness(${brightness}) contrast(${contrast})`
  }
  const imageFilter = getImageFilter(districtSlug)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative pt-24 pb-16 min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://i.ibb.co/v4pB1x5r/image.jpg')",
            filter: imageFilter
          }}
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <MapPin className="w-4 h-4" />
              {hasGu ? `${region.name} ${cityName} ${guName}` : `${region.name} ${district.name}`}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
              <span className="text-primary">{targetLocationKeyword}</span>출장마사지
            </h1>
            
            {/* 구글 로봇 매칭용 본문 첫 줄 - 타이틀 맨 앞 키워드와 100% 일치 */}
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 <strong className="text-white">{targetLocationKeyword}출장마사지</strong> 전문 브랜드, 레깅스출장마사지입니다.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">30분 이내 출장</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">100% 후불제</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">검증된 관리사</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              <span className="text-primary">{targetLocationKeyword}</span>출장마사지
            </h1>
            
            {/* 구글 로봇 매칭용 본문 첫 줄 - 타이틀 맨 앞 키워드와 100% 일치 */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 <strong>{targetLocationKeyword}출장마사지</strong> 전문 브��드, 레깅스출장마사지입니다.
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
                안녕하세요, {hasGu ? `${region.name} ${cityName} ${guName}` : `${region.name} ${district.name}`} 지역 출장마사지 전문 레깅스출장마사지입니다.
              </p>
              <p className="mb-4">
                저희 레깅스출장마사지는 {fullLocationDisplay} 전지역을 대상으로 24시간 프리미엄 출장안마 서비스를 제공하고 있습니다. 
                철저하게 검증된 전문 테라피스트들이 고객님의 피로와 스트레스를 해소해 드립니다.
              </p>
              <p>
                100% 후불제로 운영되며, 전화 한 통이면 30분 이내 {fullLocationDisplay} 어디든 방문해 드립니다. 
                선입금은 절대 받지 않으니 안심하고 이용해 주세요.
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
      
      {/* Child Districts Section (시 메인 페이지용 - 하위 �� 목록) */}
      {isCityMain && childDistricts.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {district.name} <span className="text-primary">구별 출장마사지</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              {district.name} 전 지역 빠른 출장 서비스
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {childDistricts.map((childDistrict) => (
                <Link
                  key={childDistrict.slug}
                  href={`/${region.slug}/${childDistrict.slug}`}
                  className="bg-background hover:bg-primary/10 border rounded-lg px-4 py-4 text-center font-medium transition-colors hover:border-primary"
                >
                  {childDistrict.name.split(" ")[1]}출장마사지
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Neighborhoods Section (일반 구 페이지용) */}
      {!isCityMain && district.neighborhoods.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {fullLocationDisplay} <span className="text-primary">지역별 출장마사지</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              {fullLocationDisplay} 내 모든 동네에 빠르게 출장 가능합니다
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {district.neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood}
                  href={`/${region.slug}/${district.slug}/${encodeURIComponent(neighborhood)}`}
                  className="text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  {neighborhood}출장마사지
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* 상위 시 페이지로 가기 (구 페이지용) */}
      {district.parentCity && (
        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <Link
              href={`/${region.slug}/${districtSlug.split("-")[0]}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              ← {district.parentCity} 메인 페이지로 가기
            </Link>
          </div>
        </section>
      )}
      
      {/* Same City Districts (경기도 같은 시 내 다른 구) */}
      {sameCityDistricts.length > 0 && (
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
              {district.parentCity} <span className="text-primary">다른 지역</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {sameCityDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${region.slug}/${d.slug}`}
                  className="px-4 py-2 bg-card hover:bg-primary/10 rounded-full text-sm font-medium transition-colors hover:text-primary border"
                >
                  {d.name.split(" ")[1]}출장마사지
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
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
              .filter((d) => d.slug !== district.slug && !d.isCityMain)
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
      
      {/* Blog Section - 동적 콘텐츠 생성 (2000자 이상 블로그 + 디시 말투 후기) */}
      <DynamicBlogSection 
        regionName={region.name}
        districtName={district.name}
        neighborhoodName={targetLocationKeyword}
        seed={`${region.slug}/${district.slug}`}
      />
      
{/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            지금 바로 예약하세요
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            {hasGu ? `${region.name} ${cityName} ${guName}` : `${region.name} ${district.name}`} 전지역 30분 이내 출장
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
