import './styles/global.scss';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; 
import Routing from './router';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
  </StrictMode>
)
