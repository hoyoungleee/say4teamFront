import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 번역 리소스 예시
const resources = {
  en: {
    translation: {
      slidertext1: "10,000 won coupon for new Kakao Talk subscription (reception consent required)",
      main1: "A signature collection that reinterprets traditional Persian patterns with Saytouche's own form"
    },
  },
  ko: {
    translation: {
      slidertext1: "카카오톡 신규 가입 시 10,000원 쿠폰 (수신 동의 필수)",
      main1:"전통적인 페르시안 패턴을 세이투셰만의 형태감으로 재해석한 시그니처 컬렉션",
    },
  },
};

i18n
  .use(initReactI18next) // react-i18next 플러그인 적용
  .init({
    resources,
    lng: 'ko', // 초기 언어 설정
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false, // react에서는 기본적으로 XSS 방지
    },
  });

export default i18n;
