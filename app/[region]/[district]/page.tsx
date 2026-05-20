import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { regions, getRegionBySlug, getDistrictBySlug, getDistrictDisplayName, getSameCityDistricts, getChildDistricts, isCityMainPage } from "@/lib/locations"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { DynamicBlogSection } from "@/components/dynamic-blog-section"
import { InlineBenefitsBanner } from "@/components/benefits-banner"
import { DetailHero } from "@/components/detail-hero"
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

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-20 md:pb-0">
      <Header />
      
      {/* Hero Section with Image */}
      <DetailHero 
        locationBadge={hasGu ? `${region.name} ${cityName} ${guName}` : `${region.name} ${district.name}`}
        targetKeyword={targetLocationKeyword}
        description={`서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 ${targetLocationKeyword}출장마사지 전문 브랜드, 레깅스출장마사지입니다.`}
      />
      
      {/* About Section */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#E0E0E0]">
              {fullLocationDisplay}출장마사지 <span className="text-[#8B0000]">레깅스마사지</span> 소개
            </h2>
            
            <div className="prose prose-lg max-w-none text-[#A0A0A0]">
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
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-[#8B0000]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#E0E0E0]">24시간 운영</h3>
                <p className="text-sm text-[#A0A0A0]">언제든 연락주세요</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-[#8B0000]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#E0E0E0]">100% 후불제</h3>
                <p className="text-sm text-[#A0A0A0]">선입금 절대 없음</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-[#8B0000]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#E0E0E0]">30분 이내</h3>
                <p className="text-sm text-[#A0A0A0]">빠른 출장 서비스</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-[#8B0000]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#E0E0E0]">검증된 관리사</h3>
                <p className="text-sm text-[#A0A0A0]">전문 테라피스트</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Section */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#E0E0E0]">
            {fullLocationDisplay}출장마사지 <span className="text-[#8B0000]">코스 안내</span>
          </h2>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* VIP 황제코스 - Deep Burgundy Accent */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                  BEST
                </span>
              </div>
              <div className="bg-[#161616] rounded-2xl p-8 border border-[#8B0000]/50 shadow-lg shadow-[#8B0000]/10">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#E0E0E0]">
                  <span className="text-[#8B0000]">VIP 황제코스</span> (타이+힐링+풋)
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { time: "60분", price: "100,000원" },
                    { time: "90분", price: "120,000원", best: true },
                    { time: "120분", price: "150,000원" },
                    { time: "150분", price: "180,000원" },
                  ].map((course) => (
                    <div
                      key={course.time}
                      className={`relative bg-[#0A0A0A] rounded-xl p-5 md:p-7 text-center transition-all hover:scale-105 ${
                        course.best
                          ? "ring-2 ring-[#8B0000] shadow-xl shadow-[#8B0000]/20"
                          : "border border-[#2A2A2A] hover:border-[#8B0000]/50"
                      }`}
                    >
                      {course.best && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1 bg-[#8B0000] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            인기
                          </span>
                        </div>
                      )}
                      <div className="text-2xl md:text-4xl font-bold text-[#8B0000] mb-2">
                        {course.time}
                      </div>
                      <div className="text-lg md:text-2xl font-bold text-[#E0E0E0]">
                        {course.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 힐링 스웨디시 - Deep Indigo Accent */}
            <div className="bg-[#161616] rounded-2xl p-8 border border-[#4B0082]/50">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#E0E0E0]">
                <span className="text-[#4B0082]">힐링 스웨디시</span>
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { time: "60분", price: "80,000원" },
                  { time: "90분", price: "100,000원" },
                  { time: "120분", price: "120,000원" },
                ].map((course) => (
                  <div
                    key={course.time}
                    className="bg-[#0A0A0A] rounded-xl p-5 md:p-7 text-center border border-[#2A2A2A] hover:border-[#4B0082]/50 transition-all hover:scale-105"
                  >
                    <div className="text-2xl md:text-4xl font-bold text-[#4B0082] mb-2">
                      {course.time}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-[#E0E0E0]">
                      {course.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 건식 마사지 - Dark Slate Accent */}
            <div className="bg-[#161616] rounded-2xl p-8 border border-[#2F4F4F]/50">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#E0E0E0]">
                <span className="text-[#5F9F9F]">건식 마사지</span>
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { time: "60분", price: "70,000원" },
                  { time: "90분", price: "90,000원" },
                  { time: "120분", price: "110,000원" },
                ].map((course) => (
                  <div
                    key={course.time}
                    className="bg-[#0A0A0A] rounded-xl p-5 md:p-7 text-center border border-[#2A2A2A] hover:border-[#2F4F4F]/50 transition-all hover:scale-105"
                  >
                    <div className="text-2xl md:text-4xl font-bold text-[#5F9F9F] mb-2">
                      {course.time}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-[#E0E0E0]">
                      {course.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-[#A0A0A0]">
            * 출장비 별도 / 지역에 따라 추가 요금이 발생할 수 있습니다
          </p>
        </div>
      </section>
      
      {/* Child Districts Section (시 메인 페이지용 - 하위 구 목록) */}
      {isCityMain && childDistricts.length > 0 && (
        <section className="py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#E0E0E0]">
              {district.name} <span className="text-[#8B0000]">구별 출장마사지</span>
            </h2>
            <p className="text-center text-[#A0A0A0] mb-12">
              {district.name} 전 지역 빠른 출장 서비스
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {childDistricts.map((childDistrict) => (
                <Link
                  key={childDistrict.slug}
                  href={`/${region.slug}/${childDistrict.slug}`}
                  className="bg-[#0A0A0A] hover:bg-[#8B0000]/10 border border-[#2A2A2A] rounded-lg px-4 py-4 text-center font-medium transition-colors hover:border-[#8B0000] text-[#E0E0E0]"
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
        <section className="py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#E0E0E0]">
              {fullLocationDisplay} <span className="text-[#8B0000]">지역별 출장마사지</span>
            </h2>
            <p className="text-center text-[#A0A0A0] mb-12">
              {fullLocationDisplay} 내 모든 동네에 빠르게 출장 가능합니다
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {district.neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood}
                  href={`/${region.slug}/${district.slug}/${encodeURIComponent(neighborhood)}`}
                  className="text-[#8B0000] hover:text-[#A52A2A] hover:underline transition-colors"
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
        <section className="py-8 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 text-center">
            <Link
              href={`/${region.slug}/${districtSlug.split("-")[0]}`}
              className="inline-flex items-center gap-2 text-[#8B0000] hover:text-[#A52A2A] font-medium"
            >
              ← {district.parentCity} 메인 페이지로 가기
            </Link>
          </div>
        </section>
      )}
      
      {/* Same City Districts (경기도 같은 시 내 다른 구) */}
      {sameCityDistricts.length > 0 && (
        <section className="py-12 bg-[#161616]">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#E0E0E0]">
              {district.parentCity} <span className="text-[#8B0000]">다른 지역</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {sameCityDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${region.slug}/${d.slug}`}
                  className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#8B0000]/10 rounded-full text-sm font-medium transition-colors hover:text-[#8B0000] border border-[#2A2A2A] text-[#E0E0E0]"
                >
                  {d.name.split(" ")[1]}출장마사지
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Other Districts in Region */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#E0E0E0]">
            {region.name} <span className="text-[#8B0000]">다른 지역</span>
          </h2>
          <p className="text-center text-[#A0A0A0] mb-12">
            {region.name} 전지역 출장마사지 서비스
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {region.districts
              .filter((d) => d.slug !== district.slug && !d.isCityMain)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/${region.slug}/${d.slug}`}
                  className="bg-[#121212] hover:bg-[#8B0000]/10 border border-[#2A2A2A] rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors text-[#E0E0E0] hover:border-[#8B0000]"
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
      <section className="py-16 bg-[#8B0000]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            지금 바로 예약하세요
          </h2>
          <p className="text-white/80 mb-8">
            {hasGu ? `${region.name} ${cityName} ${guName}` : `${region.name} ${district.name}`} 전지역 30분 이내 출장
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:010-2871-2457">
              <Button size="lg" className="gap-2 text-lg px-8 bg-white text-[#8B0000] hover:bg-white/90">
                <Phone className="w-5 h-5" />
                전화 문의하기
              </Button>
            </a>
            <a href="https://t.me/cc_9911" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-[#8B0000]">
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
