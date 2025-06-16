import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
import Acahive from './archive/Acahive';
import ProjectPage from './archive/ProjectPage';
import Press from './archive/Press';

function LoadingSpinner() {
  return (
    <motion.div
      key="loading-spinner"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.56, duration: 0.14, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        zIndex: 9999,
      }}
    >
      <div style={{
        width: 40,
        height: 40,
        border: '5px solid #ccc',
        borderTopColor: '#333',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 로딩 시작
    setLoading(true);

    // 총 700ms 중 700ms 뒤에 로딩 종료
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />

      <AnimatePresence>
        {loading && <LoadingSpinner key="spinner" />}
      </AnimatePresence>

      {!loading && (
        <Routes>
          {/* 헤더/푸터 없는 페이지 */}
          <Route path='/' element={<MainPages />} />
          <Route path='/store' element={<StorePage />} />
          <Route path='/company' element={<COMPANY />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/order' element={<Orderpages />} />
          <Route path='/shop' element={<SHOP />} />
          <Route path='/ordercheck' element={<OrderCheck />} />
          <Route path='/member/join-complete' element={<JoinComplete />} />

          {/* 헤더/푸터 포함 페이지 */}
          <Route path='/login' element={<><Header /><LoginPage /><Footer /></>} />
          <Route path='/member/join' element={<><Header /><JoinPage /><Footer /></>} />
          <Route path='/mypage' element={<><Header /><MyPage /><Footer /></>} />
          <Route path='/mypage/profile' element={<><Header /><ProfilePage /><Footer /></>} />
          <Route path='/product/detail/:id' element={<><Header /><ProductDetail /><Footer /></>} />
          <Route path='/acahive' element={<><Header /><Acahive /><Footer /></>} />
          <Route path='/project' element={<><Header /><ProjectPage /><Footer /></>} />
          <Route path='/press' element={<><Header /><Press /><Footer /></>} />

          {/* 에러 페이지 */}
          <Route path='/error/404' element={<NotFoundPage />} />
          <Route path='/error/500' element={<ServerErrorPage />} />
          <Route path='/error/403' element={<ForbiddenPage />} />
          <Route path='/error/401' element={<UnauthorizedPage />} />

          {/* 잘못된 주소 처리 */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
