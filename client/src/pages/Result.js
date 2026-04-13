import { useNavigate } from 'react-router-dom';

const riskConfig = {
    Low: { color: '#16a34a', bg: '#f0fdf4', border: '#16a34a', message: 'No significant indicators were detected. Continue monitoring your child\'s development.' },
    Medium: { color: '#d97706', bg: '#fffbeb', border: '#d97706', message: 'Some indicators were noted. We recommend discussing these with your pediatrician.' },
    High: { color: '#dc2626', bg: '#fef2f2', border: '#dc2626', message: 'Several indicators were detected. We strongly recommend seeking a developmental evaluation.' },
};

const Result = () => {
    const navigate = useNavigate();
    const result = JSON.parse(localStorage.getItem('screeningResult'));

    if (!result) {
        navigate('/screening');
        return null;
    }

    const config = riskConfig[result.riskBand] || riskConfig['Low'];

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

            <div style={{ maxWidth: '650px', margin: '3rem auto', padding: '0 1.5rem' }}>

                {/* Result card */}
                <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(109,40,217,0.1)', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>Screening Result</h2>

                    {/* Risk band */}
                    <div style={{ background: config.bg, border: `2px solid ${config.border}`, borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>RISK LEVEL</p>
                        <p style={{ fontSize: '36px', fontWeight: '800', color: config.color, marginBottom: '0.5rem' }}>{result.riskBand}</p>
                        <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>{config.message}</p>
                    </div>

                    {/* Confidence */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>Model confidence</p>
                        <div style={{ background: '#e5e7eb', borderRadius: '999px', height: '8px' }}>
                            <div style={{ background: config.color, height: '100%', borderRadius: '999px', width: `${result.confidence * 100}%` }} />
                        </div>
                        <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>{Math.round(result.confidence * 100)}%</p>
                    </div>

                    {/* Explanations */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Key factors in this result:</p>
                        {result.explanations.map((exp, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '10px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: config.color, marginTop: '6px', flexShrink: 0 }} />
                                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>{exp.explanation}</p>
                            </div>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1rem' }}>
                        <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.6' }}>
                            <strong>Disclaimer:</strong> {result.disclaimer} This tool is designed to assist parents in identifying potential early indicators — it is not a substitute for professional medical evaluation.
                        </p>
                    </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button onClick={() => navigate('/roadmap')}
                        style={{ padding: '1rem', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
                        View roadmap
                    </button>
                    <button onClick={() => navigate('/behaviors')}
                        style={{ padding: '1rem', background: 'white', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
                        Behavior library
                    </button>
                </div>

                <button onClick={() => navigate('/dashboard')}
                    style={{ width: '100%', padding: '0.875rem', background: 'transparent', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', cursor: 'pointer' }}>
                    Back to dashboard
                </button>
            </div>
        </div>
    );
};

export default Result;