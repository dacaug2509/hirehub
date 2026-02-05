import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [activeTab, setActiveTab] = useState('CANDIDATE');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const isEmployee = activeTab === 'EMPLOYEE';
            await login(email, password, isEmployee);

            const role = localStorage.getItem('role');

            if (role === 'ADMIN') navigate('/admin');
            else if (role === 'COMPANY') navigate('/company');
            else if (role === 'CANDIDATE') navigate('/candidate');
            else if (role === 'EMPLOYEE') navigate('/employee');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const tabs = ['CANDIDATE', 'COMPANY', 'ADMIN', 'EMPLOYEE'];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                
                {/* 🔴 FIXED HEADING */}
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-8 tracking-wide">
                    HIREHUB LOGIN
                </h2>

                {/* Tabs */}
                <div className="flex justify-between mb-6 border-b border-gray-200">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-sm font-semibold transition ${
                                activeTab === tab
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="mb-4 text-sm text-red-600 text-center font-semibold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded-md
                                   bg-white text-black
                                   placeholder-gray-400
                                   focus:outline-none
                                   focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded-md
                                   bg-white text-black
                                   placeholder-gray-400
                                   focus:outline-none
                                   focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 rounded-md font-bold tracking-wide hover:bg-slate-800 transition"
                    >
                        LOGIN
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">New here?</span>{' '}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
