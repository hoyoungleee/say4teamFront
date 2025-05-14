import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import StoreSlider from './StoreSlider'
import Storetextone from './storetextone'
const StorePage = () => {
  return (
    <>
    <Header/>
    {/* 위쪽에 있는 슬라이더*/}
    <StoreSlider/>
    <Storetextone/>
    <Footer/>
    
    </>
  )
}

export default StorePage