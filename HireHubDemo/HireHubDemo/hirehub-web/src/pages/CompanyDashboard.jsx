import { useEffect, useState } from 'react';
import {
    Routes,
    Route,
    useNavigate,
    useParams
} from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';

/* =========================
   MAIN DASHBOARD
========================= */
const CompanyDashboard = () => {
    return (
        <DashboardLayout
            title="Company Portal"
            roleEmoji="🏢"
            navItems={[
                { to: '/company', label: 'Overview', icon: '📊' },
                { to: '/company/post-job', label: 'Post Job', icon: '➕' },
                { to: '/company/employees', label: 'Employees', icon: '👥' }
            ]}
        >
            <Routes>
                <Route path="/" element={<JobsList />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/employees" element={<EmployeesList />} />
                <Route path="/job/:id/applicants" element={<JobApplicants />} />
            </Routes>
        </DashboardLayout>
    );
};

/* =========================
   JOB LIST
========================= */
const JobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [applicantCounts, setApplicantCounts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/company/jobs')
            .then(async res => {
                setJobs(res.data);

                // 🔹 Load applicant count per job
                const counts = {};
                for (const job of res.data) {
                    const apps = await api.get(`/company/jobs/${job.id}/applicants`);
                    counts[job.id] = apps.data.length;
                }
                setApplicantCounts(counts);
            })
            .catch(() => {});
    }, []);

    const getDaysLeft = (createdAt) => {
        if (!createdAt) return null;
        const created = new Date(createdAt);
        const expiry = new Date(created);
        expiry.setDate(expiry.getDate() + 10);

        const diff = Math.ceil(
            (expiry - new Date()) / (1000 * 60 * 60 * 24)
        );

        return diff;
    };

    const deleteJob = async (id) => {
        if (window.confirm('Delete this job?')) {
            await api.delete(`/company/jobs/${id}`);
            setJobs(jobs.filter(j => j.id !== id));
        }
    };

    return (
        <div>
            <h2 className="section-title">💼 Job Listings</h2>
            <p className="section-subtitle mb-6">
                Manage and track your hiring posts
            </p>

            <button
                onClick={() => navigate('/company/post-job')}
                className="action-btn action-primary mb-6"
            >
                ➕ Post New Job
            </button>

            {jobs.length === 0 && (
                <p className="text-gray-500">No jobs posted yet</p>
            )}

            <div className="space-y-4">
                {jobs.map(job => {
                    const daysLeft = getDaysLeft(job.createdAt);
                    const isClosed = daysLeft !== null && daysLeft <= 0;

                    return (
                        <div
                            key={job.id}
                            className="glass-card flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">
                                    {job.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {job.description}
                                </p>

                                <p className="text-xs mt-2 text-gray-400">
                                    Skills: {job.requiredSkills}
                                </p>

                                {/* ✅ APPLICANT COUNT */}
                                <p className="text-sm mt-2 font-semibold text-purple-700">
                                    👥 Applicants: {applicantCounts[job.id] ?? 0}
                                </p>

                                {daysLeft !== null && (
                                    <p className={`text-sm mt-2 font-semibold ${
                                        isClosed
                                            ? 'text-red-600'
                                            : 'text-orange-600'
                                    }`}>
                                        {isClosed
                                            ? '❌ Job Closed'
                                            : `⏳ Closes in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        navigate(`/company/job/${job.id}/applicants`)
                                    }
                                    className="action-btn action-secondary"
                                >
                                    👀 Applicants
                                </button>

                                <button
                                    onClick={() => deleteJob(job.id)}
                                    className="action-btn action-danger"
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* =========================
   APPLICANTS
========================= */
const JobApplicants = () => {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);

    const loadApplicants = () => {
        api.get(`/company/jobs/${id}/applicants`)
            .then(res => setApplicants(res.data))
            .catch(() => {});
    };

    useEffect(() => {
        loadApplicants();
    }, [id]);

    const updateStatus = async (applicationId, status) => {
        try {
            await api.put(
                `/company/applications/${applicationId}/status/${status}`,
                {}
            );
            loadApplicants();
        } catch (err) {
            alert(err.response?.data || 'Status update failed');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Applicants
            </h2>

            {applicants.length === 0 && (
                <p className="text-gray-500">No applicants yet</p>
            )}

            <div className="space-y-4">
                {applicants.map(a => (
                    <div
                        key={a.applicationId}
                        className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
                    >
                        <div>
                            <div className="font-bold text-gray-800">
                                📧 {a.email}
                            </div>
                            <div className="text-sm text-gray-500">
                                🛠 Skills: {a.skills}
                            </div>
                            <div className="text-xs mt-1">
                                Status: <b>{a.status}</b>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    updateStatus(a.applicationId, 'SHORTLISTED')
                                }
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-bold"
                            >
                                Shortlist
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(a.applicationId, 'SELECTED')
                                }
                                className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-bold"
                            >
                                Select
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(a.applicationId, 'REJECTED')
                                }
                                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-bold"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* =========================
   POST JOB
========================= */
const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requiredSkills: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/company/jobs', formData);
        navigate('/company');
    };

    return (
        <div className="glass-card max-w-2xl">
            <h2 className="section-title mb-4">📝 Post New Job</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="input-field"
                    placeholder="Job Title"
                    required
                    onChange={e =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                />

                <textarea
                    className="input-field"
                    placeholder="Job Description"
                    rows="4"
                    required
                    onChange={e =>
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }
                />

                <input
                    className="input-field"
                    placeholder="Required Skills (comma separated)"
                    required
                    onChange={e =>
                        setFormData({
                            ...formData,
                            requiredSkills: e.target.value
                        })
                    }
                />

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/company')}
                        className="action-btn"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="action-btn action-primary"
                    >
                        🚀 Publish
                    </button>
                </div>
            </form>
        </div>
    );
};

/* =========================
   EMPLOYEES
========================= */
const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        api.get('/company/employees')
            .then(res => setEmployees(res.data))
            .catch(() => {});
    }, []);

    return (
        <div>
            <h2 className="section-title mb-6">👥 Company Employees</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {employees.map(e => (
                    <div
                        key={e.id}
                        className="glass-card flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-bold text-lg">
                            {e.name.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-gray-800">
                                {e.name}
                            </div>
                            <div className="text-xs text-gray-400">
                                ID: {e.id}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyDashboard;
