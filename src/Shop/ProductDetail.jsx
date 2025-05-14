import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, PROD } from '../configs/host-config';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('DETAIL');
  const { id } = useParams();

  const [showScrollTop, setShowScrollTop] = useState(false); // ✅ 상태 추가

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axiosInstance.get(
        `${API_BASE_URL}${PROD}/detail/${id}`,
      );
      setProduct(res.data.result);
    };
    fetchDetail();
  }, [id]);

  // ✅ 스크롤 감지 이벤트
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!product) {
    return (
      <div className='product-loading'>
        <div className='spinner' />
        <p>상품 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className='product-detail-container'>
      <div className='product-detail-top'>
        {/* 왼쪽: 이미지 영역 */}
        <div className='product-image-section'>
          <img
            src={product.thumbnailPath}
            alt='썸네일이미지'
            className='product-main-image'
          />
        </div>

        {/* 오른쪽: 정보 및 버튼 영역 */}
        <div className='product-info-section'>
          <h1 className='product-title'>{product.name}</h1>
          <p className='product-price'>{product.price?.toLocaleString()}원</p>

          <div className='product-tab'>
            <span
              className={`tab ${activeTab === 'DETAIL' ? 'active' : ''}`}
              onClick={() => setActiveTab('DETAIL')}
            >
              DETAIL
            </span>
            <span
              className={`tab ${activeTab === 'SHIPPING' ? 'active' : ''}`}
              onClick={() => setActiveTab('SHIPPING')}
            >
              SHIPPING RETURNS
            </span>
          </div>

          <div className='product-info-text'>
            {activeTab === 'DETAIL' ? (
              <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
            ) : (
              <div className='shipping-returns'>
                <p>
                  <strong>배송기간 안내</strong>
                  <br />- 영업일 기준 5~10일 (도서 산간 지역 배송지연 발생가능)
                </p>

                <p>
                  <strong>교환 및 반품이 가능한 경우</strong>
                </p>
                <ul>
                  <li>상품을 공급받으신 날로부터 7일 이내 (단순변심 제외)</li>
                  <li>표시/광고 내용과 다르거나 계약 내용과 다를 경우 등...</li>
                  <li>제품 하자가 있는 경우 반드시 사진 첨부 필요</li>
                </ul>

                <p>
                  <strong>교환 및 반품이 불가능한 경우</strong>
                </p>
                <ul>
                  <li>단순변심으로 인한 요청이 수령일로부터 7일이 지난 경우</li>
                  <li>포장 훼손, 제품 사용 흔적, 구성품 누락 등</li>
                </ul>

                <p>
                  <strong>교환/환불 유의사항</strong>
                </p>
                <ul>
                  <li>배송비는 고객님 부담</li>
                  <li>Saytouch의 개별 배송 정책에 따라 분리 배송 발생 가능</li>
                  <li>불량 아닌 상품 회수 시 왕복 배송비 청구</li>
                </ul>
              </div>
            )}
          </div>

          <div className='product-buttons'>
            <button className='btn buy-now'>BUY NOW</button>
            <button className='btn add-to-cart'>ADD TO CART</button>
          </div>
        </div>
      </div>

      <div className='product-detail-bottom'>
        {product.productImages.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`상세 이미지 ${index + 1}`}
            className='detail-image'
            loading='lazy'
          />
        ))}
      </div>

      {/* 맨 위로 버튼 */}
      {showScrollTop && (
        <button className='scroll-top-button' onClick={scrollToTop}>
          <KeyboardArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default ProductDetail;
