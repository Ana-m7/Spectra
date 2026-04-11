import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Welcome, {user?.name}</h2>
            <p>Role: {user?.role}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;