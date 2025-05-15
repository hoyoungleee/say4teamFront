import React from 'react';
import Slider from 'react-slick';
import './slickSecond.css';
import './slick-themeSecond.css';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';

const SecondSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };
  return (
    <div
      className='slider-container'
      style={{ borderBottom: `1px solid black` }}
    >
      <Slider {...settings}>
        <div>
          <div>
            <img src={img4} />
            <p className='bannertext'>TOUCHÉ Roomspray</p>
            <p className='bannertext'>[Not Too Gentle]</p>
            <p className='bannertext'>49,000원</p>
          </div>
        </div>
        <div>
          <img src={img5} />
          <p className='bannertext'>TOUCHÉ Diffuser</p>
          <p className='bannertext'>[Not Too Gentle]</p>
          <p className='bannertext'>49,000원</p>
        </div>
        <div>
          <img src={img6} />
          <p className='bannertext'>TOUCHÉ Roomspray</p>
          <p className='bannertext'>[Capri Bomb]</p>
          <p className='bannertext'>49,000원</p>
        </div>
        <div>
          <img src={img7} />
          <p className='bannertext'>TOUCHÉ Diffuser</p>
          <p className='bannertext'>[Capri Bomb]</p>
          <p className='bannertext'>49,000원</p>
        </div>
        <div>
          <img src={img8} />
          <p className='bannertext'>TOUCHÉ Roomspray</p>
          <p className='bannertext'>[21˚C]</p>
          <p className='bannertext'>49000원</p>
        </div>
        <div>
          <img src={img9} />
          <p className='bannertext'>TOUCHÉ Diffuser</p>
          <p className='bannertext'>[21˚C]</p>
          <p className='bannertext'>49000원</p>
        </div>
        <div>
          <img src={img10} />
          <p className='bannertext'>TOUCHÉ Fragrance Gift Set</p>
          <p className='bannertext'>98,000원</p>
          <p className='bannertext'>[set]</p>
        </div>
      </Slider>
    </div>
  );
};

export default SecondSlider;
