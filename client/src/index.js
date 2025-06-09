import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importando o CSS com Tailwind
import App from './App';

// Cria a raiz da aplicação na div com id 'root' do seu index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente principal <App /> dentro da raiz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);