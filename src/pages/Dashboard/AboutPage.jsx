import React from 'react';
import { 
    Github, Facebook, Instagram, Heart, Star, 
    Coffee, Globe, Music, Cpu, Camera 
} from 'lucide-react';

const AboutPage = () => {
    // --- CẤU HÌNH ẢNH TĨNH (Lấy từ thư mục public/images) ---
    // Lưu ý: Đường dẫn bắt đầu bằng dấu / nghĩa là đi từ thư mục public
    const devAvatar = "/images/admin.jpg"; 
    const partnerAvatar = "/images/partner.jpg";

    // Hàm báo lỗi nếu quên chưa bỏ ảnh vào thư mục public
    const handleImageError = (e) => {
        e.target.style.display = 'none'; // Ẩn ảnh lỗi
        e.target.nextSibling.style.display = 'flex'; // Hiện icon thay thế
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white p-8 overflow-y-auto transition-colors duration-300">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                    Đội Ngũ Phát Triển
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors duration-300">
                    Những người đứng sau sự thành công của dự án Caro Pro
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 px-4">
                
                {/* --- CỘT 1: DEVELOPER --- */}
                <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    
                    <div className="relative h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl transition-all duration-300 z-10">
                        
                        {/* AVATAR CỐ ĐỊNH */}
                        <div className="relative mb-8">
                            <div className="w-48 h-48 rounded-full p-1.5 bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-lg overflow-hidden relative bg-white dark:bg-slate-900 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                                {/* Ảnh load từ thư mục code */}
                                <img 
                                    src={devAvatar} 
                                    alt="Admin" 
                                    className="w-full h-full object-cover rounded-full" 
                                    onError={handleImageError} 
                                />
                                {/* Icon dự phòng nếu ảnh lỗi */}
                                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 hidden">
                                    <Cpu size={80} className="text-blue-500" />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 px-4 py-1.5 bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/50 rounded-full text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest">
                            Lead Developer
                        </div>
                        <h2 className="text-4xl font-black mb-3 text-slate-800 dark:text-white">Griin-03</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 italic text-lg">"Code là đam mê, Bug là thử thách"</p>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {['Java Spring Boot', 'ReactJS', 'WebSocket', 'MySQL'].map((skill) => (
                                <span key={skill} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-transparent">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-8"></div>
                        <div className="flex gap-6 mt-auto">
                            <a href="#" className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-600 dark:text-slate-300 transition-colors"><Github size={24} /></a>
                            <a href="#" className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-600 dark:text-slate-300 transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-600 dark:text-slate-300 transition-colors"><Globe size={24} /></a>
                        </div>
                    </div>
                </div>

                {/* --- CỘT 2: PARTNER --- */}
                <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    
                    <div className="relative h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl transition-all duration-300 z-10">
                        
                        {/* AVATAR CỐ ĐỊNH */}
                        <div className="relative mb-8">
                            <div className="w-48 h-48 rounded-full p-1.5 bg-gradient-to-tr from-pink-500 to-purple-400 shadow-lg overflow-hidden relative bg-white dark:bg-slate-900 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                                <img 
                                    src={partnerAvatar} 
                                    alt="Partner" 
                                    className="w-full h-full object-cover rounded-full" 
                                    onError={handleImageError} 
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 hidden">
                                    <Heart size={80} className="text-pink-500" />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 px-4 py-1.5 bg-pink-100 dark:bg-pink-500/20 border border-pink-200 dark:border-pink-500/50 rounded-full text-pink-600 dark:text-pink-400 text-sm font-bold uppercase tracking-widest">
                            Partner
                        </div>
                        <h2 className="text-4xl font-black mb-3 text-slate-800 dark:text-white">Hồ Tổng</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 italic text-lg">"Hậu phương vững chắc & Tester khó tính"</p>

                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 border border-slate-200 dark:border-transparent"><Music size={16}/> Âm nhạc</span>
                            <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 border border-slate-200 dark:border-transparent"><Coffee size={16}/> Cafe</span>
                            <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 border border-slate-200 dark:border-transparent"><Star size={16}/> Du lịch</span>
                        </div>
                        <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-8"></div>
                        <div className="flex gap-6 mt-auto">
                            <a href="#" className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white text-slate-600 dark:text-slate-300 transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white text-slate-600 dark:text-slate-300 transition-colors"><Facebook size={24} /></a>
                        </div>
                    </div>
                </div>

            </div>

            {/* FOOTER */}
            <div className="max-w-4xl mx-auto mt-20 text-center border-t border-slate-200 dark:border-slate-800 pt-8 transition-colors duration-300">
                <p className="text-slate-500 dark:text-slate-500 font-mono text-sm">
                    © 2026 Caro Pro Team. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;