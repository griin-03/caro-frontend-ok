import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import authApi from '../../api/authApi'; // Bỏ comment khi bạn đã code xong file API
import { User, Lock, Mail, Gamepad2, Loader2, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // --- GIẢ LẬP GỌI API (Thay bằng authApi.register(formData) sau này) ---
            console.log("Đăng ký với data:", formData);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Delay giả 1.5s
            
            // await authApi.register(formData); // <--- Dòng code thật sau này
            
            alert("Đăng ký thành công! Hãy chuẩn bị chiến đấu!");
            navigate('/login'); 
            // -----------------------------------------------------------------------

        } catch (err) {
            console.error("Lỗi đăng ký:", err);
            const serverError = err.response?.data?.message || err.response?.data || "Đăng ký thất bại. Vui lòng thử lại!";
            setError(typeof serverError === 'string' ? serverError : "Có lỗi xảy ra");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
            {/* Background trang trí (Hiệu ứng nền) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-slate-800 animate-bounce delay-700 text-6xl font-bold opacity-20">X</div>
                <div className="absolute bottom-20 right-20 text-slate-800 animate-bounce text-8xl font-bold opacity-20">O</div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Card Form */}
            <div className="relative z-10 w-full max-w-md p-8 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl animate__animated animate__fadeInUp">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl shadow-lg mb-4">
                        <Gamepad2 size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Tạo Tài Khoản</h2>
                    <p className="text-slate-400 mt-2 text-sm">Gia nhập đấu trường Caro Pro ngay hôm nay</p>
                </div>
                
                {/* Thông báo lỗi */}
                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input 
                            type="text" name="username" placeholder="Tên đăng nhập" required
                            value={formData.username} onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input 
                            type="email" name="email" placeholder="Email bảo mật" required
                            value={formData.email} onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Full Name */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Gamepad2 className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input 
                            type="text" name="fullName" placeholder="Tên hiển thị (Ingame)"
                            value={formData.fullName} onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input 
                            type="password" name="password" placeholder="Mật khẩu" required
                            value={formData.password} onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Đang khởi tạo...</span>
                            </>
                        ) : (
                            <>
                                <span>Đăng Ký Ngay</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        Đã có tài khoản chiến đấu?{' '}
                        <span 
                            onClick={() => navigate('/login')}
                            className="text-blue-400 font-bold cursor-pointer hover:text-blue-300 hover:underline transition-colors"
                        >
                            Đăng nhập
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;