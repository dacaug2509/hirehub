import { Link, useLocation, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ title, roleEmoji, navItems, children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl">
                <div className="p-6 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg">
                            {roleEmoji}
                        </div>
                        <div className="font-bold text-lg tracking-wide">
                            {title}
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="text-xs bg-red-500 px-2 py-1 rounded font-bold hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                {/* NAV */}
                <nav className="p-4 space-y-2 flex-1">
                    {navItems.map(item =>
                        item.onClick ? (
                            // 🔹 BUTTON MODE (Admin tabs)
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                           text-gray-300 hover:bg-slate-700 hover:text-white"
                            >
                                {item.icon} {item.label}
                            </button>
                        ) : (
                            // 🔹 LINK MODE (Normal routing)
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    location.pathname === item.to
                                        ? 'bg-purple-600 text-white shadow-lg'
                                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                {item.icon} {item.label}
                            </Link>
                        )
                    )}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 animate-fade-in">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
