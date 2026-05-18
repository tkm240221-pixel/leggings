import { Search, FileText, PhoneCall, MapPin, Sparkles } from "lucide-react"

export function Guide() {
  const steps = [
    {
      step: 1,
      icon: <Search className="w-6 h-6" />,
      title: "홈페이지 접속",
      description: "PC나 모바일에서 '베이비마사지'를 검색하고 홈페이지에 접속합니다.",
    },
    {
      step: 2,
      icon: <FileText className="w-6 h-6" />,
      title: "정보 확인",
      description: "소개, 코스, 자주 묻는 질문 등을 읽어보시고 추가 문의사항이 있는지 확인합니다.",
    },
    {
      step: 3,
      icon: <PhoneCall className="w-6 h-6" />,
      title: "상담 문의",
      description: "전화문의 또는 텔레그램 버튼을 눌러 24시간 친절 상담원과 상담합니다. 서비스 원하시는 시간에서 최소 30분 이전에 연락주시는 것이 좋습니다.",
    },
    {
      step: 4,
      icon: <MapPin className="w-6 h-6" />,
      title: "예약 확정",
      description: "약속 시간과 정확한 장소, 연락처를 알려주세요. 교통상황 등으로 지연될 경우 미리 안내드립니다.",
    },
    {
      step: 5,
      icon: <Sparkles className="w-6 h-6" />,
      title: "서비스 이용",
      description: "약속된 시간과 장소에 20대 미녀 관리사가 도착하여 주문하신 코스로 서비스를 받으시면 됩니다.",
    },
  ]

  return (
    <section id="guide" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            베이비마사지 <span className="text-primary">이용 안내</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            간단한 5단계로 프리미엄 출장마사지를 이용하세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block" />

            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 mb-8 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all md:w-[calc(50%-3rem)] ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-lg text-foreground">
                      STEP {step.step}. {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6 max-w-2xl mx-auto text-center">
          <p className="text-foreground font-medium">
            ※ 베이비마사지는 예약금 등의 명목으로 선입금을 일절 요구하지 않습니다.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            유의해주세요.
          </p>
        </div>
      </div>
    </section>
  )
}
