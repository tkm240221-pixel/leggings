// 지역 계층 구조 타입 정의
// 서울/인천: 시 > 구 > 동
// 경기(구 있는 시): 시 메인 페이지 + 각 구 페이지
// 경기(구 없는 시): 시 > 동
// 인기 지역: 별도 district로 분리 (동탄, 판교, 광교, 위례 등)

export interface Location {
  name: string
  slug: string
  neighborhoods: string[]
  parentCity?: string
  isCityMain?: boolean
  childDistricts?: string[]
  isPopularArea?: boolean // 인기 지역 표시 (동탄, 판교 등)
}

export interface Region {
  name: string
  slug: string
  districts: Location[]
}

export interface CityGroup {
  cityName: string
  citySlug: string
  districts: Location[]
}

export const regions: Region[] = [
  {
    name: "서울",
    slug: "seoul",
    districts: [
      { name: "강남구", slug: "gangnam", neighborhoods: ["개포동", "논현동", "대치동", "도곡동", "삼성동", "세곡동", "수서동", "신사동", "압구정동", "역삼동", "일원동", "청담동", "자곡동", "율현동"] },
      { name: "강동구", slug: "gangdong", neighborhoods: ["강일동", "고덕동", "길동", "둔촌동", "명일동", "상일동", "성내동", "암사동", "천호동"] },
      { name: "강북구", slug: "gangbuk", neighborhoods: ["미아동", "번동", "수유동", "우이동"] },
      { name: "강서구", slug: "gangseo", neighborhoods: ["가양동", "개화동", "공항동", "과해동", "내발산동", "등촌동", "마곡동", "방화동", "염창동", "오곡동", "오쇠동", "외발산동", "화곡동"] },
      { name: "관악구", slug: "gwanak", neighborhoods: ["남현동", "봉천동", "신림동"] },
      { name: "광진구", slug: "gwangjin", neighborhoods: ["광장동", "구의동", "군자동", "능동", "자양동", "중곡동", "화양동"] },
      { name: "구로구", slug: "guro", neighborhoods: ["가리봉동", "개봉동", "고척동", "구로동", "궁동", "신도림동", "오류동", "온수동", "천왕동", "항동"] },
      { name: "금천구", slug: "geumcheon", neighborhoods: ["가산동", "독산동", "시흥동"] },
      { name: "노원구", slug: "nowon", neighborhoods: ["공릉동", "상계동", "월계동", "중계동", "하계동"] },
      { name: "도봉구", slug: "dobong", neighborhoods: ["도봉동", "방학동", "쌍문동", "창동"] },
      { name: "동대문구", slug: "dongdaemun", neighborhoods: ["답십리동", "용두동", "이문동", "장안동", "전농동", "제기동", "청량리동", "회기동", "휘경동"] },
      { name: "동작구", slug: "dongjak", neighborhoods: ["노량진동", "대방동", "동작동", "본동", "사당동", "상도동", "신대방동", "흑석동"] },
      { name: "마포구", slug: "mapo", neighborhoods: ["공덕동", "노고산동", "대흥동", "도화동", "마포동", "망원동", "상수동", "서교동", "성산동", "신공덕동", "신수동", "신정동", "아현동", "연남동", "염리동", "용강동", "중동", "창전동", "합정동", "현석동"] },
      { name: "서대문구", slug: "seodaemun", neighborhoods: ["남가좌동", "북가좌동", "북아현동", "신촌동", "연희동", "영천동", "옥천동", "창천동", "천연동", "충정로", "홍은동", "홍제동"] },
      { name: "서초구", slug: "seocho", neighborhoods: ["내곡동", "반포동", "방배동", "서초동", "신원동", "양재동", "염곡동", "우면동", "원지동", "잠원동"] },
      { name: "성동구", slug: "seongdong", neighborhoods: ["금호동", "도선동", "마장동", "사근동", "상왕십리동", "성수동", "송정동", "옥수동", "용답동", "응봉동", "하왕십리동", "행당동", "홍익동"] },
      { name: "성북구", slug: "seongbuk", neighborhoods: ["길음동", "돈암동", "동선동", "동소문동", "보문동", "삼선동", "상월곡동", "석관동", "성북동", "안암동", "장위동", "정릉동", "종암동", "하월곡동"] },
      { name: "송파구", slug: "songpa", neighborhoods: ["가락동", "거여동", "마천동", "문정동", "방이동", "삼전동", "석촌동", "송파동", "신천동", "오금동", "위례동", "잠실동", "장지동", "풍납동"] },
      { name: "양천구", slug: "yangcheon", neighborhoods: ["목동", "신월동", "신정동"] },
      { name: "영등포구", slug: "yeongdeungpo", neighborhoods: ["당산동", "대림동", "도림동", "문래동", "신길동", "양평동", "여의도동", "영등포동"] },
      { name: "용산구", slug: "yongsan", neighborhoods: ["갈월동", "남영동", "도원동", "동빙고동", "동자동", "문배동", "보광동", "서계동", "서빙고동", "신계동", "용문동", "용산동", "이촌동", "이태원동", "청파동", "한강로", "한남동", "효창동", "후암동"] },
      { name: "은평구", slug: "eunpyeong", neighborhoods: ["갈현동", "구산동", "녹번동", "대조동", "불광동", "수색동", "신사동", "역촌동", "응암동", "증산동", "진관동"] },
      { name: "종로구", slug: "jongno", neighborhoods: ["가회동", "계동", "공평동", "관훈동", "교남동", "누상동", "누하동", "돈의동", "동숭동", "명륜동", "무악동", "부암동", "사직동", "삼청동", "세종로", "송월동", "숭인동", "신영동", "안국동", "연건동", "옥인동", "이화동", "인사동", "장사동", "종로", "창신동", "청운동", "청진동", "통의동", "평창동", "혜화동", "홍지동", "화동", "효자동"] },
      { name: "중구", slug: "junggu", neighborhoods: ["광희동", "남대문로", "남산동", "다동", "명동", "무교동", "방산동", "봉래동", "서소문동", "소공동", "신당동", "을지로", "인현동", "장충동", "정동", "중림동", "충무로", "필동", "회현동"] },
      { name: "중랑구", slug: "jungnang", neighborhoods: ["망우동", "면목동", "묵동", "상봉동", "신내동", "중화동"] }
    ]
  },
  {
    name: "경기",
    slug: "gyeonggi",
    districts: [
      // ===== 인기 지역 (별도 district로 분리) =====
      { name: "동탄", slug: "dongtan", neighborhoods: ["동탄1동", "동탄2동", "동탄3동", "동탄4동", "동탄5동", "동탄6동", "동탄7동", "동탄8동", "능동", "기배동", "오산동", "청계동", "영천동", "목동", "방교동", "산척동", "석우동", "송동", "신동", "장지동", "중동", "청오동"], isPopularArea: true },
      { name: "판교", slug: "pangyo", neighborhoods: ["판교동", "삼평동", "백현동", "운중동", "하산운동", "대장동", "금곡동", "궁내동"], isPopularArea: true },
      { name: "분당", slug: "bundang", neighborhoods: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "구미동", "동원동", "율동", "내정동", "정자1동", "정자2동", "정자3동"], isPopularArea: true },
      { name: "광교", slug: "gwanggyo", neighborhoods: ["광교동", "이의동", "원천동", "하동", "영덕동", "신동", "태장동", "상현동", "광교1동", "광교2동"], isPopularArea: true },
      { name: "일산", slug: "ilsan", neighborhoods: ["마두동", "백석동", "장항동", "정발산동", "주엽동", "대화동", "탄현동", "일산동", "풍동", "식사동", "중산동", "가좌동", "덕이동"], isPopularArea: true },
      { name: "위례", slug: "wirye", neighborhoods: ["위례동", "위례1동", "위례2동", "위례3동", "창곡동", "학암동"], isPopularArea: true },
      { name: "운정", slug: "unjeong", neighborhoods: ["운정1동", "운정2동", "운정3동", "와동동", "다율동", "목동동", "당하동", "서패동", "오도동", "야당동", "동패동"], isPopularArea: true },
      { name: "별내", slug: "byeollae", neighborhoods: ["별내동", "별내1동", "별내2동", "청학동", "용암동", "화접동", "광전동"], isPopularArea: true },
      { name: "미사", slug: "misa", neighborhoods: ["미사동", "미사1동", "미사2동", "풍산동", "망월동", "선동"], isPopularArea: true },
      { name: "다산", slug: "dasan", neighborhoods: ["다산동", "다산1동", "다산2동", "지금동", "도농동", "수석동", "창현동", "양정동", "삼패동"], isPopularArea: true },
      { name: "배곧", slug: "baegot", neighborhoods: ["배곧동", "배곧1동", "배곧2동", "정왕동", "월곶동", "장곡동"], isPopularArea: true },
      { name: "송도", slug: "songdo", neighborhoods: ["송도동", "송도1동", "송도2동", "송도3동", "송도4동", "동춘동", "연수동"], isPopularArea: true },
      { name: "청라", slug: "cheongna", neighborhoods: ["청라동", "청라1동", "청라2동", "청라3동", "경서동", "연희동", "시천동"], isPopularArea: true },
      { name: "검단", slug: "geomdan", neighborhoods: ["검단동", "검단1동", "검단2동", "검단3동", "검단4동", "검단5동", "불로동", "원당동", "마전동", "당하동", "대곡동"], isPopularArea: true },
      
      // ===== 수원시 (4개구) =====
      { name: "수원시", slug: "suwon", neighborhoods: [], isCityMain: true, childDistricts: ["suwon-jangan", "suwon-gwonseon", "suwon-paldal", "suwon-yeongtong"] },
      { name: "수원 장안구", slug: "suwon-jangan", neighborhoods: ["파장동", "율전동", "이목동", "정자동", "송죽동", "조원동", "연무동", "영화동", "천천동", "서둔동", "화서동", "대황교동", "상광교동", "하광교동", "장안동", "영화1동", "영화2동", "송죽1동", "송죽2동"], parentCity: "수원시" },
      { name: "수원 권선구", slug: "suwon-gwonseon", neighborhoods: ["세류동", "평동", "고색동", "오목천동", "권선동", "금곡동", "호매실동", "입북동", "당수동", "평리동", "곡선동", "탑동", "구운동", "장지동", "권선1동", "권선2동", "세류1동", "세류2동", "세류3동", "호매실동"], parentCity: "수원시" },
      { name: "수원 팔달구", slug: "suwon-paldal", neighborhoods: ["인계동", "매교동", "매산동", "고등동", "화서동", "지동", "우만동", "교동", "남창동", "북수동", "남수동", "장안동", "매향동", "팔달로", "신풍동", "행궁동", "매산로1가", "매산로2가", "매산로3가"], parentCity: "수원시" },
      { name: "수원 영통구", slug: "suwon-yeongtong", neighborhoods: ["매탄동", "원천동", "영통동", "이의동", "광교동", "신동", "망포동", "하동", "태장동", "영덕동", "신리동", "중동", "매탄1동", "매탄2동", "매탄3동", "매탄4동", "영통1동", "영통2동", "영통3동"], parentCity: "수원시" },
      
      // ===== 성남시 (3개구) =====
      { name: "성남시", slug: "seongnam", neighborhoods: [], isCityMain: true, childDistricts: ["seongnam-sujeong", "seongnam-jungwon", "seongnam-bundang"] },
      { name: "성남 수정구", slug: "seongnam-sujeong", neighborhoods: ["신흥동", "태평동", "수진동", "단대동", "산성동", "양지동", "복정동", "창곡동", "시흥동", "고등동", "오야동", "심곡동", "둔전동", "사송동", "금토동", "신흥1동", "신흥2동", "신흥3동", "태평1동", "태평2동", "태평3동", "태평4동", "수진1동", "수진2동"], parentCity: "성남시" },
      { name: "성남 중원구", slug: "seongnam-jungwon", neighborhoods: ["성남동", "금광동", "은행동", "상대원동", "하대원동", "도촌동", "여수동", "갈현동", "중앙동", "상대원1동", "상대원2동", "상대원3동", "금광1동", "금광2동", "은행1동", "은행2동", "성남동"], parentCity: "성남시" },
      { name: "성남 분당구", slug: "seongnam-bundang", neighborhoods: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "판교동", "삼평동", "백현동", "운중동", "구미동", "금곡동", "궁내동", "동원동", "율동", "하산운동", "대장동", "야탑1동", "야탑2동", "야탑3동", "서현1동", "서현2동", "분당동", "수내1동", "수내2동", "수내3동", "정자1동", "정자2동", "정자3동", "구미1동", "구미동"], parentCity: "성남시" },
      
      // ===== 고양시 (3개구) =====
      { name: "고양시", slug: "goyang", neighborhoods: [], isCityMain: true, childDistricts: ["goyang-deokyang", "goyang-ilsandong", "goyang-ilsanseo"] },
      { name: "고양 덕양구", slug: "goyang-deokyang", neighborhoods: ["주교동", "원당동", "성사동", "화정동", "행신동", "능곡동", "향동동", "삼송동", "지축동", "도내동", "화전동", "신도동", "내유동", "신평동", "토당동", "벽제동", "관산동", "용두동", "대자동", "선유동", "행신1동", "행신2동", "행신3동", "화정1동", "화정2동"], parentCity: "고양시" },
      { name: "고양 일산동구", slug: "goyang-ilsandong", neighborhoods: ["마두동", "백석동", "장항동", "정발산동", "풍동", "식사동", "중산동", "사리현동", "산황동", "설문동", "성석동", "오금동", "지영동", "문봉동", "동산동", "마두1동", "마두2동", "백석1동", "백석2동", "장항1동", "장항2동", "정발산동", "풍산동"], parentCity: "고양시" },
      { name: "고양 일산서구", slug: "goyang-ilsanseo", neighborhoods: ["탄현동", "일산동", "주엽동", "대화동", "덕이동", "가좌동", "구산동", "법곳동", "송포동", "가재울동", "문촌동", "산황동", "일산1동", "일산2동", "일산3동", "주엽1동", "주엽2동", "탄현1동", "탄현2동", "대화동"], parentCity: "고양시" },
      
      // ===== 용인시 (3개구) =====
      { name: "용인시", slug: "yongin", neighborhoods: [], isCityMain: true, childDistricts: ["yongin-cheoin", "yongin-giheung", "yongin-suji"] },
      { name: "용인 처인구", slug: "yongin-cheoin", neighborhoods: ["김량장동", "역북동", "삼가동", "유방동", "마평동", "남동", "해곡동", "고림동", "운학동", "호동", "역동", "유림동", "포곡읍", "모현읍", "이동읍", "남사읍", "원삼면", "백암면", "중앙동"], parentCity: "용인시" },
      { name: "용인 기흥구", slug: "yongin-giheung", neighborhoods: ["구갈동", "상갈동", "보라동", "신갈동", "영덕동", "구성동", "마북동", "동백동", "보정동", "언남동", "공세동", "고매동", "중동", "하갈동", "상하동", "지곡동", "청덕동", "신갈1동", "신갈2동", "구갈동", "상갈동", "기흥동", "보라동"], parentCity: "용인시" },
      { name: "용인 수지구", slug: "yongin-suji", neighborhoods: ["풍덕천동", "죽전동", "동천동", "상기동", "신봉동", "성복동", "상현동", "손곡동", "정평동", "광교동", "신리동", "율동", "풍덕천1동", "풍덕천2동", "죽전1동", "죽전2동", "상현1동", "상현2동"], parentCity: "용인시" },
      
      // ===== 안양시 (2개구) =====
      { name: "안양시", slug: "anyang", neighborhoods: [], isCityMain: true, childDistricts: ["anyang-manan", "anyang-dongan"] },
      { name: "안양 만안구", slug: "anyang-manan", neighborhoods: ["안양동", "석수동", "박달동", "안양1동", "안양2동", "안양3동", "안양4동", "안양5동", "안양6동", "안양7동", "안양8동", "안양9동", "석수1동", "석수2동", "석수3동", "박달1동", "박달2동", "박달동"], parentCity: "안양시" },
      { name: "안양 동안구", slug: "anyang-dongan", neighborhoods: ["비산동", "관양동", "평촌동", "호계동", "범계동", "귀인동", "달안동", "신촌동", "비산1동", "비산2동", "비산3동", "관양1동", "관양2동", "평촌동", "평안동", "부림동", "부흥동", "달안동", "호계1동", "호계2동", "호계3동"], parentCity: "안양시" },
      
      // ===== 안산시 (2개구) =====
      { name: "안산시", slug: "ansan", neighborhoods: [], isCityMain: true, childDistricts: ["ansan-sangnok", "ansan-danwon"] },
      { name: "안산 상록구", slug: "ansan-sangnok", neighborhoods: ["사동", "본오동", "이동", "부곡동", "월피동", "성포동", "일동", "건건동", "팔곡동", "장하동", "수암동", "안산동", "장상동", "사1동", "사2동", "사3동", "본오1동", "본오2동", "본오3동", "반월동", "건건동"], parentCity: "안산시" },
      { name: "안산 단원구", slug: "ansan-danwon", neighborhoods: ["고잔동", "원곡동", "선부동", "초지동", "와동", "대부동", "신길동", "목내동", "화정동", "사리동", "성곡동", "원시동", "풍도동", "육도동", "고잔1동", "고잔2동", "원곡본동", "선부1동", "선부2동", "선부3동", "대부동", "초지동"], parentCity: "안산시" },
      
      // ===== 부천시 (3개구) =====
      { name: "부천시", slug: "bucheon", neighborhoods: [], isCityMain: true, childDistricts: ["bucheon-wonmi", "bucheon-sosa", "bucheon-ojeong"] },
      { name: "부천 원미구", slug: "bucheon-wonmi", neighborhoods: ["중동", "상동", "심곡동", "원미동", "역곡동", "춘의동", "도당동", "송내동", "약대동", "중1동", "중2동", "중3동", "중4동", "상1동", "상2동", "상3동", "심곡1동", "심곡2동", "심곡3동", "심곡본동", "원미1동", "원미2동", "역곡1동", "역곡2동", "역곡3동", "춘의동", "도당동", "약대동", "송내1동", "송내2동", "중앙동", "여월동", "원종동"], parentCity: "부천시" },
      { name: "부천 소사구", slug: "bucheon-sosa", neighborhoods: ["소사동", "소사본동", "범박동", "괴안동", "옥길동", "심곡동", "소사본1동", "소사본2동", "소사본3동", "소사본4동", "심곡본1동", "심곡본2동", "범박1동", "범박2동", "괴안동", "역곡1동", "역곡2동", "옥길동", "신기동", "송내1동", "송내2동"], parentCity: "부천시" },
      { name: "부천 오정구", slug: "bucheon-ojeong", neighborhoods: ["오정동", "고강동", "삼정동", "내동", "대장동", "원종동", "작동", "성곡동", "신흥동", "고강1동", "고강본동", "오정1동", "오정2동", "원종1동", "원종2동", "대장동", "삼정동", "내동", "신기동"], parentCity: "부천시" },
      
      // ===== 화성시 =====
      { name: "화성시", slug: "hwaseong", neighborhoods: ["병점동", "진안동", "반송동", "기안동", "향남읍", "봉담읍", "새솔동", "남양읍", "매송면", "우정읍", "비봉면", "마도면", "서신면", "송산면", "팔탄면", "장안면", "정남면", "양감면", "병점1동", "병점2동", "진안동", "반송동", "동탄면", "남양동", "태안동", "화산동", "반월동", "화성시청", "송산동"] },
      
      // ===== 평택시 =====
      { name: "평택시", slug: "pyeongtaek", neighborhoods: ["평택동", "서정동", "신장동", "팽성읍", "청북읍", "고덕동", "비전동", "세교동", "지산동", "진위면", "소사동", "독곡동", "이충동", "모곡동", "합정동", "통복동", "비전1동", "비전2동", "안중읍", "오성면", "청북면", "포승읍", "현덕면", "신장1동", "신장2동", "원평동", "중앙동", "서정동", "송탄동", "지제동", "송북동", "송탄출장소"] },
      
      // ===== 시흥시 =====
      { name: "시흥시", slug: "siheung", neighborhoods: ["대야동", "신천동", "은행동", "정왕동", "배곧동", "월곶동", "거모동", "목감동", "능곡동", "장곡동", "장현동", "과림동", "계수동", "하중동", "하상동", "포동", "연성동", "조남동", "매화동", "도창동", "방산동", "신현동", "대야1동", "대야2동", "은행1동", "은행2동", "정왕1동", "정왕2동", "정왕3동", "정왕4동", "정왕본동", "장곡동", "능곡동", "목감동", "신현동"] },
      
      // ===== 김포시 =====
      { name: "김포시", slug: "gimpo", neighborhoods: ["사우동", "풍무동", "장기동", "구래동", "마산동", "운양동", "감정동", "걸포동", "고촌읍", "양촌읍", "대곶면", "통진읍", "월곶면", "하성면", "북변동", "김포1동", "김포2동", "장기1동", "장기2동", "장기3동", "장기4동", "구래1동", "구래2동", "사우동", "풍무1동", "풍무2동", "고촌읍", "양촌읍"] },
      
      // ===== 광명시 =====
      { name: "광명시", slug: "gwangmyeong", neighborhoods: ["광명동", "철산동", "하안동", "소하동", "일직동", "옥길동", "가학동", "노온사동", "광명1동", "광명2동", "광명3동", "광명4동", "광명5동", "광명6동", "광명7동", "철산1동", "철산2동", "철산3동", "철산4동", "하안1동", "하안2동", "하안3동", "하안4동", "소하1동", "소하2동"] },
      
      // ===== 군포시 =====
      { name: "군포시", slug: "gunpo", neighborhoods: ["산본동", "금정동", "당동", "부곡동", "대야미동", "광정동", "군포1동", "군포2동", "산본1동", "산본2동", "금정1동", "금정2동", "재궁동", "오금동", "속달동", "둔대동", "당동", "당정동", "궁내동"] },
      
      // ===== 하남시 =====
      { name: "하남시", slug: "hanam", neighborhoods: ["신장동", "덕풍동", "풍산동", "미사동", "위례동", "감일동", "창우동", "춘궁동", "하산곡동", "초이동", "감이동", "선동", "하남1동", "하남2동", "하남3동", "미사1동", "미사2동", "감일1동", "감일2동", "위례1동", "위례2동", "위례3동", "산곡동", "덕산동", "초일동", "학암동"] },
      
      // ===== 광주시 (경기) =====
      { name: "광주시", slug: "gwangju-gg", neighborhoods: ["경안동", "송정동", "태전동", "오포읍", "초월읍", "곤지암읍", "퇴촌면", "역동", "쌍령동", "탄벌동", "양벌동", "중대동", "남한산성면", "도척면", "광남1동", "광남2동", "송정1동", "송정2동", "중앙동", "경안동", "실촌읍"] },
      
      // ===== 이천시 =====
      { name: "이천시", slug: "icheon", neighborhoods: ["중리동", "관고동", "창전동", "부발읍", "마장면", "장호원읍", "증포동", "대월면", "신둔면", "모가면", "백사면", "율면", "호법면", "설성면", "갈산동", "안흥동", "사음동", "단월동", "진리동", "송정동", "고담동", "사실동", "중앙동"] },
      
      // ===== 파주시 =====
      { name: "파주시", slug: "paju", neighborhoods: ["금촌동", "야당동", "운정동", "교하동", "문산읍", "파주읍", "조리읍", "탄현면", "법원읍", "광탄면", "월롱면", "파평면", "적성면", "군내면", "장단면", "진동면", "진서면", "오도동", "와동동", "동패동", "다율동", "목동동", "당하동", "서패동", "운정1동", "운정2동", "운정3동", "금촌1동", "금촌2동", "교하동", "조리읍"] },
      
      // ===== 의정부시 =====
      { name: "의정부시", slug: "uijeongbu", neighborhoods: ["의정부동", "호원동", "신곡동", "녹양동", "민락동", "가능동", "장암동", "금오동", "용현동", "낙양동", "의정부1동", "의정부2동", "의정부3동", "호원1동", "호원2동", "신곡1동", "신곡2동", "가능1동", "가능2동", "가능3동", "녹양동", "자금동", "산곡동", "송산동"] },
      
      // ===== 양주시 =====
      { name: "양주시", slug: "yangju", neighborhoods: ["양주동", "회천동", "옥정동", "고읍동", "덕계동", "백석읍", "덕정동", "봉양동", "삼숭동", "마전동", "회정동", "은현면", "남면", "광적면", "장흥면", "회천1동", "회천2동", "회천3동", "회천4동", "옥정1동", "옥정2동", "옥정3동", "고덕동", "율정동"] },
      
      // ===== 구리시 =====
      { name: "구리시", slug: "guri", neighborhoods: ["인창동", "교문동", "수택동", "토평동", "갈매동", "사노동", "아천동", "교문1동", "교문2동", "수택1동", "수택2동", "수택3동", "인창동", "동구동", "갈매1동", "갈매2동"] },
      
      // ===== 남양주시 =====
      { name: "남양주시", slug: "namyangju", neighborhoods: ["다산동", "별내동", "호평동", "평내동", "금곡동", "진접읍", "화도읍", "오남읍", "퇴계원읍", "진건읍", "와부읍", "별내면", "수동면", "조안면", "다산1동", "다산2동", "별내1동", "별내2동", "지금동", "도농동", "수석동", "창현동", "양정동", "호평동", "평내동"] },
      
      // ===== 오산시 =====
      { name: "오산시", slug: "osan", neighborhoods: ["오산동", "원동", "세마동", "초평동", "대원동", "신장동", "궐동", "청학동", "벌음동", "가수동", "수청동", "양산동", "지곶동", "내삼미동", "외삼미동", "탑동", "갈곶동", "오산1동", "오산2동", "신장동", "중앙동", "남촌동"] },
      
      // ===== 의왕시 =====
      { name: "의왕시", slug: "uiwang", neighborhoods: ["내손동", "오전동", "삼동", "고천동", "포일동", "청계동", "월암동", "왕곡동", "초평동", "이동", "부곡동", "학의동", "의왕1동", "의왕2동", "고천1동", "고천2동", "오전동", "청계동", "내손1동", "내손2동", "포일동"] },
      
      // ===== 여주시 =====
      { name: "여주시", slug: "yeoju", neighborhoods: ["여주동", "가남읍", "흥천면", "점동면", "북내면", "강천면", "대신면", "능서면", "산북면", "금사면", "세종로", "오학동", "창동", "교동", "단현동", "우만동", "상동", "하동", "가업동", "연라동", "중앙동"] },
      
      // ===== 동두천시 =====
      { name: "동두천시", slug: "dongducheon", neighborhoods: ["동두천동", "생연동", "지행동", "보산동", "소요동", "송내동", "광암동", "탑동", "안흥동", "상패동", "하봉암동", "상봉암동", "걸산동", "동두천1동", "동두천2동", "생연1동", "생연2동", "불현동", "중앙동"] },
      
      // ===== 포천시 =====
      { name: "포천시", slug: "pocheon", neighborhoods: ["신읍동", "선단동", "소흘읍", "일동면", "이동면", "영중면", "창수면", "군내면", "내촌면", "가산면", "신북면", "화현면", "영북면", "관인면", "포천동", "어룡동", "자작동", "동교동", "설운동"] },
      
      // ===== 안성시 =====
      { name: "안성시", slug: "anseong", neighborhoods: ["안성동", "공도읍", "원곡면", "미양면", "대덕면", "금광면", "삼죽면", "고삼면", "보개면", "서운면", "죽산면", "일죽면", "안성1동", "안성2동", "안성3동", "봉산동", "명륜동", "도기동", "사곡동", "가사동", "연지동", "성남동", "동본동", "서본동"] },
      
      // ===== 과천시 =====
      { name: "과천시", slug: "gwacheon", neighborhoods: ["과천동", "갈현동", "별양동", "중앙동", "문원동", "부림동", "주암동", "막계동", "관문동", "원문동", "과천1동", "과천2동", "과천3동", "과천4동", "과천5동"] },
      
      // ===== 가평군 =====
      { name: "가평군", slug: "gapyeong", neighborhoods: ["가평읍", "청평면", "설악면", "상면", "북면", "조종면", "가평리", "읍내리", "대곡리", "경반리", "승안리", "마장리", "달전리", "두밀리", "이화리", "호명리"] },
      
      // ===== 양평군 =====
      { name: "양평군", slug: "yangpyeong", neighborhoods: ["양평읍", "옥천면", "용문면", "지평면", "강상면", "양서면", "서종면", "청운면", "단월면", "개군면", "양동면", "강하면", "양평리", "회현리", "공흥리", "도곡리", "오빈리", "창대리", "용문리"] },
      
      // ===== 연천군 =====
      { name: "연천군", slug: "yeoncheon", neighborhoods: ["연천읍", "전곡읍", "청산면", "백학면", "왕징면", "미산면", "중면", "군남면", "신서면", "연천리", "차탄리", "고문리", "옥계리", "통현리", "은대리", "궁평리"] }
    ]
  },
  {
    name: "인천",
    slug: "incheon",
    districts: [
      { name: "중구", slug: "jung-ic", neighborhoods: ["관동", "내동", "답동", "도원동", "무의동", "북성동", "사동", "선린동", "선화동", "신생동", "신포동", "신흥동", "영종동", "운남동", "운서동", "율목동", "인현동", "전동", "중앙동", "해안동", "항동", "영종1동", "영종2동", "중산동"] },
      { name: "동구", slug: "dong-ic", neighborhoods: ["금곡동", "송림동", "송현동", "창영동", "화수동", "화평동", "만석동", "송림1동", "송림2동", "송림3동", "송림4동", "송림5동", "송림6동"] },
      { name: "미추홀구", slug: "michuhol", neighborhoods: ["관교동", "도화동", "문학동", "숭의동", "용현동", "주안동", "학익동", "주안1동", "주안2동", "주안3동", "주안4동", "주안5동", "주안6동", "주안7동", "주안8동", "용현1동", "용현2동", "용현3동", "용현4동", "용현5동", "숭의1동", "숭의2동", "숭의3동", "숭의4동", "도화1동", "도화2동", "도화3동", "문학동"] },
      { name: "연수구", slug: "yeonsu", neighborhoods: ["동춘동", "선학동", "송도동", "연수동", "옥련동", "청학동", "송도1동", "송도2동", "송도3동", "송도4동", "연수1동", "연수2동", "연수3동"] },
      { name: "남동구", slug: "namdong", neighborhoods: ["간석동", "고잔동", "구월동", "남촌동", "논현동", "도림동", "만수동", "서창동", "수산동", "운연동", "간석1동", "간석2동", "간석3동", "간석4동", "구월1동", "구월2동", "구월3동", "구월4동", "만수1동", "만수2동", "만수3동", "만수4동", "만수5동", "만수6동", "장수서창동", "논현1동", "논현2동", "논현고잔동"] },
      { name: "부평구", slug: "bupyeong", neighborhoods: ["갈산동", "계산동", "부개동", "부평동", "산곡동", "삼산동", "십정동", "일신동", "청천동", "부평1동", "부평2동", "부평3동", "부평4동", "부평5동", "부평6동", "산곡1동", "산곡2동", "산곡3동", "산곡4동", "청천1동", "청천2동", "부개1동", "부개2동", "부개3동", "삼산1동", "삼산2동"] },
      { name: "계양구", slug: "gyeyang", neighborhoods: ["계산동", "귤현동", "다남동", "동양동", "목상동", "박촌동", "병방동", "상야동", "서운동", "용종동", "이화동", "임학동", "작전동", "효성동", "평동", "계산1동", "계산2동", "계산3동", "계산4동", "작전1동", "작전2동", "작전서운동", "효성1동", "효성2동", "계양1동", "계양2동", "계양3동"] },
      { name: "서구", slug: "seo-ic", neighborhoods: ["가정동", "가좌동", "검단동", "경서동", "공촌동", "금곡동", "당하동", "대곡동", "마전동", "백석동", "불로동", "석남동", "시천동", "신현동", "연희동", "오류동", "왕길동", "원당동", "원창동", "청라동", "검단1동", "검단2동", "검단3동", "검단4동", "검단5동", "석남1동", "석남2동", "석남3동", "가정1동", "가정2동", "가정3동", "청라1동", "청라2동", "청라3동", "경서1동", "경서2동", "검암동"] },
      { name: "강화군", slug: "ganghwa", neighborhoods: ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "강화읍내리", "국화리", "관청리", "갑곶리", "신정리", "월곶리", "옥림리", "대산리"] },
      { name: "옹진군", slug: "ongjin", neighborhoods: ["북도면", "백령면", "대청면", "덕적면", "자월면", "영흥면", "연평면", "진촌리", "당산리", "사곶리", "시도리", "이작리", "승봉리", "대이작리", "소이작리"] }
    ]
  }
]

// 경기도 시 그룹 가져오기 (메뉴용)
export function getGyeonggiCityGroups(): CityGroup[] {
  const gyeonggi = regions.find(r => r.slug === "gyeonggi")
  if (!gyeonggi) return []
  
  const cityMap = new Map<string, Location[]>()
  const standaloneDistricts: Location[] = []
  const popularAreas: Location[] = []
  
  gyeonggi.districts.forEach(district => {
    if (district.isCityMain) return
    
    // 인기 지역은 별도로 분리
    if (district.isPopularArea) {
      popularAreas.push(district)
      return
    }
    
    if (district.parentCity) {
      const existing = cityMap.get(district.parentCity) || []
      existing.push(district)
      cityMap.set(district.parentCity, existing)
    } else {
      standaloneDistricts.push(district)
    }
  })
  
  const result: CityGroup[] = []
  
  // 인기 지역을 맨 앞에 추가
  popularAreas.forEach(area => {
    result.push({
      cityName: area.name,
      citySlug: area.slug,
      districts: [area]
    })
  })
  
  cityMap.forEach((districts, cityName) => {
    const citySlug = districts[0].slug.split("-")[0]
    result.push({ cityName, citySlug, districts })
  })
  
  standaloneDistricts.forEach(district => {
    result.push({
      cityName: district.name,
      citySlug: district.slug,
      districts: [district]
    })
  })
  
  return result
}

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug)
}

export function getDistrictBySlug(regionSlug: string, districtSlug: string): Location | undefined {
  const region = getRegionBySlug(regionSlug)
  if (!region) return undefined
  return region.districts.find((d) => d.slug === districtSlug)
}

export function getAllDistricts(): { region: Region; district: Location }[] {
  const result: { region: Region; district: Location }[] = []
  regions.forEach(region => {
    region.districts.forEach(district => {
      result.push({ region, district })
    })
  })
  return result
}

export function getChildDistricts(regionSlug: string, citySlug: string): Location[] {
  const region = getRegionBySlug(regionSlug)
  if (!region) return []
  
  const cityMain = region.districts.find(d => d.slug === citySlug && d.isCityMain)
  if (!cityMain || !cityMain.childDistricts) return []
  
  return cityMain.childDistricts
    .map(slug => region.districts.find(d => d.slug === slug))
    .filter((d): d is Location => d !== undefined)
}

export function isCityMainPage(regionSlug: string, districtSlug: string): boolean {
  const district = getDistrictBySlug(regionSlug, districtSlug)
  return district?.isCityMain === true
}

export function getDistrictDisplayName(name: string): string {
  const specialCases: Record<string, string> = {
    "구로구": "구로",
    "중구": "중구",
    "동구": "동구",
    "서구": "서구",
    "남구": "남구",
    "북구": "북구",
    "구리시": "구리",
  }
  
  if (specialCases[name]) return specialCases[name]
  
  if (name.includes(" ")) {
    const parts = name.split(" ")
    const city = parts[0]
    const gu = parts[1].endsWith("구") ? parts[1].slice(0, -1) : parts[1]
    return `${city} ${gu}`
  }
  
  if (name.endsWith("구") && name.length > 2) return name.slice(0, -1)
  if (name.endsWith("시") && name.length > 2) return name.slice(0, -1)
  if (name.endsWith("군") && name.length > 2) return name.slice(0, -1)
  
  return name
}

export function getNearbyNeighborhoods(
  regionSlug: string, 
  districtSlug: string, 
  currentNeighborhood: string, 
  limit: number = 15
): { neighborhood: string; url: string }[] {
  const district = getDistrictBySlug(regionSlug, districtSlug)
  if (!district) return []
  
  return district.neighborhoods
    .filter(n => n !== currentNeighborhood)
    .slice(0, limit)
    .map(n => ({
      neighborhood: n,
      url: `/${regionSlug}/${districtSlug}/${encodeURIComponent(n)}`
    }))
}

export function getSameCityDistricts(regionSlug: string, districtSlug: string): Location[] {
  const district = getDistrictBySlug(regionSlug, districtSlug)
  if (!district || !district.parentCity) return []
  
  const region = getRegionBySlug(regionSlug)
  if (!region) return []
  
  return region.districts.filter(d => 
    d.parentCity === district.parentCity && d.slug !== districtSlug && !d.isCityMain
  )
}

// 인기 지역 목록 가져오기
export function getPopularAreas(regionSlug: string): Location[] {
  const region = getRegionBySlug(regionSlug)
  if (!region) return []
  
  return region.districts.filter(d => d.isPopularArea === true)
}
