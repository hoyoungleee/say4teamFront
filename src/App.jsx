import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './main/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './order/Cartpage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
