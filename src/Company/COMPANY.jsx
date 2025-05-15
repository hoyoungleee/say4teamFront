import React from 'react';
import './COMPANY.css';
import companybanner from '../assets/companyimage.jpg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useTranslation } from 'react-i18next';

const COMPANY = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className='compage'>
        <div className='companyimage'>
          <img src={companybanner} />
        </div>
        <div className='companytext'>
          <p className='comtext1'>{t('company1')}</p>
          <p className='comtext2'>{t('company2')}</p>
          <p className='comtext3'>{t('company3')}</p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default COMPANY;
