import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import './RegisterPage.css'; // Tận dụng lại CSS đẹp của trang đăng ký

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authApi.login(formData);
            
            // Lưu thông tin user vào bộ nhớ trình duyệt
            localStorage.setItem('user', JSON.stringify(response));
            
            alert("Đăng nhập thành công! Chào mừng " + response.fullName);
            
            // Sau này sẽ chuyển hướng vào bàn cờ: navigate('/game');
        } catch (err) {
            setError("Sai tên đăng nhập hoặc mật khẩu!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="caro-auth-container">
            <div className="floating-piece piece-x" style={{top: '20%', left: '80%'}}>X</div>
            <div className="floating-piece piece-o" style={{bottom: '10%', left: '10%'}}>O</div>

            <div className="glass-card animate__animated animate__fadeIn">
                <h2 className="auth-title">Đăng Nhập</h2>
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="ios-input-group">
                        <input 
                            type="text" className="ios-input" name="username" placeholder="Tên đăng nhập"
                            value={formData.username} onChange={handleChange} required 
                        />
                    </div>
                    <div className="ios-input-group">
                        <input 
                            type="password" className="ios-input" name="password" placeholder="Mật khẩu"
                            value={formData.password} onChange={handleChange} required 
                        />
                    </div>

                    <button type="submit" className="btn-ios" disabled={isLoading}>
                        {isLoading ? 'Đang kiểm tra...' : 'Vào Game Ngay'}
                    </button>
                    
                    <div className="text-center mt-3">
                        <span style={{color: '#555'}}>Chưa có tài khoản? </span>
                        <span 
                            style={{color: '#007aff', cursor: 'pointer', fontWeight: 'bold'}}
                            onClick={() => navigate('/register')}
                        >
                            Đăng ký ngay
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;