import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { AddressProvider } from './contexts/AddressContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <AddressProvider>
        <App />
        </AddressProvider>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  </StrictMode>,
);
