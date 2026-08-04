import { useState } from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts  from "./pages/CategoryProducts";
import Footercomp from "./components/Footercomp";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/:category/:productSlug/:colorSlug"
          element={<ProductDetail />}
        />
        <Route path="/:categorySlug" element={<CategoryProducts />} />
        <Route path="/:categorySlug/:subPath" element={<CategoryProducts />} />
      </Routes>
      <Footercomp />
    </Router>
  );
}

export default App
