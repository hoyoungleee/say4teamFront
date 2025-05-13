import React from 'react';
import Slider from 'react-slick';
import img1 from '../assets/storeList1.jpg';
import img2 from '../assets/storeList2.jpg';
import img3 from '../assets/storeList3.jpg';
import img4 from '../assets/storeList4.jpg';

import './storeSliderslick.css';
import './storeSlidertheme.css';

const StoreSlider = () => {
  const images = [img1, img2, img3, img4];

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]} alt={`thumb-${i}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`slide-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StoreSlider;
