import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, Gamepad2, ShoppingBag, Users, Settings, 
    LogOut, Moon, Sun, Info, MessageSquareHeart, Sparkles
} from 'lucide-react';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Game Thủ' };

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
  // ------------------------------------

  const menuItems = [
    { path: '/dashboard', label: 'Tổng Quan', icon: LayoutDashboard },
    { path: '/game', label: 'Đấu Trường', icon: Gamepad2 },
    { path: '/about', label: 'Về Chúng Tôi', icon: Info },
    // Menu MỚI THÊM
    { path: '/feedback', label: 'Góp Ý & Phản Hồi', icon: MessageSquareHeart },
    { path: '/settings', label: 'Cài Đặt', icon: Settings },
    
    // Các menu chưa phát triển
    { path: '/shop', label: 'Cửa Hàng (Sắp ra mắt)', icon: ShoppingBag, disabled: true },
    { path: '/forum', label: 'Cộng Đồng (Sắp ra mắt)', icon: Users, disabled: true },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-all duration-500 ${isDarkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* SIDEBAR NÂNG CẤP */}
      <div className={`w-72 flex flex-col relative z-20 border-r transition-all duration-300 
          ${isDarkMode ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200'} backdrop-blur-xl shadow-2xl`}>
        
        {/* Logo Area */}
        <div className="p-8 flex items-center justify-between border-b border-white/5 dark:border-white/5">
            <div 
                className="group cursor-pointer flex items-center gap-2" 
                onClick={() => navigate('/dashboard')}
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Sparkles size={20} className="text-white" />
                </div>
                <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    CARO PRO
                </h1>
            </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            if (item.disabled) {
                return (
                    <div key={item.path} className="px-4 py-3 flex items-center gap-3 text-slate-500 cursor-not-allowed opacity-60">
                        <Icon size={20} />
                        <span className="font-medium text-sm">{item.label}</span>
                    </div>
                )
            }

            return (
              <div 
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 font-bold overflow-hidden
                  ${isActive 
                    ? 'text-white shadow-lg shadow-blue-500/25 translate-x-1' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }
                `}
              >
                {/* Background Gradient cho Active State */}
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl" />
                )}

                <div className="relative z-10 flex items-center gap-3 w-full">
                    <Icon size={22} className={`${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                    <span>{item.label}</span>
                    
                    {isActive && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer Sidebar (Darkmode + Logout) */}
        <div className="p-4 mx-4 mb-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
            
            {/* Toggle Mode */}
            <div className="flex items-center justify-between mb-4 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setIsDarkMode(false)}
                    className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-bold transition-all ${!isDarkMode ? 'bg-orange-100 text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Sun size={14} className="mr-1" /> Sáng
                </button>
                <button 
                    onClick={() => setIsDarkMode(true)}
                    className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-bold transition-all ${isDarkMode ? 'bg-slate-700 text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Moon size={14} className="mr-1" /> Tối
                </button>
            </div>

            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm group"
            >
                <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                Đăng Xuất
            </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        
        {/* Header Glassmorphism */}
        <header className={`h-20 px-8 flex items-center justify-between sticky top-0 z-30 transition-all duration-300 backdrop-blur-lg border-b
            ${isDarkMode ? 'bg-[#0f172a]/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
            
            <div className="flex flex-col">
                <h2 className="text-xl font-black bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-400 bg-clip-text text-transparent uppercase tracking-wide">
                    {menuItems.find(i => i.path === location.pathname)?.label || 'Trang chủ'}
                </h2>
                <p className="text-xs text-slate-500 font-medium">Have a good game!</p>
            </div>

            <div className="flex items-center gap-5">
               <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.fullName}</div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Online</span>
                  </div>
               </div>
               
               <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 to-violet-500 shadow-lg shadow-blue-500/20 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                          <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                      ) : (
                          <span className="font-black text-lg bg-gradient-to-br from-blue-500 to-violet-500 bg-clip-text text-transparent">
                              {user.fullName?.charAt(0).toUpperCase()}
                          </span>
                      )}
                  </div>
               </div>
            </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth custom-scrollbar p-1">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;