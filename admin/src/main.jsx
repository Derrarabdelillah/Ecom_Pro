import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ProductsContext from '../../frontend/src/context/ProductsContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ProductsContext>
        <App />
      </ProductsContext>
    </BrowserRouter>
)
