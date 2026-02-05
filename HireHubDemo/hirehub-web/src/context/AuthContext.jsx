import { createContext, useState, useEffect, useContext } from 'react';
import api, { referralApi } from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Restore session on refresh
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

    /**
     * 🔐 LOGIN
     * EMPLOYEE  → .NET API (5223)
     * OTHERS    → Spring Boot (8080)
     */
    const login = async (email, password, isEmployee) => {
        try {
            // 🔴 Hard reset session
            localStorage.clear();
            setUser(null);

            const response = isEmployee
                ? await referralApi.post('/api/auth/login', { email, password })
                : await api.post('/auth/login', { email, password });

            const { token, role, userId } = response.data;

            // ✅ Store session
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userId', userId);

            setUser({ token, role, userId });

            return role;
        } catch (error) {
            localStorage.clear();
            setUser(null);
            throw error;
        }
    };

    const register = async (data) => {
        await api.post('/auth/register', data);
    };

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
