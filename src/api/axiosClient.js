// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Địa chỉ Backend Spring Boot
    headers: {
        'Content-Type': 'application/json',
    },
});

// Xử lý dữ liệu trả về (Response Interceptor)
axiosClient.interceptors.response.use(
    (response) => {
        // Nếu server trả về data, lấy luôn phần data cho gọn
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Log lỗi ra console để dễ debug
        console.error("Lỗi API:", error);
        throw error;
    }
);

export default axiosClient;