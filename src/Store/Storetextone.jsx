import React from 'react';
import './storetextone.css';
import { useTranslation } from 'react-i18next';


const Storetextone = () => {

  const { t } = useTranslation();

  return (
    <div className='storemain'>
      <div>
        <p className='bigtitle'>SAY TOUCHÉ</p>
        <br />
        <p className='bigsertitle'>LOCATION</p>
        <br />
        <div>
          <p className='shorttext'>
            53, NOKSAPYEONG-DAERO 32-GIL, YONGSAN-GU, SEOUL
          </p>
          <p className='shorttext'>{t('store1')}</p>
        </div>
        <br />
        <p className='bigsertitle'>HOURS</p>
        <br />
        <div>
          <p className='shorttext'>Tuesday to Sunday - 12pm to 7pm</p>
          <p className='shorttext'>Monday - Closed</p>
        </div>
        <div className='stockist'>
          <p className='bigtitle'>STOCKIST</p>
        </div>
        <div className='textstore'>
          <div>
            <p className='bigtitle'>OFFLINE</p>
            <br />
            <br />
            <p className='storename'>BOONTHESHOP</p>
            <p className='storetext'>02-2056-1234</p>
            <p className='storetext'>21, APGUJEONG-RO 60-GIL, GANGNAM-GU, SEOUL</p>
            <p className='storetext'>{t('store2')}</p>
            <br />
            <br />
            <p className='storename'>KASINA 1997</p>
            <p className='storetext'>02-3444-6458</p>
            <p className='storetext'>13, Eonju-ro 164-gil, Gangnam-gu, Seoul</p>
            <p className='storetext'>{t('store3')}</p>
            <br />
            <br />
            <p className='storename'>KASINA SEONGSU</p>
            <p className='storetext'>070-7777-1771</p>
            <p className='storetext'>41, Seongsui-ro 7-gil, Seongdong-gu, Seoul</p>
            <p className='storetext'>{t('store4')}</p>
            <br />
            <br />
            <p className='storename'>KASINA HANNAM</p>
            <p className='storetext'>02-790-2660</p>
            <p className='storetext'>266, Itaewon-ro, Yongsan-gu, Seoul</p>
            <p className='storetext'>{t('store5')}</p>
            <br />
            <br />
            <p className='storename'>KASINA ANANTI</p>
            <p className='storetext'>051-724-0717</p>
            <p className='storetext'>267-7, Gijanghaean-ro, Gijang-eup, Gijang-gun, Busan</p>
            <p className='storetext'>{t('store6')}</p>
            <br />
            <br />
            <p className='storename'>NICE WEATHER MARKET</p>
            <p className='storetext'>02-547-0073</p>
            <p className='storetext'>1F, 35, Gangnam-daero 162-gil, Gangnam-gu, Seoul</p>
            <p className='storetext'>{t('store7')}</p>
            <br />
            <br />
            <p className='storename'>NICE WEATHER THE HYUNDAI SEOUL</p>
            <p className='storetext'>02-547-0073</p>
            <p className='storetext'>1F, 35, Gangnam-daero 162-gil, Gangnam-gu, Seoul</p>
            <p className='storetext'>{t('store8')}</p>
          </div>
          <div>
            <p className='bigtitle'>ONLINE</p>
            <br />
            <br />
            <p className='storename'>SAY TOUCHÉ</p>
            <p className='storename'>NAVER SMART STORE</p>
            <p className='storetext'>02-6494-0707</p>
            <a
              className='storelink'
              href='https://smartstore.naver.com/say_touche'
              target='_blank'
            >
              smartstore.naver.com/say_touche
            </a>
            <br />
            <br />
            <p className='storename'>29CM</p>
            <p className='storetext'>1644-0560</p>
            <a
              className='storelink'
              href='https://shop.29cm.co.kr/brand/13324?brandId=13324&sort=RECOMMEND&defaultSort=RECOMMEND&sortOrder=DESC'
              target='_blank'
            >
              29cm.co.kr
            </a>
            <br />
            <br />
            <p className='storename'>{t('storetitle1')}</p>
            <p className='storetext'>1670-0876</p>
            <a
              className='storelink'
              href='https://store.ohou.se/brands/41306?query=세이투셰&affect_type=ProductBrandFeed'
              target='_blank'
            >
              ohou.se
            </a>
            <br />
            <br />
            <p className='storename'>{t('storetitle2')}</p>
            <p className='storetext'>1544-2431</p>
            <a
              className='storelink'
              href='https://gift.kakao.com/brand/14475'
              target='_blank'
            >
              gift.kakao.com
            </a>
            <br />
            <br />
            <p className='storename'>{t('storetitle3')}</p>
            <p className='storetext'>1577-5141</p>
            <a
              className='storelink'
              href='https://mpointmall.hyundaicard.com/main.do'
              target='_blank'
            >
              mpointmall.hyundaicard.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storetextone;
