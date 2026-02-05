import { useEffect, useState } from 'react';
import api from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
    const [tab, setTab] = useState('home');

    const [companies, setCompanies] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [candidates, setCandidates] = useState([]);

    // 🔽 EMPLOYEE FILTER STATE
    const [selectedCompany, setSelectedCompany] = useState('ALL');

    /* =====================
       LOAD DATA PER TAB
    ===================== */
    useEffect(() => {
        if (tab === 'companies') {
            api.get('/admin/companies').then(r => setCompanies(r.data));
        }

        if (tab === 'employees') {
            api.get('/admin/employees').then(r => {
                setEmployees(r.data);
                setSelectedCompany('ALL'); // reset dropdown
            });
        }

        if (tab === 'candidates') {
            api.get('/admin/candidates').then(r => setCandidates(r.data));
        }
    }, [tab]);

    /* =====================
       COMPANY ACTIONS
    ===================== */
    const approve = async (id) => {
        await api.put(`/admin/companies/${id}/approve`);
        api.get('/admin/companies').then(r => setCompanies(r.data));
    };

    const block = async (id) => {
        await api.put(`/admin/companies/${id}/block`);
        api.get('/admin/companies').then(r => setCompanies(r.data));
    };

    const pending = companies.filter(c => c.status === 'PENDING');
    const existing = companies.filter(c => c.status !== 'PENDING');

    /* =====================
       HELPERS (SAFE)
    ===================== */
    const getCompanyName = (e) =>
        e.companyName ||
        e.company?.name ||
        'Unknown';

    const companyList = [
        'ALL',
        ...Array.from(new Set(employees.map(e => getCompanyName(e))))
    ];

    const filteredEmployees =
        selectedCompany === 'ALL'
            ? employees
            : employees.filter(e => getCompanyName(e) === selectedCompany);

    /* =====================
       UI
    ===================== */
    return (
        <DashboardLayout
            title="Admin Portal"
            roleEmoji="🛡️"
            navItems={[
                { label: 'Home', icon: '🏠', onClick: () => setTab('home') },
                { label: 'Companies', icon: '🏢', onClick: () => setTab('companies') },
                { label: 'Employees', icon: '👥', onClick: () => setTab('employees') },
                { label: 'Candidates', icon: '🎓', onClick: () => setTab('candidates') }
            ]}
        >

            {/* ================= HOME ================= */}
            {tab === 'home' && (
                <div className="glass-card text-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
                        alt="Admin"
                        className="mx-auto w-40 mb-6"
                    />
                    <h2 className="text-3xl font-bold mb-2">
                        Welcome Admin 👋
                    </h2>
                    <p className="text-gray-500">
                        Manage companies, employees and candidates from one place.
                    </p>
                </div>
            )}

            {/* ================= COMPANIES ================= */}
            {tab === 'companies' && (
                <>
                    <div className="glass-card mb-8">
                        <h2 className="section-title mb-4">
                            🆕 Newly Registered Companies
                        </h2>

                        {pending.length === 0 && (
                            <p className="text-gray-500">No new companies</p>
                        )}

                        {pending.map(c => (
                            <div key={c.id} className="flex justify-between items-center border-b p-3">
                                <span className="font-medium">{c.name}</span>
                                <button
                                    onClick={() => approve(c.id)}
                                    className="action-btn action-primary"
                                >
                                    Approve
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card">
                        <h2 className="section-title mb-4">
                            🏢 Existing Companies
                        </h2>

                        {existing.map(c => (
                            <div key={c.id} className="flex justify-between items-center border-b p-3">
                                <span className="font-medium">{c.name}</span>

                                {c.status === 'BLOCKED' ? (
                                    <button
                                        onClick={() => approve(c.id)}
                                        className="action-btn action-primary"
                                    >
                                        Approve
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => block(c.id)}
                                        className="action-btn action-danger"
                                    >
                                        Block
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ================= EMPLOYEES ================= */}
            {tab === 'employees' && (
                <div className="glass-card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="section-title">
                            👥 Employees
                        </h2>

                        {/* ✅ COMPANY DROPDOWN */}
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="input-field w-60"
                        >
                            {companyList.map(c => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filteredEmployees.length === 0 && (
                        <p className="text-gray-500">
                            No employees for selected company
                        </p>
                    )}

                    {filteredEmployees.map(e => (
                        <div
                            key={e.id}
                            className="grid grid-cols-3 border-b p-3"
                        >
                            <span className="font-medium">{e.name}</span>
                            <span>{e.email || e.user?.email}</span>
                            <span className="font-semibold text-purple-600">
                                {getCompanyName(e)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* ================= CANDIDATES ================= */}
            {tab === 'candidates' && (
                <div className="glass-card">
                    <h2 className="section-title mb-4">
                        🎓 Candidates
                    </h2>

                    {candidates.length === 0 && (
                        <p className="text-gray-500">No candidates found</p>
                    )}

                    {candidates.map(c => (
                        <div
                            key={c.id}
                            className="grid grid-cols-2 border-b p-3"
                        >
                            <span>{c.name}</span>
                            <span>{c.email}</span>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
};

export default AdminDashboard;
