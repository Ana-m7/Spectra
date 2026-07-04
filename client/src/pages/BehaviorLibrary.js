import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBehaviors } from '../services/api';
import SpectraLogo from '../components/SpectraLogo';

const concernColors = {
    High: { bg: '#fef2f2', border: '#dc2626', text: '#dc2626', gradient: 'linear-gradient(135deg, #dc2626, #ef4444)' },
    Medium: { bg: '#fffbeb', border: '#d97706', text: '#d97706', gradient: 'linear-gradient(135deg, #d97706, #f59e0b)' },
    Low: { bg: '#f0fdf4', border: '#16a34a', text: '#16a34a', gradient: 'linear-gradient(135deg, #16a34a, #22c55e)' }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchBehaviors(); }, [ageBand, concernLevel]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchBehaviors();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f9f8ff', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
                .search-input:focus { border: 2px solid #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1) !important; }
                .search-btn:hover { background: #5b21b6 !important; }
                .behavior-card:hover { box-shadow: 0 12px 40px rgba(124,58,237,0.12) !important; transform: translateY(-2px); }
                .filter-select:focus { border: 2px solid #7c3aed !important; outline: none; }
                .dash-btn:hover { background: #7c3aed !important; color: white !important; }
            `}</style>

            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 12px rgba(124,58,237,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <SpectraLogo size={36} />
                    <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '20px', fontWeight: '700', color: '#4c1d95', letterSpacing: '-0.02em' }}>Spectra</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="dash-btn" onClick={() => navigate('/screening')}
                        style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>
                        Take Screening
                    </button>
                    <button onClick={() => navigate('/dashboard')}
                        style={{ padding: '0.5rem 1.25rem', background: '#7c3aed', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                        Dashboard
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', padding: '4.5rem 3rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '350px', height: '350px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', transform: 'translate(30%, -50%)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '0.4rem 1.25rem', borderRadius: '999px', fontSize: '12px', fontWeight: '600', marginBottom: '1.25rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Behavior Reference
                    </div>
                    <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                        Behavior Library
                    </h2>
                    <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: '1.75', maxWidth: '480px', margin: '0 auto' }}>
                        Search behaviors your child shows. Understand what they mean, when they are a concern, and what to observe next.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>

                {/* Search bar */}
                <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input
                            className="search-input"
                            type="text"
                            placeholder='Search behaviors, e.g. "spins toys", "hand flapping", "no eye contact"'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ flex: 1, padding: '1rem 1.25rem', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', transition: 'border 0.2s, box-shadow 0.2s', fontFamily: 'Inter, sans-serif', background: 'white' }}
                        />
                        <button className="search-btn" type="submit"
                            style={{ padding: '1rem 2rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '15px', transition: 'background 0.2s', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
                            Search
                        </button>
                    </div>
                </form>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Filter by:</p>
                    <select className="filter-select" value={ageBand} onChange={(e) => setAgeBand(e.target.value)}
                        style={{ padding: '0.625rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', background: 'white', cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: '#374151', fontWeight: '500' }}>
                        <option value="">All age bands</option>
                        <option value="12m">12 months</option>
                        <option value="18m">18 months</option>
                        <option value="24m">24 months</option>
                        <option value="36m">36 months</option>
                        <option value="48m+">48 months+</option>
                    </select>
                    <select className="filter-select" value={concernLevel} onChange={(e) => setConcernLevel(e.target.value)}
                        style={{ padding: '0.625rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', background: 'white', cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: '#374151', fontWeight: '500' }}>
                        <option value="">All concern levels</option>
                        <option value="High">High concern</option>
                        <option value="Medium">Medium concern</option>
                        <option value="Low">Low concern</option>
                    </select>
                    {(ageBand || concernLevel || search) && (
                        <button onClick={() => { setAgeBand(''); setConcernLevel(''); setSearch(''); }}
                            style={{ padding: '0.625rem 1rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Results count */}
                {!loading && (
                    <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '1.5rem', fontWeight: '500' }}>
                        {behaviors.length} {behaviors.length === 1 ? 'behavior' : 'behaviors'} found
                    </p>
                )}

                {/* Results */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '20px' }}>
                        <div style={{ width: '40px', height: '40px', border: '3px solid #f3f4f6', borderTop: '3px solid #7c3aed', borderRadius: '50%', margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
                        <p style={{ color: '#7c3aed', fontWeight: '600', fontSize: '15px' }}>Loading behaviors...</p>
                    </div>
                ) : behaviors.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(124,58,237,0.06)' }}>
                        <p style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.2rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '0.5rem' }}>No behaviors found</p>
                        <p style={{ color: '#9ca3af', fontSize: '14px' }}>Try a different search term or clear your filters.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.25rem' }}>
                    {behaviors.map((b, i) => {
                        const colors = concernColors[b.concernLevel] || concernColors['Low'];
                        return (
                            <div key={i} className="behavior-card"
                                style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 20px rgba(124,58,237,0.07)', border: '1px solid #f3f4f6', transition: 'all 0.25s', borderLeft: `4px solid ${colors.border}` }}>

                                {/* Card header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem', gap: '1rem' }}>
                                    <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.15rem', fontWeight: '700', color: '#1e1b4b', lineHeight: '1.3' }}>
                                        {b.name}
                                    </h3>
                                    <span style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`, padding: '0.3rem 0.875rem', borderRadius: '999px', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                        {b.concernLevel} Concern
                                    </span>
                                </div>

                                {/* Age relevance tag */}
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '12px', fontWeight: '600' }}>
                                        Age: {b.ageRelevance}
                                    </span>
                                    {b.ageBands && b.ageBands.map((band, j) => (
                                        <span key={j} style={{ background: '#f9fafb', color: '#6b7280', border: '1px solid #e5e7eb', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '12px', fontWeight: '500' }}>
                                            {band}
                                        </span>
                                    ))}
                                </div>

                                {/* Description */}
                                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.75', marginBottom: '1.25rem' }}>
                                    {b.description}
                                </p>

                                {/* What to observe */}
                                <div style={{ background: '#f9f8ff', border: '1px solid #ede9fe', borderRadius: '12px', padding: '1.25rem' }}>
                                    <p style={{ fontSize: '11px', fontWeight: '700', color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                        What to Observe
                                    </p>
                                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7' }}>
                                        {b.whatToObserve}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BehaviorLibrary;