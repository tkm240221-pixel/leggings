import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지',
  description: '서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 출장마사지 전문 브랜드, 레깅스출장마사지입니다. 30분 내 도착, 100% 후불제.',
  keywords: '출장마사지, 출장안마, 홈타이, 24시홈타이안마, 레깅스출장마사지, 서울출장마사지, 경기출장마사지, 인천출장마사지',
  metadataBase: new URL('https://babyoutcallmassage.com'),
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.png', color: '#8B0000' },
    ],
  },
  alternates: {
    canonical: 'https://babyoutcallmassage.com',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  verification: {
    other: {
      'naver-site-verification': 'd82e6a67b6415c87e3923b0f1ff049009b40dd52',
    },
  },
  openGraph: {
    title: '출장마사지 | 프리미엄 24시홈타이안마 | 레깅스출장마사지',
    description: '서울/인천/경기 수도권 전 지역 언제 어디서나 편안하게 이용하는 출장마사지 전문 브랜드, 레깅스출장마사지입니다.',
    url: 'https://babyoutcallmassage.com',
    siteName: '레깅스출장마사지',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="bg-background">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
