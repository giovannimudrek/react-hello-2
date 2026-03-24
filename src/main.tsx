import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import BoardingPage from './pages/BoardingPage';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BoardingPage />
  </React.StrictMode>
);
