"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "거리가 멀어도 출장 가능한가요?",
      answer:
        "베이비마사지는 서울, 경기, 인천 및 전지역 출장 가능한 출장안마 업체입니다. 원하시는 곳 어디든 출장 가능하며, 거리에 따라 시간은 조금 더 소요될 수 있는 점 참고 부탁드립니다. 전화 문의 시 계신 곳을 정확하게 말씀 주셔야 미리 준비가 가능합니다. 계신 곳 어디든 최대한 빠른 시간 안에 도착하여 고객님께 프라이빗하고 편안한 힐링 타임을 선사해드리겠습니다.",
    },
    {
      question: "예약비나 출장비를 미리 내야하나요?",
      answer:
        "출장안마 이용 시에는 꼭 피해야 할 업체가 있습니다. 바로 온갖 핑계를 대며 선입금을 요구하는 업체입니다. 이러한 업체는 절대 이용하지 마시고, 선입금 일체 요구하지 않는 베이비마사지를 통해 즐거운 시간을 보내시기 바랍니다. 베이비마사지는 관리사님께 모든 관리를 받고 난 후 결제 진행하는 후불제 방식입니다.",
    },
    {
      question: "관리사는 믿을만 한가요?",
      answer:
        "네, 관리사 모두 주기적으로 전문 교육을 받고 있는 20대 관리사들입니다. 교육 및 각자 개인 관리를 철저히 하고 있기 때문에 믿고 이용해주시면 됩니다. 타업체에서 내상 입고 반신반의하며 문의주신 분들 결국 모두 저희 단골이 되셨습니다. 계신곳이 어디든 전화만 주시면 30분 이내로 빠르게 방문합니다. 베이비마사지는 시간약속을 철저히 지킵니다.",
    },
    {
      question: "영업 시간은 어떻게 되나요?",
      answer:
        "베이비마사지는 24시간 연중무휴로 운영됩니다. 새벽이든 주말이든 언제든지 편하게 연락 주시면 상담 후 바로 출장 가능합니다.",
    },
    {
      question: "어떤 마사지 코스가 있나요?",
      answer:
        "타이마사지, 아로마마사지, 스웨디시, 시그니처 코스 등 다양한 마사지 코스를 제공하고 있습니다. 상담 시 고객님의 컨디션과 원하시는 스타일에 맞춰 추천해 드립니다.",
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            자주 묻는 질문 <span className="text-primary">FAQ</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            베이비마사지 자주 묻는 질문들
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  Q. {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  A. {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 bg-secondary/50 rounded-2xl p-8 max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            * 고객님들께 맞춤서비스를 최대한 진행하오나, 맹목적인 서비스는 지양하고 있습니다.<br />
            * 폭언 및 폭행, 불법적인 촬영 등은 일절 불가하며, 저희 업소는 불법 퇴폐안마가 아님을 알려드립니다.<br />
            * 저희 관리사들에게 최소한의 매너를 지켜주신다면, 고객님께 더 나은 서비스로 보답드립니다.
          </p>
        </div>
      </div>
    </section>
  )
}
