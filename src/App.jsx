import { useState } from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts  from "./pages/CategoryProducts";
import Footercomp from "./components/Footercomp";
import ScrollToTop from "./components/ScrollToTop";
import History from './pages/History';
import SearchBar from './pages/SearchBar';


  function AppContent() {
  const location = useLocation();
  const hiddenFooter = location.pathname === "/search";
  const hiddenNavbar = location.pathname === "/search";
  return (
    <>
      <ScrollToTop />
      {!hiddenNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchBar />} />
        <Route
          path="/:category/:productSlug/:colorSlug"
          element={<ProductDetail />}
        />

        <Route path="/:categorySlug" element={<CategoryProducts />} />
        <Route path="/:categorySlug/:subPath" element={<CategoryProducts />} />
        <Route path="/history" element={<History />} />
      </Routes>
      {!hiddenFooter && <Footercomp /> }
    </>
  );
}
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App
