import { Routes, Route, Navigate } from 'react-router-dom';
import JoinPage from './users/JoinPage';
import MyPage from './users/MyPage';
import ProfilePage from './users/ProfilePage';
import LoginPage from './users/LoginPage';
import JoinComplete from './users/JoinComplete';

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
  );
}

export default App;
