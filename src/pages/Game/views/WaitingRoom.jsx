import React, { useState, useEffect, useRef } from 'react';
import { Send, LogOut, MessageSquare, CheckCircle, Play, XCircle, Users } from 'lucide-react';
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

    // ✅ HIỂN THỊ THÔNG BÁO KHI USER RỜI PHÒNG
    const handleLeave = () => {
        addSystemMessage(`👋 ${user.fullName} đã rời phòng.`);
        onLeave();
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

    return (
        <div className="h-screen w-full bg-slate-900 flex items-center justify-center p-6 relative text-white">
             {/* Nút Rời phòng */}
             <button 
                onClick={handleLeave} 
                className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2 font-bold bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:border-red-500 hover:bg-red-500/10 transition-all"
             >
                <LogOut size={18}/> Rời phòng
             </button>

             <div className="w-full max-w-6xl h-[80vh] flex gap-6">
                {/* CỘT TRÁI: THÔNG TIN PHÒNG & NGƯỜI CHƠI */}
                <div className="flex-1 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"/>
                    <h2 className="text-3xl font-black mb-12 uppercase tracking-widest text-slate-300">
                        Phòng chờ #{roomState?.id}
                        {/* ✅ HIỂN THỊ TRẠNG THÁI PHÒNG */}
                        <span className="ml-4 text-sm font-normal px-3 py-1 rounded-full bg-slate-700">
                            {guest ? '2/2 Người chơi' : '1/2 Người chơi'}
                        </span>
                    </h2>

                    <div className="flex items-center justify-center w-full gap-16">
                        {/* HOST (CHỦ PHÒNG) */}
                        <div className="flex flex-col items-center gap-4 relative">
                            <div className="absolute -top-8 text-yellow-500 font-bold text-xs uppercase tracking-wider">Chủ phòng</div>
                            <Avatar 
                                name={roomState?.host?.name || "Host"} 
                                size={100} 
                                score={roomState?.host?.score} 
                                isReady={roomState?.host?.isReady}
                            />
                            <div className="text-xl font-bold">{roomState?.host?.name || "..."}</div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                roomState?.host?.isReady 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : 'bg-slate-600 text-slate-300'
                            }`}>
                                {roomState?.host?.isReady ? 'ĐÃ SẴN SÀNG' : 'ĐANG CHUẨN BỊ...'}
                            </div>
                        </div>

                        <div className="text-5xl font-black text-slate-700 italic">VS</div>

                        {/* GUEST (KHÁCH) */}
                        <div className="flex flex-col items-center gap-4 min-w-[150px]">
                            {guest ? (
                                <>
                                    <Avatar name={guest.name} size={100} score={guest.score} isReady={guest.isReady} />
                                    <div className="text-xl font-bold">{guest.name}</div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        guest.isReady 
                                            ? 'bg-green-500/20 text-green-400' 
                                            : 'bg-slate-600 text-slate-300'
                                    }`}>
                                        {guest.isReady ? 'ĐÃ SẴN SÀNG' : 'ĐANG CHUẨN BỊ...'}
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-4 opacity-50">
                                    <div className="w-[100px] h-[100px] rounded-full border-4 border-dashed border-slate-600 flex items-center justify-center">
                                        <Users size={40} className="text-slate-600"/>
                                    </div>
                                    <div className="text-lg font-bold text-slate-500">Đang chờ...</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ACTION BUTTONS (Start / Ready) */}
                    <div className="mt-16 w-full max-w-md">
                        {isHost ? (
                            <button 
                                onClick={onStartGame}
                                disabled={!canStart}
                                className={`w-full py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${
                                    canStart 
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 scale-105' 
                                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                }`}
                            >
                                <Play fill="currentColor"/> BẮT ĐẦU TRẬN ĐẤU
                            </button>
                        ) : (
                            <button 
                                onClick={handleToggleReady}
                                className={`w-full py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl ${
                                    isReady 
                                        ? 'bg-red-600 hover:bg-red-500 text-white' 
                                        : 'bg-green-600 hover:bg-green-500 text-white'
                                }`}
                            >
                                {isReady ? <><XCircle/> HỦY SẴN SÀNG</> : <><CheckCircle/> TÔI ĐÃ SẴN SÀNG</>}
                            </button>
                        )}
                        <p className="text-center mt-4 text-slate-500 text-sm">
                            {isHost && !guest 
                                ? 'Đang đợi người chơi tham gia...' 
                                : isHost && guest && !guest.isReady 
                                    ? 'Đợi đối thủ bấm sẵn sàng...' 
                                    : !isHost && !guest
                                        ? 'Đang chờ người chơi khác...'
                                        : !isHost && guest && !isReady
                                            ? 'Hãy bấm "Tôi đã sẵn sàng" để bắt đầu'
                                            : 'Tất cả đã sẵn sàng!'
                            }
                        </p>
                    </div>
                </div>

                {/* CỘT PHẢI: CHAT ROOM */}
                <div className="w-80 bg-slate-800 rounded-3xl border border-slate-700 flex flex-col overflow-hidden">
                    <div className="p-4 bg-slate-900/50 border-b border-slate-700 font-bold text-slate-300 flex items-center gap-2">
                        <MessageSquare size={16}/> Chat Phòng
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-800">
                        {chatMessages.length === 0 && (
                            <div className="text-center text-xs text-slate-500 italic mt-4">Chưa có tin nhắn...</div>
                        )}
                        {chatMessages.map((msg, i) => {
                             // Logic xử lý tin nhắn giống GamePage
                             const senderName = msg.sender || (typeof msg === 'string' ? msg.split(':')[0] : 'Unknown');
                             const content = msg.text || (typeof msg === 'string' ? msg.split(':')[1] : msg.message);
                             
                             const isMe = senderName === user.fullName;
                             const isSystem = senderName === 'Hệ thống';
                             
                             // ✅ HIỂN THỊ THÔNG BÁO HỆ THỐNG Ở GIỮA (giống GamePage)
                             if (isSystem) {
                                return (
                                    <div key={i} className="flex justify-center">
                                        <div className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-700/70 text-slate-300 border border-slate-600">
                                            {content}
                                        </div> 
                                    </div> 
                                ); 
                             }
                             
                             return (
                                <div key={i} className={`flex gap-2 items-end ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* ✅ HIỂN THỊ AVATAR GIỐNG GAMEPAGE */}
                                    <div className="mb-1">
                                        <Avatar name={senderName} size={38} showInfo={false} />
                                    </div>
                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                                        <div className="text-[10px] text-slate-400 mb-1 px-1">{senderName}</div>
                                        <div className={`px-3 py-2 rounded-2xl text-sm break-words shadow-sm ${
                                            isMe 
                                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                                : 'bg-slate-700 text-white rounded-tl-none'
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
                    }} className="p-3 border-t border-slate-700">
                        <div className="relative">
                            <input 
                                value={chatInput} 
                                onChange={e=>setChatInput(e.target.value)} 
                                placeholder="Nhập tin nhắn..." 
                                className="w-full bg-slate-900 border border-slate-600 rounded-full py-2 pl-3 pr-10 text-sm text-white focus:border-blue-500 outline-none transition-all"
                            />
                            <button type="submit" className="absolute right-1 top-1 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors">
                                <Send size={14}/>
                            </button>
                        </div>
                    </form>
                </div>
             </div>
        </div>
    );
};
export default WaitingRoom;