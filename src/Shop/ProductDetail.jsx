import React, { useContext, useEffect, useState } from 'react';
import './ProductDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, PROD, CART } from '../configs/host-config';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RecommendedProducts from './RecommendedProducts';
import AuthContext from '../context/UserContext';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('DETAIL');
  const { id } = useParams();

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_BASE_URL}${PROD}/detail/${id}`,
        );
        setProduct(res.data.result);
      } catch (error) {
        console.error('상품 정보 불러오기 실패:', error);
      }
    };
    fetchDetail();
  }, [id]);

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

  // 장바구니에 아이템 추가 공통 함수
  const addToCart = async (productId) => {
    try {
      const cartItem = {
        productId,
        quantity: 1,
      };
      return await axiosInstance.post(`${API_BASE_URL}${CART}/items`, cartItem);
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      throw error;
    }
  };

  // 바로 구매 클릭 시
  const handleBuyClick = async () => {
    if (!isLoggedIn) {
      alert('회원가입이나 로그인 후 진행하세요!');
      return;
    }
    try {
      // 1) 장바구니에 넣는 API 호출 (필요에 따라)
      await addToCart(product.id);

      // 2) navigate로 주문 페이지 이동 시 바로구매 정보 state 전달
      navigate('/order', {
        state: {
          isDirectPurchase: true,
          directProductId: product.id,
          quantity: 1,
          unitPrice: product.price,
          productName: product.name,
          imageUrl: product.thumbnailPath,
        },
      });
    } catch {
      alert('바로구매 처리 실패');
    }
  };

  // 장바구니 담기 클릭 시
  const handleCartClick = async () => {
    if (!isLoggedIn) {
      alert('회원가입이나 로그인 후 진행하세요!');
      return;
    }
    try {
      await addToCart(product.id);
      alert('장바구니 추가 성공');
      if (window.confirm('장바구니로 이동하시겠습니까?')) {
        navigate('/cart');
      }
    } catch {
      alert('장바구니 넣기 실패!');
    }
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
        <div className='product-image-section'>
          <img
            src={product.thumbnailPath}
            alt='썸네일이미지'
            className='product-main-image'
          />
        </div>

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
                {/* 배송 및 교환/반품 안내 텍스트 */}
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
            <button className='btn buy-now' onClick={handleBuyClick}>
              BUY NOW
            </button>
            <button className='btn add-to-cart' onClick={handleCartClick}>
              ADD TO CART
            </button>
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
      <RecommendedProducts productId={product.id} />

      {showScrollTop && (
        <button className='scroll-top-button' onClick={scrollToTop}>
          <KeyboardArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default ProductDetail;
