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
    const [companyName, setCompanyName] = useState('Company');

    useEffect(() => {
        // Fetch company profile to get name
        api.get('/company/profile')
            .then(res => setCompanyName(res.data.name || 'Company'))
            .catch(() => setCompanyName('Company'));
    }, []);

    return (
        <DashboardLayout
            title={`${companyName} Portal`}
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
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/company/jobs')
            .then(res => setJobs(res.data))
            .catch(() => { });
    }, []);

    return (
        <div>
            <h2 className="section-title">💼 Job Listings</h2>

            <button
                onClick={() => navigate('/company/post-job')}
                className="action-btn action-primary mb-6"
            >
                ➕ Post New Job
            </button>

            {jobs.length === 0 && (
                <p className="text-gray-500">No jobs posted yet.</p>
            )}

            {jobs.map(job => (
                <div key={job.id} className="glass-card flex justify-between">
                    <div>
                        <h3 className="font-bold">{job.title}</h3>
                        <p className="text-sm text-gray-500">
                            👥 Applicants: {job.applicantCount ?? 0}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(`/company/job/${job.id}/applicants`)}
                        className="action-btn action-secondary"
                    >
                        👀 Applicants
                    </button>
                </div>
            ))}
        </div>
    );
};

/* =========================
   APPLICANTS
========================= */
const JobApplicants = () => {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const loadApplicants = () => {
        api.get(`/company/jobs/${id}/applicants`)
            .then(res => setApplicants(res.data))
            .catch(() => setApplicants([]));
    };

    const viewProfile = async (candidateId) => {
        try {
            const res = await api.get(`/company/candidate/${candidateId}/profile`);
            setSelectedProfile(res.data);
        } catch (err) {
            alert('Failed to load candidate profile');
        }
    };

    useEffect(() => {
        loadApplicants();
    }, [id]);

    return (
        <div>
            <h2 className="section-title mb-6">👥 Applicants</h2>

            {applicants.length === 0 && (
                <p className="text-gray-500">No applicants found.</p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Applicants List */}
                <div className="space-y-4">
                    {applicants.map(a => (
                        <div
                            key={a.applicationId}
                            className="glass-card cursor-pointer hover:shadow-lg transition"
                            onClick={() => viewProfile(a.candidateId)}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{a.candidateName || a.email}</h3>
                                    <p className="text-sm text-gray-600"><b>Email:</b> {a.email}</p>
                                    <p className="text-sm text-gray-600"><b>Skills:</b> {a.skills || '—'}</p>
                                    <p className="text-sm">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${a.status === 'APPLIED' ? 'bg-blue-100 text-blue-700' :
                                            a.status === 'SHORTLISTED' ? 'bg-yellow-100 text-yellow-700' :
                                                a.status === 'SELECTED' ? 'bg-green-100 text-green-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {a.status}
                                        </span>
                                    </p>
                                </div>

                                {/* Referral Badge */}
                                {a.referredByEmployeeName && (
                                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                                        <span>🔗</span>
                                        <span>Referred by: {a.referredByEmployeeName}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Profile View */}
                {selectedProfile && (
                    <div className="glass-card sticky top-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Candidate Profile</h3>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Skills</p>
                                <p className="text-gray-800">{selectedProfile.skills || '—'}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-600">Certifications</p>
                                <p className="text-gray-800 whitespace-pre-wrap">{selectedProfile.certifications || '—'}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-600">Achievements</p>
                                <p className="text-gray-800 whitespace-pre-wrap">{selectedProfile.achievements || '—'}</p>
                            </div>

                            {selectedProfile.githubUrl && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">GitHub</p>
                                    <a
                                        href={selectedProfile.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {selectedProfile.githubUrl}
                                    </a>
                                </div>
                            )}

                            {selectedProfile.linkedinUrl && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">LinkedIn</p>
                                    <a
                                        href={selectedProfile.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {selectedProfile.linkedinUrl}
                                    </a>
                                </div>
                            )}

                            {selectedProfile.resumeUrl && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Resume</p>
                                    <a
                                        href={`http://localhost:8080${selectedProfile.resumeUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="action-btn action-primary inline-block"
                                    >
                                        📄 View Resume
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
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
            <h2 className="section-title mb-4">📝 Post Job</h2>

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
                    placeholder="Description"
                    rows="4"
                    required
                    onChange={e =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                />

                <input
                    className="input-field"
                    placeholder="Required Skills"
                    required
                    onChange={e =>
                        setFormData({ ...formData, requiredSkills: e.target.value })
                    }
                />

                <button className="action-btn action-primary">
                    Publish
                </button>
            </form>
        </div>
    );
};

/* =========================
   EMPLOYEES + REFERRALS
========================= */
const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
        api.get('/company/employees')
            .then(res => setEmployees(res.data))
            .catch(() => setEmployees([]));
    }, []);

    const loadReferrals = (employee) => {
        setSelectedEmployee(employee);
        api.get(`/referrals/employee/${employee.id}`)
            .then(res => setReferrals(res.data))
            .catch(() => setReferrals([]));
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            {/* EMPLOYEES */}
            <div>
                <h2 className="section-title">👥 Employees</h2>

                {employees.length === 0 && (
                    <p className="text-gray-500">No employees found.</p>
                )}

                {employees.map(e => (
                    <div
                        key={e.id}
                        className="glass-card cursor-pointer hover:scale-[1.01]"
                        onClick={() => loadReferrals(e)}
                    >
                        {e.name}
                    </div>
                ))}
            </div>

            {/* REFERRALS */}
            <div>
                {selectedEmployee && (
                    <>
                        <h2 className="section-title">
                            📌 Referrals by {selectedEmployee.name}
                        </h2>

                        {referrals.length === 0 && (
                            <p className="text-gray-500">
                                No referrals found.
                            </p>
                        )}

                        {referrals.map(r => (
                            <div key={r.id} className="glass-card">
                                <p><b>Job:</b> {r.jobTitle || '—'}</p>
                                <p><b>Candidate:</b> {r.candidateName || '—'}</p>
                                <p><b>Status:</b> {r.status}</p>
                                <p>
                                    <b>Date:</b>{' '}
                                    {r.referralDate
                                        ? new Date(r.referralDate).toLocaleDateString()
                                        : '—'}
                                </p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default CompanyDashboard;
