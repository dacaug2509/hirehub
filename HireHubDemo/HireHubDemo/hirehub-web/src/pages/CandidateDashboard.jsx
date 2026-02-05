import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';

/* =========================
   MAIN DASHBOARD
========================= */
const CandidateDashboard = () => {
    return (
        <DashboardLayout
            title="Candidate Portal"
            roleEmoji="🎓"
            navItems={[
                { to: '/candidate/jobs', label: 'Find Jobs', icon: '🔍' },
                { to: '/candidate/applications', label: 'My Applications', icon: '📁' }
            ]}
        >
            <Routes>
                <Route path="/jobs" element={<FindJobs />} />
                <Route path="/applications" element={<MyApplications />} />
            </Routes>
        </DashboardLayout>
    );
};

/* ================= FIND JOBS ================= */

const FindJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');

    const loadJobs = () => {
        api.get(`/candidate/jobs${search ? `?search=${search}` : ''}`)
            .then(res => setJobs(res.data))
            .catch(() => {});
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const apply = async (id) => {
        try {
            await api.post(`/candidate/apply/${id}`);
            alert('Applied successfully');
        } catch (err) {
            alert(err.response?.data || 'Apply failed');
        }
    };

    const getDaysLeft = (createdAt) => {
        if (!createdAt) return null;
        const created = new Date(createdAt);
        const expiry = new Date(created);
        expiry.setDate(expiry.getDate() + 10);
        return Math.max(
            Math.ceil((expiry - new Date()) / (1000 * 60 * 60 * 24)),
            0
        );
    };

    return (
        <div>
            <h2 className="section-title">💼 Available Jobs</h2>
            <p className="section-subtitle mb-4">
                Search jobs by title
            </p>

            {/* 🔍 SEARCH BOX */}
            <div className="flex gap-3 mb-6">
                <input
                    className="input-field"
                    placeholder="Search job title..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button
                    onClick={loadJobs}
                    className="action-btn action-primary"
                >
                    Search
                </button>
            </div>

            {jobs.length === 0 && (
                <p className="text-gray-500">No jobs found</p>
            )}

            <div className="space-y-4">
                {jobs.map(job => {
                    const daysLeft = getDaysLeft(job.createdAt);

                    return (
                        <div key={job.id} className="glass-card">
                            <p className="text-sm font-semibold text-purple-600">
                                🏢 {job.company?.name}
                            </p>

                            <h3 className="text-lg font-bold text-gray-800">
                                {job.title}
                            </h3>

                            <p className="text-gray-500 mt-2">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {job.requiredSkills.split(',').map(s => (
                                    <span
                                        key={s}
                                        className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                                    >
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>

                            <p className="text-sm mt-3 font-semibold text-red-500">
                                ⏳ Closes in {daysLeft} day{daysLeft !== 1 && 's'}
                            </p>

                            <button
                                onClick={() => apply(job.id)}
                                className="action-btn action-primary mt-4"
                            >
                                🚀 Apply
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ================= APPLICATIONS ================= */

const MyApplications = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        api.get('/candidate/applications')
            .then(res => setApps(res.data))
            .catch(() => {});
    }, []);

    return (
        <div>
            <h2 className="section-title">📁 My Applications</h2>

            {apps.length === 0 && (
                <p className="text-gray-500">No applications yet</p>
            )}

            <div className="space-y-4">
                {apps.map(app => (
                    <div key={app.id} className="glass-card">
                        <p className="text-sm font-semibold text-purple-600">
                            🏢 {app.job?.company?.name}
                        </p>
                        <h3 className="font-bold text-gray-800">
                            {app.job?.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Status: <b>{app.status}</b>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateDashboard;
