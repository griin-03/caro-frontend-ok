import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage'; 
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import GamePage from './pages/Game/GamePage';
import AboutPage from './pages/Dashboard/AboutPage'; 
import SettingsPage from './pages/Dashboard/SettingsPage'; 

// --- MỚI THÊM IMPORT TRANG FEEDBACK ---
import FeedbackPage from './pages/Dashboard/FeedbackPage';
// --------------------------------------

function App() {
  return (
    <Routes>
      {/* Cả 2 đường dẫn đều dùng chung AuthPage */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      {/* Các route hệ thống giữ nguyên */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="game" element={<GamePage />} />
        
        <Route path="about" element={<AboutPage />} />
        <Route path="settings" element={<SettingsPage />} /> 

        {/* --- MỚI THÊM ROUTE FEEDBACK --- */}
        <Route path="feedback" element={<FeedbackPage />} />
        {/* ------------------------------- */}

        <Route path="shop" element={<div className="text-white p-10">Shop (Coming Soon)</div>} />
        <Route path="forum" element={<div className="text-white p-10">Forum (Coming Soon)</div>} />
      </Route>
    </Routes>
  );
}

export default App;