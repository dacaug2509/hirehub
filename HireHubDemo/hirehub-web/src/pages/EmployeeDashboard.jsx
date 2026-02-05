import { useEffect, useState } from 'react';
import { referralApi } from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';

/* =========================
   MAIN DASHBOARD
========================= */
const EmployeeDashboard = () => {
    const [employeeName, setEmployeeName] = useState('Employee');

    useEffect(() => {
        referralApi.get('/api/referral/profile')
            .then(res => setEmployeeName(res.data.name || 'Employee'))
            .catch(() => setEmployeeName('Employee'));
    }, []);

    return (
        <DashboardLayout
            title={`Hello! ${employeeName}`}
            roleEmoji="👨‍💻"
            navItems={[
                { to: '/employee', label: 'Referrals', icon: '🔗' }
            ]}
        >
            <ReferralHub />
        </DashboardLayout>
    );
};

/* =========================
   REFERRAL HUB
========================= */
const ReferralHub = () => {
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [showJobDetails, setShowJobDetails] = useState(false);

    // 🔹 Load jobs
    useEffect(() => {
        referralApi
            .get('/api/referral/jobs')
            .then(res => setJobs(res.data))
            .catch(err => {
                console.error(err);
                alert('Failed to load jobs. Please login again.');
            });
    }, []);

    // 🔹 Load job details and applicants when a job is selected for details view
    const viewJobDetails = async (jobId) => {
        try {
            // Fetch job details
            const detailsRes = await referralApi.get(`/api/referral/jobs/${jobId}/details`);
            setJobDetails(detailsRes.data);

            // Fetch applicants
            const applicantsRes = await referralApi.get(`/api/referral/jobs/${jobId}/applicants`);
            setApplicants(applicantsRes.data);

            setShowJobDetails(true);
        } catch (err) {
            console.error(err);
            alert('Failed to load job details: ' + (err.response?.data || err.message));
        }
    };

    // 🔹 Search candidates
    const searchCandidates = async () => {
        try {
            const res = await referralApi.get(
                `/api/referral/candidates?name=${searchName}`
            );
            setCandidates(res.data);
        } catch (err) {
            console.error(err);
            alert('Failed to search candidates');
        }
    };

    // 🔹 Refer candidate (IMPORTANT FIX: BODY, not query params)
    const refer = async (candidateId) => {
        if (!selectedJob) {
            alert('Please select a job position first');
            return;
        }

        try {
            await referralApi.post('/api/referral/refer', {
                jobId: selectedJob,
                candidateId: candidateId
            });
            alert('Candidate Referred Successfully! 🎉');
        } catch (err) {
            console.error(err);
            alert(err.response?.data || 'Failed to refer candidate');
        }
    };

    return (
        <div>
            <h2 className="section-title mb-2">🔗 Referral Hub</h2>
            <p className="section-subtitle mb-8">
                Help your company hire great talent and earn rewards
            </p>

            {!showJobDetails ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Job Selection */}
                    <div className="glass-card flex flex-col h-[600px]">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            1️⃣ Select Open Position
                        </h3>

                        <div className="space-y-3 overflow-y-auto pr-2 flex-1">
                            {jobs.map(job => (
                                <div
                                    key={job.id}
                                    className="p-4 rounded-xl border bg-white hover:bg-gray-50 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-gray-800">
                                            {job.title}
                                        </h4>
                                        <button
                                            onClick={() => viewJobDetails(job.id)}
                                            className="text-xs bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                        {job.description}
                                    </p>
                                    <button
                                        onClick={() => setSelectedJob(job.id)}
                                        className={`w-full py-2 rounded-lg text-sm font-semibold transition ${selectedJob === job.id
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                            }`}
                                    >
                                        {selectedJob === job.id ? '✓ Selected for Referral' : 'Select for Referral'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Candidate Search */}
                    <div className="glass-card flex flex-col h-[600px]">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            2️⃣ Find Talent
                        </h3>

                        <div className="flex gap-3 mb-6">
                            <input
                                className="input-field"
                                placeholder="Search Candidate Name..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <button
                                onClick={searchCandidates}
                                className="action-btn action-primary"
                            >
                                Search
                            </button>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                            {candidates.map(c => (
                                <div
                                    key={c.id}
                                    className="glass-card flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-bold">
                                            {c.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">
                                                {c.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Skills: {c.skills}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => refer(c.id)}
                                        disabled={!selectedJob}
                                        className={`action-btn ${selectedJob
                                            ? 'action-primary'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Refer
                                    </button>
                                </div>
                            ))}

                            {candidates.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <span className="text-4xl mb-2">👥</span>
                                    <p>Search for a candidate to start referring</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // Job Details View
                <div className="glass-card">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">
                            📋 Job Details
                        </h3>
                        <button
                            onClick={() => {
                                setShowJobDetails(false);
                                setJobDetails(null);
                                setApplicants([]);
                            }}
                            className="action-btn bg-gray-500 text-white hover:bg-gray-600"
                        >
                            ← Back to Jobs
                        </button>
                    </div>

                    {jobDetails && (
                        <div className="space-y-6">
                            {/* Job Information */}
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                                    {jobDetails.title}
                                </h4>
                                <div className="flex gap-4 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${jobDetails.status === 'OPEN'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {jobDetails.status}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <h5 className="font-semibold text-gray-700 mb-2">Description:</h5>
                                    <p className="text-gray-600 whitespace-pre-wrap">
                                        {jobDetails.description}
                                    </p>
                                </div>

                                {jobDetails.requiredSkills && (
                                    <div>
                                        <h5 className="font-semibold text-gray-700 mb-2">Required Skills:</h5>
                                        <p className="text-gray-600">
                                            {jobDetails.requiredSkills}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Applicants Section */}
                            <div>
                                <h4 className="text-xl font-bold text-gray-800 mb-4">
                                    👥 Applicants ({applicants.length})
                                </h4>

                                {applicants.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <span className="text-5xl mb-3 block">📭</span>
                                        <p>No applicants yet for this position</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {applicants.map(applicant => (
                                            <div
                                                key={applicant.id}
                                                className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-white flex items-center justify-center font-bold text-lg">
                                                            {applicant.email.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h5 className="font-bold text-gray-800">
                                                                {applicant.email}
                                                            </h5>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                <span className="font-semibold">Skills:</span> {applicant.skills}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${applicant.status === 'APPLIED' ? 'bg-blue-100 text-blue-700' :
                                                        applicant.status === 'SHORTLISTED' ? 'bg-yellow-100 text-yellow-700' :
                                                            applicant.status === 'SELECTED' ? 'bg-green-100 text-green-700' :
                                                                'bg-red-100 text-red-700'
                                                        }`}>
                                                        {applicant.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EmployeeDashboard;
