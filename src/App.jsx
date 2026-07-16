import { useState } from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { Catalog } from './pages/Catalog';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="/:category/:productSlug/:colorSlug"
          element={<ProductDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App
