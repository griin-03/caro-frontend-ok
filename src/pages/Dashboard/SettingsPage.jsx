import React, { useState, useRef } from 'react';
import { User, Lock, Volume2, Shield, Camera, Trash2, CloudUpload } from 'lucide-react';

// --- CẤU HÌNH LINK SERVER RENDER (Quan trọng) ---
const API_BASE = 'http://localhost:8080';
// ------------------------------------------------

const SettingsPage = () => {
    // Lấy thông tin User từ LocalStorage
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || {});
    // Avatar ưu tiên lấy link từ Server (nếu có), không thì null
    const [avatar, setAvatar] = useState(user.avatar || null);
    
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    // Hàm Upload ảnh lên Server
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Kiểm tra dung lượng (> 2MB thì chặn)
        if (file.size > 2 * 1024 * 1024) {
            alert("Ảnh quá nặng! Vui lòng chọn ảnh dưới 2MB.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Gọi API Upload của Backend
            const response = await fetch(`${API_BASE}/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                // Server trả về đường dẫn ảnh (ví dụ: /uploads/abc.png)
                // Ta ghép với link gốc để thành link đầy đủ
                const fullUrl = API_BASE + data.url;
                
                // 1. Cập nhật State hiển thị ngay lập tức
                setAvatar(fullUrl);
                
                // 2. Lưu đường dẫn vào thông tin User trong LocalStorage
                const updatedUser = { ...user, avatar: fullUrl };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                
                alert("Đã cập nhật Avatar thành công!");
            } else {
                alert("Lỗi Server: Không thể upload ảnh.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Lỗi kết nối Server! Bạn hãy kiểm tra lại mạng.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white p-8 transition-colors duration-300">
            <h1 className="text-3xl font-black mb-8 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Cài Đặt Hệ Thống
            </h1>

            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* NHÓM 1: TÀI KHOẢN */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-700 pb-2">
                        <User size={20} className="text-blue-500" /> Tài Khoản Của Bạn
                    </h3>

                    <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                        {/* Avatar */}
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                            <div className="w-28 h-28 rounded-full border-4 border-blue-100 dark:border-blue-500/30 overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center shadow-lg transition-all group-hover:border-blue-500 relative">
                                {avatar ? (
                                    <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={48} className="text-slate-400" />
                                )}
                                
                                {/* Loading Overlay */}
                                {isUploading && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Hover Icon */}
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} className="text-white" />
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{user.fullName || "Game Thủ"}</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Thành viên chính thức</p>
                            <div className="flex gap-2 justify-center md:justify-start">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Online</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Level 1</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group">
                            <span className="text-slate-700 dark:text-slate-200">Đổi mật khẩu</span>
                            <Lock size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* NHÓM 2: CẤU HÌNH */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-700 pb-2">
                        <Volume2 size={20} className="text-green-500" /> Âm Thanh & Giao Diện
                    </h3>
                    <div className="space-y-4 opacity-75 pointer-events-none">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-700 dark:text-slate-200">Nhạc nền (Đang bảo trì)</span>
                            <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full relative">
                                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-orange-500 mt-2 italic">* Tính năng âm thanh đang được nâng cấp.</p>
                </div>

                {/* NHÓM 3: KHÁC */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-700 pb-2">
                        <Shield size={20} className="text-red-500" /> Thông Tin Ứng Dụng
                    </h3>
                    <div className="pl-2 text-sm text-slate-500 dark:text-slate-400 space-y-2">
                        <p>Phiên bản: <span className="text-slate-800 dark:text-white font-mono font-bold">v2.0 (Online)</span></p>
                        <p>Máy chủ: <span className="text-green-600 font-bold">Render Singapore</span></p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;