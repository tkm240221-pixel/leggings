import Link from "next/link"
import { regions } from "@/lib/locations"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold mb-4">레깅스출장마사지</h2>
            <p className="text-background/70 text-sm leading-relaxed">
              서울 전지역 24시간 프리미엄 출장안마<br />
              100% 후불제 · 검증된 관리사 · 빠른 출장
            </p>
            <p className="text-background/50 text-xs mt-3">
              babyoutcallmassage.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">바로가기</h3>
            <nav className="space-y-2" aria-label="푸터 네비게이션">
              <Link href="#intro" className="block text-background/70 hover:text-background text-sm transition-colors">
                소개
              </Link>
              <Link href="#courses" className="block text-background/70 hover:text-background text-sm transition-colors">
                코스안내
              </Link>
              <Link href="#guide" className="block text-background/70 hover:text-background text-sm transition-colors">
                이용안내
              </Link>
              <Link href="#faq" className="block text-background/70 hover:text-background text-sm transition-colors">
                FAQ
              </Link>
              <Link href="/blog" className="block text-background/70 hover:text-background text-sm transition-colors">
                블로그/후기
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">문의하기</h3>
            <p className="text-background/70 text-sm mb-2">
              24시간 상담 가능
            </p>
            <p className="text-background/70 text-sm">
              전화 및 텔레그램으로 문의해주세요
            </p>
          </div>
        </div>

        {/* Service Areas - SEO optimized */}
        <div className="border-t border-background/20 pt-6 mb-6">
          <h3 className="font-semibold mb-4 text-center">서비스 지역</h3>
          {regions.map((region) => (
            <div key={region.slug} className="mb-4">
              <h4 className="text-sm font-medium text-background/80 mb-2">{region.name}</h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {region.districts.map((district) => (
                  <Link
                    key={district.slug}
                    href={`/${region.slug}/${district.slug}`}
                    className="text-xs text-background/60 hover:text-background transition-colors"
                  >
                    {district.name}출장마사지
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="border-t border-background/20 pt-6 mb-6">
          <p className="text-background/60 text-sm text-center">
            본 업소는 퇴폐 행위를 절대 금지하며 건전한 마사지 문화를 지향합니다.
          </p>
        </div>

        <div className="border-t border-background/20 pt-6 text-center">
          <p className="text-background/50 text-sm">
            © 2024 레깅스출장마사지 (babyoutcallmassage.com). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
