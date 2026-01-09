import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage'; 
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import GamePage from './pages/Game/GamePage';
import AboutPage from './pages/Dashboard/AboutPage'; 
import SettingsPage from './pages/Dashboard/SettingsPage'; 
import FeedbackPage from './pages/Dashboard/FeedbackPage';
import CommunityPage from './pages/Dashboard/CommunityPage';
// --- MỚI THÊM: IMPORT TRANG SHOP VỪA TẠO ---
import ShopPage from './pages/Shop/ShopPage'; 
// -------------------------------------------

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
        <Route path="feedback" element={<FeedbackPage />} />

        {/* --- ĐÃ SỬA: THAY PLACEHOLDER BẰNG TRANG SHOP THẬT --- */}
        <Route path="shop" element={<ShopPage />} />
        {/* ----------------------------------------------------- */}

        <Route path="forum" element={<CommunityPage />} />      </Route>
    </Routes>
  );
}

export default App;