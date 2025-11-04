import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FoodItemProvider } from './Context/FoodItemContext.jsx'
import { CartProvider } from './Context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Wrap with providers so data is available everywhere */}
      <FoodItemProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FoodItemProvider>
    </BrowserRouter>
  </StrictMode>,
)
