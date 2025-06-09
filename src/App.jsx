import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import JoinPage from './users/JoinPage';
import MyPage from './users/MyPage';
import ProfilePage from './users/ProfilePage';
import LoginPage from './users/LoginPage';
import JoinComplete from './users/JoinComplete';

import SHOP from './Shop/SHOP';
import COMPANY from './Company/COMPANY';
import StorePage from './Store/StorePage';
import Contact from './Contact/Contact';

import CartPage from './order/CartPage';
import Orderpages from './order/Orderpages';
import OrderCheck from './order/OrderCheck';

import MainPages from './main/MainPages';
import ProductDetail from './Shop/ProductDetail';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import ScrollToTop from './ScrollToTop';

import NotFoundPage from './errors/NotFoundPage';
import ServerErrorPage from './errors/ServerErrorPage';
import ForbiddenPage from './errors/ForbiddenPage';
import UnauthorizedPage from './errors/UnauthorizedPage';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner" />
      <style>{`
        .loading-spinner {
          position: fixed;
          top:0; left:0; right:0; bottom:0;
          display:flex;
          justify-content:center;
          align-items:center;
          background: rgba(255,255,255,0.7);
          z-index: 9999;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 5px solid #ccc;
          border-top-color: #333;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 헤더/푸터 없는 페이지 */}
        <Route path='/member/join-complete' element={<JoinComplete />} />
        <Route path='/' element={<MainPages />} />
        <Route path='/store' element={<StorePage />} />
        <Route path='/company' element={<COMPANY />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/order' element={<Orderpages />} />
        <Route path='/shop' element={<SHOP />} />
        <Route path='/ordercheck' element={<OrderCheck />} />

        {/* 에러 페이지 */}
        <Route path='/error/404' element={<NotFoundPage />} />
        <Route path='/error/500' element={<ServerErrorPage />} />
        <Route path='/error/403' element={<ForbiddenPage />} />
        <Route path='/error/401' element={<UnauthorizedPage />} />

        {/* 헤더/푸터 필요한 페이지 */}
        <Route
          path='*'
          element={
            <>
              <Header />
              <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/member/join' element={<JoinPage />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/mypage/profile' element={<ProfilePage />} />
                <Route path='/product/detail/:id' element={<ProductDetail />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
