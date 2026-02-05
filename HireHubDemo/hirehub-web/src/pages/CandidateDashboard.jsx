import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';

/* =========================
   MAIN DASHBOARD
========================= */
const CandidateDashboard = () => {
    const [candidateName, setCandidateName] = useState('Candidate');

    useEffect(() => {
        api.get('/candidate/profile/name')
            .then(res => setCandidateName(res.data || 'Candidate'))
            .catch(() => setCandidateName('Candidate'));
    }, []);

    return (
        <DashboardLayout
            title={`Hello ${candidateName}`}
            roleEmoji="🎓"
            navItems={[
                { to: '/candidate/jobs', label: 'Find Jobs', icon: '🔍' },
                { to: '/candidate/applications', label: 'My Applications', icon: '📁' },
                { to: '/candidate/profile', label: 'My Profile', icon: '👤' }
            ]}
        >
            <Routes>
                <Route path="/jobs" element={<FindJobs />} />
                <Route path="/applications" element={<MyApplications />} />
                <Route path="/profile" element={<MyProfile />} />
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
            .catch(() => { });
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
        const expiry = new Date(createdAt);
        expiry.setDate(expiry.getDate() + 10);
        return Math.max(
            Math.ceil((expiry - new Date()) / (1000 * 60 * 60 * 24)),
            0
        );
    };

    return (
        <div>
            <h2 className="section-title">💼 Available Jobs</h2>

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

                            <h3 className="text-lg font-bold">{job.title}</h3>

                            <p className="text-gray-500 mt-2">
                                {job.description}
                            </p>

                            <p className="text-sm mt-3 text-red-500">
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
            .catch(() => { });
    }, []);

    return (
        <div>
            <h2 className="section-title">📁 My Applications</h2>

            {apps.length === 0 && (
                <p className="text-gray-500">No applications yet</p>
            )}

            {apps.map(app => (
                <div key={app.id} className="glass-card">
                    <h3 className="font-bold">{app.job?.title}</h3>
                    <p>Status: <b>{app.status}</b></p>
                </div>
            ))}
        </div>
    );
};

/* ================= MY PROFILE (UPDATED) ================= */

const MyProfile = () => {
    const [profile, setProfile] = useState({
        skills: '',
        certifications: '',
        githubUrl: '',
        linkedinUrl: '',
        achievements: ''
    });

    const [resume, setResume] = useState(null);

    useEffect(() => {
        api.get('/candidate/profile')
            .then(res => setProfile(res.data))
            .catch(() => { });
    }, []);

    const saveProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('skills', profile.skills);
            formData.append('certifications', profile.certifications);
            formData.append('githubUrl', profile.githubUrl);
            formData.append('linkedinUrl', profile.linkedinUrl);
            formData.append('achievements', profile.achievements);

            if (resume) {
                formData.append('resume', resume);
            }

            await api.put('/candidate/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Profile saved ✅');
        } catch {
            alert('Failed to save profile');
        }
    };

    return (
        <div className="glass-card max-w-2xl">
            <h2 className="section-title mb-4">👤 My Profile</h2>

            <input
                className="input-field mb-3"
                placeholder="Skills (comma separated)"
                value={profile.skills}
                onChange={e => setProfile({ ...profile, skills: e.target.value })}
            />

            <input
                className="input-field mb-3"
                placeholder="Certifications"
                value={profile.certifications}
                onChange={e =>
                    setProfile({ ...profile, certifications: e.target.value })
                }
            />

            <input
                className="input-field mb-3"
                placeholder="GitHub Profile URL"
                value={profile.githubUrl}
                onChange={e =>
                    setProfile({ ...profile, githubUrl: e.target.value })
                }
            />

            <input
                className="input-field mb-3"
                placeholder="LinkedIn Profile URL"
                value={profile.linkedinUrl}
                onChange={e =>
                    setProfile({ ...profile, linkedinUrl: e.target.value })
                }
            />

            <textarea
                className="input-field mb-3"
                rows="4"
                placeholder="Achievements"
                value={profile.achievements}
                onChange={e =>
                    setProfile({ ...profile, achievements: e.target.value })
                }
            />

            {/* ✅ RESUME UPLOAD */}
            <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="input-field mb-4"
                onChange={e => setResume(e.target.files[0])}
            />

            <button
                onClick={saveProfile}
                className="action-btn action-primary mt-4"
            >
                💾 Save Profile
            </button>
        </div>
    );
};

export default CandidateDashboard;
