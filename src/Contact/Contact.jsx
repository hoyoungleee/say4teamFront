import React from 'react';
import './Contact.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Contact = () => {
  return (
    <>
      <Header />
      <div className='contactmain'>
        <div>
          <p className='contacttittle tt'>Customer service</p>
          <p className='contacttext'>02-6494-0707</p>
          <p className='contacttext'>Open: Mon-Fri / 10 am-7 pm</p>
          <p className='contacttext'>Lunch: 12:30 pm-1:45 pm</p>
        </div>
        <div>
          <p className='contacttittle tt'>Mail</p>
          <p className='contacttext'>mail@saytouche.kr</p>
        </div>
        <div>
          <p className='contacttittle'>SAY TOUCHÉ</p>
          <p className='contacttittle tt'>OFFLINE STORE</p>
          <a
            href='https://map.naver.com/p/search/세이투셰/place/1771019549?isCorrectAnswer=true&c=15.00,0,0,0,dh'
            target='_blank'
          >
            <button className='contactbutton'>MAP</button>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
