import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // <-- 1. ADICIONE ESTA LINHA

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- 2. ADICIONE ESTA TAG DE ABERTURA */}
      <App />
    </BrowserRouter> {/* <-- 3. E ESTA TAG DE FECHAMENTO */}
  </React.StrictMode>
);