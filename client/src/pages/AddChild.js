import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { addChild } from '../services/api';
import SpectraLogo from '../components/SpectraLogo';

// explains why a sensitive field is being collected — shown on hover/focus
const InfoTip = ({ text }) => (
    <span className="info-wrap" tabIndex={0} aria-label={text}
        style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '6px', cursor: 'help', outline: 'none' }}>
        <Info size={14} color="#a78bfa" />
        <span className="info-bubble"
            style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', width: '260px', background: '#1e1b4b', color: '#e9e5ff', padding: '0.7rem 0.85rem', borderRadius: '10px', fontSize: '12px', lineHeight: '1.55', fontWeight: '400', textTransform: 'none', letterSpacing: 'normal', boxShadow: '0 8px 24px rgba(30,27,75,0.25)', opacity: 0, visibility: 'hidden', transition: 'opacity 0.18s ease, visibility 0.18s ease', zIndex: 10, pointerEvents: 'none' }}>
            {text}
        </span>
    </span>
);

const AddChild = () => {
    const [form, setForm] = useState({ name: '', dateOfBirth: '', sex: '', jaundice: false, familyMemberWithASD: false });
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

                <style>{`
                    .info-wrap:hover .info-bubble,
                    .info-wrap:focus .info-bubble { opacity: 1 !important; visibility: visible !important; }
                    .info-wrap:hover svg { color: #7c3aed; }
                `}</style>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 1rem' }}>
                        <SpectraLogo size={56} />
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
                            min={new Date(Date.now() - 72 * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}
                            max={new Date().toISOString().slice(0, 10)}
                            style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none' }}
                            onFocus={e => e.target.style.border = '2px solid #7c3aed'}
                            onBlur={e => e.target.style.border = '2px solid #e5e7eb'}
                        />
                        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>We use this to show age-appropriate content</p>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Gender
                        </label>
                        <select
                            value={form.sex}
                            onChange={(e) => setForm({ ...form, sex: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', background: 'white' }}
                            onFocus={e => e.target.style.border = '2px solid #7c3aed'}
                            onBlur={e => e.target.style.border = '2px solid #e5e7eb'}>
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            History of jaundice at birth
                            <InfoTip text="Newborn jaundice is very common and usually harmless. But pooled research across many studies has found a modest link with autism — slightly raised odds, not a cause. Most babies who had jaundice are never diagnosed with ASD. We ask because it is one small signal the screening model weighs." />
                        </label>
                        <select
                            value={form.jaundice ? 'yes' : 'no'}
                            onChange={(e) => setForm({ ...form, jaundice: e.target.value === 'yes' })}
                            style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', background: 'white' }}
                            onFocus={e => e.target.style.border = '2px solid #7c3aed'}
                            onBlur={e => e.target.style.border = '2px solid #e5e7eb'}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Immediate family member with ASD
                            <InfoTip text="Autism runs strongly in families — twin and family studies estimate most of the variation in ASD is inherited. A sibling or parent on the spectrum meaningfully raises the likelihood, so the screening model accounts for it. It shifts the odds; it does not decide the outcome." />
                        </label>
                        <select
                            value={form.familyMemberWithASD ? 'yes' : 'no'}
                            onChange={(e) => setForm({ ...form, familyMemberWithASD: e.target.value === 'yes' })}
                            style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', background: 'white' }}
                            onFocus={e => e.target.style.border = '2px solid #7c3aed'}
                            onBlur={e => e.target.style.border = '2px solid #e5e7eb'}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
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