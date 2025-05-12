import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ProductGrid.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]); // 상품 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [page, setPage] = useState(1); // 페이지 번호 관리 (1페이지부터 시작)

  // 상품 데이터 받아오기
  const fetchProducts = useCallback(async () => {
    setLoading(true); // 데이터를 불러오기 전에 로딩 상태 설정
    try {
      const response = await axios.get(`/api/products?page=${page}`); // 백엔드 API URL에 페이지 번호를 추가
      setProducts((prevProducts) => [...prevProducts, ...response.data]); // 기존 상품에 새로운 상품을 추가
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // 데이터 로드 후 로딩 상태 종료
    }
  }, [page]);

  // 스크롤 이벤트로 더 많은 데이터를 로드하는 함수
  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && !loading) { // 페이지 하단에 도달했을 때
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    fetchProducts(); // 첫 페이지 상품 데이터 로드
  }, [fetchProducts]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(); // 페이지가 변경될 때마다 상품 데이터 로드
    }
  }, [page, fetchProducts]);

  // 스크롤 이벤트 리스너 설정
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
  }, [handleScroll]);

  return (
    <div className="ProductListHeader">
      <div className="box1">
        <div className="leftheader">
          <span>신상품 | </span>
          <span>낮은가격 | </span>
          <span>높은가격 | </span>
        </div>
        <div className="rightheader">
          <span>{products.length} items</span>
        </div>
      </div>

      {/* 상품 그리드 박스들 */}
      {products.map((product, index) => (
        <div key={index} className={`box${index + 2}`}>
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>{product.price} 원</p>
          </div>
        </div>
      ))}

      {/* 로딩 중 표시 */}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default ProductGrid;

