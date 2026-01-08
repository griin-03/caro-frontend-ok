import React, { useState } from 'react';
import { 
    Users, Trophy, ShoppingBag, Activity, 
    ArrowUpRight, Gamepad2, PlayCircle, Zap,
    Info, Heart, Hammer, X, Sparkles, BookOpen, Share2 // Thêm icon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();
    
    // Mặc định là FALSE (Không tự hiện làm phiền)
    const [showGuide, setShowGuide] = useState(false);

    const stats = [
        { title: 'Người chơi online', value: '0', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Trận đấu đang diễn ra', value: '0', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
        { title: 'Top Server', value: 'DragonSlayer', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { title: 'Tổng doanh thu', value: 'Free', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="p-8 space-y-8 relative">
            
            {/* --- MODAL HƯỚNG DẪN (Chỉ hiện khi bấm nút) --- */}
            {showGuide && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                    {/* Lớp nền mờ tối hơn chút để tập trung */}
                    <div 
                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
                        onClick={() => setShowGuide(false)}
                    ></div>

                    <div className="relative bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-zoom-in">
                        
                        {/* Header màu cam nổi bật cho hướng dẫn */}
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-2">
                                    <BookOpen className="text-yellow-200" />
                                    Làm sao để chơi?
                                </h2>
                                <p className="text-orange-100 text-sm mt-1">Đọc kỹ để không phải chờ đợi!</p>
                            </div>
                            <button onClick={() => setShowGuide(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={24} /></button>
                        </div>

                        {/* Nội dung chính */}
                        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-700 dark:text-slate-300">
                            
                            {/* PHẦN 1: QUAN TRỌNG NHẤT - CÁCH RỦ BẠN */}
                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50 p-4 rounded-xl">
                                <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                                    <Share2 size={20} /> QUAN TRỌNG: Rủ bạn cùng chơi
                                </h3>
                                <p className="text-sm mb-3">
                                    Hiện tại server đang thử nghiệm nên <strong>RẤT ÍT NGƯỜI LẠ</strong>. 
                                    Nếu bạn vào tìm trận ngẫu nhiên sẽ phải chờ rất lâu và thất vọng.
                                </p>
                                <p className="font-bold underline mb-2">Hãy làm theo các bước sau để chơi ngay:</p>
                                <ol className="list-decimal list-inside space-y-2 text-sm font-medium">
                                    <li>Copy đường link trang web này gửi cho 1 người bạn (Zalo, Messenger...).</li>
                                    <li>Bảo bạn ấy <strong>Đăng ký</strong> và <strong>Đăng nhập</strong> vào game.</li>
                                    <li>Cả 2 cùng bấm vào menu <strong>ĐẤU TRƯỜNG</strong>.</li>
                                    <li>Bạn bấm <strong>"Tạo Phòng"</strong> -> Gửi mã số (ví dụ: 1234) cho bạn ấy.</li>
                                    <li>Bạn ấy bấm <strong>"Vào Phòng"</strong> -> Nhập mã số -> <strong>CHIẾN THÔI! ⚔️</strong></li>
                                </ol>
                            </div>

                            {/* Phần 2: Đang phát triển (Bảo họ lờ đi) */}
                            <div className="flex gap-4 items-start opacity-75">
                                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-500">
                                    <Hammer size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Các khu vực khác?</h3>
                                    <p className="text-sm">
                                        Hiện tại các tính năng CHƯA HOẠT ĐỘNG như <strong>Cửa hàng, Nạp thẻ, Xếp hạng, Cộng đồng</strong> đang được chúng tôi xây dựng.
                                        <br/>
                                        👉 <span className="text-blue-500 font-bold">Bạn không cần quan tâm đến chúng lúc này.</span> Hãy tập trung vào Đấu Trường để so trình với bạn bè nhé!
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100 dark:bg-slate-700"></div>

                            {/* Phần 3: Lời cảm ơn */}
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-500">
                                    <Heart size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Lời Cảm Ơn</h3>
                                    <p className="text-sm italic">
                                        "Cảm ơn bạn đã ghé thăm dự án tâm huyết của <strong>Team</strong> <strong>trong quá trình trải nghiệm gặp bất cứ lỗi nào hãy báo cho admin Partner Hồ Tổng( Ở ICON FACEBOOK TRONG PHẦN VỀ CHÚNG TÔI! HOẶC PHẢN HỒI NHÉ)</strong>. Chúc bạn có những ván cờ vui vẻ bên bạn bè!"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                            <button 
                                onClick={() => setShowGuide(false)}
                                className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-bold rounded-xl transition-all"
                            >
                                Đóng Hướng Dẫn
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* --- HEADER CHÍNH --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">TỔNG QUAN</h1>
                    <p className="text-slate-500 dark:text-slate-400">Chào mừng trở lại, Game thủ!</p>
                </div>
                
                <div className="flex gap-3">
                    {/* NÚT HƯỚNG DẪN MỚI */}
                    <button 
                        onClick={() => setShowGuide(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
                    >
                        <BookOpen size={20} />
                        Hướng Dẫn
                    </button>

                    <button 
                        onClick={() => navigate('/game')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
                    >
                        <PlayCircle size={20} />
                        Chơi Ngay
                    </button>
                </div>
            </div>

            {/* Grid Thống kê (Giữ nguyên) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                                <item.icon size={24} />
                            </div>
                            <span className="text-xs font-bold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center gap-1">
                                <ArrowUpRight size={12} /> +12%
                            </span>
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{item.title}</h3>
                        <p className="text-2xl font-black text-slate-800 dark:text-white">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Banner & Hoạt động (Giữ nguyên) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-80">
                <div className="lg:col-span-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center">
                        <span className="bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold mb-4 backdrop-blur-sm border border-white/30">SỰ KIỆN HOT</span>
                        <h2 className="text-4xl font-black mb-4 leading-tight">Giải Đấu Mùa Xuân <br/> Caro Championship</h2>
                        <p className="text-white/80 mb-8 max-w-md">Tham gia ngay để tranh tài với các cao thủ và nhận phần thưởng hấp dẫn.</p>
                        <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold w-fit hover:bg-slate-100 transition-colors shadow-lg">
                            Xem Chi Tiết
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-500" /> Hoạt Động Gần Đây
                    </h3>
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">U{i}</div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">User {i} vừa thắng</p>
                                    <p className="text-xs text-slate-400">2 phút trước</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;