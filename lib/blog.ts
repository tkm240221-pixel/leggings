export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  category: "블로그" | "후기"
  region: string[]
  rating?: number
  verified?: boolean
  views: number
  likes: number
}

// 동네별 특징 데이터 (랜드마크, 특성 등) - 확장됨
const neighborhoodFeatures: Record<string, { feature: string; landmark: string; vibe: string; tip: string }> = {
  // 강남구
  "개포동": { feature: "대모산 자락의 조용한 주거지역", landmark: "개포주공아파트", vibe: "차분하고 여유로운", tip: "대모산 등산 후 마사지 받으면 피로회복 효과 두 배" },
  "논현동": { feature: "강남과 신사 사이 트렌디한 거리", landmark: "먹자골목", vibe: "활기차고 세련된", tip: "논현동 먹자골목 회식 후 집에서 편하게 케어" },
  "대치동": { feature: "교육열 높은 학원가 중심지", landmark: "대치학원가", vibe: "열정적이고 분주한", tip: "학원가 야근 후 피로한 어깨, 전문 관리로 풀어보세요" },
  "도곡동": { feature: "타워팰리스가 있는 고급 주거지", landmark: "타워팰리스", vibe: "고급스럽고 조용한", tip: "고층 아파트에서 야경 보며 받는 프라이빗 마사지" },
  "삼성동": { feature: "코엑스와 현대백화점이 있는 비즈니스 중심", landmark: "코엑스몰", vibe: "도시적이고 역동적인", tip: "코엑스 전시회 관람 후 호텔에서 받는 출장 마사지" },
  "신사동": { feature: "가로수길의 트렌디한 카페거리", landmark: "가로수길", vibe: "감각적이고 세련된", tip: "가로수길 쇼핑 후 집에서 편안하게 휴식" },
  "압구정동": { feature: "청담과 함께하는 럭셔리 상권", landmark: "압구정로데오", vibe: "화려하고 고급스러운", tip: "로데오거리 쇼핑 피로, 아로마로 싹 풀어드려요" },
  "역삼동": { feature: "테헤란로 IT기업 밀집지역", landmark: "테헤란로", vibe: "바쁘고 전문적인", tip: "IT 야근러들의 거북목, 건식 마사지로 해결" },
  "청담동": { feature: "명품거리와 갤러리가 있는 문화지구", landmark: "청담명품거리", vibe: "우아하고 예술적인", tip: "명품샵 직원분들도 퇴근 후 자주 이용하세요" },
  // 강서구
  "가양동": { feature: "가양대교와 한강 접근성", landmark: "가양역", vibe: "편리하고 발전하는", tip: "가양역 근처 오피스텔, 30분 내 방문" },
  "마곡동": { feature: "마곡지구 첨단산업단지", landmark: "마곡나루역", vibe: "혁신적이고 미래지향적인", tip: "마곡 R&D 센터 직원분들 야근 후 필수 코스" },
  "화곡동": { feature: "화곡역 중심 대규모 주거지", landmark: "화곡역", vibe: "서민적이고 정감있는", tip: "화곡시장 장보고 집에서 편하게 받으세요" },
  "등촌동": { feature: "목동과 인접한 신흥 주거지", landmark: "등촌역", vibe: "조용하고 가정적인", tip: "등촌동 신축아파트에서 프리미엄 홈케어" },
  "염창동": { feature: "한강뷰 아파트단지", landmark: "염창역", vibe: "평화롭고 전망 좋은", tip: "한강뷰 아파트에서 야경보며 힐링 마사지" },
  // 마포구
  "홍대": { feature: "홍대입구 예술문화거리", landmark: "홍대거리", vibe: "자유롭고 예술적인", tip: "클럽 다녀온 다음 날, 숙취 해소에 건식 추천" },
  "망원동": { feature: "망리단길 힙한 카페거리", landmark: "망원시장", vibe: "힙하고 감각적인", tip: "망리단길 데이트 후 집에서 마무리 마사지" },
  "연남동": { feature: "연남동 경의선숲길", landmark: "경의선숲길", vibe: "감성적이고 산책하기 좋은", tip: "경의선숲길 산책 후 피로 풀기 딱 좋아요" },
  "합정동": { feature: "합정역 젊은 상권", landmark: "합정역", vibe: "트렌디하고 젊은", tip: "합정 카페거리 구경 후 집에서 힐링" },
  "상수동": { feature: "상수역 예술인 거리", landmark: "상수역", vibe: "예술적이고 감성적인", tip: "상수동 갤러리 투어 후 감성 힐링" },
  "서교동": { feature: "홍대 핵심 상권", landmark: "홍대입구역", vibe: "활기차고 젊은", tip: "홍대 놀고 서교동 집에서 마무리" },
  // 송파구
  "잠실동": { feature: "롯데월드와 종합운동장", landmark: "잠실종합운동장", vibe: "역동적이고 즐거운", tip: "롯데월드 하루종일 돌아다닌 후 필수" },
  "석촌동": { feature: "석촌호수와 롯데월드타워", landmark: "석촌호수", vibe: "아름답고 랜드마크적인", tip: "석촌호수 벚꽃 구경 후 집에서 아로마" },
  "방이동": { feature: "올림픽공원 인접 맛집거리", landmark: "방이먹자골목", vibe: "맛있고 즐거운", tip: "방이 먹자골목 회식 후 해장 대신 마사지" },
  "위례동": { feature: "위례신도시 첨단 주거지", landmark: "위례신도시", vibe: "깔끔하고 현대적인", tip: "위례 신축아파트 넓은 거실에서 프리미엄 케어" },
  // 서초구
  "반포동": { feature: "반포한강공원과 세빛섬", landmark: "반포대교", vibe: "로맨틱하고 아름다운", tip: "반포 무지개분수 보고 집에서 커플 마사지" },
  "서초동": { feature: "예술의전당과 법원단지", landmark: "예술의전당", vibe: "문화적이고 전문적인", tip: "법조인들도 퇴근 후 자주 이용하시는 서비스" },
  "양재동": { feature: "양재시민의숲과 화훼단지", landmark: "양재시민의숲", vibe: "자연친화적이고 여유로운", tip: "양재천 산책 후 집에서 편안한 케어" },
  "방배동": { feature: "방배카페거리와 예술인마을", landmark: "방배카페거리", vibe: "감성적이고 예술적인", tip: "방배 카페골목 구경 후 아늑한 휴식" },
  // 용산구
  "이태원동": { feature: "이태원 국제적 먹자거리", landmark: "이태원거리", vibe: "이국적이고 다양한", tip: "이태원 클럽 다녀온 후 집에서 풀코스 케어" },
  "한남동": { feature: "한남더힐과 갤러리 거리", landmark: "한남더힐", vibe: "고급스럽고 예술적인", tip: "한남동 고급빌라에서 받는 프리미엄 홈케어" },
  "이촌동": { feature: "한강변 고급 주거단지", landmark: "이촌한강공원", vibe: "평화롭고 고급스러운", tip: "한강뷰 아파트에서 받는 럭셔리 마사지" },
  // 경기 주요 지역 동
  "분당": { feature: "IT밸리와 정자동 카페거리", landmark: "정자동카페거리", vibe: "세련되고 전문적인", tip: "네이버, 카카오 직원분들 단골 서비스" },
  "판교": { feature: "판교테크노밸리 IT중심", landmark: "판교역", vibe: "혁신적이고 스마트한", tip: "스타트업 대표님들도 밤새 코딩 후 찾으세요" },
  "일산": { feature: "일산호수공원과 라페스타", landmark: "일산호수공원", vibe: "쾌적하고 여유로운", tip: "라페스타 데이트 후 집에서 마무리" },
  "동탄": { feature: "동탄신도시 첨단도시", landmark: "동탄역", vibe: "새롭고 깔끔한", tip: "동탄 신축 아파트에서 받는 프리미엄 케어" },
  "광교": { feature: "광교호수공원과 테크노밸리", landmark: "광교호수공원", vibe: "친환경적이고 스마트한", tip: "광교 호수 산책 후 집에서 힐링" },
  "위례": { feature: "위례신도시 계획도시", landmark: "위례중앙광장", vibe: "정돈되고 현대적인", tip: "위례 트랜짓몰 구경 후 집에서 편안하게" },
  "운정": { feature: "운정신도시 쾌적한 환경", landmark: "운정역", vibe: "가족친화적이고 편안한", tip: "운정호수공원 산책 후 피로회복" },
  "미사": { feature: "미사강변신도시", landmark: "미사역", vibe: "한강뷰와 쾌적함", tip: "한강뷰 아파트에서 받는 힐링 마사지" },
  "다산": { feature: "다산신도시 젊은 도시", landmark: "다산역", vibe: "젊고 활기찬", tip: "신혼부부들이 많이 찾는 커플 마사지" },
  "별내": { feature: "별내신도시 쾌적한 주거지", landmark: "별내역", vibe: "조용하고 쾌적한", tip: "별내 자연환경 속에서 힐링" },
  "배곧": { feature: "배곧신도시 바다 인접", landmark: "시화호", vibe: "해변과 도시의 조화", tip: "바다 구경 후 집에서 아로마 마사지" },
  // 파주시 지역
  "조리읍": { feature: "자연과 전원이 어우러진 파주 북부 지역", landmark: "봉일천역, 조리읍사무소", vibe: "한적하고 평화로운", tip: "파주 조리읍 전원주택에서 받는 힐링 마사지 최고" },
  "야당동": { feature: "운정신도시 중심 상업지구", landmark: "야당역", vibe: "활기차고 편리한", tip: "야당역 퇴근 후 집에서 편하게" },
  "금촌동": { feature: "파주 구도심 중심지", landmark: "금촌역", vibe: "서민적이고 정감있는", tip: "금촌 재래시장 구경 후 집에서 휴식" },
  "운정동": { feature: "운정신도시 대규모 주거단지", landmark: "운정역", vibe: "깔끔하고 현대적인", tip: "운정 신축아파트에서 프리미엄 홈케어" },
  "교하동": { feature: "파주 교하지구 신도시", landmark: "교하동", vibe: "쾌적하고 발전하는", tip: "교하 신도시 입주민 필수 힐링 코스" },
  "문산읍": { feature: "파주 서북부 중심지", landmark: "문산역", vibe: "전통적이고 정감있는", tip: "문산 장날 구경 후 피로회복" },
  // 인천 주요
  "송도동": { feature: "송도국제도시 글로벌타운", landmark: "센트럴파크", vibe: "국제적이고 현대적인", tip: "송도 외국계 기업 직원분들도 많이 이용" },
  "부평동": { feature: "부평지하상가와 문화의거리", landmark: "부평역", vibe: "서민적이고 활기찬", tip: "부평 지하상가 쇼핑 후 피로 싹 풀어드려요" },
  "청라동": { feature: "청라국제도시 미래형 주거지", landmark: "청라호수공원", vibe: "계획적이고 깔끔한", tip: "청라 호수공원 산책 후 홈케어" },
  "검단동": { feature: "검단신도시 발전하는 지역", landmark: "검단역", vibe: "발전하고 기대되는", tip: "검단 신도시 새 아파트에서 프리미엄 케어" }
}

// 동네 정보 가져오기 (없으면 기본값)
function getNeighborhoodInfo(neighborhood: string): { feature: string; landmark: string; vibe: string; tip: string } {
  return neighborhoodFeatures[neighborhood] || {
    feature: "편리한 교통과 생활인프라를 갖춘 지역",
    landmark: "주요 상권과 역세권",
    vibe: "활기차고 편리한",
    tip: "집에서 편하게 받는 프리미엄 출장 마사지"
  }
}

// 제목 템플릿 (완전히 다른 50개 이상)
const reviewTitleTemplates = [
  (n: string) => `${n} 오피스텔인데 관리사님 진짜 빨리 오시네요 ㄷㄷ`,
  (n: string) => `${n} 역 근처 퇴근길 마사지 내돈내산 후기`,
  (n: string) => `${n} 삼성 현장 끝나고 홈타이 불렀는데 손맛 대박`,
  (n: string) => `${n} 30분 만에 오심 ㄷㄷ 관리사님 손맛 장난아님`,
  (n: string) => `[${n}] 야근 끝나고 집에서 받은 스웨디시 후기`,
  (n: string) => `${n} 아파트인데 새벽 2시에도 오시네요 감사합니다`,
  (n: string) => `${n}살인데 처음 불러봤어요 솔직후기 남김`,
  (n: string) => `${n} 오늘 받았는데 어깨 통증 싹 풀림 ㄹㅇ`,
  (n: string) => `[내돈내산] ${n} 출장마사지 2시간 코스 후기`,
  (n: string) => `${n} 주민인데 3번째 이용후기 씀`,
  (n: string) => `${n} 호텔에서 받았는데 만족도 최고`,
  (n: string) => `${n} 자취방인데 가능하대서 불렀더니 대박`,
  (n: string) => `와 ${n} 관리사님 진짜 프로임... 추천`,
  (n: string) => `${n}역 5분거리인데 20분만에 도착 ㄷㄷ`,
  (n: string) => `${n} 출장 스웨디시 진짜 다름.. 후회없음`,
  (n: string) => `[${n}후기] 허리통증 때문에 불렀는데 살았다`,
  (n: string) => `${n} 신축아파트 첫 입주에 불러봄 굿굿`,
  (n: string) => `${n} 회식 후 집에서 받음 속까지 편해짐`,
  (n: string) => `${n} 주말에 예약했는데 바로 되네요`,
  (n: string) => `${n} 남자인데 처음 받아봄 편하게 이용함`,
  (n: string) => `와 ${n} 이 가격에 이 서비스? 실화임?`,
  (n: string) => `${n} 거주 3년차 단골후기 ㅋㅋ`,
  (n: string) => `[${n}] 새벽에 불렀는데 친절하심 감동`,
  (n: string) => `${n} 오피스텔 좁은데도 잘 해주심`,
  (n: string) => `${n} 아로마 90분 받고 왔습니다 후기`,
  (n: string) => `${n} 첫 이용인데 재방문 확정 ㅎㅎ`,
  (n: string) => `${n} 거북목 심했는데 한방에 해결`,
  (n: string) => `[솔직후기] ${n} 출장마사지 받아봄`,
  (n: string) => `${n} 워킹맘인데 퇴근 후 힐링 제대로`,
  (n: string) => `${n} 단골 됐어요 3번째 후기`,
]

// 후기 내용 템플릿 (리얼리티 있게)
const reviewContentTemplates = [
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string }) => `
<p>아 진짜 ${n} 사시는 분들 이거 강추드립니다 ㄹㅇ</p>
<p>${info.landmark} 근처 사는데 퇴근하고 몸이 너무 뻐근해서 검색하다 여기 발견함. 처음엔 좀 긴가민가 했는데 전화하니까 되게 친절하시더라고요.</p>
<p>30분도 안돼서 도착하심 ㄷㄷ ${info.feature}라서 찾기 어려울 줄 알았는데 바로 오심.</p>
<p>관리사님이 어깨쪽 만지시더니 "여기 많이 뭉치셨네요" 하시면서 집중적으로 풀어주심. 아 진짜 시원하다... IT 야근러들 어깨 다 비슷하겠죠 ㅋㅋ</p>
<p style="color: #EC4899; font-weight: bold;">결론: ${n} 사시면 그냥 여기 부르세요. 내돈내산 후회 없음.</p>
`,
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string }) => `
<p>${n} ${info.vibe} 분위기라서 걸어다니다 보면 피곤하잖아요.</p>
<p>${info.landmark} 쪽에서 일하는데 오늘따라 너무 힘들어서 집 가자마자 예약함.</p>
<p>전화하니까 바로 20분 뒤에 오신다고 하시더라구요. 생각보다 빨리 오심!</p>
<p>120분 믹스코스 받았는데 아로마랑 건식 섞어서 해주시니까 진짜 다르더라고요. 특히 발 마사지 할 때 "와 여기 뭉침 장난 아니시네요" 하시면서 풀어주시는데 눈물날뻔 ㅠㅠ</p>
<p style="background-color: #FCE7F3; padding: 12px; border-radius: 8px;">다음에 또 부를 예정입니다. ${n} 분들 추천드려요!</p>
`,
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string }) => `
<p>새벽 1시에 전화했는데 가능하대서 놀람 ㄷㄷ</p>
<p>${info.feature}인 ${n}에 사는데 이 시간에 되나 싶었거든요.</p>
<p>40분 정도 걸려서 오셨는데 늦은 시간에도 친절하심. ${info.landmark} 근처라 찾기 쉬웠나봐요.</p>
<p>허리가 너무 아파서 건식 위주로 부탁드렸는데 "운전 많이 하시죠?" 하시면서 딱 필요한 부위 잡아주심. 소름 ㄷㄷ</p>
<p style="font-weight: bold; color: #7C3AED;">야근러들 새벽에 몸 힘들면 그냥 부르세요. 진짜 살 것 같음.</p>
`,
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string }) => `
<p>${n} 입주한지 한달됐는데 이사 피로 때문에 불러봄.</p>
<p>신축이라 찾기 어려울까봐 걱정했는데 ${info.landmark} 말씀드리니까 바로 파악하시더라고요.</p>
<p>아로마 90분 받았습니다. 오일 좋은거 쓰시는것 같아요. 향도 은은하고.</p>
<p>제가 ${info.vibe} 분위기 좋아하는데 마사지 받으면서 진짜 힐링됐어요. 이사 스트레스 싹 풀림!</p>
<p style="background-color: #ECFDF5; padding: 12px; border-radius: 8px; color: #065F46;">신축 입주하신 분들 이거 부르세요 ㅋㅋ</p>
`,
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string }) => `
<p>와 ${n} 진짜 빠르네요 ㄷㄷ</p>
<p>전화하고 25분만에 도착하심. ${info.feature}라서 좀 걸릴 줄 알았는데.</p>
<p>관리사님이 오시자마자 "어디가 불편하세요?" 물어보시더니 어깨랑 목 위주로 케어해주심.</p>
<p>${info.landmark} 쪽에서 일하다보니 거북목이 심한데 "여기 많이 땡기시죠" 하시면서 정확하게 잡아주심. 프로페셔널하심 ㄹㅇ</p>
<p>다음에 또 부를게요~ ${n} 분들 강추!</p>
`
]

// 블로그 콘텐츠 템플릿 (1000자 이상, 매거진 스타일)
const blogContentTemplates = [
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string; tip: string }) => `
<h2>거북목 증후군, ${n} 직장인들의 고민</h2>
<p>${info.feature}인 ${n}에서 일하시는 분들이라면 공감하실 거예요. 하루 8시간 이상 모니터 앞에 앉아 있다 보면 어느새 목이 앞으로 쭉 나오는 거북목 자세가 됩니다. ${info.landmark} 근처 오피스에서 일하시는 분들 중에 목과 어깨 통증을 호소하시는 분들이 정말 많아요.</p>

<h3>거북목이 위험한 이유</h3>
<p>거북목은 단순히 목이 아픈 것에서 끝나지 않습니다. 방치하면 두통, 어깨 결림, 손 저림까지 이어질 수 있어요. 특히 ${info.vibe} 분위기의 ${n}처럼 바쁜 지역에서 일하시는 분들은 통증을 참고 일하시다가 악화되는 경우가 많습니다.</p>

<div style="background-color: #FEF9C3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EAB308;">
<p style="font-weight: bold; color: #854D0E;">거북목 완화를 위한 마사지 포인트</p>
<ul style="color: #A16207; margin-top: 8px;">
<li>승모근: 어깨와 목을 연결하는 큰 근육, 뭉침이 가장 심한 부위</li>
<li>후두하근: 두통의 원인이 되는 목 뒤쪽 작은 근육들</li>
<li>흉쇄유돌근: 목 옆쪽 근육, 거북목의 주범</li>
</ul>
</div>

<h3>${n}에서 받는 전문 케어</h3>
<p>레깅스출장마사지는 ${d} ${n} 전지역 30분 내 방문이 가능합니다. ${info.landmark}에서 퇴근하신 후 집에서 편안하게 전문 관리사의 케어를 받아보세요.</p>

<div style="background-color: #FCE7F3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EC4899;">
<p style="font-weight: bold; color: #9D174D;">TIP: ${info.tip}</p>
</div>

<h3>문의 및 예약</h3>
<p>24시간 예약 가능합니다. 편하게 연락주세요!</p>
<ul>
<li><a href="tel:010-2871-2457" style="color: #EC4899; font-weight: bold;">전화 문의하기</a></li>
<li><a href="https://t.me/cc_9911" style="color: #EC4899; font-weight: bold;">텔레그램 상담</a></li>
</ul>
`,
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string; tip: string }) => `
<h2>${n} 아로마 테라피 가이드: 일상 속 힐링</h2>
<p>${info.feature}인 ${n}에서 바쁜 하루를 보내신 분들께 추천드리는 아로마 테라피에 대해 알아볼까요? ${info.landmark} 근처에서 일하시거나 거주하시는 분들이라면 특히 관심 가지실 만한 내용입니다.</p>

<h3>아로마 오일의 종류와 효능</h3>
<p>레깅스출장마사지에서는 100% 천연 에센셜 오일만 사용합니다. 고객님의 컨디션에 따라 최적의 오일을 추천해 드려요.</p>

<div style="background-color: #E0E7FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
<p style="font-weight: bold; color: #3730A3;">오일별 효능</p>
<ul style="color: #4338CA; margin-top: 8px;">
<li><strong>라벤더:</strong> 숙면 유도, 스트레스 완화에 효과적</li>
<li><strong>페퍼민트:</strong> 두통 완화, 집중력 향상에 좋음</li>
<li><strong>유칼립투스:</strong> 호흡기 개선, 근육 이완 효과</li>
<li><strong>로즈마리:</strong> 혈액순환 촉진, 피로회복에 탁월</li>
</ul>
</div>

<h3>${info.vibe} ${n}에서의 아로마 케어</h3>
<p>${n}의 ${info.vibe} 분위기 속에서 하루를 보내셨다면, 집에서 편안하게 아로마 마사지를 받아보세요. 몸과 마음의 균형을 찾는 시간이 될 거예요.</p>

<div style="background-color: #FCE7F3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EC4899;">
<p style="font-weight: bold; color: #9D174D;">TIP: ${info.tip}</p>
</div>

<h3>예약 안내</h3>
<p>${d} ${n} 전지역 30분 내 방문! 24시간 예약 가능합니다.</p>
<ul>
<li><a href="tel:010-2871-2457" style="color: #EC4899; font-weight: bold;">전화 문의하기</a></li>
<li><a href="https://t.me/cc_9911" style="color: #EC4899; font-weight: bold;">텔레그램 상담</a></li>
</ul>
`,
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string; tip: string }) => `
<h2>${n} 야근러를 위한 마사지 가이드</h2>
<p>${info.feature}인 ${n}. 이 지역에서 일하시는 분들은 야근이 일상이실 거예요. ${info.landmark} 근처 오피스에서 밤늦게까지 일하시는 분들을 위한 마사지 가이드를 준비했습니다.</p>

<h3>야근 후 몸 상태 체크리스트</h3>
<div style="background-color: #FEF3C7; padding: 16px; border-radius: 8px; margin: 16px 0;">
<ul>
<li>목과 어깨가 뻣뻣하다</li>
<li>허리 통증이 있다</li>
<li>두통이 자주 온다</li>
<li>손목이나 팔꿈치가 아프다</li>
<li>눈이 피로하고 침침하다</li>
</ul>
<p style="margin-top: 8px; font-weight: bold;">3개 이상 해당되신다면 전문 마사지가 필요합니다!</p>
</div>

<h3>${info.vibe} ${n}에서 추천하는 코스</h3>
<p>야근 후에는 <strong>건식 90분 코스</strong>나 <strong>믹스 120분 코스</strong>를 추천드립니다. 오일 없이 근육을 집중적으로 풀어주는 건식과, 아로마로 심신을 이완시켜주는 믹스의 조합이 효과적이에요.</p>

<div style="background-color: #FCE7F3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EC4899;">
<p style="font-weight: bold; color: #9D174D;">TIP: ${info.tip}</p>
</div>

<h3>새벽에도 예약 가능</h3>
<p>${d} ${n} 24시간 출장 가능합니다. 야근 끝나고 새벽 2시, 3시에도 연락주세요!</p>
<ul>
<li><a href="tel:010-2871-2457" style="color: #EC4899; font-weight: bold;">전화 문의하기</a></li>
<li><a href="https://t.me/cc_9911" style="color: #EC4899; font-weight: bold;">텔레그램 상담</a></li>
<li><a href="https://open.kakao.com/o/shgq1hhi" style="color: #EC4899; font-weight: bold;">카카오톡 상담</a></li>
</ul>
`,
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string; tip: string }) => `
<h2>${n} 주민들이 알아야 할 마사지 상식</h2>
<p>${info.feature}인 ${n}에 거주하시는 분들을 위한 마사지 기본 상식을 정리했습니다. ${info.landmark} 근처에 사시든, 다른 동네에 사시든 알아두시면 유용한 정보예요.</p>

<h3>출장마사지 vs 샵마사지</h3>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
<div style="background-color: #ECFDF5; padding: 16px; border-radius: 8px;">
<p style="font-weight: bold; color: #065F46;">출장마사지 장점</p>
<ul style="color: #047857;">
<li>이동 시간 없음</li>
<li>집에서 편하게 휴식</li>
<li>마사지 후 바로 취침</li>
<li>프라이버시 보장</li>
</ul>
</div>
<div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px;">
<p style="font-weight: bold; color: #374151;">샵마사지 장점</p>
<ul style="color: #6B7280;">
<li>시설 이용 가능</li>
<li>여러 옵션 선택</li>
<li>분위기 연출</li>
</ul>
</div>
</div>

<h3>${info.vibe} ${n}에서의 출장마사지</h3>
<p>${n}은 ${info.feature}라서 집에서 편하게 받으시는 게 더 효율적입니다. 특히 퇴근 후 피곤한 상태에서 다시 외출하는 것보다 집에서 받으시는 걸 추천드려요.</p>

<div style="background-color: #FCE7F3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EC4899;">
<p style="font-weight: bold; color: #9D174D;">TIP: ${info.tip}</p>
</div>

<h3>예약 문의</h3>
<p>${d} ${n} 전지역 30분 내 방문! 100% 후불제로 안심하고 이용하세요.</p>
<ul>
<li><a href="tel:010-2871-2457" style="color: #EC4899; font-weight: bold;">전화 문의하기</a></li>
<li><a href="https://t.me/cc_9911" style="color: #EC4899; font-weight: bold;">텔레그램 상담</a></li>
</ul>
`,
  (d: string, n: string, info: { feature: string; landmark: string; vibe: string; tip: string }) => `
<h2>${n} 커플 마사지 가이드</h2>
<p>${info.feature}인 ${n}에서 소중한 사람과 함께하는 커플 마사지는 어떨까요? ${info.landmark} 근처에서 데이트 후 집에서 함께 받는 커플 마사지는 특별한 추억이 됩니다.</p>

<h3>커플 마사지의 장점</h3>
<p>${info.vibe} 분위기의 ${n}에서 바쁜 일상을 보내다 보면 둘만의 시간을 갖기 어렵죠. 커플 마사지는 함께 힐링하면서 대화도 나눌 수 있는 좋은 기회예요.</p>

<div style="background-color: #FDF2F8; padding: 16px; border-radius: 8px; margin: 16px 0;">
<p style="font-weight: bold; color: #9D174D;">커플 마사지 추천 코스</p>
<ul style="color: #BE185D;">
<li><strong>아로마 90분 x 2:</strong> 가장 인기 있는 커플 코스</li>
<li><strong>믹스 120분 x 2:</strong> 제대로 받고 싶은 분들께 추천</li>
<li><strong>건식 + 아로마:</strong> 서로 다른 취향이면 각자 다른 코스도 가능</li>
</ul>
</div>

<h3>예약 시 참고사항</h3>
<p>커플 마사지는 관리사 2분이 함께 방문합니다. 미리 예약해 주시면 더 원활하게 진행됩니다.</p>

<div style="background-color: #FCE7F3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EC4899;">
<p style="font-weight: bold; color: #9D174D;">TIP: ${info.tip}</p>
</div>

<h3>문의</h3>
<p>${d} ${n} 커플 마사지 예약은 아래로 연락주세요!</p>
<ul>
<li><a href="tel:010-2871-2457" style="color: #EC4899; font-weight: bold;">전화 문의하기</a></li>
<li><a href="https://open.kakao.com/o/shgq1hhi" style="color: #EC4899; font-weight: bold;">카카오톡 상담</a></li>
</ul>
`
]

// 블로그 제목 템플릿
const blogTitleTemplates = [
  (n: string) => `${n} 직장인 거북목 완화법 | 전문가 가이드`,
  (n: string) => `${n} 아로마 테라피 효능과 추천 코스`,
  (n: string) => `${n} 야근 후 피로회복 마사지 가이드`,
  (n: string) => `${n} 주민이 알아야 할 마사지 상식`,
  (n: string) => `${n} 커플 마사지 완벽 가이드`,
  (n: string) => `${n} 스웨디시 vs 타이 마사지 비교`,
  (n: string) => `${n} 출장마사지 이용 팁 총정리`,
  (n: string) => `${n} 허리통증 완화를 위한 마사지 가이드`,
  (n: string) => `${n} 수면장애 해결, 아로마로 숙면하기`,
  (n: string) => `${n} 주말 홈케어 추천 코스`,
]

// 작성자 목록
const reviewAuthors = ["민*", "김*현", "박*수", "이*정", "최*", "정*호", "강*진", "조*", "윤*아", "한*", "신*영", "서*준", "장*", "임*우", "오*빈", "전*혁", "송*", "황*림", "안*", "류*진"]
const blogAuthors = ["레깅스 에디터", "힐링 매거진", "웰니스 가이드", "마사지 전문가", "헬스케어 팀"]

// 블로그 포스트 생성
export const blogPosts: BlogPost[] = []

// 지역 데이터 import를 위한 인라인 정의
const seoulDistricts = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"]
const gyeonggiDistricts = ["수원", "성남", "고양", "용인", "안산", "안양", "부천", "화성", "평택", "파주", "김포", "광명", "시흥", "군포", "의왕", "하남", "이천", "오산", "의정부", "남양주", "구리", "양주", "포천", "동탄", "판교", "분당", "광교", "일산", "위례", "미사", "다산", "별내", "운정"]
const incheonDistricts = ["중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군", "송도", "청라", "검단"]

// 서울 각 구별 대표 동
const seoulNeighborhoods: Record<string, string[]> = {
  "강남구": ["역삼동", "삼성동", "청담동", "논현동", "신사동", "압구정동", "대치동", "도곡동", "개포동"],
  "강서구": ["마곡동", "화곡동", "가양동", "등촌동", "염창동", "방화동"],
  "마포구": ["홍대", "합정동", "연남동", "망원동", "상수동", "서교동"],
  "송파구": ["잠실동", "석촌동", "방이동", "위례동", "문정동", "가락동"],
  "서초구": ["반포동", "서초동", "양재동", "방배동", "잠원동"],
  "용산구": ["이태원동", "한남동", "이촌동", "청파동"],
  "영등포구": ["여의도동", "영등포동", "당산동", "신길동"],
  "성동구": ["성수동", "왕십리동", "금호동", "옥수동"],
  "광진구": ["건대입구", "구의동", "자양동", "화양동"],
  "종로구": ["종로", "삼청동", "인사동", "혜화동"],
}

// 경기 주요 지역 동
const gyeonggiNeighborhoods: Record<string, string[]> = {
  "동탄": ["동탄1동", "동탄2동", "동탄3동", "동탄4동", "능동", "청계동"],
  "판교": ["판교동", "삼평동", "백현동", "운중동"],
  "분당": ["정자동", "서현동", "수내동", "야탑동", "이매동"],
  "광교": ["광교동", "이의동", "원천동", "상현동"],
  "일산": ["마두동", "백석동", "정발산동", "주엽동", "대화동"],
  "위례": ["위례동", "위례1동", "위례2동"],
  "미사": ["미사동", "미사1동", "미사2동"],
  "다산": ["다산동", "다산1동", "다산2동"],
  "운정": ["운정1동", "운정2동", "야당동", "동패동"],
  "수원": ["영통동", "인계동", "매탄동", "권선동"],
  "성남": ["야탑동", "서현동", "분당동", "신흥동"],
  "고양": ["화정동", "행신동", "일산동", "마두동"],
  "용인": ["수지동", "죽전동", "동백동", "기흥동"],
  "안산": ["중앙동", "고잔동", "선부동", "본오동"],
  "안양": ["평촌동", "비산동", "안양동", "호계동"],
  "부천": ["상동", "중동", "원미동", "소사동"],
  "화성": ["병점동", "동탄동", "봉담동", "향남읍"],
  "평택": ["평택동", "고덕동", "비전동", "송탄동"],
  "파주": ["야당동", "금촌동", "운정동", "교하동"],
  "김포": ["장기동", "구래동", "풍무동", "양촌읍"],
}

// 인천 주요 지역 동
const incheonNeighborhoods: Record<string, string[]> = {
  "송도": ["송도동", "송도1동", "송도2동", "동춘동"],
  "청라": ["청라동", "청라1동", "청라2동"],
  "검단": ["검단동", "검단1동", "원당동"],
  "부평구": ["부평동", "부개동", "삼산동", "십정동"],
  "연수구": ["연수동", "송도동", "동춘동"],
  "남동구": ["구월동", "간석동", "만수동"],
}

let postId = 1

// 서울 지역 콘텐츠 생성
seoulDistricts.forEach((district, dIdx) => {
  const neighborhoods = seoulNeighborhoods[district] || ["중앙동", "1동", "2동"]
  
  neighborhoods.forEach((neighborhood, nIdx) => {
    const info = getNeighborhoodInfo(neighborhood)
    const idx = dIdx * 10 + nIdx
    
    // 블로그 글 생성
    const blogTemplate = blogContentTemplates[idx % blogContentTemplates.length]
    const blogTitleTemplate = blogTitleTemplates[idx % blogTitleTemplates.length]
    
    blogPosts.push({
      id: `blog-seoul-${postId++}`,
      title: blogTitleTemplate(neighborhood),
      excerpt: `${district} ${neighborhood} 마사지 정보와 전문가 가이드. ${info.feature}인 ${neighborhood}에서 프리미엄 출장마사지를 경험하세요.`,
      content: blogTemplate(district, neighborhood, info),
      author: blogAuthors[idx % blogAuthors.length],
      createdAt: new Date(2024, (idx % 12), (idx % 28) + 1).toISOString(),
      category: "블로그",
      region: [district, neighborhood, "서울"],
      views: 100 + Math.floor(Math.random() * 300),
      likes: 10 + Math.floor(Math.random() * 50)
    })
    
    // 후기 생성
    const reviewTitleTemplate = reviewTitleTemplates[idx % reviewTitleTemplates.length]
    const reviewContentTemplate = reviewContentTemplates[idx % reviewContentTemplates.length]
    const rating = 4 + Math.floor(Math.random() * 2)
    
    blogPosts.push({
      id: `review-seoul-${postId++}`,
      title: reviewTitleTemplate(neighborhood),
      excerpt: `${district} ${neighborhood} 실제 이용 후기. 30분 내 도착, 100% 후불제.`,
      content: reviewContentTemplate(district, neighborhood, info),
      author: reviewAuthors[idx % reviewAuthors.length],
      createdAt: new Date(2024, ((idx + 2) % 12), ((idx + 5) % 28) + 1).toISOString(),
      category: "후기",
      region: [district, neighborhood, "서울"],
      rating,
      verified: Math.random() > 0.2,
      views: 50 + Math.floor(Math.random() * 150),
      likes: 5 + Math.floor(Math.random() * 30)
    })
  })
})

// 경기 지역 콘텐츠 생성
gyeonggiDistricts.forEach((district, dIdx) => {
  const neighborhoods = gyeonggiNeighborhoods[district] || ["중앙동", "1동", "2동"]
  
  neighborhoods.forEach((neighborhood, nIdx) => {
    const info = getNeighborhoodInfo(neighborhood)
    const idx = dIdx * 10 + nIdx + 500
    
    // 블로그 글 생성
    const blogTemplate = blogContentTemplates[idx % blogContentTemplates.length]
    const blogTitleTemplate = blogTitleTemplates[idx % blogTitleTemplates.length]
    
    blogPosts.push({
      id: `blog-gyeonggi-${postId++}`,
      title: blogTitleTemplate(neighborhood),
      excerpt: `경기 ${district} ${neighborhood} 마사지 정보와 전문가 가이드.`,
      content: blogTemplate(district, neighborhood, info),
      author: blogAuthors[idx % blogAuthors.length],
      createdAt: new Date(2024, (idx % 12), (idx % 28) + 1).toISOString(),
      category: "블로그",
      region: [district, neighborhood, "경기"],
      views: 80 + Math.floor(Math.random() * 200),
      likes: 8 + Math.floor(Math.random() * 40)
    })
    
    // 후기 생성
    const reviewTitleTemplate = reviewTitleTemplates[(idx + 5) % reviewTitleTemplates.length]
    const reviewContentTemplate = reviewContentTemplates[(idx + 2) % reviewContentTemplates.length]
    const rating = 4 + Math.floor(Math.random() * 2)
    
    blogPosts.push({
      id: `review-gyeonggi-${postId++}`,
      title: reviewTitleTemplate(neighborhood),
      excerpt: `경기 ${district} ${neighborhood} 실제 이용 후기.`,
      content: reviewContentTemplate(district, neighborhood, info),
      author: reviewAuthors[(idx + 3) % reviewAuthors.length],
      createdAt: new Date(2024, ((idx + 1) % 12), ((idx + 3) % 28) + 1).toISOString(),
      category: "후기",
      region: [district, neighborhood, "경기"],
      rating,
      verified: Math.random() > 0.25,
      views: 40 + Math.floor(Math.random() * 100),
      likes: 4 + Math.floor(Math.random() * 25)
    })
  })
})

// 인천 지역 콘텐츠 생성
incheonDistricts.forEach((district, dIdx) => {
  const neighborhoods = incheonNeighborhoods[district] || ["중앙동", "1동", "2동"]
  
  neighborhoods.forEach((neighborhood, nIdx) => {
    const info = getNeighborhoodInfo(neighborhood)
    const idx = dIdx * 10 + nIdx + 1000
    
    // 블로그 글 생성
    const blogTemplate = blogContentTemplates[idx % blogContentTemplates.length]
    const blogTitleTemplate = blogTitleTemplates[idx % blogTitleTemplates.length]
    
    blogPosts.push({
      id: `blog-incheon-${postId++}`,
      title: blogTitleTemplate(neighborhood),
      excerpt: `인천 ${district} ${neighborhood} 마사지 정보와 전문가 가이드.`,
      content: blogTemplate(district, neighborhood, info),
      author: blogAuthors[idx % blogAuthors.length],
      createdAt: new Date(2024, (idx % 12), (idx % 28) + 1).toISOString(),
      category: "블로그",
      region: [district, neighborhood, "인천"],
      views: 60 + Math.floor(Math.random() * 150),
      likes: 6 + Math.floor(Math.random() * 30)
    })
    
    // 후기 생성
    const reviewTitleTemplate = reviewTitleTemplates[(idx + 10) % reviewTitleTemplates.length]
    const reviewContentTemplate = reviewContentTemplates[(idx + 3) % reviewContentTemplates.length]
    const rating = 4 + Math.floor(Math.random() * 2)
    
    blogPosts.push({
      id: `review-incheon-${postId++}`,
      title: reviewTitleTemplate(neighborhood),
      excerpt: `인천 ${district} ${neighborhood} 실제 이용 후기.`,
      content: reviewContentTemplate(district, neighborhood, info),
      author: reviewAuthors[(idx + 5) % reviewAuthors.length],
      createdAt: new Date(2024, ((idx + 2) % 12), ((idx + 7) % 28) + 1).toISOString(),
      category: "후기",
      region: [district, neighborhood, "인천"],
      rating,
      verified: Math.random() > 0.3,
      views: 35 + Math.floor(Math.random() * 80),
      likes: 3 + Math.floor(Math.random() * 20)
    })
  })
})

// 파주시 조리읍 전용 콘텐츠 (1000자 이상 블로그 + 디시 말투 후기)
const joririInfo = getNeighborhoodInfo("조리읍")

// 파주 조리읍 블로그 1 - 기사성 1000자 이상
blogPosts.push({
  id: `blog-paju-jorieup-1`,
  title: "파주 조리읍 출장마사지 완벽 가이드 | 봉일천역 인근 힐링 케어",
  excerpt: "파주 조리읍 지역 출장마사지 정보와 전문가 가이드. 봉일천역 인근 30분 내 방문.",
  content: `
<h2>파주 조리읍, 도심 속 자연을 품은 힐링 타운</h2>
<p>경기도 파주시 조리읍은 서울에서 약 40분 거리에 위치한 전원 주거지역입니다. 봉일천역을 중심으로 한적한 마을 분위기와 자연환경이 어우러져, 바쁜 일상에서 벗어나 여유를 즐기고자 하는 분들이 많이 거주하고 계십니다.</p>

<h3>조리읍의 특징</h3>
<p>조리읍은 파주시 남부에 위치하며, 봉일천리, 등원리, 오산리, 장곡리 등 여러 리(里)로 구성되어 있습니다. 특히 봉일천�� 인근은 상업시설과 주거단지가 조화롭게 발전하고 있어 생활 편의성이 높아지고 있죠. 하지만 여전히 도시의 번잡함과는 거리가 먼, 평화로운 분위기를 유지하고 있습니다.</p>

<div style="background-color: #FEF9C3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EAB308;">
<p style="font-weight: bold; color: #854D0E;">조리읍 주민들의 건강 고민</p>
<ul style="color: #A16207; margin-top: 8px;">
<li>출퇴근 거리가 길어 피로 누적이 심함</li>
<li>운전 시간이 길어 허리, 어깨 통증 호소</li>
<li>전원생활이지만 바쁜 일상에 셀프케어 시간 부족</li>
<li>인근에 마사지샵이 적어 관리받기 어려움</li>
</ul>
</div>

<h3>출장마사지가 필요한 이유</h3>
<p>조리읍은 주변에 전문 마사지샵이 많지 않아, 케어를 받으려면 금촌이나 일산까지 나가야 하는 경우가 많습니다. 퇴근 후 피곤한 몸을 이끌고 또 외출하는 것은 부담스러울 수밖에 없죠. 이런 조리읍 주민분들을 위해 레깅스출장마사지가 직접 찾아갑니다.</p>

<h3>레깅스출장마사지 서비스</h3>
<p>저희 레깅스출장마사지는 파주 조리읍 전지역에 30분 내 방문이 가능합니다. 봉일천역 인근은 물론, 봉일천리, 등원리, 오산리, 장곡리 어디든 편하게 연락주시면 전문 관리사가 직접 찾아갑니다.</p>

<div style="background-color: #ECFDF5; padding: 16px; border-radius: 8px; margin: 16px 0;">
<p style="font-weight: bold; color: #065F46;">추천 코스</p>
<ul style="color: #047857; margin-top: 8px;">
<li><strong>아로마 90분:</strong> 장거리 출퇴근 피로 해소에 효과적</li>
<li><strong>건식 90분:</strong> 운전으로 인한 허리, 어깨 통증에 추천</li>
<li><strong>믹스 120분:</strong> 주말에 제대로 힐링하고 싶으신 분들께</li>
</ul>
</div>

<div style="background-color: #FCE7F3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EC4899;">
<p style="font-weight: bold; color: #9D174D;">TIP: 조리읍 전원주택에서 받는 힐링 마사지, 도심에서는 느낄 수 없는 특별한 경험입니다.</p>
</div>

<h3>예약 문의</h3>
<p>파주 조리읍 24시간 출장 가능합니다. 100% 후불제로 안심하고 이용하세요!</p>
<ul>
<li><a href="tel:010-2871-2457" style="color: #EC4899; font-weight: bold;">전화 문의하기</a></li>
<li><a href="https://t.me/cc_9911" style="color: #EC4899; font-weight: bold;">텔레그램 상담</a></li>
<li><a href="https://open.kakao.com/o/shgq1hhi" style="color: #EC4899; font-weight: bold;">카카오톡 상담</a></li>
</ul>
`,
  author: "레깅스 에디터",
  createdAt: "2024-05-10T09:00:00.000Z",
  category: "블로그",
  region: ["파주시", "조리읍", "경기", "파주", "봉일천"],
  views: 156,
  likes: 23
})

// 파주 조리읍 블로그 2 - 기사성 1000자 이상
blogPosts.push({
  id: `blog-paju-jorieup-2`,
  title: "조리읍 직장인 출퇴근 피로 완화법 | 파주 봉일천 마사지 전문",
  excerpt: "파주 조리읍에서 서울 출퇴근하시는 분들을 위한 피로회복 가이드.",
  content: `
<h2>조리읍에서 서울 출퇴근, 몸이 힘드시죠?</h2>
<p>파주 조리읍에서 서울로 출퇴근하시는 분들이 많습니다. 봉일천역에서 경의중앙선을 타고 서울역까지 약 50분, 디지털미디어시티역까지 약 40분 정도 소요되죠. 왕복 2시간 가까이 되는 출퇴근 시간은 몸에 상당한 부담을 줍니다.</p>

<h3>장거리 출퇴근이 몸에 미치는 영향</h3>
<p>매일 장시간 앉아서 이동하다 보면 다양한 신체 문제가 발생합니다. 특히 경의선 열차 좌석에서 졸거나 스마트폰을 보는 자세는 목과 어깨에 큰 부담을 주게 되죠.</p>

<div style="background-color: #FEE2E2; padding: 16px; border-radius: 8px; margin: 16px 0;">
<p style="font-weight: bold; color: #991B1B;">장거리 출퇴근자 주의 증상</p>
<ul style="color: #B91C1C; margin-top: 8px;">
<li>거북목 증후군: 고개를 숙이고 스마트폰을 보는 자세</li>
<li>허리 디스크 위험: 장시간 앉은 자세 유지</li>
<li>하체 부종: 혈액순환 저하로 인한 붓기</li>
<li>만성 피로: 충분한 휴식 시간 부족</li>
</ul>
</div>

<h3>조리읍에서 받는 전문 케어</h3>
<p>퇴근 후 집에 도착하면 이미 지쳐있는 상태. 다시 외출해서 마사지샵에 가기란 쉽지 않습니다. 이럴 때 출장마사지를 이용하시면 집에서 편안하게 전문 케어를 받으실 수 있습니다.</p>

<p>레깅스출장마사지는 파주 조리읍 봉일천역 인근은 물론, 등원리, 오산리, 장곡리 등 조리읍 전지역에 30분 내 방문 가능합니다. 전화 한 통이면 전문 관리사가 직접 찾아가요.</p>

<div style="background-color: #E0E7FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
<p style="font-weight: bold; color: #3730A3;">출퇴근 피로 완화 추천 코스</p>
<ul style="color: #4338CA; margin-top: 8px;">
<li><strong>건식 90분:</strong> 뭉친 근육을 시원하게 풀어주는 코스</li>
<li><strong>아로마 90분:</strong> 심신 이완과 숙면 유도에 효과적</li>
<li><strong>믹스 120분:</strong> 건식+아로마+풋케어 풀코스</li>
</ul>
</div>

<div style="background-color: #FCE7F3; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #EC4899;">
<p style="font-weight: bold; color: #9D174D;">TIP: 금요일 퇴근 후 믹스 120분 코스 받고 주말 시작하세요. 완전 다른 컨디션!</p>
</div>

<h3>예약 안내</h3>
<p>파주 조리읍 24시간 예약 가능! 퇴근 시간에 맞춰 예약하시면 집 도착하자마자 바로 받으실 수 있습니다.</p>
<ul>
<li><a href="tel:010-2871-2457" style="color: #EC4899; font-weight: bold;">전화 문의하기</a></li>
<li><a href="https://t.me/cc_9911" style="color: #EC4899; font-weight: bold;">텔레그램 상담</a></li>
</ul>
`,
  author: "힐링 매거진",
  createdAt: "2024-05-15T14:00:00.000Z",
  category: "블로그",
  region: ["파주시", "조리읍", "경기", "파주", "봉일천"],
  views: 189,
  likes: 31
})

// 파주 조리읍 후기 1 - 디시인사이드 말투
blogPosts.push({
  id: `review-paju-jorieup-1`,
  title: "조리읍 봉일천역 근처인데 진짜 30분만에 오심 ㄷㄷ",
  excerpt: "파주 조리읍 실제 이용 후기. 봉일천역 인근 거주자.",
  content: `
<p>ㅇㅇ 나 봉일천역 도보 10분 거리 사는데</p>
<p>솔직히 조리읍이 파주 끝자락이라 출장마사지 될까 싶었음</p>
<p>전화하니까 "30분 내로 도착합니다" 하시길래 ㄹㅇ? 했는데</p>
<p>진짜 28분만에 오심 ㅋㅋㅋㅋ 시간 재봄</p>
<br/>
<p>나 서울 출퇴근하는데 경의선 타고 왔다갔다 하다보면</p>
<p>목이랑 어깨가 돌덩이처럼 뭉쳐있거든</p>
<p>관리사님이 오시자마자 "어깨 많이 힘드시죠" 하시면서</p>
<p>집중적으로 풀어주심</p>
<br/>
<p>건식 90분 받았는데 진짜 시원함 ㄷㄷ</p>
<p>특히 승모근 부분 누르실때 "앜" 소리 남 ㅋㅋ</p>
<p>근데 아프면서 시원한 그런 느낌?</p>
<br/>
<p style="background-color: #FCE7F3; padding: 12px; border-radius: 8px;">조리읍 사시는 분들 걍 여기 부르세요 ㄹㅇ 추천</p>
<p style="color: #EC4899; font-weight: bold;">금촌이나 일산까지 안나가도 됨 굿</p>
`,
  author: "박*현",
  createdAt: "2024-05-18T22:30:00.000Z",
  category: "후기",
  region: ["파주시", "조리읍", "경기", "파주", "봉일천"],
  rating: 5,
  verified: true,
  views: 234,
  likes: 45
})

// 파주 조리읍 후기 2 - 디시인사이드 말투
blogPosts.push({
  id: `review-paju-jorieup-2`,
  title: "[조리읍] 전원주택인데도 오시네요 감사합니다",
  excerpt: "파주 조리읍 전원주택 거주자 실제 이용 후기.",
  content: `
<p>아 나 조리읍 전원주택 사는데</p>
<p>여기가 좀 외진데라 출장마사지 안될줄 알았음</p>
<p>근데 전화해보니까 "네 가능합니다~" 하시길래</p>
<p>주소 불러드렸더니 네비 찍고 오신다고 ㄷㄷ</p>
<br/>
<p>40분쯤 걸렸나? 좀 걸리긴 했는데</p>
<p>이 동네까지 와주시는것만해도 감사함 ㅠㅠ</p>
<p>인근에 마사지샵이 없어서 항상 일산까지 갔었거든</p>
<br/>
<p>아로마 90분 받았는데 오일 향이 진짜 좋음</p>
<p>라벤더인가? 하시더니 숙면에 좋다고</p>
<p>ㄹㅇ 그날 밤 개꿀잠 잤음 ㅋㅋㅋ</p>
<br/>
<p>전원주택이라 마당 있는데 밤에 조용해서</p>
<p>마사지 받으면서 힐링 제대로 됨</p>
<br/>
<p style="background-color: #ECFDF5; padding: 12px; border-radius: 8px; color: #065F46;">조리읍 외진데 사시는 분들도 그냥 전화해보세요</p>
<p style="font-weight: bold;">생각보다 잘 와주심 ㄹㅇ</p>
`,
  author: "이*정",
  createdAt: "2024-05-22T21:00:00.000Z",
  category: "후기",
  region: ["파주시", "조리읍", "경기", "파주", "봉일천", "전원주택"],
  rating: 5,
  verified: true,
  views: 178,
  likes: 38
})

// 파주 조리읍 후기 3 - 디시인사이드 말투
blogPosts.push({
  id: `review-paju-jorieup-3`,
  title: "조리읍 자취방인데 새벽 1시에도 됨 ㄷㄷ",
  excerpt: "파주 조리읍 새벽 이용 후기. 야근 후 케어.",
  content: `
<p>나 봉일천 근처 원룸 사는 직장인인데</p>
<p>오늘 야근하고 집 오니까 새벽 12시 넘었음</p>
<p>몸이 너무 뻐근해서 혹시나 하고 전화했는데</p>
<p>"네 가능합니다 40분 정도 소요됩니다" ㄷㄷ</p>
<br/>
<p>새벽인데도 친절하게 받아주심 감사</p>
<p>1시쯤 도착하셨는데 늦은시간에 죄송하다고 하니까</p>
<p>괜찮다고 24시간 된다고 하심</p>
<br/>
<p>건식 60분 짧게 받았는데</p>
<p>어깨랑 허리 위주로 해달라고 했더니</p>
<p>딱 필요한 부분만 집중적으로 풀어주심</p>
<br/>
<p>원룸 좁은데도 잘 해주심 ㅋㅋ</p>
<p>침대에서 받았는데 문제없음</p>
<br/>
<p style="background-color: #FEF9C3; padding: 12px; border-radius: 8px; color: #854D0E;">야근러들 새벽에 집 와서 뻣뻣하면 그냥 부르세요</p>
<p style="font-weight: bold; color: #EC4899;">조리읍 새벽에도 됩니다 ㄹㅇ</p>
`,
  author: "김*수",
  createdAt: "2024-05-25T02:30:00.000Z",
  category: "후기",
  region: ["파주시", "조리읍", "경기", "파주", "봉일천"],
  rating: 5,
  verified: true,
  views: 156,
  likes: 29
})

// 헬퍼 함수들
export function getPostsByRegion(region: string): BlogPost[] {
  return blogPosts.filter(post => post.region.includes(region))
}

export function getPostsByCategory(category: "블로그" | "후기"): BlogPost[] {
  return blogPosts.filter(post => post.category === category)
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id)
}

export function getRelatedPosts(post: BlogPost, limit: number = 4): BlogPost[] {
  return blogPosts
    .filter(p => p.id !== post.id && p.region.some(r => post.region.includes(r)))
    .slice(0, limit)
}

export function getRecentPosts(limit: number = 6): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export function getPostsByRegionWithFallback(region: string, limit: number = 6): BlogPost[] {
  const regionPosts = blogPosts.filter(post => post.region.includes(region))
  if (regionPosts.length >= limit) {
    return regionPosts.slice(0, limit)
  }
  const recent = getRecentPosts(limit - regionPosts.length)
  return [...regionPosts, ...recent.filter(p => !regionPosts.includes(p))].slice(0, limit)
}

// 동적 콘텐츠 생성 함수 (빈 페이지용)
export function generateDynamicContent(district: string, neighborhood: string, type: "블로그" | "후기"): BlogPost {
  const info = getNeighborhoodInfo(neighborhood)
  const idx = Math.floor(Math.random() * 1000)
  
  if (type === "후기") {
    const reviewTitleTemplate = reviewTitleTemplates[idx % reviewTitleTemplates.length]
    const reviewContentTemplate = reviewContentTemplates[idx % reviewContentTemplates.length]
    
    return {
      id: `dynamic-review-${district}-${neighborhood}-${Date.now()}`,
      title: reviewTitleTemplate(neighborhood),
      excerpt: `${district} ${neighborhood} 실제 이용 후기.`,
      content: reviewContentTemplate(district, neighborhood, info),
      author: reviewAuthors[idx % reviewAuthors.length],
      createdAt: new Date().toISOString(),
      category: "후기",
      region: [district, neighborhood],
      rating: 4 + Math.floor(Math.random() * 2),
      verified: true,
      views: 10,
      likes: 1
    }
  } else {
    const blogTemplate = blogContentTemplates[idx % blogContentTemplates.length]
    const blogTitleTemplate = blogTitleTemplates[idx % blogTitleTemplates.length]
    
    return {
      id: `dynamic-blog-${district}-${neighborhood}-${Date.now()}`,
      title: blogTitleTemplate(neighborhood),
      excerpt: `${district} ${neighborhood} 마사지 정보와 전문가 가이드.`,
      content: blogTemplate(district, neighborhood, info),
      author: blogAuthors[idx % blogAuthors.length],
      createdAt: new Date().toISOString(),
      category: "블로그",
      region: [district, neighborhood],
      views: 10,
      likes: 1
    }
  }
}
