import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await registerUser(form);
            login(data.user, data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Email may already exist.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem' }}>
            <h2>Create your Spectra account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <button type="submit" style={{ width: '100%', padding: '0.75rem' }}>
                    Register
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Register;