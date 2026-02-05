import axios from 'axios';

// ================= CORE SPRING BOOT API =================
const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// Attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ================= REFERRAL .NET API =================
export const referralApi = axios.create({
    baseURL: 'http://localhost:5000',
});

referralApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
