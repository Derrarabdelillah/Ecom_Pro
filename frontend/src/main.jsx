import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Router } from 'react-router-dom'
import ProductsContext from './context/ProductsContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <ProductsContext>
          <App />
        </ProductsContext>
      </BrowserRouter>
  </StrictMode>,
)