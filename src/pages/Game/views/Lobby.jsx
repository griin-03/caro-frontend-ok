import React, { useState } from "react";
import {
  Users, Trophy, Search, Swords, PlayCircle,
  Zap, Shield, Brain, Clock, Ghost, Shuffle, Target,
  Flame, Gem, Lock, Infinity as InfinityIcon,
  Eye, EyeOff, Hourglass, HelpCircle, Grid, MonitorPlay
} from "lucide-react";
import { Avatar } from "../../../components/game/GameUI";

// --- DANH SÁCH 27 BIẾN THỂ (CHỈ ĐỂ HIỂN THỊ / AI SAU NÀY) ---
const GAME_VARIANTS = [
  { id: 'freestyle', name: 'Cờ caro tiêu chuẩn (Freestyle)', icon: Swords, color: 'text-blue-500' },
  { id: 'renju', name: 'Gomoku luật Renju', icon: Shield, color: 'text-orange-500' },
  { id: 'vietnam', name: 'Gomoku luật Caro Việt Nam', icon: StarIcon, color: 'text-red-500' },
  { id: 'block2', name: 'Gomoku chặn 2 đầu', icon: Lock, color: 'text-indigo-500' },
  { id: 'block4', name: 'Gomoku chặn 4', icon: Lock, color: 'text-indigo-600' },
  { id: 'win6', name: 'Gomoku 6 thắng', icon: Gem, color: 'text-emerald-500' },
  { id: 'unlimited', name: 'Gomoku không giới hạn', icon: InfinityIcon, color: 'text-sky-500' },
  { id: 'mini', name: 'Gomoku bàn cờ thu nhỏ', icon: Grid, color: 'text-pink-500' },
  { id: 'large', name: 'Gomoku bàn cờ mở rộng', icon: Grid, color: 'text-purple-500' },
  { id: 'fog', name: 'Gomoku sương mù (Fog of War)', icon: Ghost, color: 'text-gray-500' },
  { id: 'double', name: 'Gomoku lượt đôi', icon: Zap, color: 'text-yellow-500' },
  { id: 'random_turn', name: 'Gomoku đổi lượt ngẫu nhiên', icon: Shuffle, color: 'text-teal-500' },
  { id: 'ai_attack', name: 'Gomoku AI tấn công', icon: Swords, color: 'text-red-600' },
  { id: 'ai_defend', name: 'Gomoku AI phòng thủ', icon: Shield, color: 'text-blue-600' },
  { id: 'ai_learn', name: 'Gomoku AI học dần', icon: Brain, color: 'text-violet-500' },
  { id: 'time_limit', name: 'Gomoku thời gian giới hạn', icon: Clock, color: 'text-orange-600' },
  { id: 'blitz', name: 'Gomoku Blitz', icon: Zap, color: 'text-yellow-600' },
  { id: 'survival', name: 'Gomoku sinh tồn', icon: Flame, color: 'text-red-500' },
  { id: 'puzzle', name: 'Gomoku Puzzle', icon: HelpCircle, color: 'text-green-500' },
  { id: 'mirror', name: 'Gomoku Mirror', icon: Eye, color: 'text-cyan-500' },
  { id: 'chaos', name: 'Gomoku Chaos', icon: EyeOff, color: 'text-fuchsia-500' },
  { id: 'pre_place', name: 'Gomoku đặt trước quân', icon: Target, color: 'text-rose-500' },
  { id: 'swap_color', name: 'Gomoku đảo màu', icon: Shuffle, color: 'text-lime-500' },
  { id: 'handicap', name: 'Gomoku Handicap', icon: StarIcon, color: 'text-yellow-400' },
  { id: 'dark_mode', name: 'Gomoku Dark Mode', icon: Ghost, color: 'text-slate-500' },
  { id: 'boss', name: 'Gomoku Boss Fight', icon: SkullIcon, color: 'text-red-700' },
  { id: 'marathon', name: 'Gomoku Marathon', icon: Hourglass, color: 'text-blue-400' },
  { id: 'one_move', name: 'Gomoku One Move Kill', icon: Zap, color: 'text-purple-600' },
];

// Helper components for missing icons
function StarIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
function SkullIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="M12.5 17l.5-2"/><path d="M9 17l-.5-2"/><path d="M12 2a9 9 0 0 1 9 9c0 2.5-1.1 4.8-2.9 6.4a1 1 0 0 0-.4.8V21a1 1 0 0 1-1 1H6.3a1 1 0 0 1-1-1v-2.8a1 1 0 0 0-.4-.8C3.1 15.8 2 13.5 2 11a9 9 0 0 1 10-9z"/></svg> }


const Lobby = ({ user, roomList = [], onJoinGame }) => {
  // State chỉ để chọn UI, không ảnh hưởng logic tạo phòng Online
  const [selectedAiMode, setSelectedAiMode] = useState(GAME_VARIANTS[0]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white relative overflow-hidden transition-colors duration-500">
      
      {/* Background Animation Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="z-10 w-full max-w-[1400px] h-[85vh] px-4 flex gap-6">
        
        {/* ===== LEFT COLUMN: PROFILE & CONTROL CENTER ===== */}
        <div className="w-[400px] flex flex-col gap-4 h-full">
            
            {/* 1. User Profile Card */}
            <div className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-4 transition-all">
                <div className="relative">
                     <Avatar name={user.fullName} size={64} score={user.score} />
                     <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800"></div>
                </div>
                <div>
                    <div className="text-xl font-black text-slate-800 dark:text-white">{user.fullName}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg mt-1 w-fit">
                        <Trophy size={14} className="text-yellow-500" />
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">{user.score} ELO</span>
                    </div>
                </div>
            </div>

            {/* 2. KHU VỰC PVP ONLINE (ĐÂY LÀ CHỨC NĂNG CHÍNH - REAL TIME) */}
            <div className="bg-gradient-to-br from-blue-600 to-violet-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Swords size={100} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Zap className="text-yellow-300 fill-current animate-pulse"/> Đấu Trường Online
                </h3>
                <p className="text-blue-100 text-sm mb-6 max-w-[80%]">
                    LƯU Ý: 1. NẾU ẤN TẠO SERVER LỖI THÌ ĐỢI 2-3 PHÚT CHO SERVER KHỞI ĐỘNG NHÉ! SERVER SẼ TỰ NGỦ KHI KHÔNG CÓ NGƯỜI CHƠI! 2. LÀ PHẢI CÓ BẠN BÈ DÙNG LINK WEB NÀY Ở MÁY KHÁC THÌ SẼ CHƠI ONLINE CÙNG NHAU ĐƯỢC NHÉ Ạ. ẤN ĐỂ TẠO PHÒNG
                </p>
                
                {/* NÚT TẠO PHÒNG PVP - LOGIC CŨ 100% */}
                <button
                    onClick={() => onJoinGame("CREATE")}
                    className="w-full py-3.5 bg-white text-blue-700 rounded-xl font-bold text-base shadow-xl hover:bg-blue-50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <Swords size={20} /> TẠO PHÒNG NGAY
                </button>
            </div>

            {/* 3. KHU VỰC AI / LUYỆN TẬP (TÁCH BIỆT - KHÔNG GỌI CREATE ROOM ONLINE) */}
            <div className="flex-1 bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md">
                    <h3 className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200 text-sm uppercase">
                        <Brain size={18} className="text-emerald-500"/> Phòng Thí Nghiệm (AI)
                    </h3>
                </div>
                
                {/* Danh sách cuộn 27 chế độ */}
                <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1">
                    {GAME_VARIANTS.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setSelectedAiMode(mode)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 border
                                ${selectedAiMode.id === mode.id 
                                    ? 'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm' 
                                    : 'border-transparent hover:bg-white dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 opacity-70 hover:opacity-100'
                                }
                            `}
                        >
                            <mode.icon size={18} className={selectedAiMode.id === mode.id ? 'text-emerald-500' : 'text-slate-400'} />
                            <span className="text-xs font-bold truncate">{mode.name}</span>
                        </button>
                    ))}
                </div>

                {/* Nút giả lập (Disable để tránh nhầm lẫn) */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white/30 dark:bg-slate-800/30">
                     <button className="w-full py-2 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                        <MonitorPlay size={14} /> Chơi với AI (Sắp ra mắt)
                     </button>
                </div>
            </div>
        </div>

        {/* ===== RIGHT COLUMN: ROOM LIST (GIỮ NGUYÊN) ===== */}
        <div className="flex-1 bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col shadow-xl h-full">
          
          {/* Header & Search */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black flex items-center gap-3 text-slate-800 dark:text-white uppercase tracking-wide">
              <Users className="text-blue-500" /> 
              SẢNH CHỜ ONLINE
              <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-lg text-sm font-bold">
                {roomList.length}
              </span>
            </h3>
            
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    placeholder="Tìm phòng đấu..."
                    className="bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl py-2.5 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
            </div>
          </div>

          {/* Room Grid */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {roomList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 opacity-60">
                <Ghost size={64} strokeWidth={1} className="mb-4" />
                <p className="text-lg font-medium">Chưa có phòng online nào.</p>
                <p className="text-sm">Bấm "Tạo Phòng Ngay" để leo rank!</p>
              </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roomList.map((room) => (
                    <div
                      key={room.id}
                      className="group bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Swords size={48} />
                      </div>

                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                                #{room.id}
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 dark:text-white truncate max-w-[150px]">
                                    {room.name || `Phòng ${room.id}`}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${room.status === 'PLAYING' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                                    {room.status === 'PLAYING' ? 'Đang chơi' : 'Đang chờ'}
                                </div>
                            </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 relative z-10">
                         <div className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md">
                             Chủ phòng: <span className="text-blue-600 dark:text-blue-400 font-bold">{room.hostName || room.host?.fullName || "Ẩn danh"}</span>
                         </div>
                         {/* NÚT JOIN PHÒNG - GIỮ NGUYÊN LOGIC */}
                         <button
                            onClick={() => onJoinGame("JOIN", room.id)}
                            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all transform group-hover:scale-105 shadow-md"
                          >
                            <PlayCircle size={14} /> Vào Ngay
                          </button>
                      </div>
                    </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;