import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      slidertext1:
        '10,000 won coupon for new Kakao Talk subscription (reception consent required)',
      main1:
        "A signature collection that reinterprets traditional Persian patterns with Saytouche's own form",
      main2: '$175.00',
      main3: '$48.00',
      main4: '$96.00',
      maintext1:
        'It carefully selected domestic white porcelain, and at the fingertips of a craftsman with more than 40 years of experience',
      maintext2:
        'A mother-of-pearl collection completed through a delicate process and elaborate finish that is cut and carefully pasted piece by piece.',
      keyword1: "#MD'S PICK",
      keyword2: '#GIFT',
      keyword3: '#BLACK',
      keyword4: '#DESKTERIOR',
      company1:
        '‘TOUCHÉ’ is a word you shout when your opponent scores against you in fencing.',
      company2:
        "It means that you admit that you were pricked by your opponent. Nowadays, the word has eastablished itself as an expression of agreeing with someone's words.",
      company3:
        "Under the motto, 'a design on the boundary between a product and an artwork', SAY TOUCHÉ reinterprets lifestyle items from our perspectives.",
      store1: '',
      store2: '',
      store3: '',
      store4: '',
      store5: '',
      store6: '',
      store7: '',
      store8: '',
      storetitle1: 'OHouse Binaryshop',
      storetitle2: 'Kakao Gift',
      storetitle3: 'Hyundai M·Mall',
    },
  },
  ko: {
    translation: {
      slidertext1: '카카오톡 신규 가입 시 10,000원 쿠폰 (수신 동의 필수)',
      main1:
        '전통적인 페르시안 패턴을 세이투셰만의 형태감으로 재해석한 시그니처 컬렉션',
      main2: '170,000원',
      main3: '49000원',
      main4: '98000원',
      maintext1:
        '국내산 백자개를 엄선하여, 40년 이상 경력을 지닌 장인의 손끝에서',
      maintext2:
        '한 조각씩 절삭되고 정성스럽게 붙여지는 섬세한 공정과 정교한 마감을 거쳐 완성되는 자개 컬렉션.',
      keyword1: "#MD'S PICK #MD픽",
      keyword2: '#GIFT #기프트',
      keyword3: '#BLACK #블랙아이템',
      keyword4: '#DESKTERIOR #데스크테리어',
      company1:
        '펜싱에서 상대 선수에게 득점을 내주었을 때 외치던 단어 ‘TOUCHÉ’.',
      company2:
        '이는 자신이 찔렸다는 것을 인정한다는 의미이며, 근래에는 상대방의 말에 동의하는 하나의 표현으로 자리매김하였다.',
      company3:
        '세이투셰는 ‘제품과 작품 경계에 있는 디자인’ 이라는 모토로 일상속에서 접할 수 있는 다양한 아이템들을 그들만의 시각으로 재해석한다.',
      store1: '서울시 용산구 녹사평대로32길 53',
      store2: '서울특별시 강남구 압구정로 60길 21',
      store3: '강남구 언주로164길 13',
      store4: '서울특별시 성동구 성수이로7길 41',
      store5: '서울특별시 용산구 이태원로 266',
      store6: '부산광역시 기장군 기장읍 기장해안로 267-7',
      store7: '서울특별시 강남구 강남대로 162길 35, 1층',
      store8: '서울특별시 강남구 강남대로 162길 35, 1층',
      storetitle1: '오늘의집 Binaryshop',
      storetitle2: '카카오톡 선물하기',
      storetitle3: '현대카드 M몰',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  fallbackLng: 'ko',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
