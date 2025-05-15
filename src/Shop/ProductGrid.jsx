import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './ProductGrid.css';
import { API_BASE_URL, PROD } from '../configs/host-config';
import { throttle } from 'lodash';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ categoryId }) => {
  const [sortType, setSortType] = useState('');
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const navigate = useNavigate();

  const fetchProducts = useCallback(
    async (targetPage = 0, reset = false) => {
      if (loading || (!hasMore && !reset)) return;
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}${PROD}/list`, {
          params: {
            sort: sortType,
            page: targetPage,
            size: 8,
            searchType: categoryId,
          },
        });

        const result = res.data.result;
        if (result.length === 0) {
          setHasMore(false);
        }

        setProducts((prev) => {
          const combined = reset ? result : [...prev, ...result];
          return [...new Map(combined.map((item) => [item.id, item])).values()];
        });
      } catch (e) {
        console.error('상품 요청 실패:', e);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, sortType, categoryId],
  );

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchProducts(0, true);
  }, [categoryId, sortType]);

  useEffect(() => {
    if (page > 0) fetchProducts(page);
  }, [page]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        throttle((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        }, 300),
        {
          threshold: 1.0,
        },
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleSortChange = (newSort) => {
    setSortType(newSort);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/detail/${productId}`);
  };

  return (
    <>
      <div className='ProductListHeader'>
        <div className='box1'>
          <div className='leftheader'>
            <span onClick={() => handleSortChange('productId,DESC')}>
              신상품 |{' '}
            </span>
            <span onClick={() => handleSortChange('price,ASC')}>
              낮은가격 |{' '}
            </span>
            <span onClick={() => handleSortChange('price,DESC')}>
              높은가격 |{' '}
            </span>
          </div>

          <div className='rightheader'>
            <span> {products.length} items</span>
          </div>
        </div>
      </div>

      <div className='product-grid'>
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div
              className='product-card'
              key={product.id}
              ref={isLast ? lastProductRef : null}
              onClick={() => handleProductClick(product.id)}
            >
              <div className='image-wrapper'>
                <img
                  src={product.thumbnailPath}
                  alt={product.name}
                  className='product-image'
                />
                <img
                  src={product.mainImagePath}
                  alt={`${product.name} hover`}
                  className='product-image-hover'
                />
              </div>

              <div className='product-details'>
                <p className='product-name'>{product.name}</p>
                <p className='product-price'>
                  {product.price.toLocaleString()}원
                </p>
              </div>
            </div>
          );
        })}
        {loading && <div className='loading'>불러오는 중...</div>}
      </div>
    </>
  );
};

export default ProductGrid;
