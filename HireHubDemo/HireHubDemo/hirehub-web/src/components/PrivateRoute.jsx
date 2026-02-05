import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ roles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (roles) {
        const userRole = user.role.startsWith('ROLE_')
            ? user.role
            : `ROLE_${user.role}`;

        const allowed = roles.map(r =>
            r.startsWith('ROLE_') ? r : `ROLE_${r}`
        );

        if (!allowed.includes(userRole)) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
};

export default PrivateRoute;
