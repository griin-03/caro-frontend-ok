// src/api/authApi.js
import axiosClient from './axiosClient';

const authApi = {
    register: (data) => {
        // data = { username, password, email, ... }
        // Gọi đến endpoint: http://localhost:8080/api/users/register
        return axiosClient.post('/users/register', data);
    },
    
    // Sau này làm chức năng đăng nhập thì thêm hàm login ở đây
    login: (data) => {
        return axiosClient.post('/users/login', data);
    }
};

export default authApi;