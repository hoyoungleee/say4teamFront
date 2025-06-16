import React, { useState, useEffect } from 'react';
import './CategoryNav.css';
import axios from 'axios';
import { API_BASE_URL, CATEGORY } from '../configs/host-config';

const CategoryNav = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false); // 데이터 로드 시도 여부
  // error 상태는 이제 사용자에게 직접 표시하기보다는 내부 로깅용으로 사용
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}${CATEGORY}/navList?sort=categoryId,ASC`,
        );
        if (res.data !== '') {
          setCategories(res.data); // API 응답 형식에 따라 data.result 대신 data 사용
        }
        // setError(null); // 성공 시 에러 상태 초기화
      } catch (err) {
        console.error('메인 카테고리 불러오기 실패:', err); // 에러는 콘솔에만 기록
        // setError('카테고리 목록을 불러오지 못했습니다.'); // 사용자에게 직접 에러 메시지 표시 안함
        setCategories([]); // 에러 발생 시 카테고리 목록을 비워둠
      } finally {
        setHasLoaded(true); // 로드 시도 완료
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <div className='categorynav'>
        <p className='category-item' onClick={() => onSelectCategory('ALL')}>
          All
        </p>

        {/* 기존 하드코딩된 카테고리들 (필요하다면 제거를 고려) */}
        <p className='category-item' onClick={() => onSelectCategory(1)}>
          É
        </p>
        <p className='category-item' onClick={() => onSelectCategory(2)}>
          Textiles
        </p>
        <p className='category-item' onClick={() => onSelectCategory(3)}>
          Homedeco
        </p>
        <p className='category-item' onClick={() => onSelectCategory(4)}>
          Mirrors
        </p>
        <p className='category-item' onClick={() => onSelectCategory(5)}>
          Lighting
        </p>
        <p className='category-item' onClick={() => onSelectCategory(6)}>
          Lifestyle
        </p>
        <p className='category-item' onClick={() => onSelectCategory(7)}>
          Goods
        </p>
        <p className='category-item' onClick={() => onSelectCategory(8)}>
          Doodle Persian
        </p>

        {/* 동적으로 불러온 카테고리들 */}
        {hasLoaded && categories.length === 0 ? (
          // 로드 시도 후 카테고리가 없거나 에러로 인해 비어있을 때 메시지 표시
          <p className='category-item disabled-message'></p>
        ) : (
          categories.map((category) => (
            <p
              key={category.categoryId}
              className='category-item'
              onClick={() => onSelectCategory(category.categoryId)}
            >
              {category.categoryName}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryNav;
