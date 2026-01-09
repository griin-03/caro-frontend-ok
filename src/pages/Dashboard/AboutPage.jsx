import React from 'react';
import { 
    Github, Facebook, Instagram, Heart, Star, 
    Coffee, Globe, Music, Cpu, Camera, Code, Sparkles, Zap
} from 'lucide-react';

const AboutPage = () => {
    // --- CẤU HÌNH ẢNH TĨNH ---
    const devAvatar = "/images/admin.jpg"; 
    const partnerAvatar = "/images/partner.jpg";

    const handleImageError = (e) => {
        e.target.style.display = 'none'; 
        e.target.nextSibling.style.display = 'flex'; 
    };

    return (
        <div className="h-full w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white p-4 md:p-8 overflow-y-auto custom-scrollbar relative overflow-x-hidden transition-colors duration-500">
            
            {/* BACKGROUND DECORATIONS (Floating Icons) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 text-blue-500/10 animate-float-slow"><Code size={120} /></div>
                <div className="absolute bottom-20 right-10 text-purple-500/10 animate-float-delayed"><Heart size={150} /></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>

            {/* HEADER - Đã sửa: Xóa khung chữ nhật, thêm hiệu ứng chữ phát sáng */}
            <div className="relative max-w-6xl mx-auto mb-16 text-center z-10 animate-fade-in-down">
                <h1 className="text-5xl md:text-7xl font-black mb-4">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        ĐỘI NGŨ PHÁT TRIỂN
                    </span>
                </h1>
                <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-blue-500 to-pink-500 rounded-full mb-6 shadow-[0_0_10px_currentColor] text-purple-500"></div>
                <p className="text-slate-600 dark:text-slate-300 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    Những người đứng sau tâm huyết và sự thành công của dự án <span className="text-blue-500 font-bold drop-shadow-md">Caro Pro</span>
                </p>
            </div>

            {/* MAIN GRID */}
            <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-4 pb-12 z-10">
                
                {/* --- CARD 1: DEVELOPER (Griin-03) --- */}
                <div className="group relative perspective-1000 animate-fade-in-left">
                    {/* Neon Glow Border Effect */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-[2.5rem] blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>
                    
                    <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center text-center shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-[1.01]">
                        
                        {/* Floating Badge */}
                        <div className="absolute top-6 right-6 animate-bounce-subtle">
                            <span className="flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                        </div>

                        {/* AVATAR */}
                        <div className="relative mb-8 group-hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="w-56 h-56 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-2xl overflow-hidden relative z-10">
                                <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center">
                                    <img src={devAvatar} alt="Admin" className="w-full h-full object-cover" onError={handleImageError} />
                                    <div className="absolute inset-0 flex items-center justify-center hidden"><Cpu size={80} className="text-blue-500" /></div>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-4 bg-blue-600 text-white p-2 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-20">
                                <Code size={20} />
                            </div>
                        </div>

                        <div className="mb-4 px-6 py-2 bg-blue-100/50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm">
                            Lead Developer
                        </div>
                        
                        {/* NAME EFFECT */}
                        <h2 className="text-5xl font-black mb-2 tracking-tight">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                                Griin-03
                            </span>
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-6"></div>
                        
                        <p className="text-slate-600 dark:text-slate-300 mb-8 italic text-lg leading-relaxed px-4">
                            "Code là đam mê, Bug là thử thách.<br/>Không có tính năng lỗi, chỉ có tính năng chưa được khám phá."
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-10 w-full">
                            {['Java Spring Boot', 'ReactJS', 'WebSocket', 'MySQL', 'Docker'].map((skill, idx) => (
                                <span key={skill} className={`px-4 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-sm hover:scale-105 transition-transform cursor-default flex items-center gap-2`} style={{animationDelay: `${idx * 50}ms`}}>
                                    {idx === 0 && <Zap size={14} className="text-yellow-500" fill="currentColor"/>}
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto flex gap-4 w-full justify-center">
                             {[Github, Facebook, Globe].map((Icon, i) => (
                                <a key={i} href="#" className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-blue-500/30 group/icon">
                                    <Icon size={24} className="group-hover/icon:animate-bounce-subtle" />
                                </a>
                             ))}
                        </div>
                    </div>
                </div>

                {/* --- CARD 2: PARTNER (Hồ Tổng) --- */}
                <div className="group relative perspective-1000 animate-fade-in-right delay-100">
                     {/* Neon Glow Border Effect */}
                     <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-[2.5rem] blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>

                    <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center text-center shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-[1.01]">
                        
                        {/* Floating Badge */}
                        <div className="absolute top-6 right-6 animate-bounce-subtle delay-500">
                             <Heart size={24} className="text-pink-500 fill-current animate-pulse" />
                        </div>

                        {/* AVATAR */}
                        <div className="relative mb-8 group-hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="w-56 h-56 rounded-full p-1 bg-gradient-to-tr from-pink-400 to-purple-600 shadow-2xl overflow-hidden relative z-10">
                                <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center">
                                    <img src={partnerAvatar} alt="Partner" className="w-full h-full object-cover" onError={handleImageError} />
                                    <div className="absolute inset-0 flex items-center justify-center hidden"><Heart size={80} className="text-pink-500" /></div>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-4 bg-pink-500 text-white p-2 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-20">
                                <Sparkles size={20} />
                            </div>
                        </div>

                        <div className="mb-4 px-6 py-2 bg-pink-100/50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/30 rounded-full text-pink-600 dark:text-pink-400 text-xs font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm">
                            Strategic Partner
                        </div>

                        {/* NAME EFFECT */}
                        <h2 className="text-5xl font-black mb-2 tracking-tight">
                            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                                Hồ Tổng
                            </span>
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mb-6"></div>

                        <p className="text-slate-600 dark:text-slate-300 mb-8 italic text-lg leading-relaxed px-4">
                            "Hậu phương vững chắc & Tester khó tính.<br/>Mang đến những góc nhìn tinh tế và trải nghiệm mượt mà nhất."
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-10 w-full">
                            {[
                                {icon: Music, label: 'Âm nhạc', color: 'text-rose-500'}, 
                                {icon: Coffee, label: 'Cafe', color: 'text-amber-600'}, 
                                {icon: Star, label: 'Du lịch', color: 'text-yellow-500'}
                            ].map((item, idx) => (
                                <span key={idx} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700/50 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-200 flex items-center gap-2 border border-slate-200 dark:border-slate-600 shadow-sm hover:scale-105 transition-transform hover:bg-white dark:hover:bg-slate-600 cursor-default">
                                    <item.icon size={16} className={item.color} /> {item.label}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto flex gap-4 w-full justify-center">
                            {[Instagram, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:border-pink-500 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-pink-500/30 group/icon">
                                    <Icon size={24} className="group-hover/icon:animate-bounce-subtle" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* FOOTER - Lời cảm ơn cảm xúc */}
            <div className="max-w-4xl mx-auto mt-8 mb-16 text-center animate-fade-in-down delay-300">
                <div className="w-24 h-1 bg-slate-200 dark:bg-slate-800 mx-auto rounded-full mb-8"></div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">
                    Cảm ơn bạn đã ghé thăm ngôi nhà nhỏ của chúng tôi ❤️
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto italic">
                    "Mỗi dòng code đều được viết bằng niềm đam mê, mỗi tính năng đều chứa đựng sự tâm huyết. 
                    Hy vọng Caro Pro sẽ mang lại cho bạn những giây phút thư giãn tuyệt vời nhất sau những giờ làm việc căng thẳng. 
                    Mọi sự ủng hộ của bạn là động lực vô giá để chúng tôi tiếp tục hoàn thiện mỗi ngày."
                </p>
                <div className="mt-8 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                    © 2026 Caro Pro Team • All Rights Reserved
                </div>
            </div>
            
            {/* CSS ANIMATIONS - Đã tăng tốc độ (0.8s -> 0.4s) */}
            <style jsx>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; transform: scale(1) translate(-50%, -50%); }
                    50% { opacity: 0.8; transform: scale(1.1) translate(-50%, -50%); }
                }
                @keyframes gradient-xy {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite 2s; }
                .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
                .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 3s ease infinite; }
                
                /* TĂNG TỐC ĐỘ XUẤT HIỆN TẠI ĐÂY (0.4s) */
                .animate-fade-in-down { animation: fadeInDown 0.4s ease-out forwards; opacity: 0; transform: translateY(-20px); }
                .animate-fade-in-left { animation: fadeInLeft 0.4s ease-out forwards; opacity: 0; transform: translateX(-20px); }
                .animate-fade-in-right { animation: fadeInRight 0.4s ease-out forwards; opacity: 0; transform: translateX(20px); }
                .animate-bounce-subtle { animation: bounceSubtle 2s infinite; }
                
                @keyframes fadeInDown { to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInLeft { to { opacity: 1; transform: translateX(0); } }
                @keyframes fadeInRight { to { opacity: 1; transform: translateX(0); } }
                @keyframes bounceSubtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
            `}</style>
        </div>
    );
};

export default AboutPage;