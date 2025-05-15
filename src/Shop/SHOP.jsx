import React from 'react';
import Header from '../Header/Header';
import CategoryNav from './CategoryNav';
import TopCategory from './TopCategory';
import ProductGrid from './ProductGrid';
import Footer from '../Footer/Footer';
import ProductList from './ProductList';

const SHOP = () => {
  return (
    <>
      <Header />
      <CategoryNav />
      <ProductList />
      <Footer />
    </>
  );
};

export default SHOP;
