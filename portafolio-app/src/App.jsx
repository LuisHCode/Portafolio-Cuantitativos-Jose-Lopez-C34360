import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import MethodPage from './pages/MethodPage.jsx';
import ScrollToTop from './components/shared/ScrollToTop.jsx';
import './index.css';

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/metodo/:slug" element={<MethodPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
