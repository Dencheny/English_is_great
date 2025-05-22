import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router';
import App from './App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
