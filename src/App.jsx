import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './main/Main';
import Category from './Shop/CategoryNav';
import TopCategory from './Shop/TopCategory';
import ProductGrid from './Shop/ProductGrid';

function App() {
  return (
    <>
      <Header />
      <Category />
      <TopCategory/>
      <ProductGrid/>
      <Footer />
    </>
  );
}

export default App;
