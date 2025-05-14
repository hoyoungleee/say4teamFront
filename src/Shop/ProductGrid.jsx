import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './ProductGrid.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/product-service/product/list');
      const newProducts = response.data.result;
      setProducts((prev) => [...prev, ...newProducts]);
      // 예시에서는 더 로드할 수 없도록 한 번만 로딩
      setHasMore(false);
    } catch (error) {
      console.error('상품 불러오기 실패:', error);
    }
    setLoading(false);
  }, [loading, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const lastProductRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchProducts();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, fetchProducts, hasMore]);

  return (
    <>
      {/* ProductListHeader 컴포넌트 내용 포함 */}
      <div className="ProductListHeader">
        <div className="box1">
          <div className="leftheader">
            <span> 신상품 | </span>
            <span> 낮은가격 | </span>
            <span> 높은가격 | </span>
          </div>
          <div className="rightheader">
            <span> {products.length} items</span>
          </div>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div
              className="product-card"
              key={product.id}
              ref={isLast ? lastProductRef : null}
            >
              <div className="image-wrapper">
                <img
                  src={product.mainImagePath}
                  alt={product.name}
                  className="product-image"
                  onMouseOver={(e) => (e.currentTarget.src = product.mainImagePath)}
                  onMouseOut={(e) => (e.currentTarget.src = product.thumbnailPath)}
                />
              </div>
              <div className="product-details">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price.toLocaleString()}원</p>
              </div>
            </div>
          );
        })}
        {loading && <div className="loading">불러오는 중...</div>}
      </div>
    </>
  );
};

export default ProductGrid;
