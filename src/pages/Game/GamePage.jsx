import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { 
    LogOut, Flag, Send, ChevronRight, ChevronLeft, 
    Handshake, Moon, Sun, Trophy, X
} from 'lucide-react';

// Import Components
import Lobby from './views/Lobby';
import WaitingRoom from './views/WaitingRoom';
import ProfessionalBoard from '../../components/game/GameBoard'; 
import { Avatar, ResultToast, MenuModal, ConfirmDialog } from '../../components/game/GameUI';

// Cấu hình Socket
const WS_URL = 'wss://caro-backend-pro.onrender.com/ws/websocket';
const GamePage = () => {
    // === 1. STATE USER & CONFIG ===
    const [user] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('user'));
        if (!saved || saved.username === 'Guest') {
            const randomId = Math.floor(Math.random() * 10000);
            const newUser = { username: `user_${randomId}`, fullName: `Player ${randomId}`, score: 1000 };
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        }
        return saved;
    });

    const [isDark, setIsDark] = useState(true);
    const [appState, setAppState] = useState('LOBBY'); // LOBBY | WAITING | PLAYING
    
    // === 2. LOGIC PHÒNG & GAME ===
    const [roomList, setRoomList] = useState([]); 
    const [currentRoom, setCurrentRoom] = useState(null); 
    const currentRoomRef = useRef(null); 
    const [isHost, setIsHost] = useState(false);
    const [isReady, setIsReady] = useState(false);
    
    // State Game
    const [myRole, setMyRole] = useState(null); // 'X' hoặc 'O'
    const [board, setBoard] = useState(() => Array(20).fill(null).map(() => Array(20).fill(null)));
    const [isXTurn, setIsXTurn] = useState(true); // True = lượt X, False = lượt O
    const [lastMove, setLastMove] = useState(null);
    const [gameResult, setGameResult] = useState(null); // 'WON', 'LOST', 'DRAW'
    const [winLine, setWinLine] = useState([]); // Lưu toạ độ chiến thắng
    
    // ✅ THÊM: State cho Double Click Confirmation
    const [selectingCell, setSelectingCell] = useState(null); // {row, col}
    const [previewPiece, setPreviewPiece] = useState(null); // 'X' hoặc 'O' mờ
    
    // UI Controls & Chat
    const [chatMessages, setChatMessages] = useState([]); // Chat trong game
    const [roomChat, setRoomChat] = useState([]); // Chat phòng chờ
    const [chatInput, setChatInput] = useState("");
    
    // Quản lý Popup/Modal
    const [confirmModal, setConfirmModal] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showResultToast, setShowResultToast] = useState(false);
    
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    
    const stompClient = useRef(null);
    const chatEndRef = useRef(null);

    // Tính toán lượt đi
    const isMyTurn = (myRole === 'X' && isXTurn) || (myRole === 'O' && !isXTurn);
    
    // ✅ THÊM: Kiểm tra game đã kết thúc chưa (để disable các nút)
    const isGameEnded = gameResult !== null;

    // ✅ YÊU CẦU 4: VÔ HIỆU HÓA MENU BÊN TRÁI KHI VÀO PHÒNG/GAME
    useEffect(() => {
        const disableLeftMenu = (shouldDisable) => {
            // Tìm tất cả các phần tử menu bên trái (sidebar, navigation)
            const leftMenus = document.querySelectorAll('.sidebar-menu, .left-menu, .sidebar, nav, [class*="sidebar"], [class*="menu"]');
            leftMenus.forEach(menu => {
                if (menu && menu.closest('body')) {
                    if (shouldDisable) {
                        menu.style.pointerEvents = 'none';
                        menu.style.opacity = '0.5';
                        menu.style.cursor = 'not-allowed';
                    } else {
                        menu.style.pointerEvents = 'auto';
                        menu.style.opacity = '1';
                        menu.style.cursor = 'auto';
                    }
                }
            });
        };

        if (appState === 'WAITING' || appState === 'PLAYING') {
            disableLeftMenu(true);
        } else {
            disableLeftMenu(false);
        }

        // Cleanup khi component unmount
        return () => {
            disableLeftMenu(false);
        };
    }, [appState]);

    // Toggle Theme
    const toggleTheme = () => { setIsDark(!isDark); };

    // Helper update ref
    const updateRoomSafe = (roomData) => {
        setCurrentRoom(roomData);
        currentRoomRef.current = roomData;
    };

    // ✅ Helper thêm chat hệ thống
    const addSystemMessage = (text, isGameChat = false) => {
        const msg = { sender: "Hệ thống", text, message: text };
        if (isGameChat) {
            setChatMessages(prev => [...prev, msg]);
        } else {
            setRoomChat(prev => [...prev, msg]);
        }
    };

    // Auto scroll chat
    useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [chatMessages, roomChat]);

    // === 3. SOCKET CONNECTION ===
    useEffect(() => {
        const client = new Client({
            brokerURL: WS_URL,
            reconnectDelay: 5000,
            onConnect: () => {
                setIsConnected(true);
                // Subscribe Lobby
                client.subscribe('/topic/lobby', (msg) => setRoomList(JSON.parse(msg.body)));
                // Subscribe thông báo cá nhân
                client.subscribe(`/topic/notifications/${user.username}`, (msg) => handleNotification(JSON.parse(msg.body)));
                // Lấy danh sách phòng
                client.publish({ destination: '/app/lobby/get-rooms' });
            },
            onDisconnect: () => setIsConnected(false)
        });
        client.activate();
        stompClient.current = client;
        return () => client.deactivate();
    }, [user.username]);

    // === 4. XỬ LÝ MESSAGE TỪ SERVER ===
    const handleNotification = (data) => {
        if (data.type === 'JOIN_SUCCESS') {
            updateRoomSafe(data.roomInfo);
            setIsHost(data.roomInfo.host.username === user.username);
            setIsReady(false); 
            setRoomChat([]); 
            setChatMessages([]);
            subscribeToRoom(data.roomInfo.id);
            setAppState('WAITING');
            
            // ✅ THÔNG BÁO KHI VÀO PHÒNG THÀNH CÔNG
            addSystemMessage(`🎮 Bạn đã tham gia phòng #${data.roomInfo.id}`);
        } else if (data.type === 'ERROR') {
            alert(data.message); 
        }
    };

    const subscribeToRoom = (roomId) => {
        if (!stompClient.current) return;
        stompClient.current.subscribe(`/topic/room/${roomId}`, (msg) => {
            const data = JSON.parse(msg.body);

            switch (data.type) {
                case 'ROOM_UPDATE': 
                    const oldRoom = currentRoomRef.current;
                    updateRoomSafe(data.roomInfo);
                    
                    // ✅ YÊU CẦU 2: THÔNG BÁO KHI ĐỐI THỦ VÀO/RA PHÒNG
                    if (oldRoom && data.roomInfo) {
                        // Kiểm tra guest join
                        if (!oldRoom.guest && data.roomInfo.guest) {
                            addSystemMessage(`🎮 ${data.roomInfo.guest.name} đã tham gia phòng!`);
                            // ✅ THÊM VÀO CHAT GAME (nếu đang trong game)
                            if (appState === 'PLAYING') {
                                addSystemMessage(`🎮 ${data.roomInfo.guest.name} đã tham gia phòng!`, true);
                            }
                        }
                        // Kiểm tra guest leave
                        if (oldRoom.guest && !data.roomInfo.guest) {
                            addSystemMessage(`👋 ${oldRoom.guest.name} đã rời phòng.`);
                            // ✅ THÊM VÀO CHAT GAME (nếu đang trong game)
                            if (appState === 'PLAYING') {
                                addSystemMessage(`👋 ${oldRoom.guest.name} đã rời phòng.`, true);
                            }
                        }
                    }
                    break;
                    
                case 'GAME_START_CMD': 
                    handleGameStart(); 
                    break;
                    
                case 'MOVE': 
                    processMove(data); 
                    break;
                
                case 'GAME_CHAT': 
                    setChatMessages(prev => [...prev, data]); 
                    break;
                    
                case 'CHAT': 
                    setRoomChat(prev => [...prev, data]); 
                    break;
                    
                case 'DRAW_REQUEST':
                    if (data.sender !== user.fullName) {
                        // ✅ THÔNG BÁO XIN HÒA VÀO CHAT GAME
                        addSystemMessage(`⚐ ${data.sender} muốn xin hòa!`, true);
                        
                        setConfirmModal({
                            title: "Yêu cầu Hòa",
                            message: `Đối thủ ${data.sender} muốn xin hòa. Bạn đồng ý không?`,
                            onConfirm: () => {
                                sendSocket('draw-response', { accepted: true });
                                setConfirmModal(null);
                                addSystemMessage("✅ Bạn đã chấp nhận hòa!", true);
                            },
                            onCancel: () => {
                                sendSocket('draw-response', { accepted: false });
                                setConfirmModal(null);
                                addSystemMessage("❌ Bạn đã từ chối hòa!", true);
                            }
                        });
                    }
                    break;
                    
                case 'GAME_OVER':
                    handleGameOver(data);
                    break;
                
                // ✅ YÊU CẦU 2 & 3: XỬ LÝ ĐỐI THỦ DISCONNECT/THOÁT TAB
                case 'PLAYER_DISCONNECTED':
                    if (appState === 'PLAYING' && !isGameEnded) {
                        addSystemMessage(`⚠️ ${data.playerName} đã mất kết nối!`, true);
                        
                        // Sau 5 giây không reconnect -> Xử thắng
                        setTimeout(() => {
                            if (!isGameEnded) {
                                setGameResult('WON');
                                setShowResultToast(true);
                                addSystemMessage(`🏆 Bạn thắng do đối thủ mất kết nối!`, true);
                            }
                        }, 5000);
                    }
                    break;
                    
                case 'OPPONENT_LEFT_GAME':
                    // Đối thủ thoát game hoàn toàn (tắt tab, tắt nguồn)
                    if (appState === 'PLAYING' && !isGameEnded) {
                        setGameResult('WON');
                        setShowResultToast(true);
                        addSystemMessage(`🏆 Đối thủ đã rời game! Bạn thắng!`, true);
                    }
                    break;
                    
                case 'ROOM_CLOSED':
                    // ✅ THÔNG BÁO PHÒNG ĐÓNG VÀO CHAT
                    addSystemMessage("🚪 Phòng đã bị đóng!", true);
                    
                    // ✅ FIX: Thêm delay để user đọc thông báo
                    setTimeout(() => {
                        alert("Phòng đã bị đóng!");
                        window.location.reload();
                    }, 1500);
                    break;
                    
                case 'DRAW_RESPONSE':
                    // ✅ THÔNG BÁO PHẢN HỒI HÒA VÀO CHAT
                    if (data.accepted) {
                        addSystemMessage(`✅ ${data.responder} đã chấp nhận hòa!`, true);
                    } else {
                        addSystemMessage(`❌ ${data.responder} đã từ chối hòa!`, true);
                    }
                    break;
                    
                case 'SURRENDER':
                    // ✅ THÔNG BÁO ĐẦU HÀNG VÀO CHAT
                    addSystemMessage(`🏳️ ${data.surrenderer} đã đầu hàng!`, true);
                    break;
                    
                case 'QUIT_GAME':
                    // ✅ THÔNG BÁO THOÁT GAME VÀO CHAT
                    addSystemMessage(`🚪 ${data.quitter} đã thoát game!`, true);
                    break;
                    
                case 'REMATCH_REQUEST':
                    // ✅ THÔNG BÁO CHƠI LẠI VÀO CHAT
                    if (data.sender !== user.fullName) {
                        addSystemMessage(`🔄 ${data.sender} muốn chơi lại!`, true);
                    }
                    break;
                    
                default: break;
            }
        });
    };

    const handleGameStart = () => {
        setAppState('PLAYING');
        setBoard(Array(20).fill(null).map(() => Array(20).fill(null)));
        setGameResult(null); 
        setWinLine([]); 
        setChatMessages([]);
        
        // ✅ Reset state cho double click
        setSelectingCell(null);
        setPreviewPiece(null);
        
        // Reset Popup trạng thái
        setShowMenu(false);
        setShowResultToast(false);
        
        const room = currentRoomRef.current;
        if (room && user.username === room.host.username) {
            setMyRole('X');
            addSystemMessage("🎮 Trận đấu bắt đầu! Bạn là X (đi trước)", true);
        } else {
            setMyRole('O');
            addSystemMessage("🎮 Trận đấu bắt đầu! Bạn là O (đi sau)", true);
        }
        setIsXTurn(true); 
    };

    const processMove = (data) => {
        setBoard(prev => {
            const newBoard = prev.map(row => [...row]);
            const piece = data.role; 
            newBoard[data.x][data.y] = piece; 
            
            // ✅ FIX: Truyền thêm sender để biết ai đánh
            checkWinClientSide(newBoard, data.x, data.y, piece, data.sender);
            
            return newBoard;
        });
        setIsXTurn(prev => !prev); 
        setLastMove({ x: data.x, y: data.y });
        
        // ✅ Reset preview khi đối thủ đánh
        setSelectingCell(null);
        setPreviewPiece(null);
    };

    // ✅ FIX: Xử lý khi có kết quả từ Server
    const handleGameOver = (data) => {
        let result = '';
        if (data.result === 'DRAW') {
            result = 'DRAW';
        } else if (data.result === 'SURRENDER') {
            // Nếu người thua (loser) là mình -> Mình thua (LOST), ngược lại là WON
            result = data.loser === user.username ? 'LOST' : 'WON';
        } else if (data.result === 'OPPONENT_LEFT') {
            // Nếu mình là người còn lại (người thắng)
            result = data.winner === user.username ? 'WON' : 'LOST'; 
        } else if (data.result === 'OPPONENT_DISCONNECTED') {
            result = 'WON';
        } else {
            // Kết quả thông thường (win/lose từ nước cờ)
            result = data.winner === user.username ? 'WON' : 'LOST';
        }
        
        // ✅ THÔNG BÁO KẾT QUẢ VÀO CHAT
        if (result === 'WON') {
            addSystemMessage("🏆 BẠN ĐÃ CHIẾN THẮNG! +10 điểm", true);
        } else if (result === 'LOST') {
            addSystemMessage("😞 BẠN ĐÃ THUA! -10 điểm", true);
        } else if (result === 'DRAW') {
            addSystemMessage("🤝 HÒA NHAU! Không trừ điểm", true);
        }
        
        // ✅ CHỈ CẬP NHẬT NẾU CHƯA CÓ KẾT QUẢ (tránh ghi đè kết quả từ checkWinClientSide)
        if (!gameResult) {
            setGameResult(result);
            setShowResultToast(true);
        }
        
        setShowMenu(false);
    };

    // ✅ FIX HOÀN TOÀN: Thêm tham số sender để xác định ai thắng
    const checkWinClientSide = (currentBoard, x, y, type, sender) => {
        const directions = [[0,1], [1,0], [1,1], [1,-1]];
        for (let [dx, dy] of directions) {
            let count = 1;
            let line = [{x, y}];
            
            // Duyệt 2 hướng
            for(let i=1; i<5; i++) {
                const nr=x+dx*i, nc=y+dy*i;
                if(nr<0||nr>=20||nc<0||nc>=20 || currentBoard[nr][nc] !== type) break;
                count++; line.push({x: nr, y: nc});
            }
            for(let i=1; i<5; i++) {
                const nr=x-dx*i, nc=y-dy*i;
                if(nr<0||nr>=20||nc<0||nc>=20 || currentBoard[nr][nc] !== type) break;
                count++; line.push({x: nr, y: nc});
            }
            
            if(count >= 5) {
                setWinLine(line); // Cập nhật line thắng để Board vẽ
                
                // ✅ FIX LOGIC: So sánh sender với user.fullName
                // Nếu người vừa đánh (sender) là mình -> Mình thắng
                // Nếu không phải -> Mình thua
                const isMeWin = sender === user.fullName;
                setGameResult(isMeWin ? 'WON' : 'LOST');
                
                // ✅ THÔNG BÁO CHI TIẾT VÀO CHAT
                if (isMeWin) {
                    addSystemMessage("🎯 BẠN ĐÃ TẠO ĐƯỢC 5 QUÂN LIÊN TIẾP! Chiến thắng!", true);
                } else {
                    addSystemMessage("💥 ĐỐI THỦ ĐÃ TẠO 5 QUÂN LIÊN TIẾP! Bạn thua!", true);
                }
                
                // Hiện thông báo nhỏ khi thắng bằng nước đi
                setShowResultToast(true);
                return;
            }
        }
    };

    // === 5. ACTIONS ===
    const handleLobbyAction = (action, roomId) => {
        if(!stompClient.current?.connected) return alert("Mất kết nối server!");
        const payload = { hostName: user.fullName, username: user.username, roomId: roomId, guestName: user.fullName };
        const dest = action === 'CREATE' ? '/app/lobby/create' : '/app/lobby/join';
        stompClient.current.publish({ destination: dest, body: JSON.stringify(payload) });
    };

    const sendSocket = (endpoint, body = {}) => {
        const rid = currentRoomRef.current?.id;
        if (!rid || !stompClient.current) return;
        stompClient.current.publish({ destination: `/app/room/${rid}/${endpoint}`, body: JSON.stringify(body) });
    };

    const handleWaitingAction = (action, txt) => {
        if(action === 'LEAVE') { 
            // ✅ FIX: Gửi socket message rời phòng TRƯỚC KHI reload
            sendSocket('leave-room', { 
                username: user.username, 
                playerName: user.fullName 
            });
            
            // ✅ FIX: Thêm delay 500ms để đảm bảo socket gửi message
            setTimeout(() => {
                setAppState('LOBBY'); 
                window.location.reload();
            }, 500);
        }
        else if (action === 'TOGGLE_READY') {
            sendSocket('ready', { isReady: !isReady });
            // ✅ THÔNG BÁO READY/UNREADY VÀO CHAT PHÒNG
            if (!isReady) {
                addSystemMessage(`✅ ${user.fullName} đã sẵn sàng!`);
            } else {
                addSystemMessage(`⏸️ ${user.fullName} đã hủy sẵn sàng!`);
            }
        }
        else if (action === 'START') sendSocket('start');
        else if (action === 'CHAT') sendSocket('chat', { sender: user.fullName, text: txt });
    };

    // ✅ THAY ĐỔI: Logic double click xác nhận
    const handleCellClick = (r, c) => {
        // Chỉ xử lý nếu đến lượt và game chưa kết thúc
        if (gameResult || !isMyTurn) return;
        
        // Nếu ô đã có quân cờ -> không làm gì
        if (board[r][c]) return;
        
        // Nếu đang chọn ô này rồi -> xác nhận đánh
        if (selectingCell && selectingCell.row === r && selectingCell.col === c) {
            // Gửi nước đi lên server
            sendSocket('move', { x: r, y: c, type: myRole, sender: user.fullName });
            
            // Reset preview
            setSelectingCell(null);
            setPreviewPiece(null);
            return;
        }
        
        // Nếu đang chọn ô khác -> chuyển sang ô này
        if (selectingCell) {
            setSelectingCell({ row: r, col: c });
            setPreviewPiece(myRole);
            return;
        }
        
        // Click lần đầu vào ô trống -> hiển thị preview
        setSelectingCell({ row: r, col: c });
        setPreviewPiece(myRole);
    };
    
    // ✅ THÊM: Hàm hủy chọn ô
    const handleCancelSelection = () => {
        setSelectingCell(null);
        setPreviewPiece(null);
        addSystemMessage("❌ Đã hủy chọn ô", true);
    };

    const handleGameChat = (txt) => {
        if (!txt.trim()) return;
        sendSocket('chat', { sender: user.fullName, text: txt });
        setChatInput('');
    };
    
    const handleDraw = () => {
        if (isGameEnded || !isMyTurn) return;
        sendSocket('draw-request', { sender: user.fullName });
        addSystemMessage("📨 Đã gửi lời mời hòa!", true);
    };
    
    const handleSurrender = () => {
        if (isGameEnded) return;
        if(window.confirm("Bạn chắc chắn muốn đầu hàng? (Sẽ bị trừ điểm)")) {
            sendSocket('surrender', { username: user.username });
            addSystemMessage("🏳️ Bạn đã đầu hàng!", true);
        }
    };
    
    // ✅ FIX: Nút thoát chỉ xử thua khi game ĐANG diễn ra
    const handleQuitGame = () => {
        if (isGameEnded) {
            // Game đã kết thúc -> Thoát tự do
            addSystemMessage("🚪 Bạn đã thoát về sảnh chính", true);
            
            // ✅ FIX: Thêm delay cho socket
            setTimeout(() => {
                setAppState('LOBBY');
                window.location.reload();
            }, 500);
        } else {
            // Game đang chơi -> Xử thua
            if(window.confirm("Thoát trận sẽ bị xử thua. Bạn chắc chứ?")) {
                sendSocket('quit', { username: user.username });
                addSystemMessage("🚪 Bạn đã thoát game (xử thua)", true);
                
                // ✅ FIX: Thêm delay cho socket
                setTimeout(() => {
                    setAppState('LOBBY');
                    window.location.reload();
                }, 500);
            }
        }
    };
    
    // UPDATE: Logic Rematch mới (Gửi request chờ đối thủ)
    const handleRematchRequest = () => {
        sendSocket('rematch-request', { sender: user.fullName, username: user.username });
        addSystemMessage("📨 Đã gửi yêu cầu chơi lại!", true);
    };

    // === 6. RENDER ===
    if (appState === 'LOBBY') return <Lobby user={user} roomList={roomList} onJoinGame={(action, roomId) => handleLobbyAction(action, roomId)} />;
    
    if (appState === 'WAITING') return <WaitingRoom user={user} roomInfo={currentRoom} isHost={isHost} isReady={isReady} onLeave={()=>handleWaitingAction('LEAVE')} onToggleReady={()=> { setIsReady(!isReady); handleWaitingAction('TOGGLE_READY'); }} onStartGame={()=>handleWaitingAction('START')} chatMessages={roomChat} onSendMessage={(t)=>handleWaitingAction('CHAT', t)} />;

    return (
        <div className={`flex h-screen w-full ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'} overflow-hidden font-sans transition-colors duration-300`}>
            {confirmModal && <ConfirmDialog {...confirmModal} />}
            
            {/* ✅ ĐÃ BỎ HIỆU ỨNG LÀM MỜ: Toast kết quả không làm mờ màn hình */}
            {showResultToast && !showMenu && (
                <ResultToast 
                    result={gameResult} 
                    onAction={() => {
                        setShowResultToast(false);
                        setShowMenu(true); 
                    }} 
                />
            )}
            
            {/* MENU KẾT THÚC GAME (HIỆN SAU) */}
            {showMenu && <MenuModal 
                title={gameResult === 'WON' ? 'CHIẾN THẮNG!' : gameResult === 'LOST' ? 'THẤT BẠI!' : 'HÒA NHAU!'} 
                message={gameResult === 'WON' ? '+10 điểm Elo' : gameResult === 'LOST' ? '-10 điểm Elo' : 'Không trừ điểm'} 
                onNewGame={handleRematchRequest} 
                onExit={() => window.location.reload()} 
            />}

            {/* BOARD AREA */}
            <div className={`flex-1 flex flex-col items-center justify-center relative bg-pattern transition-all duration-300 ${!sidebarOpen ? 'w-full' : ''}`}>
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleQuitGame} 
                            className={`p-2 rounded-full transition-colors ${
                                isGameEnded 
                                    ? 'hover:bg-blue-500/20 text-blue-400' 
                                    : 'hover:bg-red-500/20 text-red-500'
                            }`}
                            title={isGameEnded ? "Thoát về phòng chờ" : "Thoát (xử thua)"}
                        >
                            <LogOut size={20}/>
                        </button>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${isConnected ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                            {isConnected ? 'LIVE' : 'MẤT KẾT NỐI'}
                        </span>
                    </div>
                    <div className="text-xl font-black tracking-widest opacity-80 text-white">CARO PRO</div>
                    <button onClick={toggleTheme} className="p-2 hover:bg-white/10 rounded-full transition-colors">{isDark ? '🌙' : '☀️'}</button>
                </div>
                
                {/* Board Container */}
                <div className="mt-28 p-1 rounded-lg shadow-2xl bg-gradient-to-br from-slate-700 to-slate-900 transition-all duration-500">
                    <ProfessionalBoard 
                        board={board} 
                        onCellClick={handleCellClick} 
                        winLine={winLine} 
                        lastMove={lastMove} 
                        isDark={isDark} 
                        disabled={!isMyTurn || (gameResult && showMenu)} 
                        selectingCell={selectingCell} // ✅ Truyền ô đang được chọn {row, col}
                        previewPiece={previewPiece} // ✅ Truyền quân cờ preview
                    />
                </div>
                
                {/* ✅ THÊM: Thông báo hướng dẫn double click */}
                <div className={`mt-4 px-6 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse ${isMyTurn ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {isGameEnded ? "VÁN ĐẤU ĐÃ KẾT THÚC" : 
                        (isMyTurn ? 
                            (selectingCell ? `📌 ĐÃ CHỌN Ô (${selectingCell.row + 1}, ${selectingCell.col + 1})! CLICK LẦN NỮA ĐỂ XÁC NHẬN` : "ĐẾN LƯỢT BẠN ĐÁNH!") 
                        : "ĐỐI THỦ ĐANG SUY NGHĨ...")}
                </div>
                
                {/* ✅ THÊM: Nút hủy chọn (chỉ hiện khi đang chọn ô) */}
                {selectingCell && isMyTurn && !isGameEnded && (
                    <button 
                        onClick={handleCancelSelection}
                        className="mt-2 px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full flex items-center gap-1 transition-colors"
                    >
                        <X size={12}/> Hủy chọn ô ({selectingCell.row + 1}, {selectingCell.col + 1})
                    </button>
                )}
            </div>

            {/* SIDEBAR RIGHT */}
            <div className={`${sidebarOpen ? 'w-96 translate-x-0' : 'w-0 translate-x-full'} transition-all duration-500 ease-in-out flex flex-col border-l shadow-2xl z-20 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} relative`}>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute -left-5 top-1/2 -translate-y-1/2 bg-slate-700 text-white w-5 h-12 flex items-center justify-center rounded-l-md shadow-md hover:bg-blue-600 transition-colors z-30">
                    {sidebarOpen ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
                </button>
                <div className={`flex-col h-full ${sidebarOpen ? 'flex' : 'hidden'}`}>
                    <div className={`p-6 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                        <div className="flex items-center justify-between mb-6">
                            {/* ✅ YÊU CẦU 3: TĂNG KÍCH THƯỚC AVATAR LÊN 40% */}
                            <div className="flex-1"><Avatar name={user.fullName} score={user.score} role={myRole} showInfo size={68} /></div>
                            <div className="px-4 text-3xl font-black italic text-slate-400">VS</div>
                            <div className="flex-1 flex justify-end">
                                <div className="flex flex-row-reverse w-full">
                                    <Avatar 
                                        name={currentRoom?.guest?.username === user.username ? currentRoom.host.name : (currentRoom?.guest?.name || "...")} 
                                        role={myRole==='X'?'O':'X'} 
                                        score={1000} 
                                        showInfo 
                                        size={68} // ✅ Tăng 40%: từ 48px lên 68px
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`w-full py-2 rounded-lg text-center font-bold text-sm transition-colors ${isXTurn ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>
                            Lượt của: {isXTurn ? 'X' : 'O'}
                        </div>
                    </div>
                    
                    {/* ✅ CÁC NÚT CHỨC NĂNG (ĐÃ BỎ NÚT ĐI LẠI) */}
                    <div className="p-4 grid grid-cols-3 gap-2 whitespace-nowrap">
                        <button 
                            onClick={handleDraw} 
                            disabled={isGameEnded || !isMyTurn}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg text-white text-xs gap-1 transition-all ${
                                (isGameEnded || !isMyTurn)
                                    ? 'bg-slate-600 opacity-50 cursor-not-allowed' 
                                    : 'bg-slate-700 hover:bg-slate-600'
                            }`}
                            title={!isMyTurn ? "Chỉ có thể xin hòa khi đến lượt bạn" : ""}
                        >
                            <Handshake size={18}/> Hòa
                        </button>
                        
                        <button 
                            onClick={handleSurrender} 
                            disabled={isGameEnded}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg text-white text-xs gap-1 transition-all ${
                                isGameEnded 
                                    ? 'bg-slate-600 opacity-50 cursor-not-allowed' 
                                    : 'bg-yellow-600 hover:bg-yellow-500'
                            }`}
                        >
                            <Flag size={18}/> Đầu hàng
                        </button>
                        
                        <button 
                            onClick={handleQuitGame} 
                            className={`flex flex-col items-center justify-center p-2 rounded-lg text-white text-xs gap-1 transition-all ${
                                isGameEnded 
                                    ? 'bg-blue-600 hover:bg-blue-500' 
                                    : 'bg-red-600 hover:bg-red-500'
                            }`}
                        >
                            <LogOut size={18}/> Thoát
                        </button>
                    </div>
                    
                    {/* KHU VỰC CHAT */}
                    <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                        {chatMessages.length === 0 && <div className="text-center text-xs text-slate-500 italic">Chưa có tin nhắn...</div>}
                        {chatMessages.map((msg, i) => {
                            const senderName = msg.sender || (typeof msg === 'string' ? msg.split(':')[0] : 'Unknown');
                            const textContent = msg.text || (typeof msg === 'string' ? msg.split(':')[1] : msg.message);
                            const isMe = senderName === user.fullName;
                            const isSystem = senderName === 'Hệ thống';
                            
                            // ✅ HIỂN THỊ THÔNG BÁO HỆ THỐNG Ở GIỮA
                            if (isSystem) {
                                return (
                                    <div key={i} className="flex justify-center">
                                        <div className={`px-4 py-2 rounded-full text-xs font-semibold ${
                                            isDark ? 'bg-slate-700/70 text-slate-300' : 'bg-slate-200 text-slate-700'
                                        } border ${isDark ? 'border-slate-600' : 'border-slate-300'}`}>
                                            {textContent}
                                        </div> 
                                    </div> 
                                ); 
                            }
                            
                            return (
                                <div key={i} className={`flex gap-2 items-end ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* ✅ YÊU CẦU 3: AVATAR TRONG CHAT CŨNG TĂNG KÍCH THƯỚC */}
                                    <div className="mb-1"><Avatar name={senderName} size={38} showInfo={false} /></div>
                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                                        <div className="flex items-center gap-1 mb-1 px-1">
                                            <span className="text-[10px] text-slate-400 font-bold">{senderName}</span>
                                            <Trophy size={10} className="text-yellow-500"/>
                                        </div>
                                        <div className={`px-3 py-2 rounded-2xl text-sm break-words shadow-sm ${
                                            isMe 
                                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                                : `${isDark?'bg-slate-700 text-white':'bg-white border text-slate-800'} rounded-tl-none`
                                        }`}>
                                            {textContent}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={chatEndRef}/>
                    </div>

                    <form onSubmit={(e)=>{e.preventDefault(); handleGameChat(chatInput);}} className={`p-3 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                        <div className="relative">
                            <input 
                                value={chatInput} 
                                onChange={e=>setChatInput(e.target.value)} 
                                className={`w-full py-2.5 pl-4 pr-10 rounded-full text-sm outline-none border transition-all ${
                                    isDark 
                                        ? 'bg-slate-900 border-slate-600 text-white focus:border-blue-500' 
                                        : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                                }`} 
                                placeholder="Nhập tin nhắn..." 
                            />
                            <button type="submit" className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors">
                                <Send size={14}/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GamePage;