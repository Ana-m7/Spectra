import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddChild from './pages/AddChild';
import Awareness from './pages/Awareness';
import Screening from './pages/Screening';
import Result from './pages/Result';
import BehaviorLibrary from './pages/BehaviorLibrary';
import Roadmap from './pages/Roadmap';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/awareness" element={<Awareness />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                        <Dashboard />
                        </ProtectedRoute>
                     }/>

                   <Route path="/add-child" element={
                        <ProtectedRoute>
                        <AddChild />
                        </ProtectedRoute>
                     }/>
                   <Route path="/screening" element={
                        <ProtectedRoute>
                        <Screening />
                        </ProtectedRoute>
                     }/>
                   <Route path="/result" element={
                        <ProtectedRoute>
                        <Result />
                        </ProtectedRoute>
                     }/>
                     <Route path="/behaviors" element={
                        <ProtectedRoute>
                        <BehaviorLibrary />
                        </ProtectedRoute>
                     }/>
                     <Route path="/roadmap" element={
                        <ProtectedRoute>
                        <Roadmap />
                        </ProtectedRoute>
                     }/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;