import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, Gamepad2, ShoppingBag, Users, Settings, 
    LogOut, Moon, Sun, Info, MessageSquareHeart, Sparkles,
    ChevronLeft, ChevronRight, Menu, Zap
} from 'lucide-react';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Game Thủ' };

  // --- STATE QUẢN LÝ SIDEBAR (THU GỌN / MỞ RỘNG) ---
  // true: Mở rộng (thấy hết chữ và avatar to)
  // false: Thu gọn (chỉ thấy icon, avatar nhỏ)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- LOGIC DARK MODE (GIỮ NGUYÊN) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; 
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const menuItems = [
    { path: '/dashboard', label: 'Tổng Quan', icon: LayoutDashboard },
    { path: '/game', label: 'Đấu Trường', icon: Gamepad2 },
    { path: '/shop', label: 'Cửa Hàng', icon: ShoppingBag },
    { path: '/forum', label: 'Cộng Đồng', icon: Users },
    { path: '/about', label: 'Về Chúng Tôi', icon: Info },
    { path: '/feedback', label: 'Góp Ý', icon: MessageSquareHeart },
    { path: '/settings', label: 'Cài Đặt', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-500 ${isDarkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* --- SIDEBAR (THANH BÊN TRÁI) --- */}
      <aside 
        className={`relative z-50 flex flex-col border-r transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isSidebarOpen ? 'w-72' : 'w-20'} 
          ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} 
          shadow-2xl`}
      >
        
        {/* === NÚT TOGGLE (TAM GIÁC/MŨI TÊN) === */}
        {/* Nằm đè lên đường biên bên phải của Sidebar */}
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`absolute -right-3 top-9 z-50 w-6 h-6 rounded-full border shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group cursor-pointer
                ${isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500' 
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-blue-500 hover:text-white'
                }`}
            title={isSidebarOpen ? "Thu gọn menu" : "Mở rộng menu"}
        >
            {isSidebarOpen ? <ChevronLeft size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
        </button>

        {/* 1. LOGO AREA */}
        <div className={`h-20 flex items-center ${isSidebarOpen ? 'px-6 justify-between' : 'justify-center'} transition-all duration-300 border-b border-white/5`}>
            <div 
                className="group cursor-pointer flex items-center gap-3 overflow-hidden" 
                onClick={() => navigate('/dashboard')}
            >
                {/* Logo Icon */}
                <div className="w-10 h-10 min-w-[2.5rem] rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                    <Sparkles size={20} className="text-white animate-pulse" />
                </div>
                
                {/* Chữ Logo (Chỉ hiện khi mở rộng) */}
                <div className={`transition-all duration-300 origin-left whitespace-nowrap overflow-hidden ${isSidebarOpen ? 'opacity-100 w-auto translate-x-0' : 'opacity-0 w-0 -translate-x-10 hidden'}`}>
                    <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                        CARO PRO
                    </h1>
                </div>
            </div>
        </div>

        {/* 2. USER PROFILE MINI (AVATAR NGƯỜI CHƠI) */}
        {/* Phần này sẽ tự biến hình khi thu nhỏ */}
        <div className={`py-6 flex flex-col items-center transition-all duration-300 border-b border-white/5 ${isSidebarOpen ? 'px-4' : 'px-2'}`}>
            <div className={`relative transition-all duration-300 ${isSidebarOpen ? 'w-20 h-20' : 'w-10 h-10'}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur opacity-70 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full border-2 border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                     <img 
                        src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                     />
                </div>
                {/* Online Dot */}
                <div className={`absolute bottom-0 right-0 border-2 border-white dark:border-slate-800 rounded-full bg-green-500 ${isSidebarOpen ? 'w-5 h-5' : 'w-3 h-3'}`}></div>
            </div>

            {/* Tên và Trạng thái (Chỉ hiện khi mở) */}
            <div className={`mt-3 text-center transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 hidden'}`}>
                <h3 className="font-bold text-slate-800 dark:text-white truncate max-w-[180px]">{user.fullName}</h3>
                <div className="flex items-center justify-center gap-1 text-xs text-green-500 font-bold mt-1 bg-green-500/10 px-2 py-0.5 rounded-full w-fit mx-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                </div>
            </div>
        </div>

        {/* 3. MENU ITEMS */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <div 
                key={item.path}
                onClick={() => !item.disabled && navigate(item.path)}
                className={`relative flex items-center cursor-pointer transition-all duration-200 group
                  ${isSidebarOpen ? 'mx-3 px-4 py-3 rounded-xl gap-3' : 'mx-auto justify-center p-3 rounded-xl w-14 h-14'}
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }
                  ${item.disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                `}
                title={!isSidebarOpen ? item.label : ''} // Tooltip native khi thu nhỏ
              >
                {/* Icon */}
                <Icon 
                    size={isSidebarOpen ? 20 : 24} 
                    className={`transition-all ${isActive && !isSidebarOpen ? 'animate-pulse' : ''}`} 
                />
                
                {/* Label (Chỉ hiện khi mở) */}
                {isSidebarOpen && (
                    <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>
                )}
                
                {/* Active Indicator (Dot) */}
                {isActive && isSidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}

                {/* Tooltip Custom (khi hover lúc đóng) */}
                {!isSidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                        {item.label}
                    </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 4. FOOTER SIDEBAR (Darkmode/Logout) */}
        <div className={`p-4 border-t border-white/5 transition-all duration-300 ${isSidebarOpen ? '' : 'flex flex-col items-center gap-4'}`}>
            
            {/* Dark Mode Switch */}
            <div className={`bg-slate-100 dark:bg-slate-900/50 rounded-lg p-1 flex ${isSidebarOpen ? '' : 'flex-col bg-transparent'}`}>
                {isSidebarOpen ? (
                    <>
                        <button onClick={() => setIsDarkMode(false)} className={`flex-1 flex items-center justify-center py-1.5 rounded-md text-xs font-bold transition-all ${!isDarkMode ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                            <Sun size={14} className="mr-1.5" /> Sáng
                        </button>
                        <button onClick={() => setIsDarkMode(true)} className={`flex-1 flex items-center justify-center py-1.5 rounded-md text-xs font-bold transition-all ${isDarkMode ? 'bg-slate-700 text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                            <Moon size={14} className="mr-1.5" /> Tối
                        </button>
                    </>
                ) : (
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
                         {isDarkMode ? <Moon size={20} className="text-blue-400"/> : <Sun size={20} className="text-orange-500"/>}
                    </button>
                )}
            </div>

            {/* Logout Button */}
            <button 
                onClick={handleLogout}
                className={`flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm group
                    ${isSidebarOpen ? 'w-full py-2.5 gap-2 mt-3' : 'w-10 h-10 p-0 hover:scale-110'}
                `}
                title="Đăng Xuất"
            >
                <LogOut size={isSidebarOpen ? 18 : 20} />
                {isSidebarOpen && <span>Đăng Xuất</span>}
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (NỘI DUNG CHÍNH) --- */}
      {/* flex-1: Tự động chiếm hết không gian còn lại khi sidebar thu nhỏ */}
      {/* p-0: Quan trọng để Game tràn viền */}
      <main className="flex-1 h-full relative overflow-hidden bg-slate-50 dark:bg-[#0f172a] p-0">
         <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;