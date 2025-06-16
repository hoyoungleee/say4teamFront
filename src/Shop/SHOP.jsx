// SHOP.jsx
import React, { useState } from 'react'; // useState 임포트
import Header from '../Header/Header';
import CategoryNav from './CategoryNav';
import Footer from '../Footer/Footer';
import ProductList from './ProductList'; // ProductList 임포트

const SHOP = () => {
  // 선택된 카테고리 ID를 최상위 컴포넌트에서 관리
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <>
      <Header />
      {/* CategoryNav에 선택된 카테고리 ID를 변경할 함수를 prop으로 전달 */}
      <CategoryNav onSelectCategory={setSelectedCategoryId} />
      {/* ProductList에 현재 선택된 카테고리 ID와, 변경 함수를 prop으로 전달 */}
      <ProductList
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      <Footer />
    </>
  );
};

export default SHOP;
