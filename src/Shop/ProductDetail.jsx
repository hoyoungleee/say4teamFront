import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, PROD } from '../configs/host-config';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const ProductDetail = () => {
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axiosInstance.get(
        `${API_BASE_URL}${PROD}/detail/${id}`,
      );
      setProduct(res.data.result);
    };
    fetchDetail();
  }, [id]);
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
            src={product.thumbnailPath} // 추후 이미지 URL 바꿔줘
            alt='썸네일이미지'
            className='product-main-image'
          />
        </div>

        {/* 오른쪽: 정보 및 버튼 영역 */}
        <div className='product-info-section'>
          <h1 className='product-title'>{product.name}</h1>
          <p className='product-price'>{product.price?.toLocaleString()}</p>

          <div className='product-tab'>
            <span className='tab active'>DETAIL</span>
            <span className='tab'>SHIPPING RETURNS</span>
          </div>

          <div className='product-info-text'>{product.description}</div>

          <div className='product-buttons'>
            <button className='btn buy-now'>BUY NOW</button>
            <button className='btn add-to-cart'>ADD TO CART</button>
          </div>
        </div>
      </div>

      <div className='product-detail-bottom'>
        {product.productImages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`상세 이미지 ${index + 1}`}
            className='detail-image'
            loading='lazy' // 로딩 최적화
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
