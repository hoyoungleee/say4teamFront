import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPages from './main/MainPages';
import SHOP from './Shop/SHOP';
import COMPANY from './Company/COMPANY';
import StorePage from './Store/StorePage';
import Contact from './Contact/Contact';

function App() {
  return (
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
