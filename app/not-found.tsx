import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            아래 버튼을 클릭하여 메인 페이지로 이동해 주세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              메인으로 가기
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-full hover:bg-secondary/80 transition-colors"
            >
              블로그 보기
            </Link>
          </div>
          
          <div className="mt-12 p-6 bg-card rounded-lg max-w-lg mx-auto">
            <h3 className="font-bold text-foreground mb-2">문의가 필요하신가요?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              24시간 상담 가능합니다
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="tel:010-2871-2457"
                className="text-primary hover:underline text-sm"
              >
                전화 문의하기
              </a>
              <a
                href="https://t.me/cc_9911"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                텔레그램 상담
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
