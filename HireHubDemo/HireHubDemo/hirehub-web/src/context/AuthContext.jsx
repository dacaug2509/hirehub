import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Load auth safely on app start
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');

        if (token && role && userId) {
            setUser({ token, role, userId });
        } else {
            localStorage.clear();
            setUser(null);
        }
        setLoading(false);
    }, []);

    // ✅ HARD RESET BEFORE EVERY LOGIN
    const login = async (email, password) => {
        try {
            // 🔴 CLEAR OLD SESSION COMPLETELY
            localStorage.clear();
            setUser(null);

            const response = await api.post('/auth/login', { email, password });

            const { token, role, userId } = response.data;

            // ✅ STORE FRESH SESSION
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userId', userId);

            setUser({ token, role, userId });

            return role;
        } catch (error) {
            // ✅ CLEAN STATE ON FAILURE (NO STALE DATA)
            localStorage.clear();
            setUser(null);
            throw error;
        }
    };

    const register = async (data) => {
        await api.post('/auth/register', data);
    };

    // ✅ SAFE LOGOUT
    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
