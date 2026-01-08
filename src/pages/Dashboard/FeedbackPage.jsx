import React from 'react';
import { 
    MessageCircle, Heart, Star, 
    Facebook, Send, Sparkles 
} from 'lucide-react';

// Icon TikTok tự vẽ (vì thư viện Lucide mặc định chưa có)
const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
    </svg>
);

const FeedbackPage = () => {
    // Lấy ảnh cố định từ thư mục public (giống trang About)
    const partnerAvatar = "/images/partner.jpg";

    const handleImageError = (e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white p-8 overflow-y-auto transition-colors duration-300 flex flex-col items-center">
            
            {/* HEADER */}
            <div className="max-w-2xl text-center mb-12 animate-fade-in-down">
                <h1 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                    Gửi Phản Hồi & Góp Ý
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Bạn gặp lỗi game? Hay muốn tâm sự? <br/>
                    Hãy liên hệ ngay với <span className="font-bold text-pink-500">Admin CSKH</span> của chúng tôi.
                </p>
            </div>

            {/* CARD PARTNER (TẬP TRUNG) */}
            <div className="w-full max-w-md relative group animate-zoom-in">
                {/* Hiệu ứng nền mờ phía sau */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-2xl">
                    
                    {/* Badge Admin */}
                    <div className="absolute top-6 right-6 px-3 py-1 bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-bold rounded-full border border-pink-200 dark:border-pink-500/50 flex items-center gap-1">
                        <Sparkles size={12} /> CSKH VIP
                    </div>

                    {/* Avatar Lớn */}
                    <div className="mb-6 relative">
                        <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-purple-500 shadow-lg">
                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 overflow-hidden relative flex items-center justify-center">
                                <img 
                                    src={partnerAvatar} 
                                    alt="Linh Cute" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    onError={handleImageError} 
                                />
                                {/* Fallback Icon */}
                                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 hidden">
                                    <Heart size={64} className="text-pink-500" />
                                </div>
                            </div>
                        </div>
                        {/* Status Online */}
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-800 rounded-full" title="Đang Online"></div>
                    </div>

                    {/* Thông tin */}
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">Hồ Tổng</h2>
                    <p className="text-slate-500 dark:text-slate-400 italic mb-6">"Luôn lắng nghe, lâu lâu mới hiểu"</p>

                    {/* Các nút liên hệ */}
                    <div className="w-full space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Kênh hỗ trợ chính thức</p>
                        
                        {/* Nút Facebook */}
                        <a 
                            href="https://www.facebook.com/share/1CDAoRJyEQ/" // Thay link Facebook của bạn vào đây
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full p-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-blue-500/30 group/btn"
                        >
                            <Facebook size={24} />
                            <span>Nhắn tin qua Facebook</span>
                            <Send size={16} className="opacity-0 group-hover/btn:opacity-100 -ml-4 group-hover/btn:ml-0 transition-all" />
                        </a>

                        {/* Nút TikTok */}
                        <a 
                            href="https://www.tiktok.com/@ltt.onlylove?_r=1&_t=ZS-92u3tV4weyP" // Thay link TikTok của bạn vào đây
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full p-4 bg-black dark:bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-slate-500/30 group/btn"
                        >
                            <TikTokIcon size={24} />
                            <span>Follow trên TikTok</span>
                            <Star size={16} className="opacity-0 group-hover/btn:opacity-100 -ml-4 group-hover/btn:ml-0 transition-all text-yellow-400" />
                        </a>
                    </div>

                    {/* Note nhỏ */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 w-full text-center">
                        <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                            <MessageCircle size={12} />
                            Thời gian phản hồi: 8:00 - 22:00 hàng ngày
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;