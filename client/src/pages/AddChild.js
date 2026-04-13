import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addChild } from '../services/api';


const AddChild = () => {
    const [form, setForm] = useState({ name: '', dateOfBirth: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await addChild(form);
            localStorage.setItem('child', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(109,40,217,0.15)' }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '32px' }}>
                        🧩
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#4c1d95' }}>Tell us about your child</h1>
                    <p style={{ color: '#7c3aed', fontSize: '14px', marginTop: '4px' }}>We'll personalize everything for them</p>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '14px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Child's name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your child's name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none' }}
                            onFocus={e => e.target.style.border = '2px solid #7c3aed'}
                            onBlur={e => e.target.style.border = '2px solid #e5e7eb'}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Date of birth
                        </label>
                        <input
                            type="date"
                            value={form.dateOfBirth}
                            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none' }}
                            onFocus={e => e.target.style.border = '2px solid #7c3aed'}
                            onBlur={e => e.target.style.border = '2px solid #e5e7eb'}
                        />
                        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>We use this to show age-appropriate content</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                        {loading ? 'Saving...' : 'Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddChild;