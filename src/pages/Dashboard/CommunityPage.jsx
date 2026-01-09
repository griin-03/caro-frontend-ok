import React, { useState } from 'react';
import { 
    MessageSquare, Heart, Share2, Send, Trophy, Users, 
    Zap, Hash, Crown, Info, Search, Filter, MoreHorizontal,
    Swords, Calendar, Star, AlertCircle
} from 'lucide-react';

// --- DỮ LIỆU GIẢ LẬP (MÔ PHỎNG DATABASE) ---
const MOCK_POSTS = [
    {
        id: 1,
        user: "Chiến Thần Caro",
        avatar: "https://ui-avatars.com/api/?name=Chien+Than&background=0D8ABC&color=fff",
        time: "2 giờ trước",
        category: "CARO",
        content: "Một nước đi sai – trả giá cả ván. Vừa thua một trận cay đắng vì không để ý nước chéo 3. Anh em có kinh nghiệm def nước này không?", // Prompt #8
        likes: 124,
        comments: 45,
        image: null 
    },
    {
        id: 2,
        user: "TicTac Master",
        avatar: "https://ui-avatars.com/api/?name=T+T&background=8b5cf6&color=fff",
        time: "5 giờ trước",
        category: "TIC TAC TOE",
        content: "Biến thể mới – tư duy mới. Tic Tac Toe 5x5 luật chặn 2 đầu đánh cuốn hơn hẳn bản cổ điển. Đừng áp dụng thói quen cũ nhé!", // Prompt #9
        likes: 89,
        comments: 12,
        image: "https://placehold.co/600x300/1e293b/FFF?text=Strategy+Diagram"
    }
];

const RANKING = [
    { name: "Sát Thủ 2000", point: "2400 ELO", rank: 1 },
    { name: "Vua Cờ Vây", point: "2350 ELO", rank: 2 },
    { name: "Master Mind", point: "2100 ELO", rank: 3 },
];

const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState('ALL');
    const [posts, setPosts] = useState(MOCK_POSTS);

    return (
        <div className="min-h-screen pb-20">
            
            {/* --- 1. HERO SECTION (PROMPT #1 & #2) --- */}
            <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-blue-600 to-violet-700 shadow-xl shadow-blue-500/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="relative z-10 p-8 md:p-12 text-center text-white">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-widest mb-4 border border-white/30">
                        🌐 ALL PROMPT – COMMUNITY
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                        CỘNG ĐỒNG TRÍ TUỆ – NƠI CAO THỦ HỘI TỤ
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        "Không chỉ là game – là nơi chia sẻ tư duy. Mỗi người chơi – một chiến lược."
                    </p>
                    
                    {/* PROMPT #3 CTA */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 rounded-xl bg-white text-blue-700 font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                            <Zap size={20} fill="currentColor" /> Gia nhập cao thủ
                        </button>
                        <button className="px-8 py-3 rounded-xl bg-blue-800/50 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-blue-800/70 transition-all">
                            Bắt đầu chia sẻ
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MAIN GRID LAYOUT --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* === LEFT COLUMN: NAVIGATION & FILTERS === */}
                <div className="hidden lg:block lg:col-span-3 space-y-6">
                    {/* Intro Card (PROMPT #2) */}
                    <div className="bg-white dark:bg-[#1e293b]/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                            <Info size={18} className="text-blue-500"/> Giới Thiệu
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                            Đây là nơi người chơi Caro & Tic Tac Toe kết nối, chia sẻ chiến thuật. 
                            Không phân biệt online hay offline, tất cả đều gặp nhau bằng trí tuệ.
                        </p>
                        <div className="text-xs font-bold text-violet-500">
                            Chơi cùng nhau – Học hỏi lẫn nhau.
                        </div>
                    </div>

                    {/* Menu Categories */}
                    <div className="bg-white dark:bg-[#1e293b]/60 backdrop-blur-xl rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="space-y-1">
                            {['Tất cả', 'Thảo luận Caro', 'Biến thể TicTacToe', 'Phân tích ván đấu', 'Sự kiện'].map((item, idx) => (
                                <button key={idx} className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3
                                    ${idx === 0 
                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}
                                `}>
                                    <Hash size={18} /> {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* === CENTER COLUMN: FEED & COMPOSER === */}
                <div className="lg:col-span-6 space-y-6">
                    
                    {/* 1. COMPOSER (PROMPT #5) */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=You&background=random" alt="User" />
                            </div>
                            <div className="flex-1">
                                <textarea 
                                    placeholder="Bạn đang nghĩ gì về ván đấu vừa rồi? Viết điều bạn học được..."
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 text-sm"
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Thêm ảnh">
                                    <div className="text-xs font-bold flex items-center gap-1"><Info size={16}/> Ý tưởng hay</div>
                                </button>
                            </div>
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all">
                                <Send size={16} /> Đăng bài
                            </button>
                        </div>
                    </div>

                    {/* 2. POST FEED */}
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 shadow-sm" />
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-slate-100">{post.user}</h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span>{post.time}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                                                <span className="text-blue-500 font-bold uppercase">{post.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={20}/></button>
                                </div>

                                {/* Content (PROMPT #4, #7) */}
                                <div className="mb-4">
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                        {post.content}
                                    </p>
                                    {post.image && (
                                        <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                            <img src={post.image} alt="Post content" className="w-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                {/* Actions (PROMPT #6) */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group/btn">
                                        <Heart size={20} className="group-hover/btn:scale-110 transition-transform"/> 
                                        <span className="text-sm font-semibold">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                                        <MessageSquare size={20} />
                                        <span className="text-sm font-semibold">{post.comments} Bình luận</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-slate-500 hover:text-violet-500 transition-colors">
                                        <Share2 size={20} />
                                        <span className="text-sm font-semibold">Chia sẻ</span>
                                    </button>
                                </div>

                                {/* Mock Comment Input */}
                                <div className="mt-4 flex gap-3 hidden group-hover:flex animate-fade-in">
                                    <input type="text" placeholder="Viết bình luận: Nước đi này rất thú vị..." className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                            </div>
                        ))
                    ) : (
                        // PROMPT #16: EMPTY STATE
                        <div className="text-center py-12 bg-white dark:bg-[#1e293b] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                            <MessageSquareHeart size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Chưa có bài viết nào</h3>
                            <p className="text-slate-500 text-sm">Hãy là người đầu tiên. Cộng đồng đang chờ tiếng nói của bạn.</p>
                        </div>
                    )}
                </div>

                {/* === RIGHT COLUMN: WIDGETS === */}
                <div className="hidden lg:block lg:col-span-3 space-y-6">
                    
                    {/* 1. MATCHMAKING (PROMPT #10) */}
                    <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-violet-500/20 relative overflow-hidden">
                        <Swords className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
                        <h3 className="font-bold text-lg mb-1 relative z-10">Tìm đối thủ xứng tầm</h3>
                        <p className="text-violet-100 text-xs mb-4 relative z-10">Sẵn sàng cho một ván đấu trí?</p>
                        <button className="w-full py-2 bg-white text-violet-700 font-bold rounded-lg hover:bg-violet-50 transition-colors shadow-sm relative z-10">
                            Thách đấu ngay
                        </button>
                    </div>

                    {/* 2. LEADERBOARD (PROMPT #12 & #13) */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                                <Trophy size={18} className="text-yellow-500" /> Bảng Xếp Hạng
                            </h3>
                            <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Top Week</span>
                        </div>
                        <div className="p-2">
                            {RANKING.map((rank, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm
                                        ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : 
                                          idx === 1 ? 'bg-gray-100 text-gray-600' : 
                                          'bg-orange-100 text-orange-700'}
                                    `}>
                                        {rank.rank}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-sm text-slate-700 dark:text-slate-200">{rank.name}</div>
                                        <div className="text-xs text-slate-500">{rank.point}</div>
                                    </div>
                                    {idx === 0 && <Crown size={16} className="text-yellow-500 animate-bounce" />}
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 text-xs font-bold text-blue-500 border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            Xem tất cả
                        </button>
                    </div>

                    {/* 3. RULES (PROMPT #14) */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                        <h3 className="font-bold mb-3 flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <AlertCircle size={18} className="text-red-500"/> Quy tắc cộng đồng
                        </h3>
                        <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></span>
                                Tôn trọng – Công bằng – Văn minh
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></span>
                                Tranh luận bằng lập luận, không công kích
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></span>
                                Chơi đẹp – nói hay – học hỏi
                            </li>
                        </ul>
                    </div>

                    {/* 4. EVENTS (PROMPT #11) */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white">
                        <div className="flex items-start gap-3">
                            <Calendar className="mt-1" size={20}/>
                            <div>
                                <h4 className="font-bold text-sm">Sự kiện: Đại Chiến Mùa Hè</h4>
                                <p className="text-xs text-emerald-100 mt-1">Cơ hội thể hiện bản lĩnh. Tham gia ngay!</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- FOOTER CTA (PROMPT #17) --- */}
            <div className="mt-12 text-center pt-8 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-700 dark:text-white mb-4">Bạn đã sẵn sàng?</h3>
                <div className="flex justify-center gap-4">
                    <button className="px-6 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                        Quay lại chơi game
                    </button>
                    <button className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors">
                        Thách đấu thêm một trận
                    </button>
                </div>
                <p className="mt-4 text-xs text-slate-400 italic">"Chơi để học – học để thắng"</p>
            </div>

        </div>
    );
};

export default CommunityPage;