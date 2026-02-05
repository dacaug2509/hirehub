import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* 🔴 changed text color to dark to avoid UI visibility issues */}
      <div className="min-h-screen bg-gray-100 text-black">
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/unauthorized"
            element={
              <div className="p-10 text-center text-3xl font-bold text-red-600">
                Unauthorized Access
              </div>
            }
          />

          {/* ADMIN */}
          <Route element={<PrivateRoute roles={['ADMIN']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* COMPANY */}
          <Route element={<PrivateRoute roles={['COMPANY']} />}>
            <Route path="/company/*" element={<CompanyDashboard />} />
          </Route>

          {/* CANDIDATE */}
          <Route element={<PrivateRoute roles={['CANDIDATE']} />}>
            <Route path="/candidate/*" element={<CandidateDashboard />} />
          </Route>

          {/* EMPLOYEE */}
          <Route element={<PrivateRoute roles={['EMPLOYEE']} />}>
            <Route path="/employee/*" element={<EmployeeDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
