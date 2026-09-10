
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts  from "./pages/CategoryProducts";
import Footercomp from "./components/Footercomp";
import ScrollToTop from "./components/ScrollToTop";
import History from './pages/History';
import SearchBar from './pages/SearchBar';
import Register from './pages/Register';
import Singin from './pages/Signin';
import UserProfile from './pages/UserProfile';
import Favorites from './pages/Favorites';


  function AppContent() {
  const location = useLocation();
 const hideLayoutRoutes = ["/login", "/register", "/search"];


 const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <>
      <ScrollToTop />
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchBar />} />
        <Route
          path="/:category/:productSlug/:colorSlug"
          element={<ProductDetail />}
        />

        <Route path="/:categorySlug" element={<CategoryProducts />} />
        <Route path="/:categorySlug/:subPath" element={<CategoryProducts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserProfile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Singin />} />
        <Route path="/history" element={<History />} />
      </Routes>
      {!shouldHideLayout && <Footercomp />}
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
