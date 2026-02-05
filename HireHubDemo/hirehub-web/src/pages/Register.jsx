import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [activeTab, setActiveTab] = useState('CANDIDATE');
    const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        skills: '',
        experience: '',
        companyId: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'EMPLOYEE') {
            api.get('/auth/companies')
                .then(res => setCompanies(res.data))
                .catch(() => {});
        }
    }, [activeTab]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/auth/register', {
                ...formData,
                role: activeTab
            });

            alert('Registration successful. Please login.');
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
        }
    };

    const inputClass =
        'w-full px-4 py-3 border rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">

                {/* 🔴 FIXED HEADING */}
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-8 tracking-wide">
                    HIREHUB REGISTER
                </h2>

                {/* Tabs */}
                <div className="flex justify-center gap-8 mb-6 border-b border-gray-200">
                    {['CANDIDATE', 'COMPANY', 'EMPLOYEE'].map(tab => (
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

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        className={inputClass}
                        placeholder="Full Name"
                        required
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />

                    <input
                        type="email"
                        className={inputClass}
                        placeholder="Email"
                        required
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />

                    <input
                        type="password"
                        className={inputClass}
                        placeholder="Password"
                        required
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />

                    {activeTab === 'CANDIDATE' && (
                        <>
                            <input
                                className={inputClass}
                                placeholder="Skills (Java, React, etc)"
                                required
                                onChange={e => setFormData({ ...formData, skills: e.target.value })}
                            />
                            <input
                                type="number"
                                className={inputClass}
                                placeholder="Experience (years)"
                                required
                                onChange={e => setFormData({ ...formData, experience: e.target.value })}
                            />
                        </>
                    )}

                    {activeTab === 'EMPLOYEE' && (
                        <select
                            className={inputClass}
                            required
                            value={formData.companyId}
                            onChange={e => setFormData({ ...formData, companyId: e.target.value })}
                        >
                            <option value="">Select Company</option>
                            {companies.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 rounded-md font-bold tracking-wide hover:bg-slate-800 transition"
                    >
                        REGISTER
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">Already have an account?</span>{' '}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Login here
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Register;
