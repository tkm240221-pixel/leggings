// 동적 콘텐츠 생성 시스템 V3 - 지역별 100% 고유 콘텐츠 생성
// 각 동네마다 도입부, 본문, 메타데이터가 완전히 다르게 생성됨

// ==================== 0. 지역별 고유 메타/인트로 생성 ====================
// 지역 특성 형용사 뱅크
const locationAdjectives = [
  "활기찬", "조용한", "편리한", "깨끗한", "현대적인", "고급스러운", "쾌적한", "아늑한",
  "트렌디한", "세련된", "번화한", "평화로운", "발전하는", "역동적인", "아름다운"
]

// 서비스 장점 뱅크
const serviceAdvantages = [
  "30분 내 신속 출장", "100% 후불제 안심 결제", "24시간 연중무휴", "전문 교육 이수 관리사",
  "위생적인 1회용 시트 사용", "프리미엄 아로마 오일", "맞춤형 코스 추천", "친절한 상담"
]

// 신뢰 키워드 뱅크
const trustKeywords = [
  "검증된 실력", "내상 없는 안전한 서비스", "고객 만족도 1위", "단골 고객 다수",
  "정직한 가격", "투명한 운영", "프로페셔널한 관리", "최상의 힐링"
]

// 지역별 고유 메타 description 생성 (150-160자)
export function generateMetaDescription(locationName: string, seed: string): string {
  const hash = hashString(seed + locationName + "meta")
  const random = seededRandom(hash)
  
  const adj = pickRandom(locationAdjectives, random)
  const adv1 = pickRandom(serviceAdvantages, random)
  const adv2 = pickRandom(serviceAdvantages.filter(a => a !== adv1), random)
  const trust = pickRandom(trustKeywords, random)
  
  // 150-160자 맞춤 템플릿 (다양한 패턴)
  const templates = [
    `${adj} ${locationName}에서 프리미엄 출장마사지를 경험하세요. ${adv1}, ${adv2}. ${trust}의 레깅스출장마사지가 직접 방문합니다.`,
    `${locationName}출장마사지 전문 브랜드 레깅스. ${adv1}과 ${adv2}로 ${trust}을 약속합니다. ${adj} ${locationName} 어디서든 힐링하세요.`,
    `대한민국 대표 ${locationName}출장안마. ${adj} 동네 어디서나 ${adv1}. ${trust}와 ${adv2}를 자랑하는 레깅스출장마사지입니다.`,
    `${locationName} 프리미엄 홈타이 레깅스출장마사지. ${adv1}, ${adv2}. ${adj} ${locationName}에서 ${trust}의 힐링을 만나보세요.`
  ]
  
  const description = pickRandom(templates, random)
  // 160자 초과시 자르기
  return description.length > 160 ? description.slice(0, 157) + "..." : description
}

// 지역별 고유 히어로 description 생성
export function generateHeroDescription(locationName: string, seed: string): string {
  const hash = hashString(seed + locationName + "hero")
  const random = seededRandom(hash)
  
  const adj = pickRandom(locationAdjectives, random)
  const adv = pickRandom(serviceAdvantages, random)
  const trust = pickRandom(trustKeywords, random)
  
  const templates = [
    `대한민국 대표 프리미엄 ${locationName}출장마사지. ${adj} ${locationName} 어디서나 30분 내 즉시 방문하여 최상의 테라피를 선사하는 레깅스출장마사지입니다.`,
    `${adj} ${locationName}에서 편안하게 즐기는 프리미엄 출장안마. ${adv}로 ${trust}을 약속드립니다. 레깅스출장마사지와 함께하세요.`,
    `${locationName} 전지역 24시간 프리미엄 출장서비스. ${adj} 동네 어디서든 30분 이내 방문, ${trust}의 레깅스출장마사지입니다.`
  ]
  
  return pickRandom(templates, random)
}

// ==================== 1. 해시 기반 랜덤 시드 생성 ====================
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
}

// 배열 셔플 (시드 기반)
function shuffleArray<T>(array: T[], random: () => number): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 랜덤 선택 (시드 기반)
function pickRandom<T>(array: T[], random: () => number): T {
  return array[Math.floor(random() * array.length)]
}

// 여러 개 랜덤 선택 (시드 기반, 중복 없음)
function pickMultiple<T>(array: T[], count: number, random: () => number): T[] {
  const shuffled = shuffleArray(array, random)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// ==================== 2. 블로그 문장 조각 데이터베이스 ====================
const blogIntros = [
  "현대인의 바쁜 일상 속에서 건강 관리는 선택이 아닌 필수가 되었습니다.",
  "스트레스와 피로가 누적되면 우리 몸은 다양한 신호를 보냅니다.",
  "건강한 삶을 위해서는 정기적인 관리가 필수적입니다.",
  "요즘 많은 분들이 건강 관리의 중요성을 깨닫고 계십니다.",
  "몸과 마음의 균형을 유지하는 것은 삶의 질을 높이는 핵심입니다.",
  "일상에서 쌓인 피로를 해소하는 방법을 찾고 계신가요?",
  "건강한 라이프스타일을 위한 첫걸음은 자기 관리입니다.",
  "현대 사회에서 스트레스 관리는 필수 생존 스킬이 되었습니다.",
  "우리 몸은 정직합니다. 관리한 만큼 건강해집니다.",
  "많은 전문가들이 정기적인 바디케어의 중요성을 강조합니다."
]

const blogMiddleSections = [
  // 마사지 효과 관련
  {
    title: "혈액순환 개선의 과학적 원리",
    paragraphs: [
      "마사지는 피부와 근육에 기계적 자극을 가하여 모세혈관을 확장시킵니다.",
      "확장된 혈관을 통해 혈류량이 증가하고 산소 공급이 원활해집니다.",
      "미국 마사지치료협회(AMTA)의 연구에 따르면 마사지 후 근육 내 혈류량이 48% 증가합니다.",
      "산화질소(NO) 분비가 촉진되어 혈압 조절에도 도움이 됩니다.",
      "정맥혈의 심장 귀환이 촉진되어 하지 부종 감소에 효과적입니다."
    ]
  },
  {
    title: "스트레스 호르몬 감소 메커니즘",
    paragraphs: [
      "마사지는 코르티솔 수치를 평균 31% 감소시킵니다.",
      "세로토닌과 도파민 같은 행복 호르몬의 분비가 증가합니다.",
      "부교감신경계가 활성화되어 휴식과 회복 모드로 전환됩니다.",
      "정기적인 마사지는 불안 지수를 현저히 낮춥니다.",
      "수면의 질이 개선되어 더 깊은 휴식을 취할 수 있습니다."
    ]
  },
  {
    title: "근육 회복과 통증 완화",
    paragraphs: [
      "운동 후 발생하는 지연성 근육통(DOMS)을 효과적으로 완화합니다.",
      "근섬유의 미세 손상 회복을 촉진하고 염증 반응을 줄입니다.",
      "젖산 제거를 도와 근육 피로 회복 시간을 단축시킵니다.",
      "만성적인 근육 긴장을 이완시켜 통증 감소에 효과적입니다.",
      "관절의 가동범위를 개선하여 유연성을 높입니다."
    ]
  },
  {
    title: "수면 품질 향상 효과",
    paragraphs: [
      "마사지는 멜라토닌 분비를 촉진하여 수면-각성 주기를 조절합니다.",
      "긴장성 두통을 완화하고 경직된 근육을 이완시켜 깊은 수면을 유도합니다.",
      "수면 잠복기(잠드는 시간)를 단축시키는 효과가 있습니다.",
      "REM 수면의 비율이 높아져 더 개운한 아침을 맞이할 수 있습니다.",
      "라벤더 아로마와 병행하면 불면증 개선에 더욱 효과적입니다."
    ]
  },
  {
    title: "림프 순환과 면역력 강화",
    paragraphs: [
      "림프계는 체내 노폐물과 독소를 제거하는 핵심 시스템입니다.",
      "마사지는 림프액의 흐름을 촉진하여 면역 기능을 강화합니다.",
      "백혈구 수가 증가하고 자연살해세포(NK Cell)의 활성도가 높아집니다.",
      "부종 감소, 셀룰라이트 개선, 피부 톤 향상 효과가 있습니다.",
      "환절기나 면역력이 떨어질 때 정기적인 관리가 권장됩니다."
    ]
  },
  {
    title: "자세 교정과 체형 관리",
    paragraphs: [
      "거북목, 라운드숄더, 요통은 대부분 잘못된 자세에서 비롯됩니다.",
      "마사지를 통해 단축된 근육을 이완하고 근육 불균형을 해소합니다.",
      "근막 이완 기법은 관절의 가동범위를 넓혀줍니다.",
      "정기적인 관리와 스트레칭 병행으로 자세 개선 효과를 극대화합니다.",
      "오피스 증후군 예방과 관리에 효과적입니다."
    ]
  },
  {
    title: "정신 건강과 힐링 효과",
    paragraphs: [
      "터치(접촉)는 옥시토신 분비를 촉진하여 안정감을 줍니다.",
      "우울 증상 완화에 효과적이며 인지행동치료와 병행 시 시너지 효과가 있습니다.",
      "번아웃 예방과 재충전에 도움이 됩니다.",
      "신체 인식을 회복하고 과각성 상태를 완화합니다.",
      "업무 효율성과 삶의 만족도를 높일 수 있습니다."
    ]
  },
  {
    title: "타이마사지의 특별한 효능",
    paragraphs: [
      "타이마사지는 2,500년 역사를 가진 전통 기법입니다.",
      "스트레칭과 압박을 결합하여 '게으른 사람의 요가'라고도 불립니다.",
      "에너지 라인(센)을 따라 전신을 자극하는 동적인 마사지입니다.",
      "옷을 입은 상태에서 바닥 매트 위에서 진행됩니다.",
      "관절 유연성과 에너지 흐름 개선에 탁월합니다."
    ]
  },
  {
    title: "스웨디시 마사지의 과학",
    paragraphs: [
      "19세기 스웨덴에서 체계화된 서양식 마사지 기법입니다.",
      "에플루라지, 페트리사지, 프릭션, 타포트먼트, 바이브레이션 5가지 기본 기법을 활용합니다.",
      "오일을 사용하여 근육의 긴장을 부드럽게 풀어줍니다.",
      "혈액순환 촉진과 독소 배출에 효과적입니다.",
      "깊은 이완감과 함께 스트레스 해소에 탁월합니다."
    ]
  },
  {
    title: "아로마테라피의 향기 치유",
    paragraphs: [
      "에센셜 오일의 향기 분자는 뇌의 변연계에 직접 전달됩니다.",
      "라벤더는 진정과 수면 유도, 페퍼민트는 집중력 향상에 효과적입니다.",
      "유칼립투스는 호흡기 건강, 로즈마리는 기억력 개선에 도움을 줍니다.",
      "흡입과 경피 흡수의 이중 효과를 얻을 수 있습니다.",
      "기분과 감정 조절에 즉각적인 효과가 있습니다."
    ]
  },
  {
    title: "딥티슈 마사지의 효과",
    paragraphs: [
      "근육의 깊은 층과 결합조직에 강한 압력을 가하는 기법입니다.",
      "만성적인 근육 긴장과 유착을 해소하는 데 특화되어 있습니다.",
      "손가락, 주먹, 팔꿈치 등을 사용하여 근섬유 결을 따라 압력을 가합니다.",
      "만성 요통, 섬유근육통, 스포츠 부상 회복에 효과적입니다.",
      "시술 후 충분한 수분 섭취가 권장됩니다."
    ]
  },
  {
    title: "발 반사학의 원리",
    paragraphs: [
      "발에는 약 7,200개의 신경 말단이 분포해 있습니다.",
      "특정 반사점이 신체의 각 기관과 연결되어 있습니다.",
      "발바닥 자극으로 해당 기관의 기능이 활성화됩니다.",
      "만성 두통 환자의 81%에서 증상 완화 효과가 보고되었습니다.",
      "하루 종일 서서 일하는 분들에게 특히 효과적입니다."
    ]
  }
]

const blogConclusions = [
  "건강한 일상을 위해 정기적인 관리를 시작해 보세요.",
  "작은 관심이 큰 변화를 만들어냅니다.",
  "지금 바로 건강한 라이프스타일을 시작하세요.",
  "전문 관리사의 케어로 일상의 활력을 되찾으세요.",
  "몸과 마음의 균형을 찾는 첫걸음을 내딛어 보세요.",
  "건강 투자는 가장 확실한 미래 투자입니다.",
  "오늘의 관리가 내일의 건강을 만듭니다.",
  "편안한 휴식으로 삶의 질을 높여보세요."
]

const serviceInfoTemplates = [
  (location: string) => `${location} 지역은 30분 이내 방문이 가능한 프리미엄 서비스 지역입니다.`,
  (location: string) => `${location}에서 편안하게 출장마사지를 이용하실 수 있습니다.`,
  (location: string) => `${location} 아파트, 오피스텔, 호텔 등 어디서든 이용 가능합니다.`,
  (location: string) => `${location} 전역 24시간 예약 가능합니다.`,
  (location: string) => `${location}에서 전문 관리사가 직접 방문합니다.`,
  (location: string) => `${location} 야근 후 피로 해소에 최적의 선택입니다.`,
  (location: string) => `${location}에서 외출 없이 편하게 힐링하세요.`,
  (location: string) => `${location} 100% 후불제로 안심하고 이용하세요.`
]

// ==================== 3. 후기 문장 조각 데이터베이스 ====================
const reviewOpenings = [
  "아 진짜 이거 쓰려고 귀찮았는데 너무 좋아서 씀 ㄹㅇ",
  "방금 받고옴 개꿀 ㅋㅋㅋㅋ",
  "와 이거 실화냐 ㄷㄷ",
  "3번째 이용인데 후기 처음 씀",
  "솔직히 반신반의했는데 대박 ㄷㄷ",
  "야근 끝나고 불렀는데 진짜...",
  "와 손맛 레전드 ㄷㄷㄷㄷ",
  "새벽에 불렀는데 가능해서 놀람",
  "처음이라 떨렸는데 친절하셔서 굿",
  "오늘 건식 90분 받았는데 인생마사지임 ㄹㅇ",
  "스웨디시 받았는데 향 좋고 손맛도 좋음",
  "허리 때문에 불렀는데 살았다",
  "거북목 때문에 목 집중적으로 해달라 했더니",
  "120분 풀코스 받았는데 시간 아까운 거 1도 없음",
  "60분 짧게 받았는데도 시원함",
  "전에 다른 데 불렀다가 내상 먹었는데 여긴 달랐음",
  "실장 친절도 최상급 ㄷㄷ",
  "관리사님 마인드 굿에 실력도 좋음",
  "약손 아니고 진짜 제대로 푸심",
  "회식하고 집 와서 불렀는데 속까지 편해짐"
]

const reviewBodyParts = [
  // 도착 관련
  "전화하니까 30분 안에 온다길래 ㄹㅇ? 했는데 진짜 28분만에 도착함 ㄷㄷ",
  "전화할 때부터 친절해서 느낌 좋았음",
  "20분 안에 갈게요~ 하시더니 진짜 20분 컷 ㄷㄷ",
  "늦은 시간인데도 바로 와주셔서 감사",
  "신축이라 찾기 어려울까봐 걱정했는데 바로 파악하시더라",
  "아파트 주차장에서 만나서 올라갔는데 매너 좋으심",
  "호텔 로비에서 연락드렸더니 객실 번호만 말하면 바로 올라오심",
  "원룸 좁은데도 문제 없이 해주심",
  "오피스텔인데 좁아서 될까 싶었는데 아무 문제 없음",
  
  // 관리사 관련
  "관리사님 친절하고 실력도 좋으심",
  "어깨랑 목 집중적으로 해달라고 했더니 시원하게 풀��주심",
  "어깨 누르시면서 여기 많이 뭉치셨네요 하시는데 소름 ㄷㄷ",
  "사무직이시죠? 하시면서 딱 필요한 부위 잡아주심",
  "운전 많이 하시죠? 하시면서 허리 풀어주시는데 신기",
  "헬스 하시죠? 물어보시더라 ㅋㅋ 근육 푸는 게 다르긴 함",
  "서비스직이시죠? 여기 많이 붓겠다 하시면서 ��원하게 풀어주심",
  "많이 마셨죠? ㅎㅎ 하시면서 부드럽게 해주심",
  "프로페셔널하셔서 어색하지 않게 해주심",
  "매너 좋으셔서 편하게 받았음",
  
  // 마사지 체감
  "누워서 받는데 몸이 녹는 느낌 ㅋㅋ",
  "IT 야근러 어깨 다 비슷하겠지 ㅋㅋㅋ",
  "발 마사지 할 때 뭉침 장난 아니시네요 하시면서 풀어주시는데 눈물날뻔 ㅠㅠ",
  "아로마랑 건식 섞어서 해주시니까 진짜 다르더라",
  "오일 향이 진짜 좋음 라벤더 계열이라 하시더라",
  "숙면에 좋다고 하시던데 진짜 그날 밤 개꿀잠 잤음 ㅋㅋㅋ",
  "거실에서 매트 깔고 받았는데 넓으니까 더 편하더라",
  "침대에서 받았는데 공간 좁은 것도 능숙하게 해주시더라",
  "아로마→건식→발 순서로 진행해주셔서 알차게 받음",
  
  // 결과/체감
  "받고 나니까 어깨가 돌아감 ㄷㄷ",
  "목 돌아가는 거 체감됨 ㅋㅋ",
  "다음날 회의 컨디션 최상이었음",
  "종아리 알 뭉쳤는데 시원하게 풀어주심",
  "다리 붓기 싹 빠진 느낌",
  "스웨디시 받으니까 속까지 편해지는 느낌",
  "술 마신 날 마사지 받으면 다음날 컨디션이 다름 ㄹㅇ",
  "근육통 싹 사라짐 운동하는 사람들 필수",
  "이사 피로 한방에 풀림",
  "시험 스트레스 한방에 날아감"
]

const reviewClosings = [
  "다음에 또 부를 예정ㅇㅇ 개추 박고감",
  "여기 사시는 분들 그냥 불러보셈 후회 ㄴㄴ",
  "내상 없이 힐링 제대로 했음 굿굿",
  "단골 됐음 ㅇㅇ 가성비 갑",
  "돈 안 아까움 ㄹㅇ 또 부를듯",
  "직장인들 이거 국룰임 ㅇㅇ",
  "어깨 결리는 사람 강추함",
  "24시 가능한 거 진짜 개꿀",
  "긴장 풀리고 편하게 받았음 추천",
  "가격대비 만족도 최상급",
  "아로마 좋아하면 여기 추천",
  "허리 아픈 사람들 이거 국룰",
  "시간 여유되면 120분 강추",
  "바쁜 사람은 60분도 괜찮음",
  "내상 무서운 사람들 여기로 오셈",
  "전화 응대부터 다름 ㅇㅇ 추천",
  "매너 좋으셔서 편했음 굿",
  "시원하게 받고 싶은 사람 강추",
  "가성비 미쳤음 ㄹㅇ",
  "후기 다 맞음 ㅇㅇ 믿어도 됨",
  "주변에 추천 중",
  "단골 확정 ㅇㅇ",
  "계속 여기 이용할 예정",
  "정기 이용 추천드림",
  "단골 되면 더 좋음 ㅋㅋ"
]

const reviewSituations = [
  (location: string) => `${location} 사는데 어제 처음 불러봄`,
  (location: string) => `${location}에서 일하는데 오늘따라 너무 힘들어서 퇴근하자마자 전화함`,
  (location: string) => `${location}에 사는데 이 시간에 되나 싶었는데 됨 ㄷㄷ`,
  (location: string) => `${location} 입주한지 한달됐는데 이사 피로 때문에 불러봄`,
  (location: string) => `${location}역 근처 사는데 퇴근하고 저녁 먹고 불렀음`,
  (location: string) => `${location} 호텔에서 출장 왔는데 몸 뻐근해서 불렀음`,
  (location: string) => `${location} 자취방에서 받았는데 전혀 어색하지 않게 해주셔서 편했음`,
  (location: string) => `${location}에서 자영업 하는데 하루종일 서있으니까 다리 붓고 허리 죽겠더라`,
  (location: string) => `${location} 아파트 살고 있는데 거실에서 매트 깔고 받았음`,
  (location: string) => `${location} 신축 아파트인데 바로 찾아오심 ㄷㄷ`,
  (location: string) => `${location} 오피스텔에서 야근하다 불렀음`,
  (location: string) => `${location} 원룸인데 공간 좁아도 문제없이 해주심`,
  (location: string) => `${location} 빌라 사는데 찾기 어려울까봐 걱정했는데 바로 옴`,
  (location: string) => `${location} 고시원인데도 가능하대서 불렀음`,
  (location: string) => `${location} 모텔에서 출장 중인데 여기도 와주시더라`
]

const dcExpressions = [
  "ㄹㅇ", "ㄷㄷ", "ㅋㅋ", "ㅋㅋㅋ", "ㅋㅋㅋㅋ", "ㅇㅇ", "굿", "굿굿", 
  "개꿀", "레전드", "미쳤음", "대박", "실화냐", "가성비 갑", "국룰",
  "내상 없음", "강추", "추천", "개추", "ㄴㄴ", "ㄴㄴ해"
]

// ==================== 4. 블로그 콘텐츠 생성 함수 (지역 특화 인트로) ====================
export function generateBlogContent(
  fullLocationName: string,
  seed: string
): { title: string; content: string; topicId: string } {
  const hash = hashString(seed + fullLocationName + "blog")
  const random = seededRandom(hash)
  
  // 지역 형용사 선택
  const locAdj = pickRandom(locationAdjectives, random)
  
  // 제목 템플릿 (시드에 따라 다르게 선택)
  const titleTemplates = [
    `${fullLocationName} 출장마사지 이용 전 알아야 할 핵심 정보`,
    `${fullLocationName} 홈타이 완벽 가이드 | 전문가 추천`,
    `${fullLocationName} 출장안마 전문가가 알려주는 건강 관리법`,
    `${fullLocationName} 마사지 효과와 종류 총정리`,
    `${fullLocationName} 출장마사지 A to Z | 이용 꿀팁`,
    `${fullLocationName} 홈케어 마사지 상식 백과`,
    `${fullLocationName} 프리미엄 출장 서비스 가이드`,
    `${fullLocationName} 지역 마사지 정보 완벽 정리`
  ]
  const title = pickRandom(titleTemplates, random)
  
  // 지역 특화 인트로 (동네 이름 필수 포함)
  const locationIntros = [
    `${locAdj} ${fullLocationName}에서 바쁜 일상을 보내시는 분들이라면 건강 관리의 중요성을 잘 알고 계실 겁니다.`,
    `${fullLocationName} 지역은 ${locAdj} 분위기로 많은 분들이 거주하고 계십니다. 이곳에서 일상의 피로를 풀 수 있는 방법을 소개합니다.`,
    `${fullLocationName}에 사시거나 근무하시는 분들을 위한 특별한 건강 관리 정보입니다. ${locAdj} 동네에서 편안하게 힐링하세요.`,
    `${locAdj} ${fullLocationName}! 이 지역에서 스트레스와 피로를 효과적으로 해소할 수 있는 방법을 알려드립니다.`,
    `${fullLocationName}은 ${locAdj} 환경으로 많은 분들이 선호하는 지역입니다. 바쁜 일상 속 건강 관리법을 함께 알아볼까요?`
  ]
  const selectedLocationIntro = pickRandom(locationIntros, random)
  
  // 일반 인트로 (기존)
  const selectedIntros = pickMultiple(blogIntros, 1, random)
  
  // 본문 섹션 선택 (시드 기반으로 3개 선택하고 셔플)
  const selectedSections = pickMultiple(blogMiddleSections, 3, random)
  
  // 각 섹션 내의 문단도 시드 기반으로 셔플하고 2-3개만 선택
  const processedSections = selectedSections.map(section => {
    const shuffledParagraphs = shuffleArray(section.paragraphs, random)
    const selectedCount = 2 + Math.floor(random() * 2) // 2-3개
    return {
      title: section.title,
      paragraphs: shuffledParagraphs.slice(0, selectedCount)
    }
  })
  
  // 결론 선택
  const selectedConclusions = pickMultiple(blogConclusions, 2, random)
  
  // 서비스 정보 선택
  const selectedServiceInfos = pickMultiple(serviceInfoTemplates, 3, random)
  
  // 본문 조합 (지역명 반복 언급으로 SEO 강화)
  const content = `
<h2>${fullLocationName} 출장마사지를 찾으시는 분들께</h2>
<p>${selectedLocationIntro} ${selectedIntros[0]}</p>
<p>${pickRandom(selectedServiceInfos, random)(fullLocationName)} 레깅스출��마사지는 ${fullLocationName} 전지역에 전문 교육을 받은 관리사가 직접 방문하여 최상의 서비스를 제공합니다.</p>

<h3>${processedSections[0].title}</h3>
<p>${processedSections[0].paragraphs.join(' ')} ${fullLocationName}에서도 이러한 효과를 경험하실 수 있습니다.</p>

<h3>${processedSections[1].title}</h3>
<p>${processedSections[1].paragraphs.join(' ')}</p>

<h3>${processedSections[2].title}</h3>
<p>${processedSections[2].paragraphs.join(' ')}</p>

<h3>${fullLocationName} 출장마사지 이용 안내</h3>
<p>${selectedServiceInfos.map(fn => fn(fullLocationName)).join(' ')}</p>
<p>${selectedConclusions[0]} ${fullLocationName}에서 레깅스출장마사지와 함께 ${selectedConclusions[1]}</p>

<div style="background-color: #FCE7F3; padding: 20px; border-radius: 12px; margin: 24px 0;">
  <h4 style="margin: 0 0 12px 0; color: #9D174D;">${fullLocationName} 레깅스출장마사지 특징</h4>
  <ul style="margin: 0; padding-left: 20px; color: #BE185D;">
    <li>${fullLocationName} 전역 30분 내 방문</li>
    <li>100% 후불제 시스템</li>
    <li>24시간 연중무휴 운영</li>
    <li>전문 교육 이수 관리사</li>
  </ul>
</div>
`
  
  // topicId 생성 (고유값)
  const topicId = `topic-${hash.toString(36)}`
  
  return { title, content, topicId }
}

// ==================== 5. 후기 콘텐츠 생성 함수 (지역 특화 도입부) ====================
export function generateReviews(
  fullLocationName: string,
  seed: string,
  count: number = 4
): Array<{
  id: string
  title: string
  content: string
  author: string
  rating: number
  date: string
}> {
  const reviews: Array<{
    id: string
    title: string
    content: string
    author: string
    rating: number
    date: string
  }> = []
  
  const lastNames = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "류", "홍"]
  const firstNameChars = ["민", "서", "지", "예", "하", "수", "진", "현", "준", "우", "성", "영", "재", "혁", "태", "동"]
  
  for (let i = 0; i < count; i++) {
    // 각 후기마다 다른 시드 사용
    const reviewHash = hashString(seed + fullLocationName + `review-${i}`)
    const random = seededRandom(reviewHash)
    
    // 지역 특화 오프닝 (지역명 필수 포함)
    const locationOpenings = [
      `아 ${fullLocationName} 사시는 분들 이거 강추드림 ㄹㅇ`,
      `${fullLocationName} 처음 불러봤는데 대박 ㄷㄷ`,
      `${fullLocationName} 거주 중인데 후기 남김 ㅋㅋ`,
      `와 ${fullLocationName}에서 이런 서비스 받을 줄 몰랐음`,
      `${fullLocationName} 오피스텔인데 바로 오시네요 ㄷㄷ`,
      `${fullLocationName} 야근하고 불렀는데 인생마사지`,
      `${fullLocationName} 3년차 거주민 후기 남김`,
      `${fullLocationName} 아파트 사는데 진짜 편함 ㅋㅋ`,
      `오늘 ${fullLocationName}에서 받았는데 손맛 대박`,
      `${fullLocationName} 새벽에 불렀는데도 30분컷 ㄷㄷ`
    ]
    const opening = pickRandom(locationOpenings, random)
    
    // 상황 설명 선택 (지역명 포함)
    const situation = pickRandom(reviewSituations, random)(fullLocationName)
    
    // 본문 파트 선택 (3-5개 랜덤 선택 후 셔플)
    const bodyCount = 3 + Math.floor(random() * 3)
    const selectedBodyParts = pickMultiple(reviewBodyParts, bodyCount, random)
    
    // 디시 표현 랜덤 삽입
    const dcExpr = pickMultiple(dcExpressions, 2, random)
    
    // 클로징 선택 (지역명 추가)
    const baseClosing = pickRandom(reviewClosings, random)
    const closing = `${fullLocationName} 사시면 ${baseClosing}`
    
    // 작성자 생성
    const lastName = pickRandom(lastNames, random)
    const firstName = pickRandom(firstNameChars, random)
    const author = `${lastName}*${firstName}`
    
    // 별점 (4-5점)
    const rating = 4 + Math.floor(random() * 2)
    
    // 날짜 생성
    const month = 1 + Math.floor(random() * 12)
    const day = 1 + Math.floor(random() * 28)
    const date = `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    
    // 본문 조합 (지역명 반복으로 고유성 강화)
    const content = `
<p style="font-size: 18px; margin-bottom: 16px;">${opening}</p>
<p style="margin-bottom: 16px;">${situation}</p>
<p style="margin-bottom: 16px;">${selectedBodyParts[0]} ${dcExpr[0]}</p>
<p style="margin-bottom: 16px;">${selectedBodyParts[1]}</p>
${selectedBodyParts[2] ? `<p style="margin-bottom: 16px;">${selectedBodyParts[2]}</p>` : ''}
${selectedBodyParts[3] ? `<p style="margin-bottom: 16px;">${selectedBodyParts[3]} ${dcExpr[1]}</p>` : ''}
${selectedBodyParts[4] ? `<p style="margin-bottom: 16px;">${selectedBodyParts[4]}</p>` : ''}
<p style="background-color: #FCE7F3; padding: 16px; border-radius: 8px; margin: 20px 0; font-weight: bold; color: #9D174D;">
  ${closing}
</p>
`
    
    // 제목 생성 (지역명 + 오프닝 핵심)
    const title = `[${fullLocationName}] ${opening.replace(fullLocationName, '').trim().slice(0, 20)}...`
    
    reviews.push({
      id: `review-${reviewHash.toString(36)}`,
      title,
      content,
      author,
      rating,
      date
    })
  }
  
  return reviews
}

// ==================== 6. 지역명 조합 함수 ====================
export function getFullLocationName(
  regionName: string,
  districtName: string,
  neighborhoodName: string
): string {
  // 구 이름 추출
  const guMatch = districtName.match(/(.*?[구군])$/)
  const guName = guMatch ? guMatch[1] : null
  
  // 시 이름 추출
  const siMatch = districtName.match(/^(.*?시)/)
  const siName = siMatch ? siMatch[1] : districtName
  
  if (guName) {
    return `${guName} ${neighborhoodName}`
  } else if (siName && siName !== districtName) {
    return `${siName} ${neighborhoodName}`
  }
  
  if (districtName.endsWith("구")) {
    return `${districtName} ${neighborhoodName}`
  }
  
  return `${districtName} ${neighborhoodName}`
}

// ==================== 7. 블로그 주제 목록 (기존 호환용) ====================
export const blogTopics = blogMiddleSections.map((section, idx) => ({
  id: `topic-${idx}`,
  title: section.title,
  content: section.paragraphs.join(' ')
}))

// ==================== 8. 디시 후기 템플릿 (기존 호환용) ====================
export const dcReviewTemplates = reviewOpenings.map((opening, idx) => ({
  opening,
  closing: reviewClosings[idx % reviewClosings.length]
}))
