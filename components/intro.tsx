import { CheckCircle2, Heart, Sparkles, Users } from "lucide-react"

export function Intro() {
  const features = [
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "예약금 없는 100% 후불제",
      description: "서비스 완료 후 만족하셨을 때만 결제",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "검증된 전문 테라피스트",
      description: "정기 교육을 받은 20대 전문 관리사",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "30분 이내 빠른 출장",
      description: "서울 전지역 신속하게 방문합니다",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "투명한 운영",
      description: "불필요한 옵션, 강요 없는 정직한 서비스",
    },
  ]

  return (
    <section id="intro" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            출장마사지 <span className="text-primary">베이비마사지</span> 소개
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            출장마사지 홈타이 전문 1위 업체
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-secondary/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              💗 베이비출장마사지 – 신뢰와 만족으로 선택받는 서울 출장마사지 1위 브랜드
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              전국 출장마사지 고객 여러분, 베이비출장마사지를 찾아주셔서 진심으로 감사드립니다.
              저희는 수년간의 현장 경험과 고객 응대 노하우를 바탕으로, 서울 전지역에서 최고의 
              출장 힐링 서비스를 제공하고 있습니다.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              모든 테라피스트는 정기적인 CS 교육과 실무 테크닉 훈련을 통해, 
              매 방문마다 고객님께 최상의 만족을 드릴 수 있도록 준비되어 있습니다.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10">
            💎 왜, <span className="text-primary">베이비출장마사지</span>인가요?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-full mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">
            🙅‍♀️ 선입금 요구? 베이비에서는 절대 없습니다.
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            최근 일부 비정상적인 업체에서 선입금 사기 피해 사례가 발생하고 있습니다. 
            저희 베이비출장마사지는 고객 신뢰를 최우선으로 여기며, 
            어떠한 경우에도 예약금이나 선결제를 요구하지 않습니다.
          </p>
        </div>
      </div>
    </section>
  )
}
