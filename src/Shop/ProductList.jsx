import { useState } from 'react';
import TopCategory from './TopCategory';
import ProductGrid from './ProductGrid';

const ProductList = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <>
      <TopCategory onSelectCategory={setSelectedCategoryId} />
      <ProductGrid categoryId={selectedCategoryId} />
    </>
  );
};

export default ProductList;
