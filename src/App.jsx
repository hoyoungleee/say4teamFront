import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import JoinPage from './users/JoinPage';
import MyPage from './users/MyPage';
import ProfilePage from './users/ProfilePage';
import LoginPage from './users/LoginPage';
import JoinComplete from './users/JoinComplete';
import './App.css';
import SHOP from './Shop/SHOP';
import COMPANY from './Company/COMPANY';
import StorePage from './Store/StorePage';
import Contact from './Contact/Contact';
import CartPage from './order/CartPage';
import Orderpages from './order/Orderpages';
import MainPages from './main/MainPages';
import ProductDetail from './Shop/ProductDetail';

import Header from './Header/Header';
import Footer from './Footer/Footer';

function App() {
  return (
    <>
      <Routes>
        {/* 헤더 푸터 필요없으면 여기 */}
        <Route path='/member/join-complete' element={<JoinComplete />} />
        <Route path='/' element={<MainPages />} />
        <Route path='/shop' element={<SHOP />} />
        <Route path='/store' element={<StorePage />} />
        <Route path='/company' element={<COMPANY />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/order' element={<Orderpages />} />

        {/* 헤더 푸터 필요하면 여기 */}
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
