import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, Mail, Gamepad2, ArrowRight, LogIn } from 'lucide-react';
import axios from 'axios'; // Import thư viện gọi API

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        fullName: ''
    });

    useEffect(() => {
        if (location.pathname === '/register') setIsLogin(false);
        else setIsLogin(true);
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- HÀM GỌI API ĐĂNG NHẬP / ĐĂNG KÝ (QUAN TRỌNG) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                // 1. GỌI API ĐĂNG NHẬP
                const response = await axios.post('https://caro-backend-pro.onrender.com/api/auth/login'
               // const response = await axios.post('http://localhost:8080/api/auth/login'

                , 
                
                {
                                        username: formData.username,
                    password: formData.password
                });

                console.log("Đăng nhập thành công:", response.data);
                
                // Lưu thông tin user vào bộ nhớ trình duyệt
                localStorage.setItem('user', JSON.stringify(response.data));
                
                alert(`Xin chào ${response.data.fullName || response.data.username}!`);
                navigate('/dashboard');

            } else {
                // 2. GỌI API ĐĂNG KÝ
                if (formData.password !== formData.confirmPassword) {
                    alert("Mật khẩu xác nhận không khớp!");
                    setIsLoading(false);
                    return;
                }

                // Gửi đúng các trường mà Backend (User.java) yêu cầu
                const response = await axios.post('https://caro-backend-pro.onrender.com/api/auth/register'
               // const response = await axios.post('http://localhost:8080/api/auth/register'
               , 

                {                    username: formData.username,
                    password: formData.password,
                    fullName: formData.fullName,
                    email: formData.email
                });

                console.log("Đăng ký thành công:", response.data);
                alert("Đăng ký thành công! Hãy đăng nhập ngay.");
                
                // Chuyển sang màn hình đăng nhập
                setIsLogin(true);
                navigate('/login');
                // Reset form
                setFormData({ username: '', password: '', confirmPassword: '', email: '', fullName: '' });
            }

        } catch (error) {
            console.error("Lỗi:", error);
            // Lấy thông báo lỗi từ Backend trả về (nếu có)
            const errorMessage = error.response?.data?.message || error.response?.data || "Có lỗi xảy ra, vui lòng thử lại!";
            alert("Thất bại: " + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        navigate(isLogin ? '/register' : '/login', { replace: true });
        setFormData({ username: '', password: '', confirmPassword: '', email: '', fullName: '' });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] relative font-sans py-10 px-4 overflow-x-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            {/* Main Card */}
            <div className={`relative z-10 w-full max-w-lg p-1 bg-gradient-to-br from-slate-700/50 to-slate-900/50 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 transform ${isLoading ? 'scale-[0.98] opacity-80' : 'scale-100'}`}>
                <div className="bg-[#1e293b]/90 rounded-[22px] p-8 md:p-10 relative overflow-hidden">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                            <Gamepad2 size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            {isLogin ? 'Đăng Nhập' : 'Đăng Ký Tài Khoản'}
                        </h2>
                        <p className="text-slate-400 mt-2 text-sm">
                            {isLogin ? 'Chào mừng trở lại đấu trường!' : 'Tạo tài khoản thật để lưu điểm số'}
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Tên đăng nhập</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input type="text" name="username" required value={formData.username} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="username" />
                            </div>
                        </div>

                        {/* Register Fields */}
                        <div className={`space-y-4 overflow-hidden transition-all duration-500 ease-in-out ${isLogin ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'}`}>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Họ tên</label>
                                <div className="relative group">
                                    <Gamepad2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" placeholder="Tên hiển thị" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" placeholder="email@example.com" />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Mật khẩu</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="••••••••" />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className={`overflow-hidden transition-all duration-300 ${isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
                            <div className="space-y-1 mt-4">
                                <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Nhập lại mật khẩu</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none" placeholder="••••••••" />
                                </div>
                            </div>
                        </div>

                        {/* Main Button */}
                        <button type="submit" disabled={isLoading} className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 mt-6 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${isLogin ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}>
                            {isLoading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ NGAY'} <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
                        <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                            {isLogin ? "Chưa có tài khoản?" : "Bạn đã có tài khoản?"}
                            <button onClick={toggleMode} className={`font-bold text-base hover:underline focus:outline-none flex items-center gap-1 transition-colors ${isLogin ? 'text-purple-400 hover:text-purple-300' : 'text-blue-400 hover:text-blue-300'}`}>
                                {isLogin ? (<>Đăng ký ngay <ArrowRight size={16} /></>) : (<> <LogIn size={16} /> Đăng nhập ngay</>)}
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthPage;