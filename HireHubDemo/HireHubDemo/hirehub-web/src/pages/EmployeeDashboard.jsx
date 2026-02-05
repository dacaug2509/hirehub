import { useEffect, useState } from 'react';
import { referralApi } from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';

/* =========================
   MAIN DASHBOARD
========================= */
const EmployeeDashboard = () => {
    return (
        <DashboardLayout
            title="Employee Portal"
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

    useEffect(() => {
        referralApi.get('/referral/jobs')
            .then(res => setJobs(res.data));
    }, []);

    const searchCandidates = async () => {
        const res = await referralApi.get(
            `/referral/candidates?name=${searchName}`
        );
        setCandidates(res.data);
    };

    const refer = async (candidateId) => {
        if (!selectedJob) return alert('Please select a job position first');
        try {
            await referralApi.post(
                `/referral/refer?jobId=${selectedJob}&candidateId=${candidateId}`
            );
            alert('Candidate Referred Successfully! 🎉');
        } catch (err) {
            alert(err.response?.data || 'Failed to refer');
        }
    };

    return (
        <div>
            <h2 className="section-title mb-2">🔗 Referral Hub</h2>
            <p className="section-subtitle mb-8">
                Help your company hire great talent and earn rewards
            </p>

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
                                onClick={() => setSelectedJob(job.id)}
                                className={`p-4 rounded-xl cursor-pointer border transition-all
                                    ${
                                        selectedJob === job.id
                                            ? 'bg-purple-100 border-purple-500 shadow'
                                            : 'bg-white hover:bg-gray-50'
                                    }`}
                            >
                                <h4 className="font-semibold text-gray-800">
                                    {job.title}
                                </h4>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {job.description}
                                </p>
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
                                    className={`action-btn ${
                                        selectedJob
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
        </div>
    );
};

export default EmployeeDashboard;
