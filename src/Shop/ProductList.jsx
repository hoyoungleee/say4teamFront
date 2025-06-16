// ProductList.jsx
import React from 'react'; // React 임포트
import TopCategory from './TopCategory';
import ProductGrid from './ProductGrid';

// selectedCategoryId와 onSelectCategory prop을 받도록 수정
const ProductList = ({ selectedCategoryId, onSelectCategory }) => {
  return (
    <>
      {/* TopCategory에 부모로부터 받은 onSelectCategory를 전달 */}
      <TopCategory onSelectCategory={onSelectCategory} />
      {/* ProductGrid에 부모로부터 받은 selectedCategoryId를 전달 */}
      <ProductGrid categoryId={selectedCategoryId} />
    </>
  );
};

export default ProductList;
