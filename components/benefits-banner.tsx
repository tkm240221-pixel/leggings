import { Shield, Users, Clock, CreditCard, BadgeCheck, Heart } from "lucide-react"

const benefits = [
  {
    icon: CreditCard,
    title: "100% 후불제",
    description: "선입금 없이 서비스 후 결제",
  },
  {
    icon: Users,
    title: "20대 전문 관리사",
    description: "검증된 젊은 테라피스트",
  },
  {
    icon: Clock,
    title: "30분 내 방문",
    description: "빠른 출장 서비스",
  },
  {
    icon: Shield,
    title: "내상 제로",
    description: "철저한 관리사 교육",
  },
  {
    icon: BadgeCheck,
    title: "프라이버시 보장",
    description: "고객 정보 철저 보호",
  },
  {
    icon: Heart,
    title: "24시간 운영",
    description: "언제든 이용 가능",
  },
]

export function BenefitsBanner() {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="sr-only">베이비출장마사지 핵심 장점</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center p-4 bg-primary-foreground/10 rounded-xl backdrop-blur-sm"
            >
              <benefit.icon className="w-8 h-8 text-primary-foreground mb-2" />
              <h3 className="font-bold text-primary-foreground text-sm mb-1">
                {benefit.title}
              </h3>
              <p className="text-primary-foreground/70 text-xs">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 간단한 인라인 배너 버전 (페이지 중간에 사용)
export function InlineBenefitsBanner() {
  return (
    <div className="bg-accent/30 border border-accent rounded-xl p-6 my-8">
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          <span className="font-medium">100% 후불제</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-medium">20대 전문 관리사</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <span className="font-medium">30분 내 방문</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-medium">내상 제로</span>
        </div>
      </div>
    </div>
  )
}
