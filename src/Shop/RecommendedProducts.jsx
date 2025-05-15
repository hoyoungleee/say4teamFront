import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RecommendedProducts.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, PROD } from '../configs/host-config';
import { useNavigate } from 'react-router-dom';

const RecommendedSlider = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const navigate = useNavigate();

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

  const handleClick = (id) => {
    navigate(`/product/detail/${id}`);
  };

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
            <div
              className='recommended-card'
              onClick={() => handleClick(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.thumbnailPath || item.imgUrl}
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
