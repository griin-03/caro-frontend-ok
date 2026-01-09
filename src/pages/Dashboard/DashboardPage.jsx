import React, { useState, useEffect } from 'react';
import { 
    Users, Trophy, ShoppingBag, Activity, 
    ArrowUpRight, Gamepad2, PlayCircle, Zap,
    Info, Heart, Hammer, X, Sparkles, BookOpen, Share2,
    Maximize, Minimize, Bell, Calendar, ChevronRight, Star, Shield,
    ChevronUp, ChevronDown // Thêm icon mũi tên
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- CSS STYLES ---
const customStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 20px;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #475569;
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  /* Hiệu ứng chuyển động mượt cho Header */
  .header-transition {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const DashboardPage = () => {
    const navigate = useNavigate();
    
    // State logic
    const [showGuide, setShowGuide] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [greeting, setGreeting] = useState('');
    
    // State mới: Quản lý ẩn/hiện Header
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    // Xử lý lời chào theo giờ
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Chào buổi sáng');
        else if (hour < 18) setGreeting('Chào buổi chiều');
        else setGreeting('Chào buổi tối');
    }, []);

    // Xử lý Fullscreen
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    // Dữ liệu thống kê (Logic cũ)
    const stats = [
        { title: 'Người chơi online', value: '128', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+12%' },
        { title: 'Trận đấu đang diễn ra', value: '45', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10', trend: '+5%' },
        { title: 'Top Server', value: 'DragonSlayer', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/10', trend: 'MVP' },
        { title: 'Tổng doanh thu', value: 'Free', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10', trend: 'Stable' },
    ];

    // Dữ liệu giả lập cho Bảng xếp hạng
    const topPlayers = [
        { rank: 1, name: 'DragonSlayer', points: 2400, winRate: '85%' },
        { rank: 2, name: 'NightMare', points: 2350, winRate: '82%' },
        { rank: 3, name: 'ProCaroVN', points: 2100, winRate: '78%' },
        { rank: 4, name: 'NoobMaster', points: 1950, winRate: '65%' },
        { rank: 5, name: 'FakerFake', points: 1800, winRate: '60%' },
    ];

    // Dữ liệu giả lập Tin tức
    const news = [
        { id: 1, tag: 'Bảo trì', title: 'Thông báo bảo trì hệ thống ngày 15/01', date: '10/01' },
        { id: 2, tag: 'Sự kiện', title: 'Đua Top nhận Skin "Vua Hải Tặc"', date: '09/01' },
        { id: 3, tag: 'Cập nhật', title: 'Phiên bản 2.0: Ra mắt tính năng Shop', date: '08/01' },
    ];

    return (
        <div className="h-full flex flex-col relative custom-scrollbar overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
            <style>{customStyles}</style>

            {/* --- MODAL HƯỚNG DẪN (GIỮ NGUYÊN) --- */}
            {showGuide && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowGuide(false)}></div>
                    <div className="relative bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in-up">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-2">
                                    <BookOpen className="text-yellow-200" /> Làm sao để chơi?
                                </h2>
                                <p className="text-orange-100 text-sm mt-1">Đọc kỹ để không phải chờ đợi!</p>
                            </div>
                            <button onClick={() => setShowGuide(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={24} /></button>
                        </div>
                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-slate-700 dark:text-slate-300 custom-scrollbar">
                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50 p-4 rounded-xl">
                                <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                                    <Share2 size={20} /> QUAN TRỌNG: Rủ bạn cùng chơi
                                </h3>
                                <p className="text-sm mb-3">Hiện tại server đang thử nghiệm nên <strong>RẤT ÍT NGƯỜI LẠ</strong>.</p>
                                <ol className="list-decimal list-inside space-y-2 text-sm font-medium">
                                    <li>Copy đường link trang web này gửi cho bạn bè.</li>
                                    <li>Bảo bạn ấy <strong>Đăng ký</strong> và <strong>Đăng nhập</strong>.</li>
                                    <li>Cả 2 cùng bấm vào menu <strong>ĐẤU TRƯỜNG</strong>.</li>
                                    <li>Một người <strong>"Tạo Phòng"</strong> -> Gửi mã số.</li>
                                    <li>Người kia <strong>"Vào Phòng"</strong> -> Nhập mã -> <strong>CHIẾN!</strong></li>
                                </ol>
                            </div>
                            <div className="flex gap-4 items-start opacity-75">
                                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl"><Hammer size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-lg">Các khu vực khác?</h3>
                                    <p className="text-sm">Tính năng Cửa hàng, Nạp thẻ đang phát triển. Hãy tập trung vào Đấu Trường.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                            <button onClick={() => setShowGuide(false)} className="px-6 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 font-bold rounded-xl">Đóng</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- NÚT TAM GIÁC (TOGGLE HEADER) --- */}
            {/* Nút này luôn nổi lên trên, nằm ở mép trên cùng */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
                <button 
                    onClick={() => setIsHeaderVisible(!isHeaderVisible)}
                    className="bg-white dark:bg-slate-800 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 w-12 h-5 rounded-b-xl border-b border-x border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    title={isHeaderVisible ? "Thu gọn Header" : "Mở rộng Header"}
                >
                   {isHeaderVisible ? <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" /> : <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />}
                </button>
            </div>

            {/* --- NỘI DUNG CHÍNH --- */}
            <div className="p-6 md:p-8 space-y-8 flex-1 max-w-[1600px] mx-auto w-full">
                
                {/* 1. HEADER (CÓ THỂ ẨN HIỆN) */}
                <div 
                    className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 overflow-hidden header-transition
                        ${isHeaderVisible ? 'max-h-40 opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}
                    `}
                >
                    <div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                            <Calendar size={14} />
                            <span>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                            {greeting}, Game thủ! 👋
                        </h1>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                        <button 
                            onClick={toggleFullScreen}
                            className="p-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all active:scale-95 group"
                            title="Toàn màn hình"
                        >
                            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} className="group-hover:scale-110 transition-transform"/>}
                        </button>
                        <button 
                            onClick={() => setShowGuide(true)}
                            className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 active:scale-95"
                        >
                            <BookOpen size={20} /> Hướng Dẫn
                        </button>
                        <button 
                            onClick={() => navigate('/game')}
                            className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:scale-95 animate-pulse-slow"
                        >
                            <PlayCircle size={20} fill="currentColor" /> CHƠI NGAY
                        </button>
                    </div>
                </div>

                {/* 2. STATS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{animationDelay: '100ms'}}>
                    {stats.map((item, index) => (
                        <div key={index} className="group bg-white dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <item.icon size={64} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3.5 rounded-2xl ${item.bg} ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                        <item.icon size={22} />
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-lg flex items-center gap-1">
                                        <ArrowUpRight size={10} className="text-green-500" /> {item.trend}
                                    </span>
                                </div>
                                <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{item.title}</h3>
                                <p className="text-3xl font-black text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. BANNER & NEWS */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    
                    {/* Banner Lớn */}
                    <div className="xl:col-span-2 relative h-80 rounded-3xl overflow-hidden group shadow-lg transition-transform hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 transition-all duration-500 group-hover:scale-105"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] -ml-10 -mb-10 animate-pulse"></div>
                        
                        <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12 text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30 flex items-center gap-1.5 shadow-sm">
                                    <Sparkles size={12} className="text-yellow-300" /> HOT EVENT
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight drop-shadow-lg">
                                Giải Đấu Mùa Xuân <br/> Caro Championship
                            </h2>
                            <p className="text-indigo-100 mb-8 max-w-lg text-base md:text-lg font-medium drop-shadow-md">
                                Tranh tài cao thủ, leo Rank thần tốc và nhận Skin độc quyền "Long Thần".
                            </p>
                            <button className="bg-white text-indigo-700 px-8 py-3.5 rounded-2xl font-bold w-fit hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 text-sm uppercase tracking-wide">
                                Xem Chi Tiết <ChevronRight size={16} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    {/* Bảng Tin Tức */}
                    <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-80 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Bell size={20} className="text-red-500 fill-current animate-wiggle" /> Tin Tức Mới
                            </h3>
                            <button className="text-xs font-bold text-blue-500 hover:text-blue-600 hover:underline">Xem tất cả</button>
                        </div>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                            {news.map((item) => (
                                <div key={item.id} className="group flex gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex-shrink-0 border border-slate-200 dark:border-slate-600 group-hover:border-blue-200 dark:group-hover:border-blue-500/50 transition-colors">
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{item.date}</span>
                                    </div>
                                    <div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 inline-block
                                            ${item.tag === 'Bảo trì' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
                                              item.tag === 'Sự kiện' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                              'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}
                                        `}>
                                            {item.tag}
                                        </span>
                                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. RANKING & ACTIVITY */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                    
                    {/* Bảng Xếp Hạng Top 5 */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Trophy size={20} className="text-yellow-500 fill-current" /> Bảng Xếp Hạng Tuần
                            </h3>
                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors"><Share2 size={18} /></button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs uppercase text-slate-400 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                                        <th className="px-6 py-4 font-bold tracking-wider w-16">Rank</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Người Chơi</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">ELO</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Win Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {topPlayers.map((player) => (
                                        <tr key={player.rank} className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                                            <td className="px-6 py-4 font-bold">
                                                {player.rank === 1 ? <span className="text-2xl drop-shadow-md">🥇</span> : 
                                                 player.rank === 2 ? <span className="text-2xl drop-shadow-md">🥈</span> : 
                                                 player.rank === 3 ? <span className="text-2xl drop-shadow-md">🥉</span> : 
                                                 <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-500 font-bold">{player.rank}</span>}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200 flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:scale-110 transition-transform">
                                                        {player.name.charAt(0)}
                                                    </div>
                                                    {player.rank <= 3 && <div className="absolute -top-1 -right-1 text-yellow-400"><Crown size={12} fill="currentColor"/></div>}
                                                </div>
                                                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{player.name}</span>
                                            </td>
                                            <td className="px-6 py-4 font-black text-slate-700 dark:text-white">
                                                {player.points} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-500 rounded-full" style={{width: player.winRate}}></div>
                                                    </div>
                                                    <span className="text-green-600 dark:text-green-400 font-bold text-xs">{player.winRate}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Hoạt động gần đây */}
                    <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                            <Zap size={20} className="text-blue-500 fill-current" /> Trận Đấu Vừa Qua
                        </h3>
                        <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar max-h-[300px]">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-600 group">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 border border-slate-200 dark:border-slate-600 group-hover:border-blue-300 transition-colors">
                                            U{i}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white flex justify-between items-center">
                                            <span className="truncate">User {i}</span>
                                            <span className="text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded ml-2">WIN</span>
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5 truncate">vừa đánh bại <span className="text-slate-600 dark:text-slate-300 font-medium">Đối thủ X</span></p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">2m ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            
            {/* --- FOOTER --- */}
            <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-8">
                <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                    <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-default">
                        <Gamepad2 size={24} className="text-blue-600" />
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-lg tracking-tight">Caro Pro</span>
                    </div>
                    <div className="flex gap-6 font-medium">
                        <a href="#" className="hover:text-blue-500 transition-colors">Về chúng tôi</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Điều khoản</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Bảo mật</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Liên hệ Admin</a>
                    </div>
                    <p className="opacity-60">© 2026 Caro Pro Team. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

// Helper Icon Crown (Vì Lucide có thể không có Crown ở bản cũ)
function Crown(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
      </svg>
    )
}

export default DashboardPage;