import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 한국 주요 도시 매핑 (Vercel의 geo 데이터 기반)
const cityMapping: Record<string, string> = {
  'Seoul': '서울',
  'Incheon': '인천',
  'Suwon': '수원',
  'Seongnam': '성남',
  'Goyang': '고양',
  'Yongin': '용인',
  'Bucheon': '부천',
  'Ansan': '안산',
  'Anyang': '안양',
  'Namyangju': '남양주',
  'Hwaseong': '화성',
  'Pyeongtaek': '평택',
  'Uijeongbu': '의정부',
  'Siheung': '시흥',
  'Paju': '파주',
  'Gimpo': '김포',
  'Gwangmyeong': '광명',
  'Gwangju': '광주',
  'Gunpo': '군포',
  'Hanam': '하남',
  'Osan': '오산',
  'Icheon': '이천',
  'Anseong': '안성',
  'Uiwang': '의왕',
  'Yangju': '양주',
  'Pocheon': '포천',
  'Yeoju': '여주',
  'Dongducheon': '동두천',
  'Guri': '구리',
  'Gapyeong': '가평',
  'Yeoncheon': '연천',
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Vercel의 geo 데이터에서 도시 정보 추출
  const city = request.geo?.city || ''
  const region = request.geo?.region || ''
  
  // 한국어 도시명으로 변환
  let detectedCity = cityMapping[city] || ''
  
  // 도시를 찾지 못한 경우 region 확인
  if (!detectedCity && region) {
    // 경기도 지역인 경우
    if (region === 'Gyeonggi-do' || region === '41') {
      detectedCity = '경기'
    } else if (region === 'Seoul' || region === '11') {
      detectedCity = '서울'
    } else if (region === 'Incheon' || region === '28') {
      detectedCity = '인천'
    }
  }
  
  // 쿠키에 감지된 위치 저장
  if (detectedCity) {
    response.cookies.set('detected-location', detectedCity, {
      maxAge: 60 * 60 * 24, // 24시간
      path: '/',
    })
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
