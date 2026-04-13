import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Stocks from './pages/Stocks';
import Markets from './pages/Markets';
import Trade from "./pages/Trade"; 
import Portfolio from './pages/Portfolio';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import Bonds from "./pages/Bonds"

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/bonds" element={<Bonds />} /> 
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
