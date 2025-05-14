import { Routes, Route, Navigate } from 'react-router-dom';
import JoinPage from './users/JoinPage';
import MyPage from './users/MyPage';
import ProfilePage from './users/ProfilePage';
import LoginPage from './users/LoginPage';
import JoinComplete from './users/JoinComplete';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPages from './main/MainPages';
import SHOP from './Shop/SHOP';
import COMPANY from './Company/COMPANY';
import StorePage from './Store/StorePage';
import Contact from './Contact/Contact';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/member/join' />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/member/join' element={<JoinPage />} />
      <Route path='/member/join-complete' element={<JoinComplete />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/mypage/profile' element={<ProfilePage />} />
    </Routes>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPages/>}/>
      <Route path="/shop" element={<SHOP/>}/>
      <Route path='/company' element={<COMPANY/>}/>
      <Route path='/store' element={<StorePage/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
