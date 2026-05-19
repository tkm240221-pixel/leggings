"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, Send, Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { regions, getDistrictDisplayName, getGyeonggiCityGroups } from "@/lib/locations"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#intro", label: "소개" },
    { href: "#courses", label: "코스안내" },
    { href: "#guide", label: "이용안내" },
    { href: "#faq", label: "FAQ" },
    { href: "/blog", label: "블로그", isPage: true },
  ]

  // 경기도 시 그룹
  const gyeonggiCityGroups = getGyeonggiCityGroups()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-primary">
              레깅스출장마사지
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-primary transition-colors font-medium ${
                  link.isPage ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* 서울 드롭다운 */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("seoul")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                서울
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === "seoul" && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-4 px-6 min-w-[400px] grid grid-cols-3 gap-2 border">
                  {regions[0].districts.map((district) => (
                    <Link
                      key={district.slug}
                      href={`/seoul/${district.slug}`}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors py-1 whitespace-nowrap"
                    >
                      {getDistrictDisplayName(district.name)}출장마사지
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* 경기 드롭다운 - 계단식 */}
            <div
              className="relative"
              onMouseEnter={() => {
                setActiveDropdown("gyeonggi")
                setActiveSubDropdown(null)
              }}
              onMouseLeave={() => {
                setActiveDropdown(null)
                setActiveSubDropdown(null)
              }}
            >
              <button className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                경기
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === "gyeonggi" && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[180px] border max-h-[70vh] overflow-y-auto">
                  {gyeonggiCityGroups.map((cityGroup) => (
                    <div
                      key={cityGroup.citySlug}
                      className="relative"
                      onMouseEnter={() => setActiveSubDropdown(cityGroup.citySlug)}
                    >
                      {/* 하위 구가 여러 개인 시 (수원, 성남 등) */}
                      {cityGroup.districts.length > 1 ? (
                        <>
                          <Link
                            href={`/gyeonggi/${cityGroup.citySlug}`}
                            className="flex items-center justify-between px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/50 transition-colors"
                          >
                            <span>{cityGroup.cityName.replace("시", "")}출장마사지</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                          
                          {/* 구 서브메뉴 */}
                          {activeSubDropdown === cityGroup.citySlug && (
                            <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg py-2 min-w-[180px] border ml-1">
                              {cityGroup.districts.map((district) => (
                                <Link
                                  key={district.slug}
                                  href={`/gyeonggi/${district.slug}`}
                                  className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/50 transition-colors"
                                >
                                  {district.name.split(" ")[1]}출장마사지
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        /* 단일 시/군 */
                        <Link
                          href={`/gyeonggi/${cityGroup.districts[0].slug}`}
                          className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/50 transition-colors"
                        >
                          {getDistrictDisplayName(cityGroup.cityName)}출장마사지
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* 인천 드롭다운 */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("incheon")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                인천
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === "incheon" && (
                <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg py-4 px-6 min-w-[300px] grid grid-cols-2 gap-2 border">
                  {regions[2].districts.map((district) => (
                    <Link
                      key={district.slug}
                      href={`/incheon/${district.slug}`}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors py-1 whitespace-nowrap"
                    >
                      {getDistrictDisplayName(district.name)}출장마사지
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:010-2871-2457">
              <Button variant="outline" size="sm" className="gap-2">
                <Phone className="w-4 h-4" />
                전화문의
              </Button>
            </a>
            <a href="https://t.me/cc_9911" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="gap-2">
                <Send className="w-4 h-4" />
                텔레그램
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* 서울 */}
              <div className="border-t">
                <button
                  className="w-full px-4 py-3 text-foreground/80 hover:text-primary hover:bg-secondary transition-colors flex items-center justify-between"
                  onClick={() => setActiveDropdown(activeDropdown === "seoul" ? null : "seoul")}
                >
                  서울
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "seoul" ? "rotate-180" : ""}`} />
                </button>
                
                {activeDropdown === "seoul" && (
                  <div className="bg-secondary/30 grid grid-cols-2 gap-1 px-4 py-2">
                    {regions[0].districts.map((district) => (
                      <Link
                        key={district.slug}
                        href={`/seoul/${district.slug}`}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {getDistrictDisplayName(district.name)}출장마사지
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* 경기 - 모바일 계단식 */}
              <div className="border-t">
                <button
                  className="w-full px-4 py-3 text-foreground/80 hover:text-primary hover:bg-secondary transition-colors flex items-center justify-between"
                  onClick={() => {
                    setActiveDropdown(activeDropdown === "gyeonggi" ? null : "gyeonggi")
                    setActiveSubDropdown(null)
                  }}
                >
                  경기
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "gyeonggi" ? "rotate-180" : ""}`} />
                </button>
                
                {activeDropdown === "gyeonggi" && (
                  <div className="bg-secondary/30 py-2">
                    {gyeonggiCityGroups.map((cityGroup) => (
                      <div key={cityGroup.citySlug}>
                        {cityGroup.districts.length > 1 ? (
                          <>
                            <div className="flex items-center">
                              <Link
                                href={`/gyeonggi/${cityGroup.citySlug}`}
                                className="flex-1 px-6 py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {cityGroup.cityName.replace("시", "")}출장마사지
                              </Link>
                              <button
                                className="px-3 py-2 text-foreground/70"
                                onClick={() => setActiveSubDropdown(activeSubDropdown === cityGroup.citySlug ? null : cityGroup.citySlug)}
                              >
                                <ChevronDown className={`w-3 h-3 transition-transform ${activeSubDropdown === cityGroup.citySlug ? "rotate-180" : ""}`} />
                              </button>
                            </div>
                            
                            {activeSubDropdown === cityGroup.citySlug && (
                              <div className="bg-secondary/50 py-1">
                                {cityGroup.districts.map((district) => (
                                  <Link
                                    key={district.slug}
                                    href={`/gyeonggi/${district.slug}`}
                                    className="block px-8 py-2 text-sm text-foreground/60 hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {district.name.split(" ")[1]}출장마사지
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={`/gyeonggi/${cityGroup.districts[0].slug}`}
                            className="block px-6 py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {getDistrictDisplayName(cityGroup.cityName)}출장마사지
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* 인천 */}
              <div className="border-t">
                <button
                  className="w-full px-4 py-3 text-foreground/80 hover:text-primary hover:bg-secondary transition-colors flex items-center justify-between"
                  onClick={() => setActiveDropdown(activeDropdown === "incheon" ? null : "incheon")}
                >
                  인천
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "incheon" ? "rotate-180" : ""}`} />
                </button>
                
                {activeDropdown === "incheon" && (
                  <div className="bg-secondary/30 grid grid-cols-2 gap-1 px-4 py-2">
                    {regions[2].districts.map((district) => (
                      <Link
                        key={district.slug}
                        href={`/incheon/${district.slug}`}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {getDistrictDisplayName(district.name)}출장마사지
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 px-4 pt-4">
                <a href="tel:010-2871-2457" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    전화문의
                  </Button>
                </a>
                <a href="https://t.me/cc_9911" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="sm" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    텔레그램
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
