import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RecommendedProducts.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, PROD } from '../configs/host-config';

const RecommendedSlider = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const params = {
          page: 0,
          size: 8,
          sort: 'stockQuantity,asc',
        };
        const response = await axiosInstance.get(
          `${API_BASE_URL}${PROD}/list`,
          { params },
        );
        setRecommendedItems(response.data.result);
      } catch (error) {
        console.error('추천 상품 로딩 실패:', error);
      }
    };
    fetchRecommended();
  }, []);

  return (
    <div className='recommended-wrapper' style={{ marginTop: '50px' }}>
      <h3 className='recommended-title'>추천 상품</h3>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={60}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        loop={false}
        className='recommended-swiper'
        slidesPerGroup={4}
      >
        {recommendedItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='recommended-card'>
              <img
                src={item.thumbnailPath || item.imgUrl} // 서버에서 오는 경로로 조정
                alt={item.name}
                className='recommended-image'
              />
              <div className='recommended-name'>{item.name}</div>
              <div className='recommended-price'>
                {item.price.toLocaleString()}원
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendedSlider;
