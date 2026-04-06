import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BoardPage } from './features/board/BoardPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board" element={<BoardPage />} />
        {/* Redirect root to /board */}
        <Route path="/" element={<Navigate to="/board" replace />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/board" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
