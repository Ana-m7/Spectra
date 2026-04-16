import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBehaviors } from '../services/api';

const concernColors = {
    High: { bg: '#fef2f2', border: '#dc2626', text: '#dc2626' },
    Medium: { bg: '#fffbeb', border: '#d97706', text: '#d97706' },
    Low: { bg: '#f0fdf4', border: '#16a34a', text: '#16a34a' }
};

const BehaviorLibrary = () => {
    const [behaviors, setBehaviors] = useState([]);
    const [search, setSearch] = useState('');
    const [ageBand, setAgeBand] = useState('');
    const [concernLevel, setConcernLevel] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchBehaviors = async () => {
        setLoading(true);
        try {
            const { data } = await getBehaviors({
                search: search || undefined,
                ageBand: ageBand || undefined,
                concernLevel: concernLevel || undefined
            });
            setBehaviors(data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBehaviors();
    }, [ageBand, concernLevel]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchBehaviors();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f3ff' }}>
            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(109,40,217,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>S</div>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#4c1d95' }}>Spectra</span>
                </div>
                <button onClick={() => navigate('/dashboard')}
                    style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                    Dashboard
                </button>
            </nav>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '2.5rem 2rem', textAlign: 'center', color: 'white' }}>
                <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '0.5rem' }}>Behavior Library</h2>
                <p style={{ fontSize: '15px', opacity: '0.9' }}>Search behaviors your child shows — understand what they mean</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1.5rem' }}>

                {/* Search */}
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder='Search e.g. "spins toys", "hand flapping", "no eye contact"'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ flex: 1, padding: '0.875rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none' }}
                        onFocus={e => e.target.style.border = '2px solid #7c3aed'}
                        onBlur={e => e.target.style.border = '2px solid #e5e7eb'}
                    />
                    <button type="submit"
                        style={{ padding: '0.875rem 1.5rem', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                        Search
                    </button>
                </form>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <select value={ageBand} onChange={(e) => setAgeBand(e.target.value)}
                        style={{ padding: '0.625rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer' }}>
                        <option value="">All age bands</option>
                        <option value="12m">12 months</option>
                        <option value="18m">18 months</option>
                        <option value="24m">24 months</option>
                        <option value="36m">36 months</option>
                        <option value="48m+">48 months+</option>
                    </select>
                    <select value={concernLevel} onChange={(e) => setConcernLevel(e.target.value)}
                        style={{ padding: '0.625rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer' }}>
                        <option value="">All concern levels</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* Results */}
                {loading ? (
                    <p style={{ textAlign: 'center', color: '#7c3aed', fontWeight: '500' }}>Loading behaviors...</p>
                ) : behaviors.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '16px' }}>
                        <p style={{ color: '#6b7280', fontSize: '16px' }}>No behaviors found. Try a different search.</p>
                    </div>
                ) : (
                    behaviors.map((b, i) => {
                        const colors = concernColors[b.concernLevel] || concernColors['Low'];
                        return (
                            <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', marginBottom: '1rem', boxShadow: '0 4px 20px rgba(109,40,217,0.07)', border: '1px solid #f3f4f6' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1f2937' }}>{b.name}</h3>
                                    <span style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`, padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                                        {b.concernLevel}
                                    </span>
                                </div>
                                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>Age: {b.ageRelevance}</p>
                                <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.6', marginBottom: '1rem' }}>{b.description}</p>
                                <div style={{ background: '#f5f3ff', borderRadius: '10px', padding: '1rem' }}>
                                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#7c3aed', marginBottom: '4px' }}>What to observe:</p>
                                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>{b.whatToObserve}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default BehaviorLibrary;