import { createRoot } from 'react-dom/client'
import { FilterProvider } from './context/filter'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <FilterProvider>
    <App />
  </FilterProvider>
)
