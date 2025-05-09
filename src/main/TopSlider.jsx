import React from 'react';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'

const TopSlider = () => {
  const settings = {
    slide: 'img',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
      </Slider>
    </div>
  );
};

export default TopSlider;
