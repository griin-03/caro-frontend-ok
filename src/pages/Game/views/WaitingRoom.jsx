import React, { useState, useEffect, useRef } from 'react';
import { Send, LogOut, MessageSquare, CheckCircle, Play, XCircle, Users, Copy, Zap, Crown } from 'lucide-react';
import { Avatar } from '../../../components/game/GameUI';

const WaitingRoom = ({ 
    user, 
    roomInfo, 
    isHost, 
    isReady, 
    onLeave, 
    onToggleReady, 
    onStartGame, 
    chatMessages, 
    onSendMessage 
}) => {
    const [chatInput, setChatInput] = useState("");
    const chatEndRef = useRef(null);
    const [roomState, setRoomState] = useState(roomInfo); // Local state để cập nhật UI nhanh
    const [isCopied, setIsCopied] = useState(false);

    // Auto scroll xuống tin nhắn mới nhất
    useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [chatMessages]);

    // ✅ CẬP NHẬT ROOM STATE KHI roomInfo THAY ĐỔI
    useEffect(() => {
        if (roomInfo) {
            setRoomState(roomInfo);
        }
    }, [roomInfo]);

    // Lấy thông tin khách và kiểm tra điều kiện bắt đầu
    const guest = roomState?.guest; 
    // Host chỉ bắt đầu được khi có khách và khách đã sẵn sàng
    const canStart = isHost && guest && guest.isReady;

    // ✅ THÊM: Hàm thêm thông báo hệ thống giống GamePage
    const addSystemMessage = (text) => {
        // Tạo một message hệ thống tạm thời để hiển thị
        const systemMsg = { 
            sender: "Hệ thống", 
            text: text, 
            message: text,
            timestamp: new Date().toISOString()
        };
        
        // Thêm vào chatMessages hiện tại (chỉ UI)
        // Lưu ý: Đây chỉ là UI, message thực tế sẽ được gửi qua socket
        if (typeof onSendMessage === 'function') {
            onSendMessage(`[Hệ thống] ${text}`);
        }
    };

    // ✅ XỬ LÝ KHI GUEST THAY ĐỔI
    useEffect(() => {
        if (!roomState || !roomInfo) return;
        
        const oldGuest = roomState?.guest;
        const newGuest = roomInfo?.guest;
        
        // Kiểm tra guest join
        if (!oldGuest && newGuest) {
            addSystemMessage(`🎮 ${newGuest.name} đã tham gia phòng!`);
        }
        // Kiểm tra guest leave
        if (oldGuest && !newGuest) {
            addSystemMessage(`👋 ${oldGuest.name} đã rời phòng.`);
        }
        // Kiểm tra thay đổi trạng thái ready
        if (oldGuest && newGuest && oldGuest.isReady !== newGuest.isReady) {
            if (newGuest.isReady) {
                addSystemMessage(`✅ ${newGuest.name} đã sẵn sàng!`);
            } else {
                addSystemMessage(`⏸️ ${newGuest.name} đã hủy sẵn sàng!`);
            }
        }
    }, [roomInfo?.guest]);

    // ✅ XỬ LÝ KHI HOST THAY ĐỔI
    useEffect(() => {
        if (!roomState || !roomInfo) return;
        
        const oldHostReady = roomState?.host?.isReady;
        const newHostReady = roomInfo?.host?.isReady;
        
        // Kiểm tra thay đổi trạng thái ready của host
        if (oldHostReady !== newHostReady && newHostReady !== undefined) {
            if (newHostReady) {
                addSystemMessage(`✅ ${roomInfo.host.name} đã sẵn sàng!`);
            } else {
                addSystemMessage(`⏸️ ${roomInfo.host.name} đã hủy sẵn sàng!`);
            }
        }
    }, [roomInfo?.host?.isReady]);

    // ✅ HIỂN THỊ THÔNG BÁO KHI USER RỜI PHÒNG (GỌI HÀM onLeave TỪ PROPS ĐỂ BACKEND XỬ LÝ)
    const handleLeave = () => {
        // Có thể thêm confirm nếu cần
        // if(window.confirm("Bạn có chắc muốn rời phòng?")) { ... }
        
        addSystemMessage(`👋 ${user.fullName} đã rời phòng.`);
        onLeave(); // Gọi hàm này để Socket emit sự kiện leave_room lên Server
    };

    // ✅ HIỂN THỊ THÔNG BÁO KHI TOGGLE READY
    const handleToggleReady = () => {
        if (!isReady) {
            addSystemMessage(`✅ ${user.fullName} đã sẵn sàng!`);
        } else {
            addSystemMessage(`⏸️ ${user.fullName} đã hủy sẵn sàng!`);
        }
        onToggleReady();
    };

    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(roomState?.id);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="h-screen w-full bg-slate-50 dark:bg-[#0f172a] flex items-center justify-center p-4 md:p-6 relative text-slate-800 dark:text-white transition-colors duration-500 overflow-hidden">
             
             {/* Background Effects */}
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse delay-1000" />
             </div>

             <div className="w-full max-w-[1400px] h-[85vh] flex gap-6 relative z-10">
                
                {/* CỘT TRÁI: THÔNG TIN PHÒNG & NGƯỜI CHƠI */}
                <div className="flex-1 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all">
                    
                    {/* Header Bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"/>
                    
                    {/* Top Controls */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                        {/* Nút Thoát Phòng (Kết nối Backend) */}
                        <button 
                            onClick={handleLeave} 
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-500/30 rounded-xl font-bold text-sm transition-all group shadow-sm"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform"/> 
                            <span className="hidden sm:inline">Rời Phòng</span>
                        </button>

                        {/* Room ID Badge */}
                        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl px-4 py-2 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">ID Phòng:</span>
                            <span className="text-lg font-black text-blue-600 dark:text-blue-400">#{roomState?.id}</span>
                            <button onClick={handleCopyRoomId} className="ml-2 text-slate-400 hover:text-blue-500 transition-colors" title="Copy ID">
                                {isCopied ? <CheckCircle size={16} className="text-green-500"/> : <Copy size={16}/>}
                            </button>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black mb-16 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-400 mt-12 text-center">
                        ĐẤU TRƯỜNG
                        <div className="text-xs font-bold tracking-normal mt-2 text-slate-400 bg-slate-100 dark:bg-slate-800 w-fit mx-auto px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                             {guest ? '2/2 Sẵn Sàng Chiến Đấu' : '1/2 Đang Chờ Đối Thủ...'}
                        </div>
                    </h2>

                    <div className="flex items-center justify-center w-full gap-8 md:gap-24 relative">
                        {/* HOST (CHỦ PHÒNG) */}
                        <div className="flex flex-col items-center gap-4 relative group">
                            <div className="absolute -top-10 text-yellow-500 animate-bounce">
                                <Crown size={32} fill="currentColor" />
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-70 blur group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative bg-white dark:bg-slate-900 p-1 rounded-full">
                                    <Avatar 
                                        name={roomState?.host?.name || "Host"} 
                                        size={120} 
                                        score={roomState?.host?.score} 
                                        isReady={roomState?.host?.isReady}
                                    />
                                </div>
                                {/* Ready Badge Overlay */}
                                {roomState?.host?.isReady && (
                                    <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full border-4 border-white dark:border-slate-900 shadow-lg animate-scale-in">
                                        <CheckCircle size={20} />
                                    </div>
                                )}
                            </div>
                            
                            <div className="text-center">
                                <div className="text-2xl font-black text-slate-800 dark:text-white mb-1">{roomState?.host?.name || "..."}</div>
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                                    roomState?.host?.isReady 
                                        ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400' 
                                        : 'bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                                }`}>
                                    {roomState?.host?.isReady ? 'ĐÃ SẴN SÀNG' : 'ĐANG CHUẨN BỊ...'}
                                </div>
                            </div>
                        </div>

                        {/* VS DIVIDER */}
                        <div className="hidden md:flex flex-col items-center justify-center">
                            <div className="text-6xl font-black text-slate-200 dark:text-slate-700 italic select-none">VS</div>
                        </div>

                        {/* GUEST (KHÁCH) */}
                        <div className="flex flex-col items-center gap-4 min-w-[150px] group">
                            {guest ? (
                                <>
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-70 blur group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative bg-white dark:bg-slate-900 p-1 rounded-full">
                                            <Avatar name={guest.name} size={120} score={guest.score} isReady={guest.isReady} />
                                        </div>
                                         {/* Ready Badge Overlay */}
                                        {guest.isReady && (
                                            <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full border-4 border-white dark:border-slate-900 shadow-lg animate-scale-in">
                                                <CheckCircle size={20} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-slate-800 dark:text-white mb-1">{guest.name}</div>
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                                            guest.isReady 
                                                ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400' 
                                                : 'bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                                        }`}>
                                            {guest.isReady ? 'ĐÃ SẴN SÀNG' : 'ĐANG CHUẨN BỊ...'}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-4 opacity-60">
                                    <div className="w-[128px] h-[128px] rounded-full border-4 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 animate-pulse">
                                        <Users size={48} className="text-slate-400"/>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-slate-400 dark:text-slate-500">Trống</div>
                                        <div className="text-xs text-slate-400 mt-1">Đang chờ đối thủ...</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ACTION BUTTONS (Start / Ready) */}
                    <div className="mt-16 w-full max-w-md relative z-20">
                        {isHost ? (
                            <button 
                                onClick={onStartGame}
                                disabled={!canStart}
                                className={`w-full py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 duration-200 shadow-xl ${
                                    canStart 
                                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-blue-500/30 hover:shadow-blue-500/50 cursor-pointer animate-pulse-slow' 
                                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                                }`}
                            >
                                <Play fill="currentColor" size={24}/> 
                                {canStart ? "BẮT ĐẦU TRẬN ĐẤU" : "CHỜ ĐỐI THỦ SẴN SÀNG"}
                            </button>
                        ) : (
                            <button 
                                onClick={handleToggleReady}
                                className={`w-full py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 duration-200 shadow-xl ${
                                    isReady 
                                        ? 'bg-slate-100 dark:bg-slate-800 text-red-500 border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-500/10' 
                                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-green-500/30 hover:shadow-green-500/50'
                                }`}
                            >
                                {isReady ? <><XCircle size={24}/> HỦY SẴN SÀNG</> : <><CheckCircle size={24}/> TÔI ĐÃ SẴN SÀNG</>}
                            </button>
                        )}
                        
                        {/* Status Helper Text */}
                        <div className="mt-6 flex justify-center">
                            <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                                <Zap size={12} className="text-yellow-500 fill-current"/>
                                {isHost && !guest 
                                    ? 'Chia sẻ ID phòng cho bạn bè để bắt đầu!' 
                                    : isHost && guest && !guest.isReady 
                                        ? 'Nhắc đối thủ bấm "Sẵn sàng" đi nào!' 
                                        : !isHost && !guest
                                            ? 'Đang chờ kết nối...'
                                            : !isHost && guest && !isReady
                                                ? 'Hãy bấm "Sẵn sàng" để chủ phòng có thể bắt đầu.'
                                                : 'Mọi thứ đã hoàn hảo! Let\'s go!'
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: CHAT ROOM */}
                <div className="w-96 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden shadow-2xl transition-all">
                    
                    {/* Header Chat */}
                    <div className="p-4 bg-white/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <MessageSquare size={18} className="text-blue-500"/> Chat Phòng
                        </div>
                        <span className="flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-[#0f172a]/30 custom-scrollbar">
                        {chatMessages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 opacity-70">
                                <MessageSquare size={48} strokeWidth={1} className="mb-2"/>
                                <span className="text-xs italic">Chưa có tin nhắn...</span>
                                <span className="text-[10px]">Hãy gửi lời chào tới đối thủ!</span>
                            </div>
                        )}
                        {chatMessages.map((msg, i) => {
                             // Logic xử lý tin nhắn
                             const senderName = msg.sender || (typeof msg === 'string' ? msg.split(':')[0] : 'Unknown');
                             const content = msg.text || (typeof msg === 'string' ? msg.split(':')[1] : msg.message);
                             
                             const isMe = senderName === user.fullName;
                             const isSystem = senderName === 'Hệ thống';
                             
                             // ✅ HIỂN THỊ THÔNG BÁO HỆ THỐNG Ở GIỮA
                             if (isSystem) {
                                return (
                                    <div key={i} className="flex justify-center my-2">
                                        <div className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 shadow-sm backdrop-blur-sm">
                                            {content}
                                        </div> 
                                    </div> 
                                ); 
                             }
                             
                             return (
                                <div key={i} className={`flex gap-2 items-end group ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className="mb-1 transform transition-transform group-hover:scale-110">
                                        <Avatar name={senderName} size={32} showInfo={false} />
                                    </div>
                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-1 px-1 font-medium">{senderName}</div>
                                        <div className={`px-3 py-2 rounded-2xl text-sm break-words shadow-md ${
                                            isMe 
                                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-white rounded-tl-none border border-slate-200 dark:border-slate-600'
                                        }`}>
                                            {content}
                                        </div>
                                    </div>
                                </div>
                             )
                        })}
                        <div ref={chatEndRef}/>
                    </div>
                    
                    {/* Chat Input */}
                    <form onSubmit={(e)=>{
                        e.preventDefault(); 
                        if(chatInput.trim()){
                            onSendMessage(chatInput); 
                            setChatInput('');
                        }
                    }} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                        <div className="relative">
                            <input 
                                value={chatInput} 
                                onChange={e=>setChatInput(e.target.value)} 
                                placeholder="Nhập tin nhắn..." 
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-4 pr-12 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
                            />
                            <button 
                                type="submit" 
                                disabled={!chatInput.trim()}
                                className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 rounded-lg text-white transition-all shadow-md"
                            >
                                <Send size={16}/>
                            </button>
                        </div>
                    </form>
                </div>
             </div>
        </div>
    );
};
export default WaitingRoom;